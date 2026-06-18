#!/usr/bin/env node
/**
 * Install @bitget-ai/getagent-skill into getagent-installed/ for local validation.
 */
import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const TARGET = join(ROOT, "getagent-installed");
const TMP = join(ROOT, ".tmp-getagent-skill");

console.log("Installing @bitget-ai/getagent-skill...");
mkdirSync(TMP, { recursive: true });
execSync("npm pack @bitget-ai/getagent-skill@latest", { cwd: TMP, stdio: "inherit" });

const packFile = execSync("dir /b getagent-*.tgz", { cwd: TMP, encoding: "utf8" })
  .trim()
  .split("\n")[0]
  .trim();

if (!packFile) {
  console.error("Could not find packed tarball");
  process.exit(1);
}

const extractDir = join(TMP, "extract");
mkdirSync(extractDir, { recursive: true });
execSync(`tar -xzf "${join(TMP, packFile)}" -C "${extractDir}"`, { stdio: "inherit" });

const pkgDir = join(extractDir, "package");
if (!existsSync(join(pkgDir, "SKILL.md"))) {
  console.error("Invalid package — SKILL.md not found");
  process.exit(1);
}

if (existsSync(TARGET)) {
  rmSync(TARGET, { recursive: true, force: true });
}
cpSync(pkgDir, TARGET, { recursive: true });

rmSync(TMP, { recursive: true, force: true });
console.log(`GetAgent skill installed to ${TARGET}`);
