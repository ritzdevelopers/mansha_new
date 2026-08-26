#!/usr/bin/env node
/**
 * Next.js 16.2 throws during prerender of the synthetic /_global-error route
 * because resolveMetadata() reads workAsyncStorage after that store was never
 * initialized (E1068). Patch CJS + ESM copies so Vercel `next build` can finish.
 */
const fs = require("fs");
const path = require("path");

const FRONTEND = path.resolve(__dirname, "..");
const REPO = path.resolve(FRONTEND, "..");

const FILES = [
  "dist/lib/metadata/resolve-metadata.js",
  "dist/esm/lib/metadata/resolve-metadata.js",
];

const THROW_RE =
  /if \(!workStore\) \{\s*throw Object\.defineProperty\(new [\w.]+?\('Expected workStore to be initialized'\), "__NEXT_ERROR_CODE", \{\s*value: "E1068",\s*enumerable: false,\s*configurable: true\s*\}\);\s*\}/;

const FALLBACK = `if (!workStore) {
        return accumulateMetadata('', metadataItems, pathname, metadataContext);
    }`;

function nextRoots() {
  const roots = [];
  for (const dir of [
    path.join(FRONTEND, "node_modules", "next"),
    path.join(REPO, "node_modules", "next"),
  ]) {
    if (!fs.existsSync(dir)) continue;
    try {
      roots.push(fs.realpathSync(dir));
    } catch {
      roots.push(dir);
    }
  }
  return [...new Set(roots)];
}

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) return false;
  const original = fs.readFileSync(filePath, "utf8");
  if (original.includes("return accumulateMetadata('', metadataItems, pathname, metadataContext);")) {
    return false;
  }
  if (!THROW_RE.test(original)) return false;
  const patched = original.replace(THROW_RE, FALLBACK);
  if (patched === original) return false;
  fs.writeFileSync(filePath, patched);
  return true;
}

let patched = 0;
for (const root of nextRoots()) {
  for (const rel of FILES) {
    const filePath = path.join(root, rel);
    if (patchFile(filePath)) {
      patched += 1;
      console.log(`[patch-next-workstore] patched ${path.relative(REPO, filePath)}`);
    }
  }
}

function isPatched(filePath) {
  return (
    fs.existsSync(filePath) &&
    fs.readFileSync(filePath, "utf8").includes(
      "return accumulateMetadata('', metadataItems, pathname, metadataContext);"
    )
  );
}

const resolved = nextRoots().some((root) => isPatched(path.join(root, FILES[0])));
if (!resolved) {
  console.error("[patch-next-workstore] failed to patch Next.js resolveMetadata");
  process.exit(1);
}

if (!patched) {
  console.log("[patch-next-workstore] already patched");
}
