#!/usr/bin/env node
/**
 * Tailwind/PostCSS require() lightningcss from frontend/node_modules.
 * npm workspaces hoist it to the repo root, so Next/Turbopack (rooted in
 * frontend/) cannot resolve it. Copy the JS package and the current
 * platform .node binary next to the frontend app.
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

function copyDir(from, to) {
  fs.rmSync(to, { recursive: true, force: true });
  fs.cpSync(from, to, { recursive: true, dereference: true });
}

function isOutsideFrontend(dir) {
  try {
    const real = fs.realpathSync(dir);
    return !real.startsWith(FRONTEND + path.sep) && real !== FRONTEND;
  } catch {
    return true;
  }
}

function ensureLocal(pkg) {
  const dest = path.join(FRONTEND, "node_modules", ...pkg.split("/"));
  const destExists = fs.existsSync(dest);
  const destIsLink = destExists && fs.lstatSync(dest).isSymbolicLink();
  const destOutside = destExists && isOutsideFrontend(dest);
  const alreadyLocal = destExists && !destIsLink && !destOutside;

  if (alreadyLocal) return dest;

  const source = walkFind(pkg, [FRONTEND, REPO, process.cwd()]);
  if (!source || !fs.existsSync(source)) {
    console.warn(`[ensure-native-css] ${pkg} not found; skip`);
    return null;
  }

  copyDir(source, dest);
  console.log(`[ensure-native-css] installed ${pkg} in frontend/node_modules`);
  return dest;
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

function currentLightningPkg() {
  const arch = process.arch;
  if (process.platform === "darwin") return `lightningcss-darwin-${arch}`;
  if (process.platform === "win32") {
    return arch === "arm64"
      ? "lightningcss-win32-arm64-msvc"
      : "lightningcss-win32-x64-msvc";
  }
  if (process.platform !== "linux") return null;

  let libc = "gnu";
  try {
    const { familySync, MUSL } = require("detect-libc");
    if (familySync() === MUSL) libc = "musl";
  } catch {
    libc = "gnu";
  }
  return `lightningcss-linux-${arch}-${libc}`;
}

const strict =
  process.argv.includes("--strict") || process.env.ENSURE_NATIVE_CSS_STRICT === "1";

if (process.platform === "linux") {
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
    console.warn(
      "[ensure-native-css] npm install of platform packages failed, continuing:",
      err.message
    );
  }
}

ensureLocal("detect-libc");
const lightningDir = ensureLocal("lightningcss");
const lightningNativePkg = currentLightningPkg();
const lightningNativeDir = lightningNativePkg
  ? ensureLocal(lightningNativePkg)
  : null;

if (lightningDir && lightningNativeDir) {
  for (const file of fs.readdirSync(lightningNativeDir)) {
    if (file.endsWith(".node")) {
      fs.copyFileSync(
        path.join(lightningNativeDir, file),
        path.join(lightningDir, file)
      );
    }
  }
}

// Turbopack evaluates PostCSS from @tailwindcss/node; nest the native
// packages there so require() does not depend on workspace hoisting.
for (const host of ["@tailwindcss/node", "@tailwindcss/postcss"]) {
  const hostDir = path.join(FRONTEND, "node_modules", ...host.split("/"));
  if (!fs.existsSync(hostDir) || !lightningDir) continue;
  const nested = path.join(hostDir, "node_modules");
  fs.mkdirSync(nested, { recursive: true });
  copyDir(lightningDir, path.join(nested, "lightningcss"));
  const detectDir = path.join(FRONTEND, "node_modules", "detect-libc");
  if (fs.existsSync(detectDir)) {
    copyDir(detectDir, path.join(nested, "detect-libc"));
  }
  if (lightningNativePkg && lightningNativeDir) {
    copyDir(lightningNativeDir, path.join(nested, lightningNativePkg));
  }
}

try {
  require(path.join(FRONTEND, "node_modules", "lightningcss"));
  console.log("[ensure-native-css] lightningcss loaded");
} catch (err) {
  console.error("[ensure-native-css] lightningcss still missing:", err.message);
  if (strict) process.exit(1);
}
