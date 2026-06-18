# Trade Market Reference

Market capability checks before order placement.

These signatures are written against the `getagent.trade` public contract.
Runner-managed identity kwargs (`user_id`, `channel`, `trace_id`) are
intentionally omitted from the author-facing signatures below.

## Contents
- [`trade.market.check_symbol_support`](#trademarketcheck-symbol-support)

## Method reference

### `trade.market.check_symbol_support`

```python
trade.market.check_symbol_support(symbols)
```

Summary: Check which trading pairs are tradable for the current subaccount.

| Param | Required | Type | Default |
|---|---|---|---|
| `symbols` | `yes` | `list[str] | tuple[str, ...]` | - |

Returns: `CheckSymbolSupportResult`

---
