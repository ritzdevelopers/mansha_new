#!/usr/bin/env node
/**
 * Tailwind and lightningcss need platform .node binaries next to the JS
 * packages. Workspace hoisting often leaves them at the repo root, so
 * require() from frontend/node_modules fails.
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const FRONTEND = path.resolve(__dirname, "..");
const REPO = path.resolve(FRONTEND, "..");
const OXIDE_VERSION = "4.2.4";
const LIGHTNING_VERSION = "1.32.0";

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

function copyNativeBinaries(fromDir, toDir) {
  if (!fromDir || !toDir || !fs.existsSync(fromDir) || !fs.existsSync(toDir)) return;
  for (const file of fs.readdirSync(fromDir)) {
    if (file.endsWith(".node")) {
      fs.copyFileSync(path.join(fromDir, file), path.join(toDir, file));
    }
  }
}

function canLoad(name) {
  try {
    require(name);
    return true;
  } catch {
    return false;
  }
}

function installPackages(packages) {
  const cmd = `npm install --no-save --no-package-lock --ignore-scripts --no-workspaces ${packages.join(" ")}`;
  execSync(cmd, {
    cwd: FRONTEND,
    stdio: "inherit",
    env: {
      ...process.env,
      npm_config_optional: "true",
      npm_config_workspaces: "false",
      npm_config_workspace: "",
      ENSURING_NATIVE_CSS: "1",
    },
  });
}

function linuxLibc() {
  try {
    const { familySync, MUSL } = require("detect-libc");
    if (familySync() === MUSL) return "musl";
  } catch {
    // default to gnu
  }
  return "gnu";
}

function getNativeSpec() {
  const { platform, arch } = process;

  if (platform === "linux") {
    const libc = linuxLibc();
    return {
      lightningPkg: `lightningcss-linux-${arch}-${libc}`,
      oxidePkg: `@tailwindcss/oxide-linux-${arch}-${libc}`,
      install: [
        `lightningcss-linux-x64-gnu@${LIGHTNING_VERSION}`,
        `lightningcss-linux-x64-musl@${LIGHTNING_VERSION}`,
        `lightningcss-linux-arm64-gnu@${LIGHTNING_VERSION}`,
        `lightningcss-linux-arm64-musl@${LIGHTNING_VERSION}`,
        `@tailwindcss/oxide-linux-x64-gnu@${OXIDE_VERSION}`,
        `@tailwindcss/oxide-linux-x64-musl@${OXIDE_VERSION}`,
        `@tailwindcss/oxide-linux-arm64-gnu@${OXIDE_VERSION}`,
        `@tailwindcss/oxide-linux-arm64-musl@${OXIDE_VERSION}`,
      ],
    };
  }

  if (platform === "win32") {
    return {
      lightningPkg: `lightningcss-win32-${arch}-msvc`,
      oxidePkg: `@tailwindcss/oxide-win32-${arch}-msvc`,
      install: [
        `lightningcss-win32-x64-msvc@${LIGHTNING_VERSION}`,
        `lightningcss-win32-arm64-msvc@${LIGHTNING_VERSION}`,
        `@tailwindcss/oxide-win32-x64-msvc@${OXIDE_VERSION}`,
        `@tailwindcss/oxide-win32-arm64-msvc@${OXIDE_VERSION}`,
      ],
    };
  }

  if (platform === "darwin") {
    return {
      lightningPkg: `lightningcss-darwin-${arch}`,
      oxidePkg: `@tailwindcss/oxide-darwin-${arch}`,
      install: [
        `lightningcss-darwin-x64@${LIGHTNING_VERSION}`,
        `lightningcss-darwin-arm64@${LIGHTNING_VERSION}`,
        `@tailwindcss/oxide-darwin-x64@${OXIDE_VERSION}`,
        `@tailwindcss/oxide-darwin-arm64@${OXIDE_VERSION}`,
      ],
    };
  }

  return null;
}

const strict = process.argv.includes("--strict") || process.env.ENSURE_NATIVE_CSS_STRICT === "1";
const spec = getNativeSpec();

if (!spec) process.exit(0);

if (!canLoad(spec.oxidePkg) || !canLoad(spec.lightningPkg)) {
  try {
    installPackages(spec.install);
  } catch (err) {
    console.warn("[ensure-native-css] npm install of platform packages failed, continuing:", err.message);
  }
} else {
  console.log("[ensure-native-css] native packages already loadable");
}

const searchRoots = [FRONTEND, REPO, process.cwd()];
const lightningDir = walkFind("lightningcss", searchRoots);
const lightningNativeDir = walkFind(spec.lightningPkg, searchRoots);
const oxideDir = walkFind("@tailwindcss/oxide", searchRoots);
const oxideNativeDir = walkFind(spec.oxidePkg, searchRoots);

if (lightningNativeDir) {
  const frontendNative = path.join(FRONTEND, "node_modules", spec.lightningPkg);
  if (path.resolve(lightningNativeDir) !== path.resolve(frontendNative)) {
    copyDirContents(lightningNativeDir, frontendNative);
  }
  copyNativeBinaries(lightningNativeDir, lightningDir);
}

if (oxideNativeDir) {
  const frontendNative = path.join(FRONTEND, "node_modules", ...spec.oxidePkg.split("/"));
  if (path.resolve(oxideNativeDir) !== path.resolve(frontendNative)) {
    copyDirContents(oxideNativeDir, frontendNative);
  }
  copyNativeBinaries(oxideNativeDir, oxideDir);
}

try {
  require("lightningcss");
  console.log("[ensure-native-css] lightningcss loaded");
} catch (err) {
  console.error("[ensure-native-css] lightningcss still missing:", err.message);
  if (strict) process.exit(1);
}

try {
  require("@tailwindcss/oxide");
  console.log("[ensure-native-css] @tailwindcss/oxide loaded");
} catch (err) {
  console.error("[ensure-native-css] @tailwindcss/oxide still missing:", err.message);
  if (strict) process.exit(1);
}
