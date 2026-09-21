#!/usr/bin/env node
/**
 * Vercel/Linux: Tailwind and lightningcss need platform .node binaries
 * next to the JS packages. Workspace hoisting often leaves them at the
 * repo root, so require() from frontend/node_modules fails.
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const FRONTEND = path.resolve(__dirname, "..");
const REPO = path.resolve(FRONTEND, "..");

function walkFind(name, startDirs) {
  for (const start of startDirs) {
    let dir = start;
    for (let i = 0; i < 8; i += 1) {
      const candidate = path.join(dir, "node_modules", ...name.split("/"));
      if (fs.existsSync(candidate)) return candidate;
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  return null;
}

function copyDirContents(fromDir, toDir) {
  fs.mkdirSync(toDir, { recursive: true });
  for (const entry of fs.readdirSync(fromDir)) {
    const from = path.join(fromDir, entry);
    const to = path.join(toDir, entry);
    const stat = fs.lstatSync(from);
    if (stat.isDirectory()) copyDirContents(from, to);
    else fs.copyFileSync(from, to);
  }
}

function installPackages(packages) {
  const cmd = `npm install --no-save --no-package-lock --ignore-scripts ${packages.join(" ")}`;
  execSync(cmd, {
    cwd: FRONTEND,
    stdio: "inherit",
    env: {
      ...process.env,
      npm_config_optional: "true",
      ENSURING_NATIVE_CSS: "1",
    },
  });
}

const strict = process.argv.includes("--strict") || process.env.ENSURE_NATIVE_CSS_STRICT === "1";

if (process.platform !== "linux") process.exit(0);

let libc = "gnu";
try {
  const { familySync, MUSL } = require("detect-libc");
  if (familySync() === MUSL) libc = "musl";
} catch {
  libc = "gnu";
}

const arch = process.arch;
const lightningPkg = `lightningcss-linux-${arch}-${libc}`;
const oxidePkg = `@tailwindcss/oxide-linux-${arch}-${libc}`;

const lightningPkgs = [
  "lightningcss-linux-x64-gnu@1.32.0",
  "lightningcss-linux-x64-musl@1.32.0",
  "lightningcss-linux-arm64-gnu@1.32.0",
  "lightningcss-linux-arm64-musl@1.32.0",
];
const oxidePkgs = [
  "@tailwindcss/oxide-linux-x64-gnu@4.2.4",
  "@tailwindcss/oxide-linux-x64-musl@4.2.4",
  "@tailwindcss/oxide-linux-arm64-gnu@4.2.4",
  "@tailwindcss/oxide-linux-arm64-musl@4.2.4",
];

try {
  installPackages([...lightningPkgs, ...oxidePkgs]);
} catch (err) {
  console.warn("[ensure-native-css] npm install of platform packages failed, continuing:", err.message);
}

const searchRoots = [FRONTEND, REPO, process.cwd()];
const lightningDir = walkFind("lightningcss", searchRoots);
const lightningNativeDir = walkFind(lightningPkg, searchRoots);
const oxideDir = walkFind("@tailwindcss/oxide", searchRoots);
const oxideNativeDir = walkFind(oxidePkg, searchRoots);

if (lightningNativeDir) {
  const frontendNative = path.join(FRONTEND, "node_modules", lightningPkg);
  if (path.resolve(lightningNativeDir) !== path.resolve(frontendNative)) {
    copyDirContents(lightningNativeDir, frontendNative);
  }
  if (lightningDir) {
    for (const file of fs.readdirSync(lightningNativeDir)) {
      if (file.endsWith(".node")) {
        fs.copyFileSync(path.join(lightningNativeDir, file), path.join(lightningDir, file));
      }
    }
  }
}

if (oxideNativeDir) {
  const frontendNative = path.join(FRONTEND, "node_modules", ...oxidePkg.split("/"));
  if (path.resolve(oxideNativeDir) !== path.resolve(frontendNative)) {
    copyDirContents(oxideNativeDir, frontendNative);
  }
}

try {
  require("lightningcss");
  console.log("[ensure-native-css] lightningcss loaded");
} catch (err) {
  console.error("[ensure-native-css] lightningcss still missing:", err.message);
  if (strict) process.exit(1);
}
