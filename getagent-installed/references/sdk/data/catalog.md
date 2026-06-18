# Data Reference Catalog

This catalog is the self-contained runtime reference for `getagent.data`.
All links in this directory stay inside the packaged runtime skill so an
agent can inspect DataSDK endpoint contracts without depending on the
Playbook creator source tree.

## Read order

1. Start with [`playbook-supported.md`](playbook-supported.md) for the full
   Playbook-callable `getagent.data` surface.
2. Use the domain files below for exact signatures, defaults, enums,
   and parameter details.

## Domain index

| Domain | File | Endpoints |
|---|---|---:|
| `Coverage` | [coverage.md](coverage.md) | 3 |
| `arxiv` | [arxiv.md](arxiv.md) | 1 |
| `commodity` | [commodity.md](commodity.md) | 7 |
| `crypto` | [crypto.md](crypto.md) | 97 |
| `currency` | [currency.md](currency.md) | 4 |
| `derivatives` | [derivatives.md](derivatives.md) | 8 |
| `economy` | [economy.md](economy.md) | 42 |
| `equity` | [equity.md](equity.md) | 68 |
| `etf` | [etf.md](etf.md) | 12 |
| `famafrench` | [famafrench.md](famafrench.md) | 6 |
| `fixedincome` | [fixedincome.md](fixedincome.md) | 25 |
| `imf_utils` | [imf_utils.md](imf_utils.md) | 8 |
| `index` | [index.md](index.md) | 7 |
| `news` | [news.md](news.md) | 3 |
| `regulators` | [regulators.md](regulators.md) | 10 |
| `sentiment` | [sentiment.md](sentiment.md) | 11 |
| `uscongress` | [uscongress.md](uscongress.md) | 4 |
| `web_search` | [web_search.md](web_search.md) | 2 |
| `wikipedia` | [wikipedia.md](wikipedia.md) | 3 |

## Notes

- Status rows are generated from the same availability registry used by
  the SDK tests and runtime metadata.
- Playbook sandboxes are expected to support the complete generated
  `getagent.data` namespace. Do not treat data endpoints as having a
  separate sandbox allowlist.
- For backtests, verify the endpoint returns the fields and time axis your
  strategy needs before declaring those fields in `backtest.yaml`.
- Time ranges use millisecond Unix-epoch `start_time` / `end_time` and the
  canonical datetime column is `time`. The SDK still accepts the legacy
  `start_date` / `end_date` parameters (and exposes a derived `date` field)
  with a `DeprecationWarning` until upstream removes the legacy surface.
  Call `data.to_dataframe(bars)` without `datetime_index` to let the SDK
  pick the canonical column.
