#!/usr/bin/env node
/**
 * GetAgent Playbook pipeline: package → upload → backtest → publish.
 * Usage: PLAYBOOK_ACCESS_KEY=... node scripts/getagent-pipeline.mjs
 */
import dns from "node:dns";
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const originalLookup = dns.lookup.bind(dns);
dns.lookup = ((hostname, options, callback) => {
  let cb = callback;
  let opts = options;
  if (typeof options === "function") {
    cb = options;
    opts = {};
  }
  if (typeof opts === "number") opts = { family: opts };
  if (hostname === "api.bitget.com") {
    if (opts && typeof opts === "object" && opts.all) {
      cb?.(null, [{ address: "104.18.14.166", family: 4 }]);
      return;
    }
    cb?.(null, "104.18.14.166", 4);
    return;
  }
  return originalLookup(hostname, opts, cb);
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PACKAGE_DIR = join(ROOT, "tradepaddy-playbook");
const TAR_PATH = join(ROOT, "tradepaddy-playbook.tar.gz");
const API_BASE = "https://api.bitget.com/api/v1/playbook";

const accessKey = process.env.PLAYBOOK_ACCESS_KEY || process.env.GETAGENT_ACCESS_KEY;
if (!accessKey) {
  console.error("Set PLAYBOOK_ACCESS_KEY (Bitget Playbook ACCESS-KEY) before running.");
  process.exit(1);
}

function maskKey(key) {
  return key.length <= 8 ? "***" : `${key.slice(0, 4)}…${key.slice(-4)}`;
}

async function api(method, path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "ACCESS-KEY": accessKey,
      ...(body && !(body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
    },
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(data)}`);
  }
  return data.data ?? data;
}

function packTarGz() {
  execSync(`tar -czf "${TAR_PATH}" -C "${PACKAGE_DIR}" .`, { stdio: "inherit" });
}

async function upload() {
  console.log(`\n→ upload draft tradepaddy-adaptive-regime → ${API_BASE}/upload (ACCESS-KEY=${maskKey(accessKey)})`);
  packTarGz();
  const form = new FormData();
  form.append("package", new Blob([readFileSync(TAR_PATH)]), "tradepaddy-playbook.tar.gz");
  return api("POST", "/upload", form);
}

async function runBacktest(versionId) {
  console.log(`\n→ run backtest for ${versionId}`);
  const dispatch = await api("POST", "/run", { version_id: versionId });
  const runId = dispatch.run_id;
  if (!runId) throw new Error("No run_id returned");

  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const status = await api("GET", `/run?run_id=${encodeURIComponent(runId)}`);
    console.log(`  poll ${i + 1}: ${status.status}`);
    if (status.status === "completed") return status;
    if (status.status === "failed") {
      throw new Error(status.failure_reason || "Backtest failed");
    }
  }
  throw new Error("Backtest timed out after 5 minutes");
}

async function publish(draftId) {
  console.log(`\n→ publish draft ${draftId}`);
  return api("POST", "/publish", { draft_id: draftId, bump_type: "patch" });
}

function printMetrics(run) {
  const m = run.metrics_output || run.signal_output?.[0]?.metrics || {};
  const summary = { ...m };
  if (summary.reports && typeof summary.reports === "object") {
    const reports = { ...summary.reports };
    delete reports.equity_curve;
    summary.reports = reports;
  }
  console.log("\n=== Backtest Key Metrics ===");
  console.log("| Metric | Value |");
  console.log("| --- | --- |");
  const displayKeys = [
    "total_return_pct",
    "net_pnl",
    "max_drawdown_pct",
    "win_rate",
    "total_trades",
    "sharpe_ratio",
    "profit_factor",
    "window_start",
    "window_end",
    "equity_curve_point_count",
  ];
  for (const k of displayKeys) {
    if (summary[k] !== undefined) console.log(`| ${k} | ${summary[k]} |`);
  }
  const outPath = join(ROOT, "tradepaddy-playbook", "BACKTEST_RESULTS.json");
  writeFileSync(
    outPath,
    JSON.stringify({ run_id: run.run_id, metrics: summary, completed_at: new Date().toISOString() }, null, 2),
  );
  console.log(`\nSaved: ${outPath}`);
}

async function main() {
  const publishOnly = process.argv.includes("--publish-only");
  const draftIdArg = process.argv.find((a) => a.startsWith("--draft="))?.split("=")[1];

  if (publishOnly && draftIdArg) {
    const publishResult = await publish(draftIdArg);
    console.log("\nPublish:", publishResult);
    return;
  }

  const uploadResult = await upload();
  console.log("Upload:", uploadResult);
  const versionId = uploadResult.draft_id || uploadResult.version_id;
  if (!versionId) throw new Error("No draft_id from upload");

  const runResult = await runBacktest(versionId);
  printMetrics(runResult);

  const publishResult = await publish(uploadResult.draft_id);
  console.log("\nPublish:", publishResult);
}

main().catch((err) => {
  console.error("\nPipeline failed:", err.message || err);
  process.exit(1);
});
