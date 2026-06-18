# Crypto Data Reference

Use this file when an agent needs detailed signatures and parameter
rules for one DataSDK domain. All generated `getagent.data` endpoints
are callable through the DataSDK wrapper.

## Contents
- [`crypto.asset_platforms`](#cryptoasset-platforms)
- [`crypto.categories`](#cryptocategories)
- [`crypto.coin_history`](#cryptocoin-history)
- [`crypto.coin_info`](#cryptocoin-info)
- [`crypto.coin_tickers`](#cryptocoin-tickers)
- [`crypto.defi.fees.historical`](#cryptodefifeeshistorical)
- [`crypto.defi.fees.overview`](#cryptodefifeesoverview)
- [`crypto.defi.fees.protocol_fees`](#cryptodefifeesprotocol-fees)
- [`crypto.defi.tvl.chains`](#cryptodefitvlchains)
- [`crypto.defi.tvl.historical`](#cryptodefitvlhistorical)
- [`crypto.defi.tvl.protocol_history`](#cryptodefitvlprotocol-history)
- [`crypto.defi.tvl.protocols`](#cryptodefitvlprotocols)
- [`crypto.defi.volumes.chain_volume`](#cryptodefivolumeschain-volume)
- [`crypto.defi.volumes.dex_overview`](#cryptodefivolumesdex-overview)
- [`crypto.defi.volumes.protocol_volume`](#cryptodefivolumesprotocol-volume)
- [`crypto.derivatives_tickers`](#cryptoderivatives-tickers)
- [`crypto.dex.boosted_tokens`](#cryptodexboosted-tokens)
- [`crypto.dex.latest_pairs`](#cryptodexlatest-pairs)
- [`crypto.dex.pair_details`](#cryptodexpair-details)
- [`crypto.dex.search`](#cryptodexsearch)
- [`crypto.dex.token_orders`](#cryptodextoken-orders)
- [`crypto.dex.token_pairs`](#cryptodextoken-pairs)
- [`crypto.dex.token_profiles`](#cryptodextoken-profiles)
- [`crypto.etf.flows`](#cryptoetfflows)
- [`crypto.etf.holdings`](#cryptoetfholdings)
- [`crypto.exchange_info`](#cryptoexchange-info)
- [`crypto.exchange_rates`](#cryptoexchange-rates)
- [`crypto.exchange_tickers`](#cryptoexchange-tickers)
- [`crypto.exchange_volume_chart`](#cryptoexchange-volume-chart)
- [`crypto.exchanges`](#cryptoexchanges)
- [`crypto.futures.funding_rate`](#cryptofuturesfunding-rate)
- [`crypto.futures.funding_weighted`](#cryptofuturesfunding-weighted)
- [`crypto.futures.kline`](#cryptofutureskline)
- [`crypto.futures.liquidation_aggregated_map`](#cryptofuturesliquidation-aggregated-map)
- [`crypto.futures.liquidation_heatmap`](#cryptofuturesliquidation-heatmap)
- [`crypto.futures.liquidation_max_pain`](#cryptofuturesliquidation-max-pain)
- [`crypto.futures.liquidations`](#cryptofuturesliquidations)
- [`crypto.futures.long_short_ratio`](#cryptofutureslong-short-ratio)
- [`crypto.futures.long_short_top_account_ratio`](#cryptofutureslong-short-top-account-ratio)
- [`crypto.futures.long_short_top_position_ratio`](#cryptofutureslong-short-top-position-ratio)
- [`crypto.futures.mark_price`](#cryptofuturesmark-price)
- [`crypto.futures.open_interest`](#cryptofuturesopen-interest)
- [`crypto.futures.open_interest_history`](#cryptofuturesopen-interest-history)
- [`crypto.futures.order_book`](#cryptofuturesorder-book)
- [`crypto.futures.taker_volume`](#cryptofuturestaker-volume)
- [`crypto.futures.ticker`](#cryptofuturesticker)
- [`crypto.futures.trades`](#cryptofuturestrades)
- [`crypto.global_defi`](#cryptoglobal-defi)
- [`crypto.global_market`](#cryptoglobal-market)
- [`crypto.hyperliquid.account_long_short_ratio`](#cryptohyperliquidaccount-long-short-ratio)
- [`crypto.hyperliquid.account_long_short_ratio_by_tag`](#cryptohyperliquidaccount-long-short-ratio-by-tag)
- [`crypto.hyperliquid.position_distribution_by_tag`](#cryptohyperliquidposition-distribution-by-tag)
- [`crypto.hyperliquid.symbol_position`](#cryptohyperliquidsymbol-position)
- [`crypto.hyperliquid.user_position`](#cryptohyperliquiduser-position)
- [`crypto.hyperliquid.wallet_pnl_distribution`](#cryptohyperliquidwallet-pnl-distribution)
- [`crypto.hyperliquid.wallet_position_distribution`](#cryptohyperliquidwallet-position-distribution)
- [`crypto.hyperliquid.whale_alert`](#cryptohyperliquidwhale-alert)
- [`crypto.hyperliquid.whale_position`](#cryptohyperliquidwhale-position)
- [`crypto.market`](#cryptomarket)
- [`crypto.market.markets_list`](#cryptomarketmarkets-list)
- [`crypto.market_dominance`](#cryptomarket-dominance)
- [`crypto.nft_info`](#cryptonft-info)
- [`crypto.nft_list`](#cryptonft-list)
- [`crypto.onchain.active_addresses`](#cryptoonchainactive-addresses)
- [`crypto.onchain.dexes`](#cryptoonchaindexes)
- [`crypto.onchain.exchange_flows`](#cryptoonchainexchange-flows)
- [`crypto.onchain.fund_flow`](#cryptoonchainfund-flow)
- [`crypto.onchain.holder_statics`](#cryptoonchainholder-statics)
- [`crypto.onchain.hyperliquid_liquidation_map`](#cryptoonchainhyperliquid-liquidation-map)
- [`crypto.onchain.liquidity`](#cryptoonchainliquidity)
- [`crypto.onchain.networks`](#cryptoonchainnetworks)
- [`crypto.onchain.pool_detail`](#cryptoonchainpool-detail)
- [`crypto.onchain.pool_ohlcv`](#cryptoonchainpool-ohlcv)
- [`crypto.onchain.pool_trades`](#cryptoonchainpool-trades)
- [`crypto.onchain.pools`](#cryptoonchainpools)
- [`crypto.onchain.search_pools`](#cryptoonchainsearch-pools)
- [`crypto.onchain.token_data`](#cryptoonchaintoken-data)
- [`crypto.onchain.token_info`](#cryptoonchaintoken-info)
- [`crypto.onchain.token_price`](#cryptoonchaintoken-price)
- [`crypto.onchain.token_unlock_event`](#cryptoonchaintoken-unlock-event)
- [`crypto.onchain.trading_signal`](#cryptoonchaintrading-signal)
- [`crypto.onchain.whale_transactions`](#cryptoonchainwhale-transactions)
- [`crypto.options.open_interest`](#cryptooptionsopen-interest)
- [`crypto.options.volume`](#cryptooptionsvolume)
- [`crypto.search`](#cryptosearch)
- [`crypto.sentiment.crypto_fear_greed`](#cryptosentimentcrypto-fear-greed)
- [`crypto.spot.exchange_volume`](#cryptospotexchange-volume)
- [`crypto.spot.kline`](#cryptospotkline)
- [`crypto.spot.order_book`](#cryptospotorder-book)
- [`crypto.spot.price_spread`](#cryptospotprice-spread)
- [`crypto.spot.taker_volume`](#cryptospottaker-volume)
- [`crypto.spot.ticker`](#cryptospotticker)
- [`crypto.spot.trades`](#cryptospottrades)
- [`crypto.supported_currencies`](#cryptosupported-currencies)
- [`crypto.token_price`](#cryptotoken-price)
- [`crypto.treasury`](#cryptotreasury)
- [`crypto.trending`](#cryptotrending)

## Endpoint reference

### `crypto.asset_platforms`

```python
data.crypto.asset_platforms()
```

Summary: Asset Platforms

| Field | Value |
|---|---|
| Endpoint ID | `crypto.asset_platforms` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/asset_platforms` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.categories`

```python
data.crypto.categories()
```

Summary: Categories

| Field | Value |
|---|---|
| Endpoint ID | `crypto.categories` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/categories` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.coin_history`

```python
data.crypto.coin_history(symbol=..., date=...)
```

Summary: Coin History

| Field | Value |
|---|---|
| Endpoint ID | `crypto.coin_history` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/coin_history` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Cryptocurrency ticker symbol (e.g. 'BTC'). |
| `date` | `yes` | `string` | `-` | Snapshot date in dd-mm-yyyy format (e.g. '30-12-2022'). |

---

### `crypto.coin_info`

```python
data.crypto.coin_info(symbol=...)
```

Summary: Coin Info

| Field | Value |
|---|---|
| Endpoint ID | `crypto.coin_info` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/coin_info` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |

---

### `crypto.coin_tickers`

```python
data.crypto.coin_tickers(symbol=...)
```

Summary: Coin Tickers

| Field | Value |
|---|---|
| Endpoint ID | `crypto.coin_tickers` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/coin_tickers` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |

---

### `crypto.defi.fees.historical`

```python
data.crypto.defi.fees.historical()
```

Summary: Historical

| Field | Value |
|---|---|
| Endpoint ID | `crypto.defi.fees.historical` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/defi/fees/historical` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.defi.fees.overview`

```python
data.crypto.defi.fees.overview()
```

Summary: Overview

| Field | Value |
|---|---|
| Endpoint ID | `crypto.defi.fees.overview` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/defi/fees/overview` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.defi.fees.protocol_fees`

```python
data.crypto.defi.fees.protocol_fees(protocol=...)
```

Summary: Protocol Fees

| Field | Value |
|---|---|
| Endpoint ID | `crypto.defi.fees.protocol_fees` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/defi/fees/protocol_fees` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `protocol` | `yes` | `string` | `-` | Protocol slug identifier. |

---

### `crypto.defi.tvl.chains`

```python
data.crypto.defi.tvl.chains(chain=None)
```

Summary: Chains

| Field | Value |
|---|---|
| Endpoint ID | `crypto.defi.tvl.chains` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/defi/tvl/chains` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `chain` | `no` | `string | null` | `-` | Specific blockchain network. |

---

### `crypto.defi.tvl.historical`

```python
data.crypto.defi.tvl.historical()
```

Summary: Historical

| Field | Value |
|---|---|
| Endpoint ID | `crypto.defi.tvl.historical` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/defi/tvl/historical` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.defi.tvl.protocol_history`

```python
data.crypto.defi.tvl.protocol_history(protocol=...)
```

Summary: Protocol History

| Field | Value |
|---|---|
| Endpoint ID | `crypto.defi.tvl.protocol_history` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/defi/tvl/protocol_history` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `protocol` | `yes` | `string` | `-` | Protocol slug identifier. |

---

### `crypto.defi.tvl.protocols`

```python
data.crypto.defi.tvl.protocols()
```

Summary: Protocols

| Field | Value |
|---|---|
| Endpoint ID | `crypto.defi.tvl.protocols` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/defi/tvl/protocols` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.defi.volumes.chain_volume`

```python
data.crypto.defi.volumes.chain_volume(chain=...)
```

Summary: Chain Volume

| Field | Value |
|---|---|
| Endpoint ID | `crypto.defi.volumes.chain_volume` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/defi/volumes/chain_volume` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `chain` | `yes` | `string` | `-` | Blockchain network identifier. |

---

### `crypto.defi.volumes.dex_overview`

```python
data.crypto.defi.volumes.dex_overview(exclude_total_data_chart=True, exclude_total_data_chart_breakdown=True, data_type='dailyVolume')
```

Summary: Dex Overview

| Field | Value |
|---|---|
| Endpoint ID | `crypto.defi.volumes.dex_overview` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/defi/volumes/dex_overview` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `exclude_total_data_chart` | `no` | `boolean | null` | `true` | Exclude total data chart arrays. |
| `exclude_total_data_chart_breakdown` | `no` | `boolean | null` | `true` | Exclude total data chart breakdown arrays. |
| `data_type` | `no` | `string | null` | `dailyVolume` | Data type (dailyVolume, totalVolume). |

---

### `crypto.defi.volumes.protocol_volume`

```python
data.crypto.defi.volumes.protocol_volume(protocol=...)
```

Summary: Protocol Volume

| Field | Value |
|---|---|
| Endpoint ID | `crypto.defi.volumes.protocol_volume` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/defi/volumes/protocol_volume` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `protocol` | `yes` | `string` | `-` | Protocol slug identifier. |

---

### `crypto.derivatives_tickers`

```python
data.crypto.derivatives_tickers()
```

Summary: Derivatives Tickers

| Field | Value |
|---|---|
| Endpoint ID | `crypto.derivatives_tickers` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/derivatives_tickers` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.dex.boosted_tokens`

```python
data.crypto.dex.boosted_tokens()
```

Summary: Boosted Tokens

| Field | Value |
|---|---|
| Endpoint ID | `crypto.dex.boosted_tokens` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/dex/boosted_tokens` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.dex.latest_pairs`

```python
data.crypto.dex.latest_pairs(query=...)
```

Summary: Latest Pairs

| Field | Value |
|---|---|
| Endpoint ID | `crypto.dex.latest_pairs` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/dex/latest_pairs` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `yes` | `string` | `-` | Search query (token name, symbol, or address). |

---

### `crypto.dex.pair_details`

```python
data.crypto.dex.pair_details(chain_id=..., pair_addresses=...)
```

Summary: Pair Details

| Field | Value |
|---|---|
| Endpoint ID | `crypto.dex.pair_details` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/dex/pair_details` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `chain_id` | `yes` | `string` | `-` | Blockchain network identifier (e.g., ethereum, bsc, polygon). |
| `pair_addresses` | `yes` | `string` | `-` | Comma-separated pair addresses (max 30). Multiple comma separated items allowed |

---

### `crypto.dex.search`

```python
data.crypto.dex.search(query=...)
```

Summary: Search

| Field | Value |
|---|---|
| Endpoint ID | `crypto.dex.search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/dex/search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `yes` | `string` | `-` | Search query (token name, symbol, or address). |

---

### `crypto.dex.token_orders`

```python
data.crypto.dex.token_orders(chain_id=..., token_address=...)
```

Summary: Token Orders

| Field | Value |
|---|---|
| Endpoint ID | `crypto.dex.token_orders` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/dex/token_orders` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `chain_id` | `yes` | `string` | `-` | Blockchain network identifier (e.g., ethereum, bsc, polygon). |
| `token_address` | `yes` | `string` | `-` | Token contract address. |

---

### `crypto.dex.token_pairs`

```python
data.crypto.dex.token_pairs(token_addresses=...)
```

Summary: Token Pairs

| Field | Value |
|---|---|
| Endpoint ID | `crypto.dex.token_pairs` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/dex/token_pairs` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `token_addresses` | `yes` | `string` | `-` | Comma-separated token addresses (max 30). Multiple comma separated items allowed |

---

### `crypto.dex.token_profiles`

```python
data.crypto.dex.token_profiles()
```

Summary: Token Profiles

| Field | Value |
|---|---|
| Endpoint ID | `crypto.dex.token_profiles` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/dex/token_profiles` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.etf.flows`

```python
data.crypto.etf.flows(symbol=..., interval='1d', etf_name=None)
```

Summary: Flows

| Field | Value |
|---|---|
| Endpoint ID | `crypto.etf.flows` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/etf/flows` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Currently supports BTC and ETH. |
| `interval` | `no` | `string | null` | `1d` | Time interval for the data. Default is '1d'. |
| `etf_name` | `no` | `string | null` | `-` | Specific ETF name to query. If not provided, returns aggregated data. |

---

### `crypto.etf.holdings`

```python
data.crypto.etf.holdings(symbol=..., etf_name=None)
```

Summary: Holdings

| Field | Value |
|---|---|
| Endpoint ID | `crypto.etf.holdings` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/etf/holdings` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Currently supports BTC and ETH. |
| `etf_name` | `no` | `string | null` | `-` | Specific ETF name to query. If not provided, returns all ETFs. |

---

### `crypto.exchange_info`

```python
data.crypto.exchange_info(exchange_id=...)
```

Summary: Exchange Info

| Field | Value |
|---|---|
| Endpoint ID | `crypto.exchange_info` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/exchange_info` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `exchange_id` | `yes` | `string` | `-` | CoinGecko exchange ID e.g. 'binance'. |

---

### `crypto.exchange_rates`

```python
data.crypto.exchange_rates()
```

Summary: Exchange Rates

| Field | Value |
|---|---|
| Endpoint ID | `crypto.exchange_rates` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/exchange_rates` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.exchange_tickers`

```python
data.crypto.exchange_tickers(exchange_id=..., page=None)
```

Summary: Exchange Tickers

| Field | Value |
|---|---|
| Endpoint ID | `crypto.exchange_tickers` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/exchange_tickers` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `exchange_id` | `yes` | `string` | `-` | CoinGecko exchange ID e.g. 'binance'. |
| `page` | `no` | `integer | null` | `-` | Page number for paginated results. |

---

### `crypto.exchange_volume_chart`

```python
data.crypto.exchange_volume_chart(exchange_id=..., days=1)
```

Summary: Exchange Volume Chart

| Field | Value |
|---|---|
| Endpoint ID | `crypto.exchange_volume_chart` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/exchange_volume_chart` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `exchange_id` | `yes` | `string` | `-` | CoinGecko exchange ID e.g. 'binance'. |
| `days` | `no` | `integer` | `1` | Data up to N days ago. Values: 1/7/14/30/60/90/180/365. |

---

### `crypto.exchanges`

```python
data.crypto.exchanges(per_page=100, page=1)
```

Summary: Exchanges

| Field | Value |
|---|---|
| Endpoint ID | `crypto.exchanges` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/exchanges` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `per_page` | `no` | `integer` | `100` | Number of results per page. Default 100, max 250. |
| `page` | `no` | `integer` | `1` | Page number. Default 1. |

---

### `crypto.futures.funding_rate`

```python
data.crypto.futures.funding_rate(symbol=..., exchange='binance', start_time=None, end_time=None, interval='4h', limit=200)
```

Summary: Funding Rate

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.funding_rate` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/funding_rate` |
| SDK | `supported` |
| Host | `supported` |
| Notes | Backs data.funding_rate.fetch() today. |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `exchange` | `no` | `string | null` | `binance` | Filter by specific exchange. If None, returns data from all exchanges.; Exchange identifier (e.g. 'binance', 'okx', 'gate').; Exchange to fetch data from. Supported: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid.; Futures exchange name (e.g. Binance, OKX, Bybit). |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `interval` | `no` | `string` | `4h` | Aggregation interval for funding-rate data.; Time interval for data aggregation. |
| `limit` | `no` | `integer | null` | `200` | Maximum number of records to return. |

#### Verified Playbook usage notes

- Coinglass funding endpoints expect base-asset symbols such as `BTC`, not pair symbols such as `BTCUSDT`.
- Do not build rolling funding z-scores from this endpoint unless a data probe confirms enough historical rows for the target symbol.

---

### `crypto.futures.funding_weighted`

```python
data.crypto.futures.funding_weighted(symbol=..., interval='4h', start_time=None, end_time=None, weight_type='volume', limit=100)
```

Summary: Funding Weighted

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.funding_weighted` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/funding_weighted` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `interval` | `no` | `string | null` | `4h` | Time interval for the data. Default is '4h' (typical funding rate interval). |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `weight_type` | `no` | `string` | `volume` | Weighting method: 'oi' for open interest weighting, 'volume' for volume weighting. |
| `limit` | `no` | `integer` | `100` | Number of records to return. |

#### Verified Playbook usage notes

- Coinglass expects base-asset symbols such as `BTC`, not pair symbols such as `BTCUSDT`.
- `weight_type` defaults to `"volume"` in the upstream API. Pass it explicitly when the strategy depends on a particular weighting method.
- Probe the requested `interval`, `weight_type`, and `limit` before using this as a replay feature; do not assume it has enough history for rolling z-scores.

---

### `crypto.futures.kline`

```python
data.crypto.futures.kline(symbol=..., start_time=None, end_time=None, interval='1d', exchange='binance', limit=200, vs_currency='usd', data_type='ohlc', days=30, exchanges=None)
```

Summary: Kline

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.kline` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/kline` |
| SDK | `supported` |
| Host | `supported` |
| Notes | Backs contract OHLCV fetches today. |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `interval` | `no` | `string` | `1d` | Candlestick interval.; Data interval. Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 1w.; Time interval of the data to return. |
| `exchange` | `no` | `string` | `binance` | Exchange identifier (e.g. 'binance', 'okx', 'gate').; Exchange to fetch data from. Supported: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid.; Exchange name (e.g., Binance, OKX). Use support-exchange-pair API to get supported exchanges. |
| `limit` | `no` | `integer | null` | `200` | Maximum number of candles to return.; Number of candles per API request. Maximum varies by exchange (typically 500–1500).; Number of data points to return. Default: 1000, Max: 1000. |
| `vs_currency` | `no` | `string` | `usd` | Target currency for prices. Default is 'usd'. |
| `data_type` | `no` | `string` | `ohlc` | enum: ohlc, market_chart Data type: 'ohlc' for OHLC candles, 'market_chart' for close-only price history. |
| `days` | `no` | `integer` | `30` | Number of days of historical data. Used when start_date/end_date are not set. |
| `exchanges` | `no` | `array | string | null` | `-` | accepts array values To limit the query to a subset of exchanges e.g. ['POLONIEX', 'GDAX'] Multiple comma separated items allowed. |

#### Verified Playbook usage notes

- Coinglass returns OHLCV fields and does not include Binance raw `quote_volume` / `taker_buy_quote_volume`; derive or omit those features unless a probe proves the fields exist.

---

### `crypto.futures.liquidation_aggregated_map`

```python
data.crypto.futures.liquidation_aggregated_map(symbol=..., range='1d')
```

Summary: Liquidation Aggregated Map

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.liquidation_aggregated_map` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/liquidation_aggregated_map` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `range` | `no` | `string` | `1d` | Time range for liquidation map data. Supported values: 1d, 7d, 30d.; Time range for liquidation map data. |

#### Verified Playbook usage notes

- Coinglass expects base-asset symbols such as `BTC`, not pair symbols such as `BTCUSDT`.
- `range` defaults to `"1d"`; probe the exact range before using the response shape in a strategy.
- Use this as context unless the probe confirms a stable time axis suitable for backtest replay.

---

### `crypto.futures.liquidation_heatmap`

```python
data.crypto.futures.liquidation_heatmap(symbol=..., price_range='5%')
```

Summary: Liquidation Heatmap

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.liquidation_heatmap` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/liquidation_heatmap` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `price_range` | `no` | `string | null` | `5%` | Price range for heatmap ('5%', '10%', '20%'). Default is '5%'. |

---

### `crypto.futures.liquidation_max_pain`

```python
data.crypto.futures.liquidation_max_pain(range='24h')
```

Summary: Liquidation Max Pain

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.liquidation_max_pain` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/liquidation_max_pain` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `range` | `no` | `string` | `24h` | Time range for liquidation data. Supported values: 12h, 24h, 48h, 3d, 7d, 14d, 30d.; Time range for liquidation data. |

#### Verified Playbook usage notes

- `range` defaults to `"24h"` and the endpoint is market-wide; it has no `symbol` parameter in the current OpenAPI spec.
- Use this as context unless the probe confirms the returned fields and time axis match the replay contract.

---

### `crypto.futures.liquidations`

```python
data.crypto.futures.liquidations(symbol=None, interval='1d', start_time=None, end_time=None, exchange=None, limit=200)
```

Summary: Liquidations

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.liquidations` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/liquidations` |
| SDK | `supported` |
| Host | `supported` |
| Notes | Planned future replacement for data.liquidations.fetch(). |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Crypto symbol. If None, returns total market liquidations. |
| `interval` | `no` | `string | null` | `1d` | Time interval for the data. Common values: 1h, 4h, 1d. |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `exchange` | `no` | `string | null` | `-` | Futures exchange name (e.g. binance, okx, bybit). |
| `limit` | `no` | `integer | null` | `200` | Maximum number of records to return (max 1000).; Number of records to return. |

#### Verified Playbook usage notes

- Use base-asset symbols for Coinglass, e.g. `symbol="BTC"`, not `symbol="BTCUSDT"`.
- Verified non-empty combinations: `symbol="BTC", interval="1h"` and `interval="1d"`.
- Returned fields include `long_liquidations`, `short_liquidations`, `total_liquidations`, `exchange`, `symbol`, and `date`.

---

### `crypto.futures.long_short_ratio`

```python
data.crypto.futures.long_short_ratio(symbol=..., start_time=None, end_time=None, period='1h', limit=30, exchange='binance', interval='5m')
```

Summary: Long Short Ratio

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.long_short_ratio` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/long_short_ratio` |
| SDK | `supported` |
| Host | `supported` |
| Notes | Planned future replacement for data.long_short_ratio.fetch(). |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Trading pair symbol (e.g., BTCUSDT) |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `period` | `no` | `string` | `1h` | Time period (5m, 15m, 30m, 1h, 2h, 4h, 6h, 12h, 1d) |
| `limit` | `no` | `integer | null` | `30` | Number of results (max 500); Maximum number of records to return. |
| `exchange` | `no` | `string` | `binance` | Exchange identifier (e.g. 'binance', 'okx', 'gate').; Futures exchange name (e.g. Binance, OKX, Bybit). |
| `interval` | `no` | `string` | `5m` | enum: 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d Data granularity interval. |

---

### `crypto.futures.long_short_top_account_ratio`

```python
data.crypto.futures.long_short_top_account_ratio(symbol=..., start_time=None, end_time=None, period='1h', limit=30, exchange='binance', interval='5m')
```

Summary: Long Short Top Account Ratio

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.long_short_top_account_ratio` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/long_short_top_account_ratio` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Trading pair symbol (e.g., BTCUSDT) |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `period` | `no` | `string` | `1h` | Time period (5m, 15m, 30m, 1h, 2h, 4h, 6h, 12h, 1d) |
| `limit` | `no` | `integer | null` | `30` | Number of results (max 500); Maximum number of records to return. |
| `exchange` | `no` | `string` | `binance` | Exchange identifier (e.g. 'binance', 'okx', 'gate').; Exchange to fetch data from. Supported: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid.; Futures exchange name (e.g. Binance, OKX, Bybit). |
| `interval` | `no` | `string` | `5m` | enum: 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d Data granularity interval. |

---

### `crypto.futures.long_short_top_position_ratio`

```python
data.crypto.futures.long_short_top_position_ratio(symbol=..., start_time=None, end_time=None, period='1h', limit=30, exchange='binance', interval='5m')
```

Summary: Long Short Top Position Ratio

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.long_short_top_position_ratio` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/long_short_top_position_ratio` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Trading pair symbol (e.g., BTCUSDT) |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `period` | `no` | `string` | `1h` | Time period (5m, 15m, 30m, 1h, 2h, 4h, 6h, 12h, 1d) |
| `limit` | `no` | `integer | null` | `30` | Number of results (max 500); Maximum number of records to return. |
| `exchange` | `no` | `string` | `binance` | Exchange identifier (e.g. 'binance', 'okx', 'gate').; Exchange to fetch data from. Supported: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid.; Futures exchange name (e.g. Binance, OKX, Bybit). |
| `interval` | `no` | `string` | `5m` | enum: 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d Data granularity interval. |

---

### `crypto.futures.mark_price`

```python
data.crypto.futures.mark_price(symbol=None, exchange='binance')
```

Summary: Mark Price

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.mark_price` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/mark_price` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Trading pair symbol (e.g., BTCUSDT). If not provided, returns all symbols. |
| `exchange` | `no` | `string` | `binance` | enum: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid Exchange to fetch data from. Supported: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid. |

---

### `crypto.futures.open_interest`

```python
data.crypto.futures.open_interest(symbol=..., start_time=None, end_time=None, interval='1h', limit=100, exchange='binance')
```

Summary: Open Interest

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.open_interest` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/open_interest` |
| SDK | `supported` |
| Host | `supported` |
| Notes | Intended future replacement for the current placeholder in getagent.data. |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `interval` | `no` | `string` | `1h` | enum: 5m, 15m, 30m, 1h, 2h, 4h, 12h, 1d Aggregation interval for open interest data. |
| `limit` | `no` | `integer` | `100` | Number of records to return. |
| `exchange` | `no` | `string` | `binance` | enum: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid Exchange to fetch data from. Supported: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid. |

---

### `crypto.futures.open_interest_history`

```python
data.crypto.futures.open_interest_history(symbol=..., period='1h', limit=30, start_time=None, end_time=None, interval='1h', exchange='binance', unit='coin')
```

Summary: Open Interest History

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.open_interest_history` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/open_interest_history` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Trading pair symbol (e.g., BTCUSDT) |
| `period` | `no` | `string` | `1h` | Time period (5m, 15m, 30m, 1h, 2h, 4h, 6h, 12h, 1d) |
| `limit` | `no` | `integer | null` | `30` | Number of results (max 500); Maximum number of records to return. |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `interval` | `no` | `string` | `1h` | Aggregation interval for open interest data. |
| `exchange` | `no` | `string` | `binance` | Exchange identifier (e.g. 'binance', 'okx', 'gate').; Exchange to fetch data from. Supported: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid.; Futures exchange name (e.g. Binance, OKX, Bybit). |
| `unit` | `no` | `string` | `coin` | enum: coin, usd Unit for OI values: 'coin' returns coin-denominated OI (open/high/low/close), 'usd' returns USDT-denominated OI (open_value/high_value/low_value/close_value).; Unit for the returned data: 'usd' or 'coin'. |

---

### `crypto.futures.order_book`

```python
data.crypto.futures.order_book(symbol=..., limit=20, exchange='binance')
```

Summary: Order Book

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.order_book` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/order_book` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `limit` | `no` | `integer` | `20` | Depth of the order book — number of bid and ask levels to return. |
| `exchange` | `no` | `string` | `binance` | Exchange to fetch data from. Supported: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid. |

---

### `crypto.futures.taker_volume`

```python
data.crypto.futures.taker_volume(symbol=..., period='1h', limit=30, start_time=None, end_time=None, exchange='Binance')
```

Summary: Taker Volume

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.taker_volume` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/taker_volume` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Trading pair symbol (e.g., BTCUSDT) |
| `period` | `no` | `string` | `1h` | Time period (5m, 15m, 30m, 1h, 2h, 4h, 6h, 12h, 1d) |
| `limit` | `no` | `integer | null` | `30` | Number of results (max 500) |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `exchange` | `no` | `string` | `Binance` | Exchange name (e.g. Binance, OKX, Bybit). Can be obtained from support-exchange-pair endpoint. |

#### Verified Playbook usage notes

- Returned fields include `timestamp`, `buy_vol`, `sell_vol`, and `buy_sell_ratio`.
- For replay feature frames, use `timestamp` as the feature datetime index unless a probe shows the service returned a normalized `date` column.

---

### `crypto.futures.ticker`

```python
data.crypto.futures.ticker(symbol=..., exchange='binance', vs_currency='usd', include_market_data=True)
```

Summary: Ticker

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.ticker` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/ticker` |
| SDK | `supported` |
| Host | `supported` |
| Notes | Backs contract price latest fetches today. |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `exchange` | `no` | `string` | `binance` | enum: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid Exchange to fetch data from. Supported: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid. |
| `vs_currency` | `no` | `string` | `usd` | Target currency for prices. Default is 'usd'. |
| `include_market_data` | `no` | `boolean` | `true` | Use /coins/markets for richer data (market cap, volume, 24h change). Set to False to use /simple/price for a faster, lighter response. |

---

### `crypto.futures.trades`

```python
data.crypto.futures.trades(symbol=..., limit=100, exchange='binance')
```

Summary: Trades

| Field | Value |
|---|---|
| Endpoint ID | `crypto.futures.trades` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/futures/trades` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `limit` | `no` | `integer` | `100` | Number of most recent trades to return. |
| `exchange` | `no` | `string` | `binance` | Exchange to fetch data from. Supported: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid. |

---

### `crypto.global_defi`

```python
data.crypto.global_defi()
```

Summary: Global Defi

| Field | Value |
|---|---|
| Endpoint ID | `crypto.global_defi` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/global_defi` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.global_market`

```python
data.crypto.global_market()
```

Summary: Global Market

| Field | Value |
|---|---|
| Endpoint ID | `crypto.global_market` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/global_market` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.hyperliquid.account_long_short_ratio`

```python
data.crypto.hyperliquid.account_long_short_ratio(symbol=None, interval='1d', limit=1000, start_time=None, end_time=None)
```

Summary: Account Long Short Ratio

| Field | Value |
|---|---|
| Endpoint ID | `crypto.hyperliquid.account_long_short_ratio` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/hyperliquid/account_long_short_ratio` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. |
| `interval` | `no` | `string` | `1d` | Data time interval. |
| `limit` | `no` | `integer` | `1000` | Number of records to return. |
| `start_time` | `no` | `integer | null` | `-` | Start timestamp in milliseconds. |
| `end_time` | `no` | `integer | null` | `-` | End timestamp in milliseconds. |

---

### `crypto.hyperliquid.account_long_short_ratio_by_tag`

```python
data.crypto.hyperliquid.account_long_short_ratio_by_tag(symbol=..., interval='10m', wallet_tag='Shrimp', limit=1000, start_time=None, end_time=None)
```

Summary: Account Long Short Ratio By Tag

| Field | Value |
|---|---|
| Endpoint ID | `crypto.hyperliquid.account_long_short_ratio_by_tag` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/hyperliquid/account_long_short_ratio_by_tag` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `interval` | `no` | `string` | `10m` | Data time interval. |
| `wallet_tag` | `no` | `string` | `Shrimp` | Wallet tag for grouping. |
| `limit` | `no` | `integer` | `1000` | Number of records to return. |
| `start_time` | `no` | `integer | null` | `-` | Start timestamp in milliseconds. Historical data starts from 2026-03-20 00:00:00 UTC. |
| `end_time` | `no` | `integer | null` | `-` | End timestamp in milliseconds. |

---

### `crypto.hyperliquid.position_distribution_by_tag`

```python
data.crypto.hyperliquid.position_distribution_by_tag(interval='10m', wallet_tag='Shrimp', limit=1000, start_time=None, end_time=None)
```

Summary: Position Distribution By Tag

| Field | Value |
|---|---|
| Endpoint ID | `crypto.hyperliquid.position_distribution_by_tag` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/hyperliquid/position_distribution_by_tag` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `interval` | `no` | `string` | `10m` | Data time interval. |
| `wallet_tag` | `no` | `string` | `Shrimp` | Wallet tag for grouping. |
| `limit` | `no` | `integer` | `1000` | Number of records to return. |
| `start_time` | `no` | `integer | null` | `-` | Start timestamp in milliseconds. Historical data starts from 2026-03-20 00:00:00 UTC. |
| `end_time` | `no` | `integer | null` | `-` | End timestamp in milliseconds. |

---

### `crypto.hyperliquid.symbol_position`

```python
data.crypto.hyperliquid.symbol_position(symbol=..., current_page=1)
```

Summary: Symbol Position

| Field | Value |
|---|---|
| Endpoint ID | `crypto.hyperliquid.symbol_position` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/hyperliquid/symbol_position` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `current_page` | `no` | `integer` | `1` | Current page number. |

---

### `crypto.hyperliquid.user_position`

```python
data.crypto.hyperliquid.user_position(user_address=...)
```

Summary: User Position

| Field | Value |
|---|---|
| Endpoint ID | `crypto.hyperliquid.user_position` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/hyperliquid/user_position` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `user_address` | `yes` | `string` | `-` | User wallet address. |

---

### `crypto.hyperliquid.wallet_pnl_distribution`

```python
data.crypto.hyperliquid.wallet_pnl_distribution()
```

Summary: Wallet Pnl Distribution

| Field | Value |
|---|---|
| Endpoint ID | `crypto.hyperliquid.wallet_pnl_distribution` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/hyperliquid/wallet_pnl_distribution` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.hyperliquid.wallet_position_distribution`

```python
data.crypto.hyperliquid.wallet_position_distribution()
```

Summary: Wallet Position Distribution

| Field | Value |
|---|---|
| Endpoint ID | `crypto.hyperliquid.wallet_position_distribution` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/hyperliquid/wallet_position_distribution` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.hyperliquid.whale_alert`

```python
data.crypto.hyperliquid.whale_alert()
```

Summary: Whale Alert

| Field | Value |
|---|---|
| Endpoint ID | `crypto.hyperliquid.whale_alert` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/hyperliquid/whale_alert` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.hyperliquid.whale_position`

```python
data.crypto.hyperliquid.whale_position()
```

Summary: Whale Position

| Field | Value |
|---|---|
| Endpoint ID | `crypto.hyperliquid.whale_position` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/hyperliquid/whale_position` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.market`

```python
data.crypto.market(market_type=None, exchange='binance')
```

Summary: Market

| Field | Value |
|---|---|
| Endpoint ID | `crypto.market` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/market` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `market_type` | `no` | `string | null` | `-` | Filter by market type. Returns all types when omitted. |
| `exchange` | `no` | `string` | `binance` | Exchange to fetch data from. Supported: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid. |

---

### `crypto.market.markets_list`

```python
data.crypto.market.markets_list(symbol=None, exchange=None, type=None, limit=100)
```

Summary: Markets List

| Field | Value |
|---|---|
| Endpoint ID | `crypto.market.markets_list` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/market/markets_list` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Trading pair symbol to query (e.g. 'BTC/USDT', 'ETH/USDT'). |
| `exchange` | `no` | `string | null` | `-` | Exchange identifier to query (e.g. 'binance', 'okx'). |
| `type` | `no` | `string | null` | `-` | Market type filter: 'spot', 'perpetual', or 'future'. |
| `limit` | `no` | `integer | null` | `100` | Maximum number of entries to return. |

---

### `crypto.market_dominance`

```python
data.crypto.market_dominance(symbol=None, interval='1d')
```

Summary: Market Dominance

| Field | Value |
|---|---|
| Endpoint ID | `crypto.market_dominance` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/market_dominance` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. If not provided, returns top cryptocurrencies. |
| `interval` | `no` | `string | null` | `1d` | Time interval for the data. Default is '1d'. |

---

### `crypto.nft_info`

```python
data.crypto.nft_info(nft_id=...)
```

Summary: Nft Info

| Field | Value |
|---|---|
| Endpoint ID | `crypto.nft_info` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/nft_info` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `nft_id` | `yes` | `string` | `-` | CoinGecko NFT ID e.g. 'pudgy-penguins'. |

---

### `crypto.nft_list`

```python
data.crypto.nft_list(per_page=None, page=None)
```

Summary: Nft List

| Field | Value |
|---|---|
| Endpoint ID | `crypto.nft_list` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/nft_list` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `per_page` | `no` | `integer | null` | `-` | Number of results per page. |
| `page` | `no` | `integer | null` | `-` | Page number for paginated results. |

---

### `crypto.onchain.active_addresses`

```python
data.crypto.onchain.active_addresses(symbol=..., interval='1d')
```

Summary: Active Addresses

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.active_addresses` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/active_addresses` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `interval` | `no` | `string | null` | `1d` | Time interval for the data. Default is '1d'. |

---

### `crypto.onchain.dexes`

```python
data.crypto.onchain.dexes(network=..., page=None)
```

Summary: Dexes

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.dexes` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/dexes` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `network` | `yes` | `string` | `-` | Network identifier, e.g. 'eth', 'bsc'. |
| `page` | `no` | `integer | null` | `-` | Page number for pagination. |

---

### `crypto.onchain.exchange_flows`

```python
data.crypto.onchain.exchange_flows(symbol=..., interval='1d', exchange=None)
```

Summary: Exchange Flows

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.exchange_flows` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/exchange_flows` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `interval` | `no` | `string | null` | `1d` | Time interval for the data. Default is '1d'. |
| `exchange` | `no` | `string | null` | `-` | Specific exchange to query. If not provided, returns aggregated data. |

---

### `crypto.onchain.fund_flow`

```python
data.crypto.onchain.fund_flow(symbol=...)
```

Summary: Fund Flow

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.fund_flow` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/fund_flow` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |

---

### `crypto.onchain.holder_statics`

```python
data.crypto.onchain.holder_statics(symbol=...)
```

Summary: Holder Statics

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.holder_statics` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/holder_statics` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |

---

### `crypto.onchain.hyperliquid_liquidation_map`

```python
data.crypto.onchain.hyperliquid_liquidation_map(symbol=...)
```

Summary: Hyperliquid Liquidation Map

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.hyperliquid_liquidation_map` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/hyperliquid_liquidation_map` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |

---

### `crypto.onchain.liquidity`

```python
data.crypto.onchain.liquidity(symbol=..., chain=None)
```

Summary: Liquidity

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.liquidity` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/liquidity` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `chain` | `no` | `string | null` | `-` | Blockchain network (e.g., 'BSC', 'ETH', 'SOL'). If not provided, returns all chains. |

---

### `crypto.onchain.networks`

```python
data.crypto.onchain.networks(page=None)
```

Summary: Networks

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.networks` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/networks` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `page` | `no` | `integer | null` | `-` | Page number for pagination. |

---

### `crypto.onchain.pool_detail`

```python
data.crypto.onchain.pool_detail(network=..., pool_address=...)
```

Summary: Pool Detail

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.pool_detail` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/pool_detail` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `network` | `yes` | `string` | `-` | Network identifier, e.g. 'eth'. |
| `pool_address` | `yes` | `string` | `-` | Pool address(es). Comma-separated for multi-pool query. |

---

### `crypto.onchain.pool_ohlcv`

```python
data.crypto.onchain.pool_ohlcv(network=..., pool_address=..., start_time=None, end_time=None, timeframe='day', aggregate=None, limit=None, currency=None)
```

Summary: Pool Ohlcv

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.pool_ohlcv` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/pool_ohlcv` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `network` | `yes` | `string` | `-` | Network ID e.g. 'eth'. |
| `pool_address` | `yes` | `string` | `-` | Pool contract address. |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `timeframe` | `no` | `string` | `day` | OHLCV timeframe: 'day' or 'hour' or 'minute'. |
| `aggregate` | `no` | `string | null` | `-` | Aggregate period e.g. '1' for 1-day/hour/minute. |
| `limit` | `no` | `integer | null` | `-` | Number of OHLCV data points. |
| `currency` | `no` | `string | null` | `-` | Price currency: 'usd' or 'token'. |

---

### `crypto.onchain.pool_trades`

```python
data.crypto.onchain.pool_trades(network=..., pool_address=..., trade_volume_in_usd_greater_than=None)
```

Summary: Pool Trades

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.pool_trades` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/pool_trades` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `network` | `yes` | `string` | `-` | Network ID e.g. 'eth'. |
| `pool_address` | `yes` | `string` | `-` | Pool contract address. |
| `trade_volume_in_usd_greater_than` | `no` | `number | null` | `-` | Filter by minimum trade volume in USD. |

---

### `crypto.onchain.pools`

```python
data.crypto.onchain.pools(list_type=..., network=None, token_address=None, page=None)
```

Summary: Pools

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.pools` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/pools` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `list_type` | `yes` | `string` | `-` | Pool list type: 'trending', 'new', 'top', 'token_pools'. |
| `network` | `no` | `string | null` | `-` | Network ID e.g. 'eth'. Required for 'top' and 'token_pools'. Optional for 'trending' and 'new' (omit for cross-network). |
| `token_address` | `no` | `string | null` | `-` | Token contract address. Required for 'token_pools'. |
| `page` | `no` | `integer | null` | `-` | Page number for pagination. |

---

### `crypto.onchain.search_pools`

```python
data.crypto.onchain.search_pools(query=..., network=None, page=None)
```

Summary: Search Pools

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.search_pools` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/search_pools` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `yes` | `string` | `-` | Search query — pool address, token name, symbol, or address. |
| `network` | `no` | `string | null` | `-` | Network identifier to filter results, e.g. 'eth'. |
| `page` | `no` | `integer | null` | `-` | Page number for pagination. |

---

### `crypto.onchain.token_data`

```python
data.crypto.onchain.token_data(network=..., address=...)
```

Summary: Token Data

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.token_data` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/token_data` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `network` | `yes` | `string` | `-` | Network ID e.g. 'eth'. |
| `address` | `yes` | `string` | `-` | Token contract address. |

---

### `crypto.onchain.token_info`

```python
data.crypto.onchain.token_info(network=..., address=...)
```

Summary: Token Info

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.token_info` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/token_info` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `network` | `yes` | `string` | `-` | Network ID e.g. 'eth'. |
| `address` | `yes` | `string` | `-` | Token contract address. |

---

### `crypto.onchain.token_price`

```python
data.crypto.onchain.token_price(network=..., addresses=...)
```

Summary: Token Price

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.token_price` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/token_price` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `network` | `yes` | `string` | `-` | Network ID e.g. 'eth'. |
| `addresses` | `yes` | `string` | `-` | Token contract address(es), comma-separated. |

---

### `crypto.onchain.token_unlock_event`

```python
data.crypto.onchain.token_unlock_event(symbol=...)
```

Summary: Token Unlock Event

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.token_unlock_event` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/token_unlock_event` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |

---

### `crypto.onchain.trading_signal`

```python
data.crypto.onchain.trading_signal(symbol=..., signal_types=None)
```

Summary: Trading Signal

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.trading_signal` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/trading_signal` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `signal_types` | `no` | `array | null` | `-` | accepts array values List of signal type IDs to filter. 1=whale large inflow, 2=whale large outflow, 3=net buy signal, 4=net sell signal. |

---

### `crypto.onchain.whale_transactions`

```python
data.crypto.onchain.whale_transactions(symbol=..., min_amount=None, interval='1h')
```

Summary: Whale Transactions

| Field | Value |
|---|---|
| Endpoint ID | `crypto.onchain.whale_transactions` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/onchain/whale_transactions` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `min_amount` | `no` | `number | null` | `-` | Minimum transaction amount threshold in USD. If not provided, uses API default. |
| `interval` | `no` | `string | null` | `1h` | Time interval for the data. Default is '1h'. |

---

### `crypto.options.open_interest`

```python
data.crypto.options.open_interest(symbol=..., interval='1d')
```

Summary: Open Interest

| Field | Value |
|---|---|
| Endpoint ID | `crypto.options.open_interest` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/options/open_interest` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `interval` | `no` | `string | null` | `1d` | Time interval for the data. Default is '1d'. |

---

### `crypto.options.volume`

```python
data.crypto.options.volume(symbol=..., interval='1d', option_type='all')
```

Summary: Volume

| Field | Value |
|---|---|
| Endpoint ID | `crypto.options.volume` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/options/volume` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `interval` | `no` | `string | null` | `1d` | Time interval for the data. Default is '1d'. |
| `option_type` | `no` | `string | null` | `all` | Option type: 'call', 'put', or 'all'. Default is 'all'. |

---

### `crypto.search`

```python
data.crypto.search(query=None)
```

Summary: Search

| Field | Value |
|---|---|
| Endpoint ID | `crypto.search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `no` | `string | null` | `-` | Search query. |

---

### `crypto.sentiment.crypto_fear_greed`

```python
data.crypto.sentiment.crypto_fear_greed(limit=30, interval=None)
```

Summary: Crypto Fear Greed

| Field | Value |
|---|---|
| Endpoint ID | `crypto.sentiment.crypto_fear_greed` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/sentiment/crypto_fear_greed` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `limit` | `no` | `integer` | `30` | Number of days of historical data to return. Default 30. Use 0 for all available data. |
| `interval` | `no` | `string | null` | `-` | Time interval for historical data (e.g. '1d', '1h', '4h'). Provider-specific. |

---

### `crypto.spot.exchange_volume`

```python
data.crypto.spot.exchange_volume(symbol=..., exchange=None)
```

Summary: Exchange Volume

| Field | Value |
|---|---|
| Endpoint ID | `crypto.spot.exchange_volume` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/spot/exchange_volume` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `exchange` | `no` | `string | null` | `-` | Specific exchange to query. If not provided, returns all exchanges. |

---

### `crypto.spot.kline`

```python
data.crypto.spot.kline(symbol=..., start_time=None, end_time=None, interval='1d', exchange='binance', limit=200, vs_currency='usd', data_type='ohlc', days=30, exchanges=None)
```

Summary: Kline

| Field | Value |
|---|---|
| Endpoint ID | `crypto.spot.kline` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/spot/kline` |
| SDK | `supported` |
| Host | `supported` |
| Notes | Backs spot OHLCV fetches today. |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `interval` | `no` | `string` | `1d` | Candlestick interval.; Data interval. Supported values: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 1w.; Time interval of the data to return. |
| `exchange` | `no` | `string` | `binance` | Exchange identifier (e.g. 'binance', 'okx', 'gate').; Exchange to fetch data from. Supported: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid.; Exchange name (e.g., Binance, OKX). Use support-exchange-pair API to get supported exchanges. |
| `limit` | `no` | `integer | null` | `200` | Maximum number of candles to return.; Number of candles per API request. Maximum varies by exchange (typically 500–1500).; Number of data points to return. Default: 1000, Max: 1000. |
| `vs_currency` | `no` | `string` | `usd` | Target currency for prices. Default is 'usd'. |
| `data_type` | `no` | `string` | `ohlc` | enum: ohlc, market_chart Data type: 'ohlc' for OHLC candles, 'market_chart' for close-only price history. |
| `days` | `no` | `integer` | `30` | Number of days of historical data. Used when start_date/end_date are not set. |
| `exchanges` | `no` | `array | string | null` | `-` | accepts array values To limit the query to a subset of exchanges e.g. ['POLONIEX', 'GDAX'] Multiple comma separated items allowed. |

#### Verified Playbook usage notes

- Use this endpoint for spot OHLCV. For contract / futures Playbooks, use `crypto.futures.kline` instead.

---

### `crypto.spot.order_book`

```python
data.crypto.spot.order_book(symbol=..., limit=20, exchange='binance')
```

Summary: Order Book

| Field | Value |
|---|---|
| Endpoint ID | `crypto.spot.order_book` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/spot/order_book` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `limit` | `no` | `integer` | `20` | Depth of the order book — number of bid and ask levels to return. |
| `exchange` | `no` | `string` | `binance` | Exchange to fetch data from. Supported: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid. |

---

### `crypto.spot.price_spread`

```python
data.crypto.spot.price_spread(symbol=..., interval='1h')
```

Summary: Price Spread

| Field | Value |
|---|---|
| Endpoint ID | `crypto.spot.price_spread` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/spot/price_spread` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `interval` | `no` | `string | null` | `1h` | Time interval for the data. Default is '1h'. |

---

### `crypto.spot.taker_volume`

```python
data.crypto.spot.taker_volume(symbol=..., period='1h', limit=30, start_time=None, end_time=None, exchange='Binance')
```

Summary: Taker Volume

| Field | Value |
|---|---|
| Endpoint ID | `crypto.spot.taker_volume` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/spot/taker_volume` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Trading pair symbol (e.g., BTCUSDT) |
| `period` | `no` | `string` | `1h` | Time period (5m, 15m, 30m, 1h, 2h, 4h, 6h, 12h, 1d) |
| `limit` | `no` | `integer | null` | `30` | Number of results (max 500) |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `exchange` | `no` | `string` | `Binance` | Exchange name (e.g. Binance, OKX, Bybit). Can be obtained from support-exchange-pair endpoint. |

---

### `crypto.spot.ticker`

```python
data.crypto.spot.ticker(symbol=..., exchange='binance', vs_currency='usd', include_market_data=True)
```

Summary: Ticker

| Field | Value |
|---|---|
| Endpoint ID | `crypto.spot.ticker` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/spot/ticker` |
| SDK | `supported` |
| Host | `supported` |
| Notes | Backs spot price latest fetches today. |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `exchange` | `no` | `string` | `binance` | enum: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid Exchange to fetch data from. Supported: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid. |
| `vs_currency` | `no` | `string` | `usd` | Target currency for prices. Default is 'usd'. |
| `include_market_data` | `no` | `boolean` | `true` | Use /coins/markets for richer data (market cap, volume, 24h change). Set to False to use /simple/price for a faster, lighter response. |

---

### `crypto.spot.trades`

```python
data.crypto.spot.trades(symbol=..., limit=100, exchange='binance')
```

Summary: Trades

| Field | Value |
|---|---|
| Endpoint ID | `crypto.spot.trades` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/spot/trades` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `limit` | `no` | `integer` | `100` | Number of most recent trades to return. |
| `exchange` | `no` | `string` | `binance` | Exchange to fetch data from. Supported: binance, bitget, okx, bybit, coinbase, upbit, gateio, kucoin, mexc, htx, cryptocom, bitfinex, bingx, kraken, bitmart, lbank, bitstamp, bithumb, hyperliquid. |

---

### `crypto.supported_currencies`

```python
data.crypto.supported_currencies()
```

Summary: Supported Currencies

| Field | Value |
|---|---|
| Endpoint ID | `crypto.supported_currencies` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/supported_currencies` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `crypto.token_price`

```python
data.crypto.token_price(platform_id=..., contract_addresses=..., vs_currencies='usd')
```

Summary: Token Price

| Field | Value |
|---|---|
| Endpoint ID | `crypto.token_price` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/token_price` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `platform_id` | `yes` | `string` | `-` | Asset platform identifier (e.g. 'ethereum', 'binance-smart-chain', 'polygon-pos'). |
| `contract_addresses` | `yes` | `string` | `-` | Comma-separated token contract addresses. |
| `vs_currencies` | `no` | `string` | `usd` | Comma-separated target currencies (e.g. 'usd,btc'). Default is 'usd'. |

---

### `crypto.treasury`

```python
data.crypto.treasury(symbol=...)
```

Summary: Treasury

| Field | Value |
|---|---|
| Endpoint ID | `crypto.treasury` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/treasury` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Cryptocurrency symbol ('BTC' or 'ETH'). Only Bitcoin and Ethereum are supported. |

---

### `crypto.trending`

```python
data.crypto.trending()
```

Summary: Trending

| Field | Value |
|---|---|
| Endpoint ID | `crypto.trending` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/crypto/trending` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
