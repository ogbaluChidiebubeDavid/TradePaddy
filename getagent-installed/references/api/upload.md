# Upload Playbook

Upload a Playbook package draft to GetAgent Cloud.

> Before dispatching this call, follow the **Endpoint Confirmation Discipline** in `SKILL.md` — echo a one-line preflight (`upload draft {name} → GetAgent prod https://api.bitget.com with ACCESS-KEY=<masked>`) and obtain the user's Bitget OpenAPI `ACCESS-KEY` if not already collected this session.

## `POST /api/v1/playbook/upload`

**Auth**: `ACCESS-KEY` header from the Bitget OpenAPI credential. Missing it returns 401.

**Content-Type**: `multipart/form-data`

**Body**: `package` — tar.gz file, max 10MB

### Request Example

Substitute `<access_key>` with the value the user provided in chat. Use the fixed GetAgent prod OpenAPI endpoint; do not parameterize it through user-provided env vars.

```bash
cd my-strategy/
tar czf ../my-strategy.tar.gz .
curl -X POST \
  -H "ACCESS-KEY: <access_key>" \
  -F "package=@../my-strategy.tar.gz" \
  "https://api.bitget.com/api/v1/playbook/upload"
```

### Success Response

```json
{
  "strategy_id": "strategy-...",
  "draft_id": "draft-...",
  "name": "btc-ema-crossover",
  "status": "draft",
  "suggested_version": "1.0.1"
}
```

### Server-side Validation

The server runs these checks on upload (client-side validation is not trusted):

1. **Structure** — `manifest.yaml` and `src/main.py` must exist
2. **Allowed paths only** — upload may contain `manifest.yaml`, `src/**`, and optional `backtest.yaml`
3. **Manifest fields** — `name`, `display_name`, `description`, `market_type`, `trading_symbols`, `decision_mode`, `backtest_support`, `runtime_profile`, `execution_mode`, `follow_trade_supported` required
4. **Name format** — DNS label (lowercase + numbers + hyphens, 1-63 chars)
5. **Runtime contract consistency** — e.g. `runtime_profile: llm_bounded` requires `backtest_support: none`
6. **backtest.yaml shape** — only valid when `backtest_support: full`; basic type checks enforced
7. **Syntax** — Python files under `src/**` must compile
8. **Import allowlist** — Only `getagent`, `pandas`, `numpy`, `json`, `math`, `datetime`, `pathlib`, `asyncio`, etc. Imports like `requests`, `subprocess`, `os` are blocked.
9. **Version assignment** — upload never consumes a public version. The server returns a `draft_id`; the formal version is assigned later by `publish`.
10. **Local-only paths rejected** — `tests/`, `research/`, `data/`, `output/`, caches and virtualenv folders must not be included

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Missing `ACCESS-KEY` header |
| 403 | Access key has been revoked, or principal not found / inactive |
| 409 | Current state does not allow the upload operation |
| 413 | File exceeds 10MB |
| 422 | Validation failed — `detail.errors` contains specific error list |

#### 422 Example

```json
{
  "detail": {
    "errors": [
      "manifest.yaml: missing 'display_name'",
      "src/main.py: blocked import 'requests' (line 3)"
    ]
  }
}
```
