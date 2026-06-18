# Etf Data Reference

Use this file when an agent needs detailed signatures and parameter
rules for one DataSDK domain. All generated `getagent.data` endpoints
are callable through the DataSDK wrapper.

## Contents
- [`etf.countries`](#etfcountries)
- [`etf.discovery.active`](#etfdiscoveryactive)
- [`etf.discovery.gainers`](#etfdiscoverygainers)
- [`etf.discovery.losers`](#etfdiscoverylosers)
- [`etf.equity_exposure`](#etfequity-exposure)
- [`etf.historical`](#etfhistorical)
- [`etf.holdings`](#etfholdings)
- [`etf.info`](#etfinfo)
- [`etf.nport_disclosure`](#etfnport-disclosure)
- [`etf.price_performance`](#etfprice-performance)
- [`etf.search`](#etfsearch)
- [`etf.sectors`](#etfsectors)

## Endpoint reference

### `etf.countries`

```python
data.etf.countries(symbol=..., use_cache=True)
```

Summary: Countries

| Field | Value |
|---|---|
| Endpoint ID | `etf.countries` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/etf/countries` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `use_cache` | `no` | `boolean` | `true` | Whether to use a cached request. All ETF data comes from a single JSON file that is updated daily. To bypass, set to False. If True, the data will be cached for 4 hours. |

---

### `etf.discovery.active`

```python
data.etf.discovery.active(sort='desc', limit=10)
```

Summary: Active

| Field | Value |
|---|---|
| Endpoint ID | `etf.discovery.active` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/etf/discovery/active` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `sort` | `no` | `string` | `desc` | enum: asc, desc Sort order. Possible values: 'asc', 'desc'. Default: 'desc'. |
| `limit` | `no` | `integer` | `10` | The number of data entries to return. |

---

### `etf.discovery.gainers`

```python
data.etf.discovery.gainers(sort='desc', limit=10)
```

Summary: Gainers

| Field | Value |
|---|---|
| Endpoint ID | `etf.discovery.gainers` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/etf/discovery/gainers` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `sort` | `no` | `string` | `desc` | enum: asc, desc Sort order. Possible values: 'asc', 'desc'. Default: 'desc'. |
| `limit` | `no` | `integer` | `10` | The number of data entries to return. |

---

### `etf.discovery.losers`

```python
data.etf.discovery.losers(sort='desc', limit=10)
```

Summary: Losers

| Field | Value |
|---|---|
| Endpoint ID | `etf.discovery.losers` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/etf/discovery/losers` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `sort` | `no` | `string` | `desc` | enum: asc, desc Sort order. Possible values: 'asc', 'desc'. Default: 'desc'. |
| `limit` | `no` | `integer` | `10` | The number of data entries to return. |

---

### `etf.equity_exposure`

```python
data.etf.equity_exposure(symbol=...)
```

Summary: Equity Exposure

| Field | Value |
|---|---|
| Endpoint ID | `etf.equity_exposure` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/etf/equity_exposure` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. (underlying equity) Multiple comma separated items allowed |

---

### `etf.historical`

```python
data.etf.historical(symbol=..., start_time=None, end_time=None, interval='1d', adjustment='splits_only', extended_hours=False, use_cache=True, start_clock_time=None, end_clock_time=None, timezone='America/New_York', source='realtime', include_actions=True)
```

Summary: Historical

| Field | Value |
|---|---|
| Endpoint ID | `etf.historical` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/etf/historical` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed; A Security identifier (Ticker, FIGI, ISIN, CUSIP, Intrinio ID). |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `interval` | `no` | `string | integer` | `1d` | Time interval of the data to return. |
| `adjustment` | `no` | `string` | `splits_only` | The adjustment factor to apply. 'splits_only' is not supported for intraday data.; Type of adjustment for historical prices. Only applies to daily data.; The adjustment factor to apply. Only valid for daily data.; The adjustment factor to apply. Default is splits only. |
| `extended_hours` | `no` | `boolean` | `false` | Include Pre and Post market data. |
| `use_cache` | `no` | `boolean` | `true` | When True, the company directories will be cached for 24 hours and are used to validate symbols. The results of the function are not cached. Set as False to bypass. |
| `start_clock_time` | `no` | `string | null` | `-` | Return intervals starting at the specified time on the `start_date` formatted as 'HH:MM:SS'. |
| `end_clock_time` | `no` | `string | null` | `-` | Return intervals stopping at the specified time on the `end_date` formatted as 'HH:MM:SS'. |
| `timezone` | `no` | `string | null` | `America/New_York` | Timezone of the data, in the IANA format (Continent/City). |
| `source` | `no` | `string` | `realtime` | enum: realtime, delayed, nasdaq_basic The source of the data. |
| `include_actions` | `no` | `boolean` | `true` | Include dividends and stock splits in results. |

---

### `etf.holdings`

```python
data.etf.holdings(symbol=..., date=None, use_cache=True)
```

Summary: Holdings

| Field | Value |
|---|---|
| Endpoint ID | `etf.holdings` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/etf/holdings` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. (ETF) |
| `date` | `no` | `string | null` | `-` | A specific date to get data for. |
| `use_cache` | `no` | `boolean` | `true` | Whether to use a cached request. All ETF data comes from a single JSON file that is updated daily. To bypass, set to False. If True, the data will be cached for 4 hours. |

---

### `etf.info`

```python
data.etf.info(symbol=..., use_cache=True)
```

Summary: Info

| Field | Value |
|---|---|
| Endpoint ID | `etf.info` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/etf/info` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. (ETF) Multiple comma separated items allowed |
| `use_cache` | `no` | `boolean` | `true` | Whether to use a cached request. All ETF data comes from a single JSON file that is updated daily. To bypass, set to False. If True, the data will be cached for 4 hours. |

---

### `etf.nport_disclosure`

```python
data.etf.nport_disclosure(symbol=..., year=None, quarter=None, use_cache=True)
```

Summary: Nport Disclosure

| Field | Value |
|---|---|
| Endpoint ID | `etf.nport_disclosure` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/etf/nport_disclosure` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. (Fund ticker or CIK) |
| `year` | `no` | `integer | null` | `-` | Reporting year of the filing. Default is the year for the most recent, reported, quarter. |
| `quarter` | `no` | `integer | null` | `-` | Reporting quarter of the filing. Default is the most recent, reported, quarter. |
| `use_cache` | `no` | `boolean` | `true` | Whether or not to use cache for the request. |

---

### `etf.price_performance`

```python
data.etf.price_performance(symbol=..., return_type='trailing', adjustment='splits_and_dividends')
```

Summary: Price Performance

| Field | Value |
|---|---|
| Endpoint ID | `etf.price_performance` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/etf/price_performance` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `return_type` | `no` | `string` | `trailing` | enum: trailing, calendar The type of returns to return, a trailing or calendar window. |
| `adjustment` | `no` | `string` | `splits_and_dividends` | enum: splits_only, splits_and_dividends The adjustment factor, 'splits_only' will return pure price performance. |

---

### `etf.search`

```python
data.etf.search(query='', exchange=None, country=None, div_freq=None, sort_by=None, use_cache=True)
```

Summary: Search

| Field | Value |
|---|---|
| Endpoint ID | `etf.search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/etf/search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `no` | `string | null` | `` | Search query. |
| `exchange` | `no` | `string | null` | `-` | Exchange where the ETF is listed. If not provided, all exchanges are searched.; Target a specific exchange by providing the MIC code. |
| `country` | `no` | `string | null` | `-` | Filter by country. Accepts ISO 3166-1 alpha-2 codes (e.g., 'US', 'DE'), alpha-3 codes (e.g., 'USA'), or country names (e.g., 'United States', 'united_states'). |
| `div_freq` | `no` | `string | null` | `-` | The dividend payment frequency. |
| `sort_by` | `no` | `string | null` | `-` | The column to sort by. |
| `use_cache` | `no` | `boolean` | `true` | Whether to use a cached request. All ETF data comes from a single JSON file that is updated daily. To bypass, set to False. If True, the data will be cached for 4 hours. |

---

### `etf.sectors`

```python
data.etf.sectors(symbol=..., use_cache=True)
```

Summary: Sectors

| Field | Value |
|---|---|
| Endpoint ID | `etf.sectors` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/etf/sectors` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. (ETF) Multiple comma separated items allowed |
| `use_cache` | `no` | `boolean` | `true` | Whether to use a cached request. All ETF data comes from a single JSON file that is updated daily. To bypass, set to False. If True, the data will be cached for 4 hours. |
