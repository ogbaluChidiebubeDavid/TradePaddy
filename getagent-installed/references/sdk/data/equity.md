# Equity Data Reference

Use this file when an agent needs detailed signatures and parameter
rules for one DataSDK domain. All generated `getagent.data` endpoints
are callable through the DataSDK wrapper.

## Contents
- [`equity.calendar.dividend`](#equitycalendardividend)
- [`equity.calendar.earnings`](#equitycalendarearnings)
- [`equity.calendar.events`](#equitycalendarevents)
- [`equity.calendar.ipo`](#equitycalendaripo)
- [`equity.calendar.splits`](#equitycalendarsplits)
- [`equity.compare.company_facts`](#equitycomparecompany-facts)
- [`equity.compare.groups`](#equitycomparegroups)
- [`equity.compare.peers`](#equitycomparepeers)
- [`equity.darkpool.otc`](#equitydarkpoolotc)
- [`equity.discovery.active`](#equitydiscoveryactive)
- [`equity.discovery.aggressive_small_caps`](#equitydiscoveryaggressive-small-caps)
- [`equity.discovery.filings`](#equitydiscoveryfilings)
- [`equity.discovery.gainers`](#equitydiscoverygainers)
- [`equity.discovery.growth_tech`](#equitydiscoverygrowth-tech)
- [`equity.discovery.latest_financial_reports`](#equitydiscoverylatest-financial-reports)
- [`equity.discovery.losers`](#equitydiscoverylosers)
- [`equity.discovery.top_retail`](#equitydiscoverytop-retail)
- [`equity.discovery.undervalued_growth`](#equitydiscoveryundervalued-growth)
- [`equity.discovery.undervalued_large_caps`](#equitydiscoveryundervalued-large-caps)
- [`equity.estimates.analyst_search`](#equityestimatesanalyst-search)
- [`equity.estimates.consensus`](#equityestimatesconsensus)
- [`equity.estimates.forward_ebitda`](#equityestimatesforward-ebitda)
- [`equity.estimates.forward_eps`](#equityestimatesforward-eps)
- [`equity.estimates.forward_pe`](#equityestimatesforward-pe)
- [`equity.estimates.forward_sales`](#equityestimatesforward-sales)
- [`equity.estimates.historical`](#equityestimateshistorical)
- [`equity.estimates.price_target`](#equityestimatesprice-target)
- [`equity.fundamental.balance`](#equityfundamentalbalance)
- [`equity.fundamental.balance_growth`](#equityfundamentalbalance-growth)
- [`equity.fundamental.cash`](#equityfundamentalcash)
- [`equity.fundamental.cash_growth`](#equityfundamentalcash-growth)
- [`equity.fundamental.dividends`](#equityfundamentaldividends)
- [`equity.fundamental.employee_count`](#equityfundamentalemployee-count)
- [`equity.fundamental.esg_score`](#equityfundamentalesg-score)
- [`equity.fundamental.filings`](#equityfundamentalfilings)
- [`equity.fundamental.historical_attributes`](#equityfundamentalhistorical-attributes)
- [`equity.fundamental.historical_eps`](#equityfundamentalhistorical-eps)
- [`equity.fundamental.historical_splits`](#equityfundamentalhistorical-splits)
- [`equity.fundamental.income`](#equityfundamentalincome)
- [`equity.fundamental.income_growth`](#equityfundamentalincome-growth)
- [`equity.fundamental.latest_attributes`](#equityfundamentallatest-attributes)
- [`equity.fundamental.management`](#equityfundamentalmanagement)
- [`equity.fundamental.management_compensation`](#equityfundamentalmanagement-compensation)
- [`equity.fundamental.management_discussion_analysis`](#equityfundamentalmanagement-discussion-analysis)
- [`equity.fundamental.metrics`](#equityfundamentalmetrics)
- [`equity.fundamental.ratios`](#equityfundamentalratios)
- [`equity.fundamental.reported_financials`](#equityfundamentalreported-financials)
- [`equity.fundamental.revenue_per_geography`](#equityfundamentalrevenue-per-geography)
- [`equity.fundamental.revenue_per_segment`](#equityfundamentalrevenue-per-segment)
- [`equity.fundamental.search_attributes`](#equityfundamentalsearch-attributes)
- [`equity.fundamental.trailing_dividend_yield`](#equityfundamentaltrailing-dividend-yield)
- [`equity.fundamental.transcript`](#equityfundamentaltranscript)
- [`equity.historical_market_cap`](#equityhistorical-market-cap)
- [`equity.market_snapshots`](#equitymarket-snapshots)
- [`equity.ownership.form_13f`](#equityownershipform-13f)
- [`equity.ownership.government_trades`](#equityownershipgovernment-trades)
- [`equity.ownership.insider_trading`](#equityownershipinsider-trading)
- [`equity.ownership.institutional`](#equityownershipinstitutional)
- [`equity.ownership.major_holders`](#equityownershipmajor-holders)
- [`equity.ownership.share_statistics`](#equityownershipshare-statistics)
- [`equity.price.historical`](#equitypricehistorical)
- [`equity.price.performance`](#equitypriceperformance)
- [`equity.price.quote`](#equitypricequote)
- [`equity.profile`](#equityprofile)
- [`equity.screener`](#equityscreener)
- [`equity.search`](#equitysearch)
- [`equity.shorts.fails_to_deliver`](#equityshortsfails-to-deliver)
- [`equity.shorts.short_interest`](#equityshortsshort-interest)

## Endpoint reference

### `equity.calendar.dividend`

```python
data.equity.calendar.dividend(start_time=None, end_time=None)
```

Summary: Dividend

| Field | Value |
|---|---|
| Endpoint ID | `equity.calendar.dividend` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/calendar/dividend` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |

---

### `equity.calendar.earnings`

```python
data.equity.calendar.earnings(start_time=None, end_time=None, symbol=None, country='us')
```

Summary: Earnings

| Field | Value |
|---|---|
| Endpoint ID | `equity.calendar.earnings` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/calendar/earnings` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. |
| `country` | `no` | `string` | `us` | enum: us, ca The country to get calendar data for. Accepts 'us'/'ca', ISO codes ('US', 'USA', 'CA', 'CAN'), or names ('United States', 'Canada'). |

---

### `equity.calendar.events`

```python
data.equity.calendar.events(start_time=None, end_time=None, country=None)
```

Summary: Events

| Field | Value |
|---|---|
| Endpoint ID | `equity.calendar.events` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/calendar/events` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `country` | `no` | `string | null` | `-` | Country code to filter economic events (e.g., 'US', 'JP', 'CN'). |

---

### `equity.calendar.ipo`

```python
data.equity.calendar.ipo(start_time=None, end_time=None, symbol=None, limit=100, status=None, min_value=None, max_value=None, is_spo=False)
```

Summary: Ipo

| Field | Value |
|---|---|
| Endpoint ID | `equity.calendar.ipo` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/calendar/ipo` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. |
| `limit` | `no` | `integer | null` | `100` | The number of data entries to return. |
| `status` | `no` | `string | null` | `-` | Status of the IPO. [upcoming, priced, or withdrawn]; The status of the IPO. |
| `min_value` | `no` | `integer | null` | `-` | Return IPOs with an offer dollar amount greater than the given amount. |
| `max_value` | `no` | `integer | null` | `-` | Return IPOs with an offer dollar amount less than the given amount. |
| `is_spo` | `no` | `boolean` | `false` | If True, returns data for secondary public offerings (SPOs). |

---

### `equity.calendar.splits`

```python
data.equity.calendar.splits(start_time=None, end_time=None)
```

Summary: Splits

| Field | Value |
|---|---|
| Endpoint ID | `equity.calendar.splits` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/calendar/splits` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |

---

### `equity.compare.company_facts`

```python
data.equity.compare.company_facts(symbol=None, fact='', year=None, fiscal_period=None, instantaneous=False, use_cache=True)
```

Summary: Company Facts

| Field | Value |
|---|---|
| Endpoint ID | `equity.compare.company_facts` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/compare/company_facts` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `fact` | `no` | `string` | `` | The fact to lookup, typically a GAAP-reporting measure. Choices vary by provider.; Fact or concept from the SEC taxonomy, in UpperCamelCase. Defaults to, 'Revenues'. AAPL, MSFT, GOOG, BRK-A currently report revenue as, 'RevenueFromContractWithCustomerExcludingAssessedTax'. In previous years, they have reported as 'Revenues'. |
| `year` | `no` | `integer | null` | `-` | The year to retrieve the data for. If not provided, the current year is used. When symbol(s) are provided, excluding the year will return all reported values for the concept. |
| `fiscal_period` | `no` | `string | null` | `-` | The fiscal period to retrieve the data for. If not provided, the most recent quarter is used. This parameter is ignored when a symbol is supplied. |
| `instantaneous` | `no` | `boolean` | `false` | Whether to retrieve instantaneous data. See the notes above for more information. Defaults to False. Some facts are only available as instantaneous data. The function will automatically attempt the inverse of this parameter if the initial fiscal quarter request fails. This parameter is ignored when a symbol is supplied. |
| `use_cache` | `no` | `boolean` | `true` | Whether to use cache for the request. Defaults to True. |

---

### `equity.compare.groups`

```python
data.equity.compare.groups(group='sector', metric='performance')
```

Summary: Groups

| Field | Value |
|---|---|
| Endpoint ID | `equity.compare.groups` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/compare/groups` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `group` | `no` | `string` | `sector` | enum: sector, industry, country, capitalization, energy, materials, industrials, consumer_cyclical, consumer_defensive, healthcare, financial, technology, communication_services, utilities, real_estate US-listed stocks only. When an individual sector is selected, it is broken down by industry. The default is 'sector'. |
| `metric` | `no` | `string` | `performance` | enum: performance, valuation, overview Statistical metric to return. Select from: ['performance', 'valuation', 'overview'] The default is 'performance'. |

---

### `equity.compare.peers`

```python
data.equity.compare.peers(symbol=...)
```

Summary: Peers

| Field | Value |
|---|---|
| Endpoint ID | `equity.compare.peers` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/compare/peers` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |

---

### `equity.darkpool.otc`

```python
data.equity.darkpool.otc(symbol=None, tier='T1', is_ats=True)
```

Summary: Otc

| Field | Value |
|---|---|
| Endpoint ID | `equity.darkpool.otc` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/darkpool/otc` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. |
| `tier` | `no` | `string` | `T1` | "T1 - Securities included in the S&P 500, Russell 1000 and selected exchange-traded products; T2 - All other NMS stocks; OTC - Over-the-Counter equity securities |
| `is_ats` | `no` | `boolean` | `true` | ATS data if true, NON-ATS otherwise |

---

### `equity.discovery.active`

```python
data.equity.discovery.active(sort='desc', limit=200)
```

Summary: Active

| Field | Value |
|---|---|
| Endpoint ID | `equity.discovery.active` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/discovery/active` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `sort` | `no` | `string` | `desc` | enum: asc, desc Sort order. Possible values: 'asc', 'desc'. Default: 'desc'. |
| `limit` | `no` | `integer | null` | `200` | Limit the number of results. |

---

### `equity.discovery.aggressive_small_caps`

```python
data.equity.discovery.aggressive_small_caps(sort='desc', limit=None)
```

Summary: Aggressive Small Caps

| Field | Value |
|---|---|
| Endpoint ID | `equity.discovery.aggressive_small_caps` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/discovery/aggressive_small_caps` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `sort` | `no` | `string` | `desc` | enum: asc, desc Sort order. Possible values: 'asc', 'desc'. Default: 'desc'. |
| `limit` | `no` | `integer | null` | `-` | Limit the number of results. Default is all. |

---

### `equity.discovery.filings`

```python
data.equity.discovery.filings(start_time=None, end_time=None, form_type=None, limit=None)
```

Summary: Filings

| Field | Value |
|---|---|
| Endpoint ID | `equity.discovery.filings` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/discovery/filings` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `form_type` | `no` | `string | null` | `-` | Filter by form type. Visit https://www.sec.gov/forms for a list of supported form types. |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return.; The maximum number of results to return. Default is 10000. |

---

### `equity.discovery.gainers`

```python
data.equity.discovery.gainers(sort='desc', category='price_performer', limit=200)
```

Summary: Gainers

| Field | Value |
|---|---|
| Endpoint ID | `equity.discovery.gainers` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/discovery/gainers` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `sort` | `no` | `string` | `desc` | enum: asc, desc Sort order. Possible values: 'asc', 'desc'. Default: 'desc'. |
| `category` | `no` | `string` | `price_performer` | enum: dividend, energy, healthcare, industrials, price_performer, rising_stars, real_estate, tech, utilities, 52w_high, volume The category of list to retrieve. Defaults to `price_performer`. |
| `limit` | `no` | `integer | null` | `200` | Limit the number of results. |

---

### `equity.discovery.growth_tech`

```python
data.equity.discovery.growth_tech(sort='desc', limit=200)
```

Summary: Growth Tech

| Field | Value |
|---|---|
| Endpoint ID | `equity.discovery.growth_tech` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/discovery/growth_tech` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `sort` | `no` | `string` | `desc` | enum: asc, desc Sort order. Possible values: 'asc', 'desc'. Default: 'desc'. |
| `limit` | `no` | `integer | null` | `200` | Limit the number of results. |

---

### `equity.discovery.latest_financial_reports`

```python
data.equity.discovery.latest_financial_reports(date=None, report_type=None)
```

Summary: Latest Financial Reports

| Field | Value |
|---|---|
| Endpoint ID | `equity.discovery.latest_financial_reports` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/discovery/latest_financial_reports` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `date` | `no` | `string | null` | `-` | A specific date to get data for. Defaults to today. |
| `report_type` | `no` | `string | null` | `-` | Return only a specific form type. Default is all quarterly, annual, and current reports. Choices: 1-K, 1-SA, 1-U, 10-D, 10-K, 10-KT, 10-Q, 10-QT, 20-F, 40-F, 6-K, 8-K. Multiple comma separated items allowed. |

---

### `equity.discovery.losers`

```python
data.equity.discovery.losers(sort='desc', limit=200)
```

Summary: Losers

| Field | Value |
|---|---|
| Endpoint ID | `equity.discovery.losers` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/discovery/losers` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `sort` | `no` | `string` | `desc` | enum: asc, desc Sort order. Possible values: 'asc', 'desc'. Default: 'desc'. |
| `limit` | `no` | `integer | null` | `200` | Limit the number of results. |

---

### `equity.discovery.top_retail`

```python
data.equity.discovery.top_retail(limit=5)
```

Summary: Top Retail

| Field | Value |
|---|---|
| Endpoint ID | `equity.discovery.top_retail` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/discovery/top_retail` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `limit` | `no` | `integer` | `5` | The number of data entries to return. |

---

### `equity.discovery.undervalued_growth`

```python
data.equity.discovery.undervalued_growth(sort='desc', limit=200)
```

Summary: Undervalued Growth

| Field | Value |
|---|---|
| Endpoint ID | `equity.discovery.undervalued_growth` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/discovery/undervalued_growth` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `sort` | `no` | `string` | `desc` | enum: asc, desc Sort order. Possible values: 'asc', 'desc'. Default: 'desc'. |
| `limit` | `no` | `integer | null` | `200` | Limit the number of results. |

---

### `equity.discovery.undervalued_large_caps`

```python
data.equity.discovery.undervalued_large_caps(sort='desc', limit=200)
```

Summary: Undervalued Large Caps

| Field | Value |
|---|---|
| Endpoint ID | `equity.discovery.undervalued_large_caps` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/discovery/undervalued_large_caps` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `sort` | `no` | `string` | `desc` | enum: asc, desc Sort order. Possible values: 'asc', 'desc'. Default: 'desc'. |
| `limit` | `no` | `integer | null` | `200` | Limit the number of results. |

---

### `equity.estimates.analyst_search`

```python
data.equity.estimates.analyst_search(analyst_name=None, firm_name=None, analyst_ids=None, firm_ids=None, limit=100, page=0, fields=None)
```

Summary: Analyst Search

| Field | Value |
|---|---|
| Endpoint ID | `equity.estimates.analyst_search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/estimates/analyst_search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `analyst_name` | `no` | `string | null` | `-` | Analyst names to return. Omitting will return all available analysts. Multiple comma separated items allowed |
| `firm_name` | `no` | `string | null` | `-` | Firm names to return. Omitting will return all available firms. Multiple comma separated items allowed |
| `analyst_ids` | `no` | `string | null` | `-` | List of analyst IDs to return. Multiple comma separated items allowed. |
| `firm_ids` | `no` | `string | null` | `-` | Firm IDs to return. Multiple comma separated items allowed. |
| `limit` | `no` | `integer | null` | `100` | Number of results returned. Limit 1000. |
| `page` | `no` | `integer | null` | `0` | Page offset. For optimization, performance and technical reasons, page offsets are limited from 0 - 100000. Limit the query results by other parameters such as date. |
| `fields` | `no` | `string | null` | `-` | Fields to include in the response. See https://docs.benzinga.io/benzinga-apis/calendar/get-ratings to learn about the available fields. Multiple comma separated items allowed. |

---

### `equity.estimates.consensus`

```python
data.equity.estimates.consensus(symbol=None, industry_group_number=None)
```

Summary: Consensus

| Field | Value |
|---|---|
| Endpoint ID | `equity.estimates.consensus` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/estimates/consensus` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `industry_group_number` | `no` | `integer | null` | `-` | The Zacks industry group number. |

---

### `equity.estimates.forward_ebitda`

```python
data.equity.estimates.forward_ebitda(symbol=None, fiscal_period='annual', limit=None, include_historical=False, estimate_type=None)
```

Summary: Forward Ebitda

| Field | Value |
|---|---|
| Endpoint ID | `equity.estimates.forward_ebitda` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/estimates/forward_ebitda` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `fiscal_period` | `no` | `string | null` | `annual` | The future fiscal period to retrieve estimates for.; Filter for only full-year or quarterly estimates. |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. Number of historical periods. |
| `include_historical` | `no` | `boolean` | `false` | If True, the data will include all past data and the limit will be ignored. |
| `estimate_type` | `no` | `string | null` | `-` | Limit the EBITDA estimates to this type. |

---

### `equity.estimates.forward_eps`

```python
data.equity.estimates.forward_eps(symbol=None, fiscal_period='annual', limit=None, include_historical=False, fiscal_year=None, calendar_year=None, calendar_period=None)
```

Summary: Forward Eps

| Field | Value |
|---|---|
| Endpoint ID | `equity.estimates.forward_eps` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/estimates/forward_eps` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `fiscal_period` | `no` | `string | null` | `annual` | The future fiscal period to retrieve estimates for. |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. Number of historical periods. |
| `include_historical` | `no` | `boolean` | `false` | If True, the data will include all past data and the limit will be ignored. |
| `fiscal_year` | `no` | `integer | null` | `-` | The future fiscal year to retrieve estimates for. When no symbol and year is supplied the current calendar year is used. |
| `calendar_year` | `no` | `integer | null` | `-` | The future calendar year to retrieve estimates for. When no symbol and year is supplied the current calendar year is used. |
| `calendar_period` | `no` | `string | null` | `-` | The future calendar period to retrieve estimates for. |

---

### `equity.estimates.forward_pe`

```python
data.equity.estimates.forward_pe(symbol=None)
```

Summary: Forward Pe

| Field | Value |
|---|---|
| Endpoint ID | `equity.estimates.forward_pe` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/estimates/forward_pe` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. Multiple comma separated items allowed |

---

### `equity.estimates.forward_sales`

```python
data.equity.estimates.forward_sales(symbol=None, fiscal_year=None, fiscal_period=None, calendar_year=None, calendar_period=None)
```

Summary: Forward Sales

| Field | Value |
|---|---|
| Endpoint ID | `equity.estimates.forward_sales` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/estimates/forward_sales` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `fiscal_year` | `no` | `integer | null` | `-` | The future fiscal year to retrieve estimates for. When no symbol and year is supplied the current calendar year is used. |
| `fiscal_period` | `no` | `string | null` | `-` | The future fiscal period to retrieve estimates for. |
| `calendar_year` | `no` | `integer | null` | `-` | The future calendar year to retrieve estimates for. When no symbol and year is supplied the current calendar year is used. |
| `calendar_period` | `no` | `string | null` | `-` | The future calendar period to retrieve estimates for. |

---

### `equity.estimates.historical`

```python
data.equity.estimates.historical(symbol=..., freq='quarterly', period='annual', limit=None, page=None)
```

Summary: Historical

| Field | Value |
|---|---|
| Endpoint ID | `equity.estimates.historical` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/estimates/historical` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `freq` | `no` | `string` | `quarterly` | enum: annual, quarterly The frequency of the data. Can be 'annual' or 'quarterly'. |
| `period` | `no` | `string` | `annual` | enum: quarter, annual Time period of the data to return. |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. |
| `page` | `no` | `integer | null` | `-` | Page number for paginated results. Used with limit. |

---

### `equity.estimates.price_target`

```python
data.equity.estimates.price_target(symbol=None, limit=None, start_time=None, end_time=None, page=0, date=None, updated=None, importance=None, action=None, analyst_ids=None, firm_ids=None, fields=None)
```

Summary: Price Target

| Field | Value |
|---|---|
| Endpoint ID | `equity.estimates.price_target` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/estimates/price_target` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `page` | `no` | `integer | null` | `0` | Page offset. For optimization, performance and technical reasons, page offsets are limited from 0 - 100000. Limit the query results by other parameters such as date. Used in conjunction with the limit and date parameters. |
| `date` | `no` | `string | null` | `-` | Date for calendar data, shorthand for date_from and date_to. |
| `updated` | `no` | `string | integer | null` | `-` | Records last Updated Unix timestamp (UTC). This will force the sort order to be Greater Than or Equal to the timestamp indicated. The date can be a date string or a Unix timestamp. The date string must be in the format of YYYY-MM-DD. |
| `importance` | `no` | `integer | null` | `-` | Importance level to filter by. Uses Greater Than or Equal To the importance indicated |
| `action` | `no` | `string | null` | `-` | Filter by a specific action_company. |
| `analyst_ids` | `no` | `array | string | null` | `-` | accepts array values Comma-separated list of analyst (person) IDs. Omitting will bring back all available analysts. Multiple comma separated items allowed. |
| `firm_ids` | `no` | `array | string | null` | `-` | accepts array values Comma-separated list of firm IDs. Multiple comma separated items allowed. |
| `fields` | `no` | `array | string | null` | `-` | accepts array values Comma-separated list of fields to include in the response. See https://docs.benzinga.io/benzinga-apis/calendar/get-ratings to learn about the available fields. Multiple comma separated items allowed. |

---

### `equity.fundamental.balance`

```python
data.equity.fundamental.balance(symbol=..., limit=None, period='annual', fiscal_year=None)
```

Summary: Balance

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.balance` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/balance` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. |
| `period` | `no` | `string` | `annual` | Time period of the data to return. |
| `fiscal_year` | `no` | `integer | null` | `-` | The specific fiscal year. Reports do not go beyond 2008. |

---

### `equity.fundamental.balance_growth`

```python
data.equity.fundamental.balance_growth(symbol=..., limit=None, period='annual')
```

Summary: Balance Growth

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.balance_growth` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/balance_growth` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. |
| `period` | `no` | `string` | `annual` | Time period of the data to return. |

---

### `equity.fundamental.cash`

```python
data.equity.fundamental.cash(symbol=..., limit=5, period='annual', fiscal_year=None)
```

Summary: Cash

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.cash` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/cash` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `limit` | `no` | `integer | null` | `5` | The number of data entries to return. |
| `period` | `no` | `string` | `annual` | Time period of the data to return. |
| `fiscal_year` | `no` | `integer | null` | `-` | The specific fiscal year. Reports do not go beyond 2008. |

---

### `equity.fundamental.cash_growth`

```python
data.equity.fundamental.cash_growth(symbol=..., limit=None, period='annual')
```

Summary: Cash Growth

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.cash_growth` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/cash_growth` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. |
| `period` | `no` | `string` | `annual` | Time period of the data to return. |

---

### `equity.fundamental.dividends`

```python
data.equity.fundamental.dividends(symbol=..., start_time=None, end_time=None, limit=None)
```

Summary: Dividends

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.dividends` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/dividends` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `limit` | `no` | `integer | null` | `-` | Return N most recent payments.; The number of data entries to return. |

---

### `equity.fundamental.employee_count`

```python
data.equity.fundamental.employee_count(symbol=..., start_time=None, end_time=None, limit=None)
```

Summary: Employee Count

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.employee_count` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/employee_count` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `limit` | `no` | `integer | null` | `-` | Number of records to return. Default is all. |

---

### `equity.fundamental.esg_score`

```python
data.equity.fundamental.esg_score(symbol=...)
```

Summary: Esg Score

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.esg_score` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/esg_score` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |

---

### `equity.fundamental.filings`

```python
data.equity.fundamental.filings(symbol=None, start_time=None, end_time=None, cik=None, limit=1000, page=0, form_type=None, thea_enabled=None, year=None, form_group='8k', use_cache=True)
```

Summary: Filings

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.filings` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/filings` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `cik` | `no` | `string | integer | null` | `-` | CIK number to look up. Overrides symbol.; Lookup filings by Central Index Key (CIK) instead of by symbol. |
| `limit` | `no` | `integer | null` | `1000` | Number of results to return. Max results is 1000.; The number of data entries to return. |
| `page` | `no` | `integer` | `0` | Page number for paginated results. Max page is 100. |
| `form_type` | `no` | `string | null` | `-` | SEC form type to filter by. |
| `thea_enabled` | `no` | `boolean | null` | `-` | Return filings that have been read by Intrinio's Thea NLP. |
| `year` | `no` | `integer | null` | `-` | Calendar year of the data, default is current year. The earliest year available is 1994, for all companies and form types. |
| `form_group` | `no` | `string` | `8k` | enum: annual, quarterly, proxy, insider, 8k, registration, comment The form group to fetch, default is 8k. |
| `use_cache` | `no` | `boolean` | `true` | Whether or not to use cache. If True, cache will store for one day. |

---

### `equity.fundamental.historical_attributes`

```python
data.equity.fundamental.historical_attributes(symbol=..., tag=..., start_time=None, end_time=None, frequency='yearly', limit=1000, tag_type=None, sort='desc')
```

Summary: Historical Attributes

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.historical_attributes` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/historical_attributes` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `tag` | `yes` | `string` | `-` | Intrinio data tag ID or code. Multiple comma separated items allowed |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `frequency` | `no` | `string | null` | `yearly` | The frequency of the data. |
| `limit` | `no` | `integer | null` | `1000` | The number of data entries to return. |
| `tag_type` | `no` | `string | null` | `-` | Filter by type, when applicable. |
| `sort` | `no` | `string | null` | `desc` | Sort order. |

---

### `equity.fundamental.historical_eps`

```python
data.equity.fundamental.historical_eps(symbol=..., period='quarter', limit=None)
```

Summary: Historical Eps

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.historical_eps` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/historical_eps` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `period` | `no` | `string` | `quarter` | enum: annual, quarter Time period of the data to return. |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. |

---

### `equity.fundamental.historical_splits`

```python
data.equity.fundamental.historical_splits(symbol=...)
```

Summary: Historical Splits

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.historical_splits` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/historical_splits` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |

---

### `equity.fundamental.income`

```python
data.equity.fundamental.income(symbol=..., limit=None, period='annual', fiscal_year=None)
```

Summary: Income

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.income` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/income` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. |
| `period` | `no` | `string` | `annual` | Time period of the data to return. |
| `fiscal_year` | `no` | `integer | null` | `-` | The specific fiscal year. Reports do not go beyond 2008. |

---

### `equity.fundamental.income_growth`

```python
data.equity.fundamental.income_growth(symbol=..., limit=None, period='annual')
```

Summary: Income Growth

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.income_growth` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/income_growth` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. |
| `period` | `no` | `string` | `annual` | Time period of the data to return. |

---

### `equity.fundamental.latest_attributes`

```python
data.equity.fundamental.latest_attributes(symbol=..., tag=...)
```

Summary: Latest Attributes

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.latest_attributes` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/latest_attributes` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `tag` | `yes` | `string` | `-` | Intrinio data tag ID or code. Multiple comma separated items allowed |

---

### `equity.fundamental.management`

```python
data.equity.fundamental.management(symbol=...)
```

Summary: Management

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.management` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/management` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |

---

### `equity.fundamental.management_compensation`

```python
data.equity.fundamental.management_compensation(symbol=..., year=-1)
```

Summary: Management Compensation

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.management_compensation` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/management_compensation` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `year` | `no` | `integer` | `-1` | Filters results by year, enter 0 for all data available. Default is the most recent year in the dataset, -1. |

---

### `equity.fundamental.management_discussion_analysis`

```python
data.equity.fundamental.management_discussion_analysis(symbol=..., calendar_year=None, calendar_period=None, include_tables=True, use_cache=True, raw_html=False)
```

Summary: Management Discussion Analysis

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.management_discussion_analysis` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/management_discussion_analysis` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `calendar_year` | `no` | `integer | null` | `-` | Calendar year of the report. By default, is the current year. If the calendar period is not provided, but the calendar year is, it will return the annual report. |
| `calendar_period` | `no` | `string | null` | `-` | Calendar period of the report. By default, is the most recent report available for the symbol. If no calendar year and no calendar period are provided, it will return the most recent report. |
| `include_tables` | `no` | `boolean` | `true` | Return tables formatted as markdown in the text. Default is True. |
| `use_cache` | `no` | `boolean` | `true` | When True, the file will be cached for use later. Default is True. |
| `raw_html` | `no` | `boolean` | `false` | When True, the raw HTML content of the entire filing will be returned. Default is False. Use this option to parse the document manually. |

---

### `equity.fundamental.metrics`

```python
data.equity.fundamental.metrics(symbol=..., ttm='only', period='annual', limit=None)
```

Summary: Metrics

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.metrics` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/metrics` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `ttm` | `no` | `string` | `only` | enum: include, exclude, only Specify whether to include, exclude, or only show TTM (Trailing Twelve Months) data. The default is 'only'. |
| `period` | `no` | `string` | `annual` | enum: q1, q2, q3, q4, fy, annual, quarter Specify the fiscal period for the data. Ignored when TTM is set to 'only'. |
| `limit` | `no` | `integer | null` | `-` | Only applicable when TTM is not set to 'only'. Defines the number of most recent reporting periods to return. The default is 5. |

---

### `equity.fundamental.ratios`

```python
data.equity.fundamental.ratios(symbol=..., limit=None, ttm='only', period='annual', fiscal_year=None)
```

Summary: Ratios

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.ratios` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/ratios` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return.; Only applicable when TTM is not set to 'only'. Defines the number of most recent reporting periods to return. The default is 5. |
| `ttm` | `no` | `string` | `only` | enum: include, exclude, only Specify whether to include, exclude, or only show TTM (Trailing Twelve Months) data. The default is 'only'. |
| `period` | `no` | `string` | `annual` | Specify the fiscal period for the data.; Time period of the data to return. |
| `fiscal_year` | `no` | `integer | null` | `-` | The specific fiscal year. Reports do not go beyond 2008. |

---

### `equity.fundamental.reported_financials`

```python
data.equity.fundamental.reported_financials(symbol=..., period='annual', statement_type='balance', limit=100, fiscal_year=None)
```

Summary: Reported Financials

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.reported_financials` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/reported_financials` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `period` | `no` | `string` | `annual` | Time period of the data to return. |
| `statement_type` | `no` | `string` | `balance` | The type of financial statement - i.e, balance, income, cash.; Cash flow statements are reported as YTD, Q4 is the same as FY. |
| `limit` | `no` | `integer | null` | `100` | The number of data entries to return. Although the response object contains multiple results, because of the variance in the fields, year-to-year and quarter-to-quarter, it is recommended to view results in small chunks. |
| `fiscal_year` | `no` | `integer | null` | `-` | The specific fiscal year. Reports do not go beyond 2008. |

---

### `equity.fundamental.revenue_per_geography`

```python
data.equity.fundamental.revenue_per_geography(symbol=..., period='annual')
```

Summary: Revenue Per Geography

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.revenue_per_geography` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/revenue_per_geography` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `period` | `no` | `string` | `annual` | Time period of the data to return. |

---

### `equity.fundamental.revenue_per_segment`

```python
data.equity.fundamental.revenue_per_segment(symbol=..., period='annual')
```

Summary: Revenue Per Segment

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.revenue_per_segment` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/revenue_per_segment` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `period` | `no` | `string` | `annual` | Time period of the data to return. |

---

### `equity.fundamental.search_attributes`

```python
data.equity.fundamental.search_attributes(query=..., limit=1000)
```

Summary: Search Attributes

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.search_attributes` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/search_attributes` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `yes` | `string` | `-` | Query to search for. |
| `limit` | `no` | `integer | null` | `1000` | The number of data entries to return. |

---

### `equity.fundamental.trailing_dividend_yield`

```python
data.equity.fundamental.trailing_dividend_yield(symbol=..., limit=252)
```

Summary: Trailing Dividend Yield

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.trailing_dividend_yield` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/trailing_dividend_yield` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `limit` | `no` | `integer | null` | `252` | The number of data entries to return. Default is 252, the number of trading days in a year. |

---

### `equity.fundamental.transcript`

```python
data.equity.fundamental.transcript(symbol=..., year=None, quarter=None)
```

Summary: Transcript

| Field | Value |
|---|---|
| Endpoint ID | `equity.fundamental.transcript` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/fundamental/transcript` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `year` | `no` | `integer | null` | `-` | Year of the earnings call transcript. |
| `quarter` | `no` | `integer | null` | `-` | Quarterly period of the earnings call transcript. |

---

### `equity.historical_market_cap`

```python
data.equity.historical_market_cap(symbol=..., start_time=None, end_time=None, interval='day')
```

Summary: Historical Market Cap

| Field | Value |
|---|---|
| Endpoint ID | `equity.historical_market_cap` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/historical_market_cap` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `interval` | `no` | `string` | `day` | enum: day, week, month, quarter, year None |

---

### `equity.market_snapshots`

```python
data.equity.market_snapshots(market='nasdaq', date=None)
```

Summary: Market Snapshots

| Field | Value |
|---|---|
| Endpoint ID | `equity.market_snapshots` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/market_snapshots` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `market` | `no` | `string` | `nasdaq` | enum: amex, ams, ase, asx, ath, bme, bru, bud, bue, cai, cnq, commodity, cph, crypto, dfm, doh, dus, etf, euronext, forex, hel, hkse, ice, iob, index, ist, jkt, jnb, jpx, kls, koe, ksc, kuw, lse, mex, mil, mutual_fund, nasdaq, neo, nse, nyse, nze, osl, otc, pnk, pra, ris, sao, sau, ses, set, sgo, shh, shz, six, sto, tai, tlv, tsx, two, vie, wse, xetra The market to fetch data for. |
| `date` | `no` | `string | null` | `-` | The date of the data. Can be a datetime or an ISO datetime string. Historical data appears to go back to mid-June 2022. Example: '2024-03-08T12:15:00+0400' |

---

### `equity.ownership.form_13f`

```python
data.equity.ownership.form_13f(symbol=..., date=None, limit=1)
```

Summary: Form 13F

| Field | Value |
|---|---|
| Endpoint ID | `equity.ownership.form_13f` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/ownership/form_13f` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. A CIK can be used. |
| `date` | `no` | `string | null` | `-` | A specific date to get data for. The date represents the end of the reporting period. All form 13F-HR filings are based on the calendar year and are reported quarterly. If a date is not supplied, the most recent filing is returned. Submissions beginning 2013-06-30 are supported. |
| `limit` | `no` | `integer | null` | `1` | The number of data entries to return. The number of previous filings to return. The date parameter takes priority over this parameter. |

---

### `equity.ownership.government_trades`

```python
data.equity.ownership.government_trades(symbol=None, chamber='all', limit=None)
```

Summary: Government Trades

| Field | Value |
|---|---|
| Endpoint ID | `equity.ownership.government_trades` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/ownership/government_trades` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `chamber` | `no` | `string` | `all` | Government Chamber. |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. |

---

### `equity.ownership.insider_trading`

```python
data.equity.ownership.insider_trading(symbol=..., limit=None, start_time=None, end_time=None, transaction_type=None, statistics=False, ownership_type=None, sort_by='updated_on', use_cache=True, summary=False)
```

Summary: Insider Trading

| Field | Value |
|---|---|
| Endpoint ID | `equity.ownership.insider_trading` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/ownership/insider_trading` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `transaction_type` | `no` | `string | null` | `-` | Type of the transaction. |
| `statistics` | `no` | `boolean` | `false` | Flag to return summary statistics for the given symbol. Setting as True will ignore other parameters except symbol. |
| `ownership_type` | `no` | `string | null` | `-` | Type of ownership. |
| `sort_by` | `no` | `string | null` | `updated_on` | Field to sort by. |
| `use_cache` | `no` | `boolean` | `true` | Persist the data locally for future use. Default is True. Each form submission is an individual download and the SEC limits the number of concurrent downloads. This prevents the same file from being downloaded multiple times. |
| `summary` | `no` | `boolean` | `false` | Return a summary of the insider activity instead of the individuals. |

---

### `equity.ownership.institutional`

```python
data.equity.ownership.institutional(symbol=..., year=None, quarter=None)
```

Summary: Institutional

| Field | Value |
|---|---|
| Endpoint ID | `equity.ownership.institutional` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/ownership/institutional` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `year` | `no` | `integer | null` | `-` | Calendar year for the data. If not provided, the latest year is used. |
| `quarter` | `no` | `integer | null` | `-` | Calendar quarter for the data. Valid values are 1, 2, 3, or 4. If not provided, the quarter previous to the current quarter is used. |

---

### `equity.ownership.major_holders`

```python
data.equity.ownership.major_holders(symbol=..., year=None, quarter=None, page=None, limit=None)
```

Summary: Major Holders

| Field | Value |
|---|---|
| Endpoint ID | `equity.ownership.major_holders` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/ownership/major_holders` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `year` | `no` | `integer | null` | `-` | Calendar year for the data. If not provided, the latest year is used. |
| `quarter` | `no` | `integer | null` | `-` | Calendar quarter for the data. Valid values are 1, 2, 3, or 4. If not provided, the quarter previous to the current quarter is used. |
| `page` | `no` | `integer | null` | `-` | Page number, used in conjunction with the limit. The default is 0. |
| `limit` | `no` | `integer | null` | `-` | Number of items to return per page. The default is 100, which is the maximum. |

---

### `equity.ownership.share_statistics`

```python
data.equity.ownership.share_statistics(symbol=...)
```

Summary: Share Statistics

| Field | Value |
|---|---|
| Endpoint ID | `equity.ownership.share_statistics` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/ownership/share_statistics` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |

---

### `equity.price.historical`

```python
data.equity.price.historical(symbol=..., start_time=None, end_time=None, interval='daily', market='a_share', adjust='qfq', adjustment='splits_only', extended_hours=False, use_cache=True, start_clock_time=None, end_clock_time=None, timezone='America/New_York', source='realtime', include_actions=True)
```

Summary: Historical

| Field | Value |
|---|---|
| Endpoint ID | `equity.price.historical` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/price/historical` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed; A Security identifier (Ticker, FIGI, ISIN, CUSIP, Intrinio ID). |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `interval` | `no` | `string | integer` | `daily` | Data granularity: daily, weekly, or monthly.; Time interval of the data to return.; Time interval of the data to return. The most recent trading day is not including in daily historical data. Intraday data is only available for the most recent trading day at 1 minute intervals.; Time interval of the data to return. Or, any integer (entered as a string) representing the number of minutes. Default is daily data. There is no extended hours data, and intraday data is limited to after April 12 2022. |
| `market` | `no` | `string` | `a_share` | enum: a_share, hk Market selection. 'a_share' for mainland China A-shares, 'hk' for Hong Kong stocks. |
| `adjust` | `no` | `string` | `qfq` | enum: , qfq, hfq Price adjustment method. '' for unadjusted, 'qfq' for forward-adjusted (前复权), 'hfq' for backward-adjusted (后复权). |
| `adjustment` | `no` | `string` | `splits_only` | The adjustment factor to apply. 'splits_only' is not supported for intraday data.; Type of adjustment for historical prices. Only applies to daily data.; The adjustment factor to apply. Only valid for daily data.; The adjustment factor to apply. Default is splits only. |
| `extended_hours` | `no` | `boolean` | `false` | Include Pre and Post market data. |
| `use_cache` | `no` | `boolean` | `true` | When True, the company directories will be cached for 24 hours and are used to validate symbols. The results of the function are not cached. Set as False to bypass. |
| `start_clock_time` | `no` | `string | null` | `-` | Return intervals starting at the specified time on the `start_date` formatted as 'HH:MM:SS'. |
| `end_clock_time` | `no` | `string | null` | `-` | Return intervals stopping at the specified time on the `end_date` formatted as 'HH:MM:SS'. |
| `timezone` | `no` | `string | null` | `America/New_York` | Timezone of the data, in the IANA format (Continent/City). |
| `source` | `no` | `string` | `realtime` | enum: realtime, delayed, nasdaq_basic The source of the data. |
| `include_actions` | `no` | `boolean` | `true` | Include dividends and stock splits in results. |

---

### `equity.price.performance`

```python
data.equity.price.performance(symbol=...)
```

Summary: Performance

| Field | Value |
|---|---|
| Endpoint ID | `equity.price.performance` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/price/performance` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |

---

### `equity.price.quote`

```python
data.equity.price.quote(symbol=..., market='a_share', use_cache=True, source='iex')
```

Summary: Quote

| Field | Value |
|---|---|
| Endpoint ID | `equity.price.quote` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/price/quote` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed; A Security identifier (Ticker, FIGI, ISIN, CUSIP, Intrinio ID). |
| `market` | `no` | `string` | `a_share` | enum: a_share, hk Market selection. 'a_share' for mainland China A-shares, 'hk' for Hong Kong stocks. |
| `use_cache` | `no` | `boolean` | `true` | When True, the company directories will be cached for 24 hours and are used to validate symbols. The results of the function are not cached. Set as False to bypass. |
| `source` | `no` | `string` | `iex` | enum: iex, bats, bats_delayed, utp_delayed, cta_a_delayed, cta_b_delayed, intrinio_mx, intrinio_mx_plus, delayed_sip Source of the data. |

---

### `equity.profile`

```python
data.equity.profile(symbol=...)
```

Summary: Profile

| Field | Value |
|---|---|
| Endpoint ID | `equity.profile` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/profile` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |

---

### `equity.screener`

```python
data.equity.screener(metric='overview', exchange='all', index='all', sector='all', industry='all', mktcap='all', recommendation='all', signal=None, preset=None, limit=None, mktcap_min=None, mktcap_max=None, price_min=None, price_max=None, beta_min=None, beta_max=None, volume_min=None, volume_max=None, dividend_min=None, dividend_max=None, country=None, is_etf=None, is_active=None, is_fund=None, all_share_classes=None, exsubcategory='all', region='all', body=...)
```

Summary: Screener

| Field | Value |
|---|---|
| Endpoint ID | `equity.screener` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/screener` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `metric` | `no` | `string` | `overview` | enum: overview, valuation, financial, ownership, performance, technical The data group to return, default is 'overview'. |
| `exchange` | `no` | `string | null` | `all` | Filter by exchange. |
| `index` | `no` | `string` | `all` | enum: all, dow, nasdaq, sp500, russell Filter by index. |
| `sector` | `no` | `string | null` | `all` | Filter by sector. |
| `industry` | `no` | `string | null` | `all` | Filter by industry. |
| `mktcap` | `no` | `string` | `all` | Filter by market cap. Mega - > 200B Large - 10B - 200B Mid - 2B - 10B Small - 300M - 2B Micro - 50M - 300M Nano - < 50M |
| `recommendation` | `no` | `string` | `all` | Filter by analyst recommendation.; Filter by consensus analyst action. Multiple comma separated items allowed. |
| `signal` | `no` | `string | null` | `-` | The Finviz screener signal to use. When no parameters are provided, the screener defaults to 'top_gainers'. Available signals are: channel: both support and resistance trendlines are horizontal channel_down: both support and resistance trendlines slope downward channel_up: both support and resistance trendlines slope upward double_bottom: stock with 'W' shape that indicates a bullish reversal in trend double_top: stock with 'M' shape that indicates a bearish reversal in trend downgrades: stocks downgraded by analysts today earnings_after: companies reporting earnings today, after market close earnings_before: companies reporting earnings today, before market open head_shoulders: chart formation that predicts a bullish-to-bearish trend reversal head_shoulders_inverse: chart formation that predicts a bearish-to-bullish trend reversal horizontal_sr: horizontal channel of price range between support and resistance trendlines major_news: stocks with the highest news coverage today most_active: stocks with the highest trading volume today most_volatile: stocks with the highest widest high/low trading range today multiple_bottom: same as double_bottom hitting more lows multiple_top: same as double_top hitting more highs new_high: stocks making 52-week high today new_low: stocks making 52-week low today overbought: stock is becoming overvalued and may experience a pullback. oversold: oversold stocks may represent a buying opportunity for investors recent_insider_buying: stocks with recent insider buying activity recent_insider_selling: stocks with recent insider selling activity tl_resistance: once a rising trendline is broken tl_support: once a falling trendline is broken top_gainers: stocks with the highest price gain percent today top_losers: stocks with the highest price percent loss today triangle_ascending: upward trendline support and horizontal trendline resistance triangle_descending: horizontal trendline support and downward trendline resistance unusual_volume: stocks with unusually high volume today - the highest relative volume ratio upgrades: stocks upgraded by analysts today wedge: upward trendline support, downward trendline resistance (continuation) wedge_down: downward trendline support and downward trendline resistance (reversal) wedge_up: upward trendline support and upward trendline resistance (reversal) |
| `preset` | `no` | `string | null` | `-` | A configured preset file to use for the query. This overrides all other query parameters except 'metric', and 'limit'. Presets (.ini text files) can be created and modified in the '~/OpenBBUserData/finviz/presets' directory. If the path does not exist, it will be created and populated with the default presets on the first run. Refer to the file, 'screener_template.ini', for the format and options. Note: Syntax of parameters in preset files must follow the template file exactly - i.e, Analyst Recom. = Strong Buy (1) |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return.; Limit the number of results to return.; Limit the number of results returned. Default is, 200. Set to, 0, for all results. |
| `mktcap_min` | `no` | `integer | null` | `-` | Filter by market cap greater than this value. |
| `mktcap_max` | `no` | `integer | null` | `-` | Filter by market cap less than this value. |
| `price_min` | `no` | `number | null` | `-` | Filter by price greater than this value. |
| `price_max` | `no` | `number | null` | `-` | Filter by price less than this value. |
| `beta_min` | `no` | `number | null` | `-` | Filter by a beta greater than this value. |
| `beta_max` | `no` | `number | null` | `-` | Filter by a beta less than this value. |
| `volume_min` | `no` | `integer | null` | `-` | Filter by volume greater than this value. |
| `volume_max` | `no` | `integer | null` | `-` | Filter by volume less than this value. |
| `dividend_min` | `no` | `number | null` | `-` | Filter by dividend amount greater than this value. |
| `dividend_max` | `no` | `number | null` | `-` | Filter by dividend amount less than this value. |
| `country` | `no` | `string | null` | `-` | Filter by country. Accepts ISO 3166-1 alpha-2 codes (e.g., 'US', 'DE'), alpha-3 codes (e.g., 'USA'), or country names (e.g., 'United States', 'united_states'). |
| `is_etf` | `no` | `boolean | null` | `-` | If true, includes ETFs. |
| `is_active` | `no` | `boolean | null` | `-` | If false, returns only inactive tickers. |
| `is_fund` | `no` | `boolean | null` | `-` | If true, includes funds. |
| `all_share_classes` | `no` | `boolean | null` | `-` | If true, includes all share classes of a equity. |
| `exsubcategory` | `no` | `string` | `all` | Filter by exchange subcategory. - NGS - Nasdaq Global Select Market - NGM - Nasdaq Global Market - NCM - Nasdaq Capital Market - ADR - American Depository Receipt Multiple comma separated items allowed. |
| `region` | `no` | `string` | `all` | Filter by region. Multiple comma separated items allowed. |
| `body` | `no` | `object | string | null` | `-` | A formatted dictionary, or serialized JSON string, of additional filters to apply to the query. This parameter can be used as an alternative to preset files, and is ignored when a preset is supplied. Invalid entries will raise an error. Syntax should follow the 'screener_template.ini' file. |

---

### `equity.search`

```python
data.equity.search(query='', is_symbol=False, use_cache=True, active=True, limit=10000, is_etf=False, is_fund=False)
```

Summary: Search

| Field | Value |
|---|---|
| Endpoint ID | `equity.search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `no` | `string` | `` | Search query. |
| `is_symbol` | `no` | `boolean` | `false` | Whether to search by ticker symbol.; Whether the query is a symbol. Defaults to False. |
| `use_cache` | `no` | `boolean` | `true` | Whether to use the cache or not.; Whether to use a cached request. The list of companies is cached for two days. |
| `active` | `no` | `boolean` | `true` | When true, return companies that are actively traded (having stock prices within the past 14 days). When false, return companies that are not actively traded or never have been traded. |
| `limit` | `no` | `integer | null` | `10000` | The number of data entries to return. |
| `is_etf` | `no` | `boolean` | `false` | If True, returns only ETFs. |
| `is_fund` | `no` | `boolean` | `false` | Whether to direct the search to the list of mutual funds and ETFs. |

---

### `equity.shorts.fails_to_deliver`

```python
data.equity.shorts.fails_to_deliver(symbol=..., limit=24, skip_reports=0, use_cache=True)
```

Summary: Fails To Deliver

| Field | Value |
|---|---|
| Endpoint ID | `equity.shorts.fails_to_deliver` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/shorts/fails_to_deliver` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `limit` | `no` | `integer | null` | `24` | Limit the number of reports to parse, from most recent. Approximately 24 reports per year, going back to 2009. |
| `skip_reports` | `no` | `integer | null` | `0` | Skip N number of reports from current. A value of 1 will skip the most recent report. |
| `use_cache` | `no` | `boolean | null` | `true` | Whether or not to use cache for the request, default is True. Each reporting period is a separate URL, new reports will be added to the cache. |

---

### `equity.shorts.short_interest`

```python
data.equity.shorts.short_interest(symbol=...)
```

Summary: Short Interest

| Field | Value |
|---|---|
| Endpoint ID | `equity.shorts.short_interest` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/equity/shorts/short_interest` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
