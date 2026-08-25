#!/usr/bin/env node
/**
 * npm workspaces hoist next/react to the repo root as a symlink.
 * Netlify's serverless bundle then cannot require
 * next/dist/server/lib/start-server.js at runtime.
 * Copy real packages into frontend/node_modules before next build.
 */
const fs = require("fs");
const path = require("path");

const FRONTEND = path.resolve(__dirname, "..");
const REPO = path.resolve(FRONTEND, "..");
const PACKAGES = ["next", "react", "react-dom"];

function resolvePkg(name) {
  const local = path.join(FRONTEND, "node_modules", name);
  const root = path.join(REPO, "node_modules", name);
  if (fs.existsSync(local)) return local;
  if (fs.existsSync(root)) return root;
  return null;
}

function materialize(name) {
  const source = resolvePkg(name);
  if (!source) {
    console.warn(`[materialize-hoisted-deps] skip ${name}: not installed`);
    return;
  }

  const dest = path.join(FRONTEND, "node_modules", name);
  const real = fs.realpathSync(source);
  let isLink = false;
  try {
    isLink = fs.lstatSync(dest).isSymbolicLink();
  } catch {
    isLink = false;
  }

  if (fs.existsSync(dest) && !isLink && path.resolve(dest) === path.resolve(real)) {
    return;
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(real, dest, { recursive: true });
  console.log(`[materialize-hoisted-deps] copied ${name} -> frontend/node_modules`);
}

for (const name of PACKAGES) {
  materialize(name);
}
