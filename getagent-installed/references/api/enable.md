# Enable / Disable Playbook

Subscribe or unsubscribe a user from a published Playbook.

Subscribing deploys a published Playbook version for one user. It does not
create a new strategy, a new public version, or a private package fork.

## `POST /api/v1/playbook/enable`

**Auth**: `ACCESS-KEY` header from the Bitget OpenAPI credential. Missing it returns 401.

```json
{
  "version_id": "version-...",
  "chat_id": "123456789",
  "channel": "telegram",
  "schedule_timezone": "Asia/Shanghai"
}
```

Enables the published version for the current user and stores the Telegram
`chat_id` used for signal delivery.

**Important:** `chat_id` is required for Telegram delivery.
`schedule_timezone` is optional. When omitted, the server uses the user's
profile timezone, then `manifest.schedule.tz`, then `Asia/Shanghai`.

### Success Response

```json
{
  "instance_id": "inst-...",
  "strategy_id": "strategy-...",
  "version_id": "version-...",
  "schedule_tz": "Asia/Shanghai",
  "status": "active"
}
```

### Subscription Semantics

Subscribing means:

- a `PlaybookInstance` points at the immutable published `version_id`
- per-user `config_overrides` are stored on the deployment instance
- a personal reminder named `playbook-instance:{instance_id}` drives execution
- the effective schedule timezone is stored on the instance
- future executions run with that subscriber's own trading context
- any trade-capable behavior still respects the Playbook's published guard mode
- published Playbooks with `runtime_profile: deterministic` can be enabled
- published Playbooks with `runtime_profile: llm_bounded` can also be enabled when the deployment has managed Playbook LLM runtime enabled

Subscription does **not** mean:

- enabling automatic follow trading without the user's explicit mode choice
- forcing a live-only strategy to pretend it has historical backtests
- granting users permission to edit the Playbook's core logic
- creating another Playbook strategy or version just because parameters changed

## `POST /api/v1/playbook/disable`

**Auth**: `ACCESS-KEY` header from the Bitget OpenAPI credential. Missing it returns 401.

```json
{
  "instance_id": "inst-..."
}
```

Disables one deployed subscription instance so the user stops receiving signals.
The server also disables that instance's personal reminder.

### Disable Response

```json
{
  "instance_id": "inst-...",
  "strategy_id": "strategy-...",
  "version_id": "version-...",
  "status": "disabled"
}
```

### Auto-trading Note

If a Playbook advertises automated trading support, the effective behavior still
depends on its published metadata:

- `execution_mode`
- `follow_trade_supported`

Recommended defaults:

- replayable strategies can opt into `follow_trade` when follow trading is supported
- live-only strategies should default to `signal_only`
