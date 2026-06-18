# Playbook API Index

This folder documents the HTTP control plane for Playbook packaging,
publication, execution, and subscription management.

Prod OpenAPI base URL: `https://api.bitget.com`.
Authenticated calls use the `ACCESS-KEY` header.

Use these docs after the local package is ready. For Python imports inside
`src/**`, read [`../sdk.md`](../sdk.md) instead.

## Read order

1. [`upload.md`](upload.md) — upload a packaged Playbook archive
2. [`publish.md`](publish.md) — publish a validated Playbook
3. [`run.md`](run.md) — trigger a manual backtest/evaluation run
4. [`list.md`](list.md) and `detail` response docs — inspect public Playbooks
5. [`enable.md`](enable.md) and [`my-playbooks.md`](my-playbooks.md) — manage
   subscriptions
6. [`error-responses.md`](error-responses.md) — common failure modes

## Control-plane docs

| Document | Purpose |
|---|---|
| [`upload.md`](upload.md) | Request format, package validation, and server-side checks |
| [`publish.md`](publish.md) | Publish contract, evidence requirements, and 409 cases |
| [`run.md`](run.md) | Manual run contract and runtime gating |
| [`list.md`](list.md) | Public list surface |
| [`enable.md`](enable.md) | Enable/disable subscription execution |
| [`my-playbooks.md`](my-playbooks.md) | User subscription status |
| [`error-responses.md`](error-responses.md) | Shared error shapes and examples |

## Boundary

- `api/` is for HTTP requests to GetAgent cloud services
- `sdk/` is for Python code running inside the Playbook sandbox
- Do not confuse `data.crypto.futures.kline(...)` with `/api/v1/playbook/...`
