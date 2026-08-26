#!/usr/bin/env node
/**
 * Next.js 16.2 always prerenders the synthetic /_global-error route, then
 * crashes with E1068 ("Expected workStore to be initialized") because that
 * render never gets a work store. Vercel retries 3 times and still fails.
 *
 * This patch:
 *  1. Marks /_global-error as non-static so it is not prerendered
 *  2. Softens resolveMetadata if that render still happens
 *  3. Ignores export-worker failures for this route only
 */
const fs = require("fs");
const path = require("path");

const FRONTEND = path.resolve(__dirname, "..");
const REPO = path.resolve(FRONTEND, "..");

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

function replaceOnce(haystack, needle, replacement) {
  if (!haystack.includes(needle)) return { text: haystack, changed: false };
  return { text: haystack.replace(needle, replacement), changed: true };
}

function patchFile(filePath, mutator) {
  if (!fs.existsSync(filePath)) return false;
  const original = fs.readFileSync(filePath, "utf8");
  const next = mutator(original);
  if (!next || next === original) return false;
  fs.writeFileSync(filePath, next);
  return true;
}

const STATIC_TRUE_BLOCK = `            isStatic: true,
            isRoutePPREnabled: false,
            prerenderFallbackMode: undefined,
            prerenderedRoutes: undefined,
            rootParamKeys: undefined,
            hasStaticProps: false,
            hasServerProps: false,
            isNextImageImported: false,
            appConfig: {}`;

const STATIC_FALSE_BLOCK = `            isStatic: false,
            isRoutePPREnabled: false,
            prerenderFallbackMode: undefined,
            prerenderedRoutes: undefined,
            rootParamKeys: undefined,
            hasStaticProps: false,
            hasServerProps: false,
            isNextImageImported: false,
            appConfig: { revalidate: 0, dynamic: 'force-dynamic' }`;

const THROW_RE =
  /if \(!workStore\) \{\s*throw Object\.defineProperty\(new [\w.]+?\('Expected workStore to be initialized'\), "__NEXT_ERROR_CODE", \{\s*value: "E1068",\s*enumerable: false,\s*configurable: true\s*\}\);\s*\}/;

const METADATA_FALLBACK = `if (!workStore) {
        return accumulateMetadata('', metadataItems, pathname, metadataContext);
    }`;

const WORKER_THROW = `                if (result && 'error' in result) {
                    throw new ExportPageError();
                }`;

const WORKER_THROW_PATCH = `                if (result && 'error' in result) {
                    if (String(pageKey).includes('_global-error')) {
                        result = {};
                        break;
                    }
                    throw new ExportPageError();
                }`;

const WORKER_EXIT = `                    if (nextConfig.experimental.prerenderEarlyExit) {
                        console.error(\`Export encountered an error on \${pageKey}, exiting the build.\`);
                        process.exit(1);
                    }`;

const WORKER_EXIT_PATCH = `                    if (String(pageKey).includes('_global-error')) {
                        result = {};
                        break;
                    }
                    if (nextConfig.experimental.prerenderEarlyExit) {
                        console.error(\`Export encountered an error on \${pageKey}, exiting the build.\`);
                        process.exit(1);
                    }`;

const FAILED_PAGES = `        const failedPages = Array.from(failedExportAttemptsByPage.keys());`;
const FAILED_PAGES_PATCH = `        const failedPages = Array.from(failedExportAttemptsByPage.keys()).filter((p) => !String(p).includes('_global-error'));`;

let patched = 0;

for (const root of nextRoots()) {
  const files = [
    [
      "dist/build/utils.js",
      (text) => {
        if (text.includes("appConfig: { revalidate: 0, dynamic: 'force-dynamic' }")) return text;
        if (!text.includes("Skip page data collection for synthetic _global-error routes")) return text;
        const out = replaceOnce(text, STATIC_TRUE_BLOCK, STATIC_FALSE_BLOCK);
        return out.changed ? out.text : text;
      },
    ],
    [
      "dist/esm/build/utils.js",
      (text) => {
        if (text.includes("appConfig: { revalidate: 0, dynamic: 'force-dynamic' }")) return text;
        if (!text.includes("Skip page data collection for synthetic _global-error routes")) return text;
        const out = replaceOnce(text, STATIC_TRUE_BLOCK, STATIC_FALSE_BLOCK);
        return out.changed ? out.text : text;
      },
    ],
    [
      "dist/lib/metadata/resolve-metadata.js",
      (text) => {
        if (text.includes("return accumulateMetadata('', metadataItems, pathname, metadataContext);")) {
          return text;
        }
        if (!THROW_RE.test(text)) return text;
        return text.replace(THROW_RE, METADATA_FALLBACK);
      },
    ],
    [
      "dist/esm/lib/metadata/resolve-metadata.js",
      (text) => {
        if (text.includes("return accumulateMetadata('', metadataItems, pathname, metadataContext);")) {
          return text;
        }
        if (!THROW_RE.test(text)) return text;
        return text.replace(THROW_RE, METADATA_FALLBACK);
      },
    ],
    [
      "dist/export/worker.js",
      (text) => {
        let next = text;
        if (!next.includes("if (String(pageKey).includes('_global-error'))")) {
          const a = replaceOnce(next, WORKER_THROW, WORKER_THROW_PATCH);
          if (a.changed) next = a.text;
          const b = replaceOnce(next, WORKER_EXIT, WORKER_EXIT_PATCH);
          if (b.changed) next = b.text;
        }
        return next;
      },
    ],
    [
      "dist/esm/export/worker.js",
      (text) => {
        let next = text;
        if (!next.includes("if (String(pageKey).includes('_global-error'))")) {
          const a = replaceOnce(next, WORKER_THROW, WORKER_THROW_PATCH);
          if (a.changed) next = a.text;
          const b = replaceOnce(next, WORKER_EXIT, WORKER_EXIT_PATCH);
          if (b.changed) next = b.text;
        }
        return next;
      },
    ],
    [
      "dist/export/index.js",
      (text) => {
        if (text.includes("!String(p).includes('_global-error')")) return text;
        const out = replaceOnce(text, FAILED_PAGES, FAILED_PAGES_PATCH);
        return out.changed ? out.text : text;
      },
    ],
    [
      "dist/esm/export/index.js",
      (text) => {
        if (text.includes("!String(p).includes('_global-error')")) return text;
        const out = replaceOnce(text, FAILED_PAGES, FAILED_PAGES_PATCH);
        return out.changed ? out.text : text;
      },
    ],
  ];

  for (const [rel, mutator] of files) {
    const filePath = path.join(root, rel);
    if (patchFile(filePath, mutator)) {
      patched += 1;
      console.log(`[patch-next-workstore] patched ${path.relative(REPO, filePath)}`);
    }
  }
}

const utilsOk = nextRoots().some((root) => {
  const filePath = path.join(root, "dist/build/utils.js");
  return (
    fs.existsSync(filePath) &&
    fs.readFileSync(filePath, "utf8").includes("appConfig: { revalidate: 0, dynamic: 'force-dynamic' }")
  );
});

if (!utilsOk) {
  console.error("[patch-next-workstore] failed to mark /_global-error as non-static");
  process.exit(1);
}

console.log(
  patched
    ? `[patch-next-workstore] applied ${patched} file update(s)`
    : "[patch-next-workstore] already patched"
);
