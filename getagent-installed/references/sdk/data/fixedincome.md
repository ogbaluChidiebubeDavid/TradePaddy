# Fixedincome Data Reference

Use this file when an agent needs detailed signatures and parameter
rules for one DataSDK domain. All generated `getagent.data` endpoints
are callable through the DataSDK wrapper.

## Contents
- [`fixedincome.bond_indices`](#fixedincomebond-indices)
- [`fixedincome.corporate.bond_prices`](#fixedincomecorporatebond-prices)
- [`fixedincome.corporate.commercial_paper`](#fixedincomecorporatecommercial-paper)
- [`fixedincome.corporate.hqm`](#fixedincomecorporatehqm)
- [`fixedincome.corporate.spot_rates`](#fixedincomecorporatespot-rates)
- [`fixedincome.government.svensson_yield_curve`](#fixedincomegovernmentsvensson-yield-curve)
- [`fixedincome.government.tips_yields`](#fixedincomegovernmenttips-yields)
- [`fixedincome.government.treasury_auctions`](#fixedincomegovernmenttreasury-auctions)
- [`fixedincome.government.treasury_prices`](#fixedincomegovernmenttreasury-prices)
- [`fixedincome.government.treasury_rates`](#fixedincomegovernmenttreasury-rates)
- [`fixedincome.government.yield_curve`](#fixedincomegovernmentyield-curve)
- [`fixedincome.mortgage_indices`](#fixedincomemortgage-indices)
- [`fixedincome.rate.ameribor`](#fixedincomerateameribor)
- [`fixedincome.rate.dpcredit`](#fixedincomeratedpcredit)
- [`fixedincome.rate.ecb`](#fixedincomerateecb)
- [`fixedincome.rate.effr`](#fixedincomerateeffr)
- [`fixedincome.rate.effr_forecast`](#fixedincomerateeffr-forecast)
- [`fixedincome.rate.estr`](#fixedincomerateestr)
- [`fixedincome.rate.iorb`](#fixedincomerateiorb)
- [`fixedincome.rate.overnight_bank_funding`](#fixedincomerateovernight-bank-funding)
- [`fixedincome.rate.sofr`](#fixedincomeratesofr)
- [`fixedincome.rate.sonia`](#fixedincomeratesonia)
- [`fixedincome.spreads.tcm`](#fixedincomespreadstcm)
- [`fixedincome.spreads.tcm_effr`](#fixedincomespreadstcm-effr)
- [`fixedincome.spreads.treasury_effr`](#fixedincomespreadstreasury-effr)

## Endpoint reference

### `fixedincome.bond_indices`

```python
data.fixedincome.bond_indices(start_time=None, end_time=None, index_type='yield', category='us', index='yield_curve', frequency=None, aggregation_method='avg', transform=None)
```

Summary: Bond Indices

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.bond_indices` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/bond_indices` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `index_type` | `no` | `string` | `yield` | The type of series. OAS is the option-adjusted spread. Default is yield. |
| `category` | `no` | `string` | `us` | The type of index category. Used in conjunction with 'index', default is 'us'. |
| `index` | `no` | `string` | `yield_curve` | The specific index to query. Used in conjunction with 'category' and 'index_type', default is 'yield_curve'. Possible values are: corporate seasoned_corporate liquid_corporate yield_curve crossover public_sector private_sector non_financial high_grade high_yield liquid_emea emea liquid_asia asia liquid_latam latam liquid_aaa liquid_bbb aaa aa a bbb bb b ccc Multiple comma separated items allowed. |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert daily data to lower frequency. None = No change a = Annual q = Quarterly m = Monthly w = Weekly d = Daily wef = Weekly, Ending Friday weth = Weekly, Ending Thursday wew = Weekly, Ending Wednesday wetu = Weekly, Ending Tuesday wem = Weekly, Ending Monday wesu = Weekly, Ending Sunday wesa = Weekly, Ending Saturday bwew = Biweekly, Ending Wednesday bwem = Biweekly, Ending Monday |
| `aggregation_method` | `no` | `string` | `avg` | A key that indicates the aggregation method used for frequency aggregation. This parameter has no affect if the frequency parameter is not set, default is 'avg'. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |

---

### `fixedincome.corporate.bond_prices`

```python
data.fixedincome.corporate.bond_prices(country=None, issuer_name=None, isin=None, lei=None, currency=None, coupon_min=None, coupon_max=None, issued_amount_min=None, issued_amount_max=None, maturity_date_min=None, maturity_date_max=None, issue_date_min=None, issue_date_max=None, last_traded_min=None, use_cache=True)
```

Summary: Bond Prices

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.corporate.bond_prices` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/corporate/bond_prices` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `country` | `no` | `string | null` | `-` | The country to get data. Matches partial name. |
| `issuer_name` | `no` | `string | null` | `-` | Name of the issuer. Returns partial matches and is case insensitive. |
| `isin` | `no` | `array | string | null` | `-` | accepts array values International Securities Identification Number(s) of the bond(s). Multiple comma separated items allowed |
| `lei` | `no` | `string | null` | `-` | Legal Entity Identifier of the issuing entity. |
| `currency` | `no` | `array | string | null` | `-` | accepts array values Currency of the bond. Formatted as the 3-letter ISO 4217 code (e.g. GBP, EUR, USD). |
| `coupon_min` | `no` | `number | null` | `-` | Minimum coupon rate of the bond. |
| `coupon_max` | `no` | `number | null` | `-` | Maximum coupon rate of the bond. |
| `issued_amount_min` | `no` | `integer | null` | `-` | Minimum issued amount of the bond. |
| `issued_amount_max` | `no` | `string | null` | `-` | Maximum issued amount of the bond. |
| `maturity_date_min` | `no` | `string | null` | `-` | Minimum maturity date of the bond. |
| `maturity_date_max` | `no` | `string | null` | `-` | Maximum maturity date of the bond. |
| `issue_date_min` | `no` | `string | null` | `-` | Filter by the minimum original issue date. |
| `issue_date_max` | `no` | `string | null` | `-` | Filter by the maximum original issue date. |
| `last_traded_min` | `no` | `string | null` | `-` | Filter by the minimum last trade date. |
| `use_cache` | `no` | `boolean` | `true` | All bond data is sourced from a single JSON file that is updated daily. The file is cached for one day to eliminate downloading more than once. Caching will significantly speed up subsequent queries. To bypass, set to False. |

---

### `fixedincome.corporate.commercial_paper`

```python
data.fixedincome.corporate.commercial_paper(start_time=None, end_time=None, maturity='all', category='all', frequency=None, aggregation_method=None, transform=None)
```

Summary: Commercial Paper

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.corporate.commercial_paper` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/corporate/commercial_paper` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `maturity` | `no` | `string` | `all` | A target maturity. Multiple comma separated items allowed. |
| `category` | `no` | `string` | `all` | The category of asset. Multiple comma separated items allowed. |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert daily data to lower frequency. a = Annual q = Quarterly m = Monthly w = Weekly wef = Weekly, Ending Friday weth = Weekly, Ending Thursday wew = Weekly, Ending Wednesday wetu = Weekly, Ending Tuesday wem = Weekly, Ending Monday wesu = Weekly, Ending Sunday wesa = Weekly, Ending Saturday bwew = Biweekly, Ending Wednesday bwem = Biweekly, Ending Monday |
| `aggregation_method` | `no` | `string | null` | `-` | A key that indicates the aggregation method used for frequency aggregation. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |

---

### `fixedincome.corporate.hqm`

```python
data.fixedincome.corporate.hqm(date=None, yield_curve='spot')
```

Summary: Hqm

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.corporate.hqm` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/corporate/hqm` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `date` | `no` | `string | null` | `-` | A specific date to get data for. Multiple comma separated items allowed |
| `yield_curve` | `no` | `string` | `spot` | The yield curve type. |

---

### `fixedincome.corporate.spot_rates`

```python
data.fixedincome.corporate.spot_rates(start_time=None, end_time=None, maturity=10.0, category='spot_rate')
```

Summary: Spot Rates

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.corporate.spot_rates` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/corporate/spot_rates` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `maturity` | `no` | `number | string` | `10.0` | Maturities in years. Multiple comma separated items allowed |
| `category` | `no` | `string` | `spot_rate` | Rate category. Options: spot_rate, par_yield. Multiple comma separated items allowed |

---

### `fixedincome.government.svensson_yield_curve`

```python
data.fixedincome.government.svensson_yield_curve(series_type='all', start_date=None, end_date=None)
```

Summary: Svensson Yield Curve

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.government.svensson_yield_curve` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/government/svensson_yield_curve` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `series_type` | `no` | `string` | `all` | Type of yield curve series to return. Accepts a single value or comma-separated list for multiple selections. Group options: - 'all' (default) - 'zero_coupon' (SVENY, continuously compounded) - 'par_yield'(SVENPY, coupon-equivalent) - 'forward_instantaneous' (SVENF, continuously compounded) - 'forward_1y' (SVEN1F, coupon-equivalent) - 'parameters' (BETA0-BETA3, TAU1-TAU2) Individual columns can also be specified (e.g., 'sveny10,sveny20,beta0'). Used to filter columns after fetching. Multiple comma separated items allowed. |
| `start_date` | `no` | `string | null` | `-` | Start date of the data, in YYYY-MM-DD format. Used to filter results after fetching. |
| `end_date` | `no` | `string | null` | `-` | End date of the data, in YYYY-MM-DD format. Used to filter results after fetching. |

---

### `fixedincome.government.tips_yields`

```python
data.fixedincome.government.tips_yields(start_time=None, end_time=None, maturity=None, frequency=None, aggregation_method=None, transform=None)
```

Summary: Tips Yields

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.government.tips_yields` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/government/tips_yields` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `maturity` | `no` | `string | null` | `-` | The maturity of the security in years - 5, 10, 20, 30 - defaults to all. Note that the maturity is the tenor of the security, not the time to maturity. |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert high frequency data to lower frequency. None = No change a = Annual q = Quarterly m = Monthly w = Weekly d = Daily wef = Weekly, Ending Friday weth = Weekly, Ending Thursday wew = Weekly, Ending Wednesday wetu = Weekly, Ending Tuesday wem = Weekly, Ending Monday wesu = Weekly, Ending Sunday wesa = Weekly, Ending Saturday bwew = Biweekly, Ending Wednesday bwem = Biweekly, Ending Monday |
| `aggregation_method` | `no` | `string | null` | `-` | A key that indicates the aggregation method used for frequency aggregation. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change |

---

### `fixedincome.government.treasury_auctions`

```python
data.fixedincome.government.treasury_auctions(start_time=None, end_time=None, security_type=None, cusip=None, page_size=None, page_num=None)
```

Summary: Treasury Auctions

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.government.treasury_auctions` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/government/treasury_auctions` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `security_type` | `no` | `string | null` | `-` | Used to only return securities of a particular type. |
| `cusip` | `no` | `string | null` | `-` | Filter securities by CUSIP. |
| `page_size` | `no` | `integer | null` | `-` | Maximum number of results to return; you must also include pagenum when using pagesize. |
| `page_num` | `no` | `integer | null` | `-` | The first page number to display results for; used in combination with page size. |

---

### `fixedincome.government.treasury_prices`

```python
data.fixedincome.government.treasury_prices(date=None, cusip=None, security_type=None, govt_type='federal', issue_date_min=None, issue_date_max=None, last_traded_min=None, maturity_date_min=None, maturity_date_max=None, use_cache=True)
```

Summary: Treasury Prices

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.government.treasury_prices` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/government/treasury_prices` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `date` | `no` | `string | null` | `-` | A specific date to get data for. Defaults to the last business day. |
| `cusip` | `no` | `string | null` | `-` | Filter by CUSIP. |
| `security_type` | `no` | `string | null` | `-` | Filter by security type. |
| `govt_type` | `no` | `string` | `federal` | enum: federal, provincial, municipal The level of government issuer. |
| `issue_date_min` | `no` | `string | null` | `-` | Filter by the minimum original issue date. |
| `issue_date_max` | `no` | `string | null` | `-` | Filter by the maximum original issue date. |
| `last_traded_min` | `no` | `string | null` | `-` | Filter by the minimum last trade date. |
| `maturity_date_min` | `no` | `string | null` | `-` | Filter by the minimum maturity date. |
| `maturity_date_max` | `no` | `string | null` | `-` | Filter by the maximum maturity date. |
| `use_cache` | `no` | `boolean` | `true` | All bond data is sourced from a single JSON file that is updated daily. The file is cached for one day to eliminate downloading more than once. Caching will significantly speed up subsequent queries. To bypass, set to False. |

---

### `fixedincome.government.treasury_rates`

```python
data.fixedincome.government.treasury_rates(start_time=None, end_time=None)
```

Summary: Treasury Rates

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.government.treasury_rates` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/government/treasury_rates` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |

---

### `fixedincome.government.yield_curve`

```python
data.fixedincome.government.yield_curve(date=None, rating='aaa', yield_curve_type='spot_rate', use_cache=True, country='united_states')
```

Summary: Yield Curve

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.government.yield_curve` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/government/yield_curve` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `date` | `no` | `string | null` | `-` | A specific date to get data for. By default is the current data. Multiple comma separated items allowed |
| `rating` | `no` | `string` | `aaa` | enum: aaa, all_ratings The rating type, either 'aaa' or 'all_ratings'. |
| `yield_curve_type` | `no` | `string` | `spot_rate` | The yield curve type.; Yield curve type. Nominal and Real Rates are available daily, others are monthly. The closest date to the requested date will be returned. |
| `use_cache` | `no` | `boolean` | `true` | If true, cache the request for four hours. |
| `country` | `no` | `string` | `united_states` | The country to get data. New Zealand, Mexico, Singapore, and Thailand have only monthly data. The nearest date to the requested one will be used. Multiple comma separated items allowed. |

---

### `fixedincome.mortgage_indices`

```python
data.fixedincome.mortgage_indices(start_time=None, end_time=None, index='primary', frequency=None, aggregation_method='avg', transform=None)
```

Summary: Mortgage Indices

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.mortgage_indices` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/mortgage_indices` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `index` | `no` | `string` | `primary` | The specific index, or index group, to query. Default is the 'primary' group. Multiple comma separated items allowed. |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert daily data to lower frequency. None = No change a = Annual q = Quarterly m = Monthly w = Weekly d = Daily wef = Weekly, Ending Friday weth = Weekly, Ending Thursday wew = Weekly, Ending Wednesday wetu = Weekly, Ending Tuesday wem = Weekly, Ending Monday wesu = Weekly, Ending Sunday wesa = Weekly, Ending Saturday bwew = Biweekly, Ending Wednesday bwem = Biweekly, Ending Monday |
| `aggregation_method` | `no` | `string` | `avg` | A key that indicates the aggregation method used for frequency aggregation. This parameter has no affect if the frequency parameter is not set, default is 'avg'. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |

---

### `fixedincome.rate.ameribor`

```python
data.fixedincome.rate.ameribor(start_time=None, end_time=None, maturity='all', frequency=None, aggregation_method=None, transform=None)
```

Summary: Ameribor

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.rate.ameribor` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/rate/ameribor` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `maturity` | `no` | `string` | `all` | Period of AMERIBOR rate. Multiple comma separated items allowed. |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert daily data to lower frequency. a = Annual q = Quarterly m = Monthly w = Weekly wef = Weekly, Ending Friday weth = Weekly, Ending Thursday wew = Weekly, Ending Wednesday wetu = Weekly, Ending Tuesday wem = Weekly, Ending Monday wesu = Weekly, Ending Sunday wesa = Weekly, Ending Saturday bwew = Biweekly, Ending Wednesday bwem = Biweekly, Ending Monday |
| `aggregation_method` | `no` | `string | null` | `-` | A key that indicates the aggregation method used for frequency aggregation. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |

---

### `fixedincome.rate.dpcredit`

```python
data.fixedincome.rate.dpcredit(start_time=None, end_time=None, parameter='daily_excl_weekend')
```

Summary: Dpcredit

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.rate.dpcredit` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/rate/dpcredit` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `parameter` | `no` | `string` | `daily_excl_weekend` | FRED series ID of DWPCR data. |

---

### `fixedincome.rate.ecb`

```python
data.fixedincome.rate.ecb(start_time=None, end_time=None, interest_rate_type='lending')
```

Summary: Ecb

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.rate.ecb` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/rate/ecb` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `interest_rate_type` | `no` | `string` | `lending` | The type of interest rate. |

---

### `fixedincome.rate.effr`

```python
data.fixedincome.rate.effr(start_time=None, end_time=None, frequency=None, aggregation_method=None, transform=None, effr_only=False)
```

Summary: Effr

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.rate.effr` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/rate/effr` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert daily data to lower frequency. a = Annual q = Quarterly m = Monthly w = Weekly wef = Weekly, Ending Friday weth = Weekly, Ending Thursday wew = Weekly, Ending Wednesday wetu = Weekly, Ending Tuesday wem = Weekly, Ending Monday wesu = Weekly, Ending Sunday wesa = Weekly, Ending Saturday bwew = Biweekly, Ending Wednesday bwem = Biweekly, Ending Monday |
| `aggregation_method` | `no` | `string | null` | `-` | A key that indicates the aggregation method used for frequency aggregation. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |
| `effr_only` | `no` | `boolean` | `false` | Return data without quantiles, target ranges, and volume. |

---

### `fixedincome.rate.effr_forecast`

```python
data.fixedincome.rate.effr_forecast(long_run=False)
```

Summary: Effr Forecast

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.rate.effr_forecast` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/rate/effr_forecast` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `long_run` | `no` | `boolean` | `false` | Flag to show long run projections |

---

### `fixedincome.rate.estr`

```python
data.fixedincome.rate.estr(start_time=None, end_time=None, frequency=None, aggregation_method=None, transform=None)
```

Summary: Estr

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.rate.estr` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/rate/estr` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert daily data to lower frequency. a = Annual q = Quarterly m = Monthly w = Weekly d = Daily wef = Weekly, Ending Friday weth = Weekly, Ending Thursday wew = Weekly, Ending Wednesday wetu = Weekly, Ending Tuesday wem = Weekly, Ending Monday wesu = Weekly, Ending Sunday wesa = Weekly, Ending Saturday bwew = Biweekly, Ending Wednesday bwem = Biweekly, Ending Monday |
| `aggregation_method` | `no` | `string | null` | `-` | A key that indicates the aggregation method used for frequency aggregation. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |

---

### `fixedincome.rate.iorb`

```python
data.fixedincome.rate.iorb(start_time=None, end_time=None)
```

Summary: Iorb

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.rate.iorb` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/rate/iorb` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |

---

### `fixedincome.rate.overnight_bank_funding`

```python
data.fixedincome.rate.overnight_bank_funding(start_time=None, end_time=None, frequency=None, aggregation_method=None, transform=None)
```

Summary: Overnight Bank Funding

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.rate.overnight_bank_funding` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/rate/overnight_bank_funding` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert daily data to lower frequency. a = Annual q = Quarterly m = Monthly w = Weekly wef = Weekly, Ending Friday weth = Weekly, Ending Thursday wew = Weekly, Ending Wednesday wetu = Weekly, Ending Tuesday wem = Weekly, Ending Monday wesu = Weekly, Ending Sunday wesa = Weekly, Ending Saturday bwew = Biweekly, Ending Wednesday bwem = Biweekly, Ending Monday |
| `aggregation_method` | `no` | `string | null` | `-` | A key that indicates the aggregation method used for frequency aggregation. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |

---

### `fixedincome.rate.sofr`

```python
data.fixedincome.rate.sofr(start_time=None, end_time=None, frequency=None, aggregation_method=None, transform=None)
```

Summary: Sofr

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.rate.sofr` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/rate/sofr` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert daily data to lower frequency. a = Annual q = Quarterly m = Monthly w = Weekly wef = Weekly, Ending Friday weth = Weekly, Ending Thursday wew = Weekly, Ending Wednesday wetu = Weekly, Ending Tuesday wem = Weekly, Ending Monday wesu = Weekly, Ending Sunday wesa = Weekly, Ending Saturday bwew = Biweekly, Ending Wednesday bwem = Biweekly, Ending Monday |
| `aggregation_method` | `no` | `string | null` | `-` | A key that indicates the aggregation method used for frequency aggregation. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |

---

### `fixedincome.rate.sonia`

```python
data.fixedincome.rate.sonia(start_time=None, end_time=None, parameter='rate')
```

Summary: Sonia

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.rate.sonia` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/rate/sonia` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `parameter` | `no` | `string` | `rate` | Period of SONIA rate. |

---

### `fixedincome.spreads.tcm`

```python
data.fixedincome.spreads.tcm(start_time=None, end_time=None, maturity='3m')
```

Summary: Tcm

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.spreads.tcm` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/spreads/tcm` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `maturity` | `no` | `string | null` | `3m` | The maturity |

---

### `fixedincome.spreads.tcm_effr`

```python
data.fixedincome.spreads.tcm_effr(start_time=None, end_time=None, maturity='10y')
```

Summary: Tcm Effr

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.spreads.tcm_effr` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/spreads/tcm_effr` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `maturity` | `no` | `string | null` | `10y` | The maturity |

---

### `fixedincome.spreads.treasury_effr`

```python
data.fixedincome.spreads.treasury_effr(start_time=None, end_time=None, maturity='3m')
```

Summary: Treasury Effr

| Field | Value |
|---|---|
| Endpoint ID | `fixedincome.spreads.treasury_effr` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/fixedincome/spreads/treasury_effr` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `maturity` | `no` | `string | null` | `3m` | The maturity |
