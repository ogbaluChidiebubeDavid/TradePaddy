# Publish Playbook

Publish a draft Playbook to make it publicly available. Publishing is the only
step that assigns the formal public version number.

## `POST /api/v1/playbook/publish`

**Auth**: `ACCESS-KEY` header from the Bitget OpenAPI credential. Missing it returns 401.

**Content-Type**: `application/json`

### Request

```json
{
  "draft_id": "draft-...",
  "bump_type": "patch"
}
```

`bump_type` is optional and defaults to `patch`. Valid values are `patch`,
`minor`, and `major`. The server computes the final semver from the strategy's
latest published version; clients must not edit `manifest.version` manually.

### Success Response

```json
{
  "strategy_id": "strategy-...",
  "version_id": "version-...",
  "version": "1.0.1",
  "status": "published",
  "published_at": "2026-04-09T12:00:00+00:00"
}
```

### Permissions

Only the Playbook owner can publish. Others receive 403.

### Publish Contract

Publishing freezes the draft artifact into an immutable version and records its
parent version within the same strategy tree. A published Playbook should carry a
stable public contract for:

- `decision_mode`
- `backtest_support`
- `runtime_profile`
- `execution_mode`
- `follow_trade_supported`

### Evidence Requirements

- If `backtest_support = full`
  - the current runtime must be able to execute it (`runtime_profile = deterministic`)
  - the owner must first produce one successful historical evaluation run
  - that run must include a real equity/NAV curve, not only aggregate metrics
  - the curve must cover the declared replay contract: at least one point per
    `backtest.yaml` bar interval across `execution.start` / `execution.end`, or
    at least `lookback_bars` points when the playbook uses a lookback-only replay
  - the Playbook should expose one official public backtest snapshot
  - list / detail surfaces should use that snapshot, not an arbitrary recent run
- If `backtest_support = none`
  - `runtime_profile = deterministic` and `runtime_profile = llm_bounded` are both publishable
  - `runtime_profile = llm_bounded` additionally requires deployment-side managed LLM runtime to be enabled
  - do not publish fake Sharpe / win rate / total return claims
  - use paper or live evidence instead

Publishing a live-only Playbook is allowed. Publishing misleading historical
performance is not.

### Error Responses

| Status | Description |
|--------|-------------|
| 401 | Missing `ACCESS-KEY` header |
| 403 | Not the Playbook owner, access key revoked, or principal not found / inactive |
| 404 | draft_id not found |
| 409 | Status is not draft; no successful historical evaluation exists for `backtest_support=full`; or runtime profile is not currently publishable |
