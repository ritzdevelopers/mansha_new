#!/usr/bin/env node
/**
 * npm workspaces hoist react to the repo root. Next/Turbopack is rooted in
 * frontend/, so it cannot resolve those outside packages (including
 * react/jsx-runtime). Copy them into frontend/node_modules when needed.
 */
const fs = require("fs");
const path = require("path");

const FRONTEND = path.resolve(__dirname, "..");
const REPO = path.resolve(FRONTEND, "..");
const PACKAGES = ["react", "react-dom", "scheduler", "jodit", "jodit-react"];

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

function ensure(pkg) {
  const dest = path.join(FRONTEND, "node_modules", pkg);
  const hoisted = path.join(REPO, "node_modules", pkg);
  const destExists = fs.existsSync(dest);
  const destIsLink = destExists && fs.lstatSync(dest).isSymbolicLink();
  const destOutside = destExists && isOutsideFrontend(dest);
  const alreadyLocal = destExists && !destIsLink && !destOutside;

  if (alreadyLocal) return;

  const source = fs.existsSync(hoisted)
    ? hoisted
    : destExists
      ? fs.realpathSync(dest)
      : null;

  if (!source || !fs.existsSync(source)) {
    console.warn(`[ensure-react] ${pkg} not found; skip`);
    return;
  }

  copyDir(source, dest);
  console.log(`[ensure-react] installed ${pkg} in frontend/node_modules`);
}

for (const pkg of PACKAGES) ensure(pkg);
