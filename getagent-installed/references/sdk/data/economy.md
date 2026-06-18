# Economy Data Reference

Use this file when an agent needs detailed signatures and parameter
rules for one DataSDK domain. All generated `getagent.data` endpoints
are callable through the DataSDK wrapper.

## Contents
- [`economy.available_indicators`](#economyavailable-indicators)
- [`economy.balance_of_payments`](#economybalance-of-payments)
- [`economy.calendar`](#economycalendar)
- [`economy.central_bank_holdings`](#economycentral-bank-holdings)
- [`economy.composite_leading_indicator`](#economycomposite-leading-indicator)
- [`economy.country_profile`](#economycountry-profile)
- [`economy.cpi`](#economycpi)
- [`economy.direction_of_trade`](#economydirection-of-trade)
- [`economy.export_destinations`](#economyexport-destinations)
- [`economy.fomc_documents`](#economyfomc-documents)
- [`economy.fred_regional`](#economyfred-regional)
- [`economy.fred_release_table`](#economyfred-release-table)
- [`economy.fred_search`](#economyfred-search)
- [`economy.fred_series`](#economyfred-series)
- [`economy.gdp.forecast`](#economygdpforecast)
- [`economy.gdp.nominal`](#economygdpnominal)
- [`economy.gdp.real`](#economygdpreal)
- [`economy.house_price_index`](#economyhouse-price-index)
- [`economy.indicators`](#economyindicators)
- [`economy.interest_rates`](#economyinterest-rates)
- [`economy.money_measures`](#economymoney-measures)
- [`economy.pce`](#economypce)
- [`economy.primary_dealer_fails`](#economyprimary-dealer-fails)
- [`economy.primary_dealer_positioning`](#economyprimary-dealer-positioning)
- [`economy.retail_prices`](#economyretail-prices)
- [`economy.risk_premium`](#economyrisk-premium)
- [`economy.share_price_index`](#economyshare-price-index)
- [`economy.shipping.chokepoint_info`](#economyshippingchokepoint-info)
- [`economy.shipping.chokepoint_volume`](#economyshippingchokepoint-volume)
- [`economy.shipping.port_info`](#economyshippingport-info)
- [`economy.shipping.port_volume`](#economyshippingport-volume)
- [`economy.survey.bls_search`](#economysurveybls-search)
- [`economy.survey.bls_series`](#economysurveybls-series)
- [`economy.survey.economic_conditions_chicago`](#economysurveyeconomic-conditions-chicago)
- [`economy.survey.inflation_expectations`](#economysurveyinflation-expectations)
- [`economy.survey.manufacturing_outlook_ny`](#economysurveymanufacturing-outlook-ny)
- [`economy.survey.manufacturing_outlook_texas`](#economysurveymanufacturing-outlook-texas)
- [`economy.survey.nonfarm_payrolls`](#economysurveynonfarm-payrolls)
- [`economy.survey.sloos`](#economysurveysloos)
- [`economy.survey.university_of_michigan`](#economysurveyuniversity-of-michigan)
- [`economy.total_factor_productivity`](#economytotal-factor-productivity)
- [`economy.unemployment`](#economyunemployment)

## Endpoint reference

### `economy.available_indicators`

```python
data.economy.available_indicators(use_cache=True, query=None, dataflows=None, keywords=None, symbol=None)
```

Summary: Available Indicators

| Field | Value |
|---|---|
| Endpoint ID | `economy.available_indicators` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/available_indicators` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `use_cache` | `no` | `boolean` | `true` | Whether to use cache or not, by default is True The cache of indicator symbols will persist for one week. |
| `query` | `no` | `string | null` | `-` | The search query string. Multiple search phrases can be separated by semicolons. Each phrase can use AND (+) and OR (| ) operators, as well as quoted phrases. Semicolon separation allows commas to be used within search phrases. Multiple comma separated items allowed. |
| `dataflows` | `no` | `string | array | null` | `-` | accepts array values List of IMF dataflow IDs to filter the indicators. Use semicolons to separate multiple dataflow IDs. Multiple comma separated items allowed. |
| `keywords` | `no` | `string | array | null` | `-` | accepts array values List of keywords to filter results. Each keyword is a single word that must appear in the indicator's label or description. Keywords prefixed with 'not' will exclude indicators containing that word (e.g., 'not USD' excludes indicators with 'USD' in them). Multiple comma separated items allowed. |
| `symbol` | `no` | `string | null` | `-` | Dummy field to allow grouping by symbol. Multiple comma separated items allowed. |

---

### `economy.balance_of_payments`

```python
data.economy.balance_of_payments(start_time=None, end_time=None, report_type='main', frequency='monthly', country=None)
```

Summary: Balance Of Payments

| Field | Value |
|---|---|
| Endpoint ID | `economy.balance_of_payments` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/balance_of_payments` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `report_type` | `no` | `string` | `main` | enum: main, summary, services, investment_income, direct_investment, portfolio_investment, other_investment The report type, the level of detail in the data. |
| `frequency` | `no` | `string` | `monthly` | enum: monthly, quarterly The frequency of the data. Monthly is valid only for ['main', 'summary']. |
| `country` | `no` | `string` | `-` | The country/region of the data. This parameter will override the 'report_type' parameter.; The country to get data. Enter as a 3-letter ISO country code, default is USA. |

---

### `economy.calendar`

```python
data.economy.calendar(start_time=None, end_time=None, release_id=None, country=None, importance=None, group=None, calendar_id=None)
```

Summary: Calendar

| Field | Value |
|---|---|
| Endpoint ID | `economy.calendar` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/calendar` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `release_id` | `no` | `integer | null` | `-` | Filter by release ID. |
| `country` | `no` | `string | null` | `-` | Country of the event. Accepts country names, ISO 3166-1 alpha-2/alpha-3 codes. Multiple comma-separated values allowed. Multiple comma separated items allowed.; Country of the event. Multiple comma separated items allowed. |
| `importance` | `no` | `string | null` | `-` | Importance of the event. |
| `group` | `no` | `string | null` | `-` | Grouping of events. |
| `calendar_id` | `no` | `integer | string | null` | `-` | Get events by TradingEconomics Calendar ID. Multiple comma separated items allowed. |

---

### `economy.central_bank_holdings`

```python
data.economy.central_bank_holdings(date=None, holding_type='all_treasury', summary=False, cusip=None, wam=False, monthly=False)
```

Summary: Central Bank Holdings

| Field | Value |
|---|---|
| Endpoint ID | `economy.central_bank_holdings` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/central_bank_holdings` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `date` | `no` | `string | null` | `-` | A specific date to get data for. |
| `holding_type` | `no` | `string` | `all_treasury` | Type of holdings to return. |
| `summary` | `no` | `boolean` | `false` | If True, returns historical weekly summary by holding type. This parameter takes priority over other parameters. |
| `cusip` | `no` | `string | null` | `-` | Multiple comma separated items allowed. |
| `wam` | `no` | `boolean` | `false` | If True, returns weighted average maturity aggregated by agency or treasury securities. This parameter takes priority over `holding_type`, `cusip`, and `monthly`. |
| `monthly` | `no` | `boolean` | `false` | If True, returns historical data for all Treasury securities at a monthly interval. This parameter takes priority over other parameters, except `wam`. Only valid when `holding_type` is set to: 'all_treasury', 'bills', 'notesbonds', 'frn', 'tips'. |

---

### `economy.composite_leading_indicator`

```python
data.economy.composite_leading_indicator(start_time=None, end_time=None, country='g20', adjustment='amplitude', growth_rate=False)
```

Summary: Composite Leading Indicator

| Field | Value |
|---|---|
| Endpoint ID | `economy.composite_leading_indicator` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/composite_leading_indicator` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `country` | `no` | `string` | `g20` | Country to get the CLI for, default is G20. Multiple comma separated items allowed. |
| `adjustment` | `no` | `string` | `amplitude` | Adjustment of the data, either 'amplitude' or 'normalized'. Default is amplitude. |
| `growth_rate` | `no` | `boolean` | `false` | Return the 1-year growth rate (%) of the CLI, default is False. |

---

### `economy.country_profile`

```python
data.economy.country_profile(country=..., latest=True, use_cache=True)
```

Summary: Country Profile

| Field | Value |
|---|---|
| Endpoint ID | `economy.country_profile` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/country_profile` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `country` | `yes` | `string` | `-` | The country to get data. Multiple comma separated items allowed |
| `latest` | `no` | `boolean` | `true` | If True, return only the latest data. If False, return all available data for each indicator. |
| `use_cache` | `no` | `boolean` | `true` | If True, the request will be cached for one day.Using cache is recommended to avoid needlessly requesting the same data. |

---

### `economy.cpi`

```python
data.economy.cpi(start_time=None, end_time=None, country='united_states', transform='yoy', frequency='monthly', harmonized=False, expenditure='total', limit=None)
```

Summary: Cpi

| Field | Value |
|---|---|
| Endpoint ID | `economy.cpi` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/cpi` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `country` | `no` | `string` | `united_states` | The country to get data. Multiple comma separated items allowed |
| `transform` | `no` | `string` | `yoy` | Transformation of the CPI data. |
| `frequency` | `no` | `string` | `monthly` | enum: annual, quarter, monthly The frequency of the data. |
| `harmonized` | `no` | `boolean` | `false` | If true, returns harmonized data. |
| `expenditure` | `no` | `string` | `total` | Expenditure component of CPI. |
| `limit` | `no` | `integer | null` | `-` | Maximum number of records to retrieve per series and country. If None, retrieves all available records. |

---

### `economy.direction_of_trade`

```python
data.economy.direction_of_trade(start_time=None, end_time=None, country=None, counterpart=None, direction='balance', frequency='month', limit=None)
```

Summary: Direction Of Trade

| Field | Value |
|---|---|
| Endpoint ID | `economy.direction_of_trade` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/direction_of_trade` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `country` | `no` | `string | null` | `-` | The country to get data. None is an equiavlent to 'all'. If 'all' is used, the counterpart field cannot be 'all'. Multiple comma separated items allowed |
| `counterpart` | `no` | `string | null` | `-` | Counterpart country to the trade. None is an equiavlent to 'all'. If 'all' is used, the country field cannot be 'all'. Multiple comma separated items allowed |
| `direction` | `no` | `string` | `balance` | Trade direction. Use 'all' to get all data for this dimension. |
| `frequency` | `no` | `string` | `month` | The frequency of the data. |
| `limit` | `no` | `integer | null` | `-` | Limit the number of results returned, the most recent data points first. |

---

### `economy.export_destinations`

```python
data.economy.export_destinations(country=...)
```

Summary: Export Destinations

| Field | Value |
|---|---|
| Endpoint ID | `economy.export_destinations` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/export_destinations` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `country` | `yes` | `string` | `-` | The country to get data. Multiple comma separated items allowed |

---

### `economy.fomc_documents`

```python
data.economy.fomc_documents(year=None, document_type=None)
```

Summary: Fomc Documents

| Field | Value |
|---|---|
| Endpoint ID | `economy.fomc_documents` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/fomc_documents` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `year` | `no` | `integer | null` | `-` | The year of FOMC documents to retrieve. If None, all years since 1959 are returned. |
| `document_type` | `no` | `string | null` | `-` | Filter by document type. Default is all. Choose from: all, monetary_policy, minutes, projections, materials, press_release, press_conference, agenda, transcript, speaker_key, beige_book, teal_book, green_book, blue_book, red_book |

---

### `economy.fred_regional`

```python
data.economy.fred_regional(symbol=..., start_time=None, end_time=None, limit=100000, is_series_group=False, region_type=None, season='nsa', units=None, frequency=None, aggregation_method='eop', transform=None)
```

Summary: Fred Regional

| Field | Value |
|---|---|
| Endpoint ID | `economy.fred_regional` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/fred_regional` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for.; For this function, it is the series_group ID or series ID. If the symbol provided is for a series_group, set the `is_series_group` parameter to True. Not all series that are in FRED have geographical data. |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `limit` | `no` | `integer | null` | `100000` | The number of data entries to return. |
| `is_series_group` | `no` | `boolean` | `false` | When True, the symbol provided is for a series_group, else it is for a series ID. |
| `region_type` | `no` | `string | null` | `-` | The type of regional data. Parameter is only valid when `is_series_group` is True. |
| `season` | `no` | `string` | `nsa` | The seasonal adjustments to the data. Parameter is only valid when `is_series_group` is True. |
| `units` | `no` | `string | null` | `-` | The units of the data. This should match the units returned from searching by series ID. An incorrect field will not necessarily return an error. Parameter is only valid when `is_series_group` is True. |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert high frequency data to lower frequency. None = No change a = Annual q = Quarterly m = Monthly w = Weekly d = Daily wef = Weekly, Ending Friday weth = Weekly, Ending Thursday wew = Weekly, Ending Wednesday wetu = Weekly, Ending Tuesday wem = Weekly, Ending Monday wesu = Weekly, Ending Sunday wesa = Weekly, Ending Saturday bwew = Biweekly, Ending Wednesday bwem = Biweekly, Ending Monday |
| `aggregation_method` | `no` | `string | null` | `eop` | A key that indicates the aggregation method used for frequency aggregation. This parameter has no affect if the frequency parameter is not set. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |

---

### `economy.fred_release_table`

```python
data.economy.fred_release_table(release_id=..., element_id=None, date=None)
```

Summary: Fred Release Table

| Field | Value |
|---|---|
| Endpoint ID | `economy.fred_release_table` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/fred_release_table` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `release_id` | `yes` | `string` | `-` | The ID of the release. Use `fred_search` to find releases. |
| `element_id` | `no` | `string | null` | `-` | The element ID of a specific table in the release. |
| `date` | `no` | `string | null` | `-` | A specific date to get data for. Multiple comma separated items allowed |

---

### `economy.fred_search`

```python
data.economy.fred_search(query=None, search_type='full_text', release_id=None, limit=None, offset=0, order_by='observation_end', sort_order='desc', filter_variable=None, filter_value=None, tag_names=None, exclude_tag_names=None, series_id=None)
```

Summary: Fred Search

| Field | Value |
|---|---|
| Endpoint ID | `economy.fred_search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/fred_search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `no` | `string | null` | `-` | The search word(s). |
| `search_type` | `no` | `string` | `full_text` | enum: full_text, series_id, release The type of search to perform. Automatically set to 'release' when a 'release_id' is provided. |
| `release_id` | `no` | `integer | null` | `-` | A specific release ID to target. |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. (1-1000) |
| `offset` | `no` | `integer | null` | `0` | Offset the results in conjunction with limit. This parameter is ignored When search_type is 'release'. |
| `order_by` | `no` | `string` | `observation_end` | enum: search_rank, series_id, title, units, frequency, seasonal_adjustment, realtime_start, realtime_end, last_updated, observation_start, observation_end, popularity, group_popularity Order the results by a specific attribute. The default is 'observation_end'. |
| `sort_order` | `no` | `string` | `desc` | Sort the 'order_by' item in ascending or descending order. The default is 'desc'. |
| `filter_variable` | `no` | `string | null` | `-` | Filter by an attribute. |
| `filter_value` | `no` | `string | null` | `-` | String value to filter the variable by. Used in conjunction with filter_variable. This parameter is ignored when search_type is 'release'. |
| `tag_names` | `no` | `string | null` | `-` | A semicolon delimited list of tag names that series match all of. Example: 'japan;imports' This parameter is ignored when search_type is 'release'. Multiple comma separated items allowed. |
| `exclude_tag_names` | `no` | `string | null` | `-` | A semicolon delimited list of tag names that series match none of. Example: 'imports;services'. Requires that variable tag_names also be set to limit the number of matching series. This parameter is ignored when search_type is 'release'. Multiple comma separated items allowed. |
| `series_id` | `no` | `string | null` | `-` | A FRED Series ID to return series group information for. This returns the required information to query for regional data. Not all series that are in FRED have geographical data. Entering a value for series_id will override all other parameters. Multiple series_ids can be separated by commas. |

---

### `economy.fred_series`

```python
data.economy.fred_series(symbol=..., start_time=None, end_time=None, limit=100000, frequency=None, aggregation_method='eop', transform=None, all_pages=False, sleep=1.0)
```

Summary: Fred Series

| Field | Value |
|---|---|
| Endpoint ID | `economy.fred_series` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/fred_series` |
| SDK | `supported` |
| Host | `supported` |
| Notes | Replacement target for future data.macro.* facade work. |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `limit` | `no` | `integer | null` | `100000` | The number of data entries to return. |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert high frequency data to lower frequency. None = No change a = Annual q = Quarterly m = Monthly w = Weekly d = Daily wef = Weekly, Ending Friday weth = Weekly, Ending Thursday wew = Weekly, Ending Wednesday wetu = Weekly, Ending Tuesday wem = Weekly, Ending Monday wesu = Weekly, Ending Sunday wesa = Weekly, Ending Saturday bwew = Biweekly, Ending Wednesday bwem = Biweekly, Ending Monday |
| `aggregation_method` | `no` | `string | null` | `eop` | A key that indicates the aggregation method used for frequency aggregation. This parameter has no affect if the frequency parameter is not set. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |
| `all_pages` | `no` | `boolean | null` | `false` | Returns all pages of data from the API call at once. |
| `sleep` | `no` | `number | null` | `1.0` | Time to sleep between requests to avoid rate limiting. |

---

### `economy.gdp.forecast`

```python
data.economy.gdp.forecast(start_time=None, end_time=None, country='all', frequency='annual', units='volume')
```

Summary: Forecast

| Field | Value |
|---|---|
| Endpoint ID | `economy.gdp.forecast` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/gdp/forecast` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `country` | `no` | `string` | `all` | Country, or countries, to get forward GDP projections for. Default is all. Multiple comma separated items allowed. |
| `frequency` | `no` | `string` | `annual` | Frequency of the data, default is annual. |
| `units` | `no` | `string` | `volume` | Units of the data, default is volume (chain linked volume, 2015). 'current_prices', 'volume', and 'capita' are expressed in USD; 'growth' as a percent; 'deflator' as an index. |

---

### `economy.gdp.nominal`

```python
data.economy.gdp.nominal(start_time=None, end_time=None, country='united_states', use_cache=True, frequency='quarter', units='level', price_base='current_prices')
```

Summary: Nominal

| Field | Value |
|---|---|
| Endpoint ID | `economy.gdp.nominal` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/gdp/nominal` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `country` | `no` | `string` | `united_states` | The country to get data.Use 'all' to get data for all available countries. |
| `use_cache` | `no` | `boolean` | `true` | If True, the request will be cached for one day. Using cache is recommended to avoid needlessly requesting the same data. |
| `frequency` | `no` | `string` | `quarter` | enum: quarter, annual Frequency of the data. |
| `units` | `no` | `string` | `level` | enum: level, index, capita The unit of measurement for the data.Both 'level' and 'capita' (per) are measured in USD. |
| `price_base` | `no` | `string` | `current_prices` | enum: current_prices, volume Price base for the data, volume is chain linked volume. |

---

### `economy.gdp.real`

```python
data.economy.gdp.real(start_time=None, end_time=None, country='united_states', use_cache=True, frequency='quarter')
```

Summary: Real

| Field | Value |
|---|---|
| Endpoint ID | `economy.gdp.real` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/gdp/real` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `country` | `no` | `string` | `united_states` | The country to get data.Use 'all' to get data for all available countries. |
| `use_cache` | `no` | `boolean` | `true` | If True, the request will be cached for one day. Using cache is recommended to avoid needlessly requesting the same data. |
| `frequency` | `no` | `string` | `quarter` | enum: quarter, annual Frequency of the data. |

---

### `economy.house_price_index`

```python
data.economy.house_price_index(start_time=None, end_time=None, country='united_states', frequency='quarter', transform='index')
```

Summary: House Price Index

| Field | Value |
|---|---|
| Endpoint ID | `economy.house_price_index` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/house_price_index` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `country` | `no` | `string` | `united_states` | The country to get data. Multiple comma separated items allowed |
| `frequency` | `no` | `string` | `quarter` | The frequency of the data. |
| `transform` | `no` | `string` | `index` | Transformation of the CPI data. Period represents the change since previous. Defaults to change from one year ago (yoy). |

---

### `economy.indicators`

```python
data.economy.indicators(symbol=..., start_time=None, end_time=None, country=None, frequency=None, transform=None, use_cache=True, dimension_values=None, limit=None, pivot=False)
```

Summary: Indicators

| Field | Value |
|---|---|
| Endpoint ID | `economy.indicators` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/indicators` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string | null` | `-` | Symbol to get data for. Multiple comma separated items allowed; Symbol to get data for. The base symbol for the indicator (e.g. GDP, CPI, etc.). Use `available_indicators()` to get a list of available symbols.; Symbol to get data for. Symbol format: 'dataflow::identifier' where identifier is either: - A table ID (starts with 'H_') for hierarchical table data - An indicator code for individual indicator data Examples: - 'BOP::H_BOP_BOP_AGG_STANDARD_PRESENTATION' - Balance of Payments table - 'BOP_AGG::GS_CD,BOP_AGG::GS_DB' - Multiple BOP_AGG indicators (Goods & Services) - 'IL::RGV_REVS' - Gold reserves in millions of fine troy ounces - 'WEO::NGDP_RPCH' - Real GDP growth (annual only) - 'WEO::POILBRE' - Brent crude oil price (use country='G001' for world) - 'PCPS::PGOLD' - Gold price per troy ounce (monthly/quarterly available) Use `obb.economy.available_indicators()` to discover symbols. Use `obb.economy.imf_utils.list_tables()` to see available tables. |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `country` | `no` | `string | null` | `-` | The country to get data. Multiple comma separated items allowed; The country to get data. ISO country codes or country names.; ISO3 country code(s). Use comma-separated values for multiple countries. Validated against the dataflow's available countries via constraint API. |
| `frequency` | `no` | `string | null` | `-` | The frequency of the data.; The frequency of the data, default is 'quarter'. Only valid when 'symbol' is 'main'.; The frequency of the data. Choices vary by indicator and country. Common options: 'annual', 'quarter', 'month'. Use 'all' or '*' to return all available frequencies. Direct IMF codes (e.g., 'A', 'Q', 'M') are also accepted. |
| `transform` | `no` | `string | null` | `-` | The transformation to apply to the data, default is None. tpop: Change from previous period toya: Change from one year ago tusd: Values as US dollars tpgp: Values as a percent of GDP Only 'tpop' and 'toya' are applicable to all indicators. Applying transformations across multiple indicators/countries may produce unexpected results. This is because not all indicators are compatible with all transformations, and the original units and scale differ between entities. `tusd` should only be used where values are currencies.; Transformation to apply to the data. User-friendly options: 'index' (raw values), 'yoy' (year-over-year %), 'period' (period-over-period %). Use 'all' or '*' to return all available transformations. Direct IMF codes (e.g., 'USD', 'IX') are also accepted. |
| `use_cache` | `no` | `boolean` | `true` | If True, the request will be cached for one day. Using cache is recommended to avoid needlessly requesting the same data. |
| `dimension_values` | `no` | `array | null` | `-` | accepts array values List of additional dimension filters in 'DIM_ID:DIM_VALUE' format. Parameter can be entered multiple times. |
| `limit` | `no` | `integer | null` | `-` | Maximum number of records to retrieve per series. |
| `pivot` | `no` | `boolean` | `false` | If True, pivots the data to presentation view with 'indicator' and 'country' as the index, date as values. |

---

### `economy.interest_rates`

```python
data.economy.interest_rates(start_time=None, end_time=None, country='united_states', duration='short', frequency='monthly')
```

Summary: Interest Rates

| Field | Value |
|---|---|
| Endpoint ID | `economy.interest_rates` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/interest_rates` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `country` | `no` | `string` | `united_states` | The country to get data. Multiple comma separated items allowed |
| `duration` | `no` | `string` | `short` | enum: immediate, short, long Duration of the interest rate. 'immediate' is the overnight rate, 'short' is the 3-month rate, and 'long' is the 10-year rate. |
| `frequency` | `no` | `string` | `monthly` | enum: monthly, quarter, annual Frequency to get interest rate for for. |

---

### `economy.money_measures`

```python
data.economy.money_measures(start_time=None, end_time=None, adjusted=True)
```

Summary: Money Measures

| Field | Value |
|---|---|
| Endpoint ID | `economy.money_measures` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/money_measures` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `adjusted` | `no` | `boolean | null` | `true` | Whether to return seasonally adjusted data. |

---

### `economy.pce`

```python
data.economy.pce(date=None, category='personal_income')
```

Summary: Pce

| Field | Value |
|---|---|
| Endpoint ID | `economy.pce` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/pce` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `date` | `no` | `string | null` | `-` | A specific date to get data for. Default is the latest report. Multiple comma separated items allowed |
| `category` | `no` | `string` | `personal_income` | The category to query. |

---

### `economy.primary_dealer_fails`

```python
data.economy.primary_dealer_fails(start_time=None, end_time=None, asset_class='all', unit='value')
```

Summary: Primary Dealer Fails

| Field | Value |
|---|---|
| Endpoint ID | `economy.primary_dealer_fails` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/primary_dealer_fails` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `asset_class` | `no` | `string` | `all` | enum: all, treasuries, tips, agency, mbs, corporate Asset class to return, default is 'all'. |
| `unit` | `no` | `string` | `value` | enum: value, percent Unit of the data returned to the 'value' field. Default is 'value', which represents millions of USD. 'percent' returns data as the percentage of the total fails-to-receive and fails-to-deliver, by asset class. |

---

### `economy.primary_dealer_positioning`

```python
data.economy.primary_dealer_positioning(start_time=None, end_time=None, category='treasuries')
```

Summary: Primary Dealer Positioning

| Field | Value |
|---|---|
| Endpoint ID | `economy.primary_dealer_positioning` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/primary_dealer_positioning` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `category` | `no` | `string` | `treasuries` | The category of asset to return, defaults to 'treasuries'. |

---

### `economy.retail_prices`

```python
data.economy.retail_prices(start_time=None, end_time=None, item=None, country='united_states', region='all_city', frequency='monthly', transform=None)
```

Summary: Retail Prices

| Field | Value |
|---|---|
| Endpoint ID | `economy.retail_prices` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/retail_prices` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `item` | `no` | `string | null` | `-` | The item or basket of items to query. |
| `country` | `no` | `string` | `united_states` | The country to get data. |
| `region` | `no` | `string` | `all_city` | The region to get average price levels for. |
| `frequency` | `no` | `string` | `monthly` | The frequency of the data. |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |

---

### `economy.risk_premium`

```python
data.economy.risk_premium()
```

Summary: Risk Premium

| Field | Value |
|---|---|
| Endpoint ID | `economy.risk_premium` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/risk_premium` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `economy.share_price_index`

```python
data.economy.share_price_index(start_time=None, end_time=None, country='united_states', frequency='monthly')
```

Summary: Share Price Index

| Field | Value |
|---|---|
| Endpoint ID | `economy.share_price_index` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/share_price_index` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `country` | `no` | `string` | `united_states` | The country to get data. Multiple comma separated items allowed |
| `frequency` | `no` | `string` | `monthly` | The frequency of the data. |

---

### `economy.shipping.chokepoint_info`

```python
data.economy.shipping.chokepoint_info(theme=None)
```

Summary: Chokepoint Info

| Field | Value |
|---|---|
| Endpoint ID | `economy.shipping.chokepoint_info` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/shipping/chokepoint_info` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `theme` | `no` | `string | null` | `-` | Theme for the map. Only valid if `openbb-charting` is installed and `chart` parameter is set to `true`. Default is the 'chart_style' setting in `user_settings.json`, if available, otherwise 'dark'. |

---

### `economy.shipping.chokepoint_volume`

```python
data.economy.shipping.chokepoint_volume(start_time=None, end_time=None, chokepoint=None)
```

Summary: Chokepoint Volume

| Field | Value |
|---|---|
| Endpoint ID | `economy.shipping.chokepoint_volume` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/shipping/chokepoint_volume` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `chokepoint` | `no` | `string | null` | `-` | Name of the chokepoint. Use `None` for all chokepoints. Choices are: - suez_canal - panama_canal - bosporus_strait - bab_el_mandeb_strait - malacca_strait - strait_of_hormuz - cape_of_good_hope - gibraltar_strait - dover_strait - oresund_strait - taiwan_strait - korea_strait - tsugaru_strait - luzon_strait - lombok_strait - ombai_strait - bohai_strait - torres_strait - sunda_strait - makassar_strait - magellan_strait - yucatan_channel - windward_passage - mona_passage Multiple comma separated items allowed. |

---

### `economy.shipping.port_info`

```python
data.economy.shipping.port_info(continent=None, country=None, port_code=None, limit=None)
```

Summary: Port Info

| Field | Value |
|---|---|
| Endpoint ID | `economy.shipping.port_info` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/shipping/port_info` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `continent` | `no` | `string | null` | `-` | Filter by continent. This parameter is ignored when a `country` is provided. |
| `country` | `no` | `string | null` | `-` | Country to focus on. Enter as a 3-letter ISO country code. This parameter supersedes `continent` if both are provided. |
| `port_code` | `no` | `string | null` | `-` | This is a dummy parameter to allow grouping in OpenBB Workspace widgets. |
| `limit` | `no` | `integer | null` | `-` | Limit the number of results returned. Limit is determined by the annual average number of vessels transiting through the port. If not provided, all ports are returned. |

---

### `economy.shipping.port_volume`

```python
data.economy.shipping.port_volume(start_time=None, end_time=None, port_code=None, country=None)
```

Summary: Port Volume

| Field | Value |
|---|---|
| Endpoint ID | `economy.shipping.port_volume` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/shipping/port_volume` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `port_code` | `no` | `string | null` | `-` | Port code to filter results by a specific port. This parameter is ignored if `country` parameter is provided. To get a list of available ports, use `obb.economy.shipping.port_info()`. Multiple comma separated items allowed. |
| `country` | `no` | `string | null` | `-` | Country to focus on. Enter as a 3-letter ISO country code. This parameter is overridden by `port_code` if both are provided. |

---

### `economy.survey.bls_search`

```python
data.economy.survey.bls_search(query='', category=None, include_extras=False, include_code_map=False)
```

Summary: Bls Search

| Field | Value |
|---|---|
| Endpoint ID | `economy.survey.bls_search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/survey/bls_search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `no` | `string` | `` | The search word(s). Use semi-colon to separate multiple queries as an & operator. |
| `category` | `no` | `string | null` | `-` | The category of BLS survey to search within. An empty search query will return all series within the category. Options are: cpi - Consumer Price Index pce - Personal Consumption Expenditure ppi - Producer Price Index ip - Industry Productivity jolts - Job Openings and Labor Turnover Survey nfp - Nonfarm Payrolls cps - Current Population Survey lfs - Labor Force Statistics wages - Wages ec - Employer Costs sla - State and Local Area Employment bed - Business Employment Dynamics tu - Time Use |
| `include_extras` | `no` | `boolean` | `false` | Include additional information in the search results. Extra fields returned are metadata and vary by survey. Fields are undefined strings that typically have names ending with '_code'. |
| `include_code_map` | `no` | `boolean` | `false` | When True, includes the complete code map for eaçh survey in the category, returned separately as a nested JSON to the `extras['results_metadata']` property of the response. Example content is the NAICS industry map for PPI surveys. Each code is a value within the 'symbol' of the time series. |

---

### `economy.survey.bls_series`

```python
data.economy.survey.bls_series(symbol=..., start_time=None, end_time=None, calculations=True, annual_average=False, aspects=False)
```

Summary: Bls Series

| Field | Value |
|---|---|
| Endpoint ID | `economy.survey.bls_series` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/survey/bls_series` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `calculations` | `no` | `boolean` | `true` | Include calculations in the response, if available. Default is True. |
| `annual_average` | `no` | `boolean` | `false` | Include annual averages in the response, if available. Default is False. |
| `aspects` | `no` | `boolean` | `false` | Include all aspects associated with a data point for a given BLS series ID, if available. Returned with the series metadata, under `extras` of the response object. Default is False. |

---

### `economy.survey.economic_conditions_chicago`

```python
data.economy.survey.economic_conditions_chicago(start_time=None, end_time=None, frequency=None, aggregation_method=None, transform=None)
```

Summary: Economic Conditions Chicago

| Field | Value |
|---|---|
| Endpoint ID | `economy.survey.economic_conditions_chicago` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/survey/economic_conditions_chicago` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert monthly data to lower frequency. None is monthly. |
| `aggregation_method` | `no` | `string | null` | `-` | A key that indicates the aggregation method used for frequency aggregation. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |

---

### `economy.survey.inflation_expectations`

```python
data.economy.survey.inflation_expectations(start_date=None, end_date=None)
```

Summary: Inflation Expectations

| Field | Value |
|---|---|
| Endpoint ID | `economy.survey.inflation_expectations` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/survey/inflation_expectations` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_date` | `no` | `string | null` | `-` | Start date of the data, in YYYY-MM-DD format. Data begins from 1970-04-01 and is quarterly. |
| `end_date` | `no` | `string | null` | `-` | End date of the data, in YYYY-MM-DD format. |

---

### `economy.survey.manufacturing_outlook_ny`

```python
data.economy.survey.manufacturing_outlook_ny(start_time=None, end_time=None, topic='new_orders', seasonally_adjusted=False, frequency=None, aggregation_method=None, transform=None)
```

Summary: Manufacturing Outlook Ny

| Field | Value |
|---|---|
| Endpoint ID | `economy.survey.manufacturing_outlook_ny` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/survey/manufacturing_outlook_ny` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `topic` | `no` | `string` | `new_orders` | The topic for the survey response. Multiple comma separated items allowed. |
| `seasonally_adjusted` | `no` | `boolean` | `false` | Whether the data is seasonally adjusted, default is False |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert monthly data to lower frequency. None is monthly. |
| `aggregation_method` | `no` | `string | null` | `-` | A key that indicates the aggregation method used for frequency aggregation. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |

---

### `economy.survey.manufacturing_outlook_texas`

```python
data.economy.survey.manufacturing_outlook_texas(start_time=None, end_time=None, topic='new_orders_growth', frequency=None, aggregation_method=None, transform=None)
```

Summary: Manufacturing Outlook Texas

| Field | Value |
|---|---|
| Endpoint ID | `economy.survey.manufacturing_outlook_texas` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/survey/manufacturing_outlook_texas` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `topic` | `no` | `string` | `new_orders_growth` | The topic for the survey response. Multiple comma separated items allowed. |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert monthly data to lower frequency. None is monthly. |
| `aggregation_method` | `no` | `string | null` | `-` | A key that indicates the aggregation method used for frequency aggregation. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |

---

### `economy.survey.nonfarm_payrolls`

```python
data.economy.survey.nonfarm_payrolls(date=None, category='employees_nsa')
```

Summary: Nonfarm Payrolls

| Field | Value |
|---|---|
| Endpoint ID | `economy.survey.nonfarm_payrolls` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/survey/nonfarm_payrolls` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `date` | `no` | `string | null` | `-` | A specific date to get data for. Default is the latest report. Multiple comma separated items allowed |
| `category` | `no` | `string` | `employees_nsa` | The category to query. |

---

### `economy.survey.sloos`

```python
data.economy.survey.sloos(start_time=None, end_time=None, category='spreads', transform=None)
```

Summary: Sloos

| Field | Value |
|---|---|
| Endpoint ID | `economy.survey.sloos` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/survey/sloos` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `category` | `no` | `string` | `spreads` | Category of survey response. |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |

---

### `economy.survey.university_of_michigan`

```python
data.economy.survey.university_of_michigan(start_time=None, end_time=None, frequency=None, aggregation_method=None, transform=None)
```

Summary: University Of Michigan

| Field | Value |
|---|---|
| Endpoint ID | `economy.survey.university_of_michigan` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/survey/university_of_michigan` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert monthly data to lower frequency. None is monthly. |
| `aggregation_method` | `no` | `string | null` | `-` | A key that indicates the aggregation method used for frequency aggregation. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |

---

### `economy.total_factor_productivity`

```python
data.economy.total_factor_productivity(frequency='quarter', start_date=None, end_date=None)
```

Summary: Total Factor Productivity

| Field | Value |
|---|---|
| Endpoint ID | `economy.total_factor_productivity` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/total_factor_productivity` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `frequency` | `no` | `string` | `quarter` | Type of data to return. 'quarter' for quarterly time series, 'annual' for annual time series, 'summary' for summary statistics (period means). |
| `start_date` | `no` | `string | null` | `-` | Start date of the data, in YYYY-MM-DD format. Only applicable for time series data (quarter/annual). |
| `end_date` | `no` | `string | null` | `-` | End date of the data, in YYYY-MM-DD format. Only applicable for time series data (quarter/annual). |

---

### `economy.unemployment`

```python
data.economy.unemployment(start_time=None, end_time=None, country='united_states', frequency='monthly', sex='total', age='total', seasonal_adjustment=False)
```

Summary: Unemployment

| Field | Value |
|---|---|
| Endpoint ID | `economy.unemployment` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/economy/unemployment` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `country` | `no` | `string` | `united_states` | The country to get data. Multiple comma separated items allowed |
| `frequency` | `no` | `string` | `monthly` | The frequency of the data. |
| `sex` | `no` | `string` | `total` | Sex to get unemployment for. |
| `age` | `no` | `string` | `total` | Age group to get unemployment for. Total indicates 15 years or over |
| `seasonal_adjustment` | `no` | `boolean` | `false` | Whether to get seasonally adjusted unemployment. Defaults to False. |
