#!/usr/bin/env node
// Builds every Slidev deck in this folder by running `npm run build`
// inside each deck directory. A "deck" is any direct subfolder that
// contains a package.json, excluding names starting with "_".

import { readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const here = dirname(fileURLToPath(import.meta.url));

const decks = readdirSync(here)
  .filter(name => !name.startsWith("_") && !name.startsWith("."))
  .map(name => join(here, name))
  .filter(path => statSync(path).isDirectory())
  .filter(path => existsSync(join(path, "package.json")));

if (decks.length === 0) {
  console.log("No decks found in", here);
  process.exit(0);
}

for (const deck of decks) {
  console.log(`\n=== Building ${deck} ===`);
  if (!existsSync(join(deck, "node_modules"))) {
    console.log("  installing dependencies...");
    const install = spawnSync("npm", ["install"], {
      cwd: deck,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    if (install.status !== 0) process.exit(install.status ?? 1);
  }
  const build = spawnSync("npm", ["run", "build"], {
    cwd: deck,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (build.status !== 0) process.exit(build.status ?? 1);
}
