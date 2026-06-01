import { cp, access, readdir, stat, rm } from "node:fs/promises";
import path from "node:path";

const rootDir = path.resolve(".open-next");
const assetsDir = path.join(rootDir, "assets");

const copyIfExists = async (from, to) => {
  try {
    await access(from);
    await cp(from, to, { recursive: true, force: true });
  } catch {
    // Skip missing optional files.
  }
};

const removeIfExists = async (target) => {
  try {
    await rm(target, { recursive: true, force: true });
  } catch {
    // Already gone, fine.
  }
};

// _next is recursive and large; copy the whole tree once.
await copyIfExists(path.join(assetsDir, "_next"), path.join(rootDir, "_next"));

// Promote every other entry in .open-next/assets/ (favicons, og image, manifest, _routes.json,
// _headers, _redirects, BUILD_ID, anything in public/) to .open-next/ root so the
// pages deploy serves them as static assets.
try {
  const entries = await readdir(assetsDir);
  for (const name of entries) {
    if (name === "_next") continue; // handled above
    const from = path.join(assetsDir, name);
    const to = path.join(rootDir, name);
    const info = await stat(from);
    await cp(from, to, { recursive: info.isDirectory(), force: true });
  }
} catch (err) {
  if (err.code !== "ENOENT") throw err;
}

// Cloudflare expects the worker entrypoint at _worker.js; OpenNext writes worker.js.
await copyIfExists(path.join(rootDir, "worker.js"), path.join(rootDir, "_worker.js"));

// The Worker [assets] handler validates _redirects strictly and rejects
// absolute URLs. Our www-to-apex and http-to-https canonicalization is
// already handled by .pages-proxy/_worker.js in JS, so the _redirects
// file in .open-next/assets/ is redundant and breaks deploy. Drop it
// from the worker's assets dir (the copy at .open-next/_redirects stays
// available for any future Pages-direct use).
await removeIfExists(path.join(assetsDir, "_redirects"));
