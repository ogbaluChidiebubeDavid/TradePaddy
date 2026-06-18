# Sandbox Runtime

## Contents

- [Execution Model](#execution-model)
- [State and Persistence](#state-and-persistence)
- [Runtime Profiles](#runtime-profiles)
- [Pre-installed Dependencies](#pre-installed-dependencies)
- [Allowed Standard Library Modules](#allowed-standard-library-modules)
- [Blocked Modules](#blocked-modules)
- [Network Restrictions](#network-restrictions)
- [Output Conventions](#output-conventions)
- [Environment Variables](#environment-variables)

## Execution Model

- **Engine:** Python 3.12
- **Entry point:** package executes as `python -m src.main`
- **Working directory:** `/workspace/`
- **Timeout:** 180 seconds
- **Memory:** 2GB
- **Fresh workspace:** Each run starts in a fresh workspace snapshot.
- **Executable runtime profiles:** `deterministic`, plus deployment-enabled `llm_bounded`
- **No built-in agent loop:** Do not assume planner / reflection / tool-orchestration loops are provided by the platform.

## State and Persistence

The workspace is ephemeral by default, but the runner may optionally hydrate and
sync `.state/` on behalf of the Playbook.

- Treat `.state/` as the only supported persisted path across runs.
- Do not rely on files outside `.state/` surviving between runs.
- If `.state/` hydrate fails, the runner may abort instead of silently running
with missing state.
- Agent memory is **not** part of the default sandbox contract. If a future
runtime introduces agent memory, it should live behind an explicit runtime
profile and policy.

## Runtime Profiles

The product direction is to separate package shape from runtime capability.

- `deterministic`
  - Current default executable profile
  - No built-in general-purpose agent loop
  - Best fit for `backtest_support: full`
- `llm_bounded`
  - Executable only when the deployment enables managed Playbook LLM access
  - Use through `getagent.llm`, not direct HTTP clients
  - Fixed call-count, prompt-size, output-token, and timeout budgets
  - Best fit for `backtest_support: none`
- `agentic`
  - Declared contract only for now; current sandbox rejects it at runtime
  - Should not be assumed in the default Playbook sandbox

### Agent loop guidance

Do **not** assume a full general-purpose agent runtime is available in the
default Playbook sandbox.

`llm_bounded` is intentionally narrower than a general-purpose agent loop. If
the platform later introduces `agentic`, it should still require:

- an explicit runtime profile or separate image
- fixed tool allowlists
- `max_steps`
- `max_runtime_ms`
- `max_model_tokens`
- trace persistence
- an explicit memory policy

## Pre-installed Dependencies

These are the packages present in the image. This is **not** the same as the
author-facing import contract: some entries below exist only so managed SDKs can
work internally.


| Package           | Version             | Purpose                                                                       |
| ----------------- | ------------------- | ----------------------------------------------------------------------------- |
| `getagent`         | 0.1.1               | SDK (data, trade, backtest, runtime, llm)                                     |
| `getall`          | repo source         | Internal managed runtime used by `getagent.llm`                                |
| `litellm`         | 1.83.7              | Internal provider bridge behind `getagent.llm`                                 |
| `trade-sdk`       | vendored source     | Internal implementation behind `getagent.trade` (not a public Playbook import) |
| `pandas`          | ≥2.0                | Data manipulation                                                             |
| `numpy`           | ≥1.24               | Numerical computation                                                         |
| `nautilus_trader` | current image build | Backtest engine (used by SDK and author strategy classes)                     |
| `pydantic`        | 2.13.2              | Internal config/runtime models                                                |
| `pyyaml`          | ≥6.0                | YAML parsing                                                                  |
| `matplotlib`      | ≥3.7                | Chart rendering (used by SDK internally)                                      |


**No pip install.** PyPI is network-blocked. Only pre-installed packages are available.

### Public author imports

Playbook source code should import from the public surface only:

- `getagent`
- `nautilus_trader`
- `pandas`
- `numpy`
- safe standard-library modules listed below

Do not import implementation details such as `getall`, `litellm`, `httpx`, or
`trade_sdk` even when they exist in the image.

## Allowed Standard Library Modules

`json`, `math`, `datetime`, `pathlib`, `asyncio`, `typing`, `dataclasses`,
`collections`, `functools`, `re`, `decimal`, `statistics`, `itertools`,
`operator`, `copy`, `enum`, `abc`, `numbers`, `fractions`

## Blocked Author Imports

### Security model

The sandbox uses **defense in depth** — no single layer is relied on alone:

1. **AST static check (best-effort):** Upload and local validation reject
  direct `import os`, `__import__()`, `eval()`, `exec()`, `__builtins__`
   access, and similar patterns. This catches accidental misuse and obvious
   violations, but **cannot prevent all dynamic import bypasses** due to
   Python's runtime flexibility.
2. **Container image (hard boundary for the public contract):** Only
  pre-installed packages are available. Some blocked libraries may exist as
   internal dependencies of managed SDKs (for example `getagent.trade` is backed
   by `trade-sdk`, and `getagent.llm` is backed by `getall` + `litellm`, which
   use `httpx` internally), but Playbook source code is still rejected if it
   imports those libraries directly.
3. **Managed capability access (hard boundary):** Strategy code must fetch data
  through `getagent.data` and place trades through `getagent.trade`. Direct HTTP
   clients remain blocked even if the managed SDK talks to upstream services on
   the strategy's behalf.
4. **Container isolation (hard boundary):** The sandbox runs in an isolated
  Docker container with resource limits. Process execution, file access,
   and environment variable reads are confined to the container.

**Standard library modules** like `os`, `subprocess`, and `importlib` are
present in the Python runtime and cannot be removed. The AST check blocks
direct imports, but determined bypass attempts using `getattr`/`globals()`
are theoretically possible. These modules are considered **low risk** because
network egress is blocked and the container is isolated.

### Blocked categories

**Network:** `requests`, `httpx`, `trade_sdk`, `urllib`, `aiohttp`, `socket`, `http`, `ftplib`, `smtplib`

**System:** `subprocess`, `os`, `shutil`, `importlib`, `ctypes`, `multiprocessing`

**Database:** `sqlalchemy`, `redis`, `pymongo`

**Frameworks:** `fastapi`, `flask`, `django`

**Messaging:** `telegram`, `slack_sdk`, `discord`

## Network Restrictions


| Allowed                                                                             | Blocked                                                                            |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Managed SDK data access via `getagent.data`                                          | PyPI (`pypi.org`, `files.pythonhosted.org`)                                        |
| Trade-proxy requests via `getagent.trade` when runner context is injected            | Direct `requests` / `httpx` / `urllib` calls from Playbook code                    |
| Managed LLM calls via `getagent.llm` when `runtime_profile: llm_bounded` is injected |                                                                                    |
|                                                                                     | All private networks, localhost, and arbitrary public addresses from Playbook code |


**All data fetching must go through `getagent.data`, all trade-proxy access must go through `getagent.trade`, and bounded model calls must go through `getagent.llm`.** Do not make direct HTTP requests.

## Output Conventions


| Output Type     | Mechanism                                                               | Available |
| --------------- | ----------------------------------------------------------------------- | --------- |
| Trading signals | `runtime.emit_signal()` → stdout JSON + `/workspace/output/signal.json` | Yes       |
| Backtest charts | `backtest.generate_chart()` → `/workspace/output/*.png` (matplotlib)    | Yes       |
| Debug output    | `print()` → stdout (Runner collects first 5000 chars)                   | Yes       |
| Errors          | `print(..., file=sys.stderr)` → stderr                                  | Yes       |


The Runner collects all `.png`, `.json`, `.csv` files from `/workspace/output/`
as artifacts after execution completes.

## Environment Variables

These variables are injected by the Runner **inside the sandbox at execution time**. They are not the same as the shell variables the operator sets to call the HTTP control plane (see `references/api/upload.md`). In particular, `GETAGENT_PRINCIPAL_ID` is server-side execution context only and is **not** an HTTP auth credential — prod OpenAPI client calls must use `ACCESS-KEY`, never `X-Principal-Id`.

| Variable                       | Description                                                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `GETAGENT_WORKSPACE`            | Working directory path (default `/workspace`)                                                                                        |
| `GETAGENT_RUN_ID`               | Unique run identifier                                                                                                                |
| `GETAGENT_PLAYBOOK_ID`          | Playbook ID                                                                                                                          |
| `GETAGENT_PRINCIPAL_ID`         | Execution principal for the current run (sandbox-injected; **not** for HTTP client auth)                                              |
| `GETAGENT_CHAT_ID`              | Delivery target for manual or scheduled results                                                                                      |
| `GETAGENT_DATA_BASE_URL`        | Preferred data API base URL for `getagent.data`                                                                                       |
| `OPENBB_BASE_URL`              | Legacy compatibility alias for `getagent.data`                                                                                        |
| `GETAGENT_TRADE_BG_UID`         | Trade-proxy subaccount identifier used by `getagent.trade`                                                                            |
| `GETAGENT_TRADE_PROXY_BASE_URL` | Trade-proxy base URL injected by the runner                                                                                          |
| `GETAGENT_TRADE_CHANNEL`        | Trade-proxy channel label injected by the runner                                                                                     |
| `GETAGENT_RUNTIME_PROFILE`      | Runner-selected runtime profile for the current execution                                                                            |
| `GETAGENT_LLM_`*                | Internal bounded LLM config injected only for `runtime_profile: llm_bounded`; prefer `getagent.llm` instead of reading these directly |
