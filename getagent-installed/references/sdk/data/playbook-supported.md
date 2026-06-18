# Playbook Data Endpoints

Every generated `getagent.data` endpoint in this file is callable from
Playbook code. Backtest use still depends on the endpoint's response
shape: time-indexed datasets can be aligned into replay feature frames,
while context-only datasets should be used as decision context rather
than as bar-level replay columns.

## Contents
- [`arxiv.search`](#arxivsearch)
- [`commodity.petroleum_status_report`](#commoditypetroleum-status-report)
- [`commodity.price.spot`](#commoditypricespot)
- [`commodity.psd_data`](#commoditypsd-data)
- [`commodity.psd_report`](#commoditypsd-report)
- [`commodity.short_term_energy_outlook`](#commodityshort-term-energy-outlook)
- [`commodity.weather_bulletins`](#commodityweather-bulletins)
- [`commodity.weather_bulletins_download`](#commodityweather-bulletins-download)
- [`coverage.command_model`](#coveragecommand-model)
- [`coverage.commands`](#coveragecommands)
- [`coverage.providers`](#coverageproviders)
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
- [`currency.price.historical`](#currencypricehistorical)
- [`currency.reference_rates`](#currencyreference-rates)
- [`currency.search`](#currencysearch)
- [`currency.snapshots`](#currencysnapshots)
- [`derivatives.futures.curve`](#derivativesfuturescurve)
- [`derivatives.futures.historical`](#derivativesfutureshistorical)
- [`derivatives.futures.info`](#derivativesfuturesinfo)
- [`derivatives.futures.instruments`](#derivativesfuturesinstruments)
- [`derivatives.options.chains`](#derivativesoptionschains)
- [`derivatives.options.snapshots`](#derivativesoptionssnapshots)
- [`derivatives.options.surface`](#derivativesoptionssurface)
- [`derivatives.options.unusual`](#derivativesoptionsunusual)
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
- [`famafrench.breakpoints`](#famafrenchbreakpoints)
- [`famafrench.country_portfolio_returns`](#famafrenchcountry-portfolio-returns)
- [`famafrench.factors`](#famafrenchfactors)
- [`famafrench.international_index_returns`](#famafrenchinternational-index-returns)
- [`famafrench.regional_portfolio_returns`](#famafrenchregional-portfolio-returns)
- [`famafrench.us_portfolio_returns`](#famafrenchus-portfolio-returns)
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
- [`imf_utils.get_dataflow_dimensions`](#imf-utilsget-dataflow-dimensions)
- [`imf_utils.list_dataflow_choices`](#imf-utilslist-dataflow-choices)
- [`imf_utils.list_dataflows`](#imf-utilslist-dataflows)
- [`imf_utils.list_port_id_choices`](#imf-utilslist-port-id-choices)
- [`imf_utils.list_table_choices`](#imf-utilslist-table-choices)
- [`imf_utils.list_tables`](#imf-utilslist-tables)
- [`imf_utils.presentation_table`](#imf-utilspresentation-table)
- [`imf_utils.presentation_table_choices`](#imf-utilspresentation-table-choices)
- [`index.available`](#indexavailable)
- [`index.constituents`](#indexconstituents)
- [`index.price.historical`](#indexpricehistorical)
- [`index.search`](#indexsearch)
- [`index.sectors`](#indexsectors)
- [`index.snapshots`](#indexsnapshots)
- [`index.sp500_multiples`](#indexsp500-multiples)
- [`news.company`](#newscompany)
- [`news.label_search`](#newslabel-search)
- [`news.world`](#newsworld)
- [`regulators.cftc.cot`](#regulatorscftccot)
- [`regulators.cftc.cot_search`](#regulatorscftccot-search)
- [`regulators.sec.cik_map`](#regulatorsseccik-map)
- [`regulators.sec.filing_headers`](#regulatorssecfiling-headers)
- [`regulators.sec.htm_file`](#regulatorssechtm-file)
- [`regulators.sec.institutions_search`](#regulatorssecinstitutions-search)
- [`regulators.sec.rss_litigation`](#regulatorssecrss-litigation)
- [`regulators.sec.schema_files`](#regulatorssecschema-files)
- [`regulators.sec.sic_search`](#regulatorssecsic-search)
- [`regulators.sec.symbol_map`](#regulatorssecsymbol-map)
- [`sentiment.followin_coin_news`](#sentimentfollowin-coin-news)
- [`sentiment.followin_news`](#sentimentfollowin-news)
- [`sentiment.followin_trending_topics`](#sentimentfollowin-trending-topics)
- [`sentiment.market_fear_greed`](#sentimentmarket-fear-greed)
- [`sentiment.news`](#sentimentnews)
- [`sentiment.trending`](#sentimenttrending)
- [`sentiment.twitter_list_timeline`](#sentimenttwitter-list-timeline)
- [`sentiment.twitter_search`](#sentimenttwitter-search)
- [`sentiment.twitter_tweet_detail`](#sentimenttwitter-tweet-detail)
- [`sentiment.twitter_user_by_id`](#sentimenttwitter-user-by-id)
- [`sentiment.twitter_user_by_name`](#sentimenttwitter-user-by-name)
- [`uscongress.bill_info`](#uscongressbill-info)
- [`uscongress.bill_text`](#uscongressbill-text)
- [`uscongress.bill_text_urls`](#uscongressbill-text-urls)
- [`uscongress.bills`](#uscongressbills)
- [`web_search.news`](#web-searchnews)
- [`web_search.web`](#web-searchweb)
- [`wikipedia.content`](#wikipediacontent)
- [`wikipedia.search`](#wikipediasearch)
- [`wikipedia.summary`](#wikipediasummary)

## Endpoint reference

### `arxiv.search`

```python
data.arxiv.search(query=None, max_results=10, page=1, sort_by='relevance', sort_order='descending', search_field='all', category=None)
```

Summary: Search

| Field | Value |
|---|---|
| Endpoint ID | `arxiv.search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/arxiv/search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `no` | `string | null` | `-` | Search query string. |
| `max_results` | `no` | `integer` | `10` | Maximum number of results. |
| `page` | `no` | `integer` | `1` | Page number, starting at 1. |
| `sort_by` | `no` | `string` | `relevance` | Sort by relevance, last updated date, or submitted date. |
| `sort_order` | `no` | `string` | `descending` | Sort direction. |
| `search_field` | `no` | `string` | `all` | Field to search: all, ti (title), au (author), abs (abstract), cat (category). |
| `category` | `no` | `string | null` | `-` | Filter by arXiv subject category, e.g. 'cs.AI', 'q-fin.TR'. |

---

### `commodity.petroleum_status_report`

```python
data.commodity.petroleum_status_report(start_time=None, end_time=None, category='balance_sheet', table=None, use_cache=True)
```

Summary: Petroleum Status Report

| Field | Value |
|---|---|
| Endpoint ID | `commodity.petroleum_status_report` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/commodity/petroleum_status_report` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `category` | `no` | `string` | `balance_sheet` | enum: balance_sheet, inputs_and_production, refiner_blender_net_production, crude_petroleum_stocks, gasoline_fuel_stocks, total_gasoline_by_sub_padd, distillate_fuel_oil_stocks, imports, imports_by_country, weekly_estimates, spot_prices_crude_gas_heating, spot_prices_diesel_jet_fuel_propane, retail_prices The group of data to be returned. The default is the balance sheet. |
| `table` | `no` | `string | null` | `-` | The specific table element within the category to be returned, default is 'stocks', if the category is 'weekly_estimates', else 'all'. Note: Choices represent all available tables from the entire collection and are not all available for every category. Invalid choices will raise a ValidationError with a message indicating the valid choices for the selected category. Choices are: all conventional_gas crude crude_production crude_production_avg diesel ethanol_plant_production ethanol_plant_production_avg exports exports_avg heating_oil imports imports_avg imports_by_country imports_by_country_avg inputs_and_utilization inputs_and_utilization_avg jet_fuel monthly net_imports_inc_spr_avg net_imports_incl_spr net_production net_production_avg net_production_by_product net_production_by_production_avg product_by_region product_by_region_avg product_supplied product_supplied_avg propane rbob refiner_blender_net_production refiner_blender_net_production_avg stocks supply supply_avg ulta_low_sulfur_distillate_reclassification ulta_low_sulfur_distillate_reclassification_avg weekly Multiple comma separated items allowed. |
| `use_cache` | `no` | `boolean` | `true` | Subsequent requests for the same source data are cached for the session using ALRU cache. |

---

### `commodity.price.spot`

```python
data.commodity.price.spot(start_time=None, end_time=None, commodity='all', frequency=None, aggregation_method='eop', transform=None)
```

Summary: Spot

| Field | Value |
|---|---|
| Endpoint ID | `commodity.price.spot` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/commodity/price/spot` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `commodity` | `no` | `string` | `all` | enum: wti, brent, natural_gas, jet_fuel, propane, heating_oil, diesel_gulf_coast, diesel_ny_harbor, diesel_la, gasoline_ny_harbor, gasoline_gulf_coast, rbob, all Commodity name associated with the EIA spot price commodity data, default is 'all'. |
| `frequency` | `no` | `string | null` | `-` | Frequency aggregation to convert high frequency data to lower frequency. None = No change a = Annual q = Quarterly m = Monthly w = Weekly d = Daily wef = Weekly, Ending Friday weth = Weekly, Ending Thursday wew = Weekly, Ending Wednesday wetu = Weekly, Ending Tuesday wem = Weekly, Ending Monday wesu = Weekly, Ending Sunday wesa = Weekly, Ending Saturday bwew = Biweekly, Ending Wednesday bwem = Biweekly, Ending Monday |
| `aggregation_method` | `no` | `string` | `eop` | enum: avg, sum, eop A key that indicates the aggregation method used for frequency aggregation. This parameter has no affect if the frequency parameter is not set. avg = Average sum = Sum eop = End of Period |
| `transform` | `no` | `string | null` | `-` | Transformation type None = No transformation chg = Change ch1 = Change from Year Ago pch = Percent Change pc1 = Percent Change from Year Ago pca = Compounded Annual Rate of Change cch = Continuously Compounded Rate of Change cca = Continuously Compounded Annual Rate of Change log = Natural Log |

---

### `commodity.psd_data`

```python
data.commodity.psd_data(report_id='world_crop_production_summary', commodity=None, attribute=None, country=None, aggregate_regions=False, start_year=None, end_year=None)
```

Summary: Psd Data

| Field | Value |
|---|---|
| Endpoint ID | `commodity.psd_data` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/commodity/psd_data` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `report_id` | `no` | `string | null` | `world_crop_production_summary` | Report ID to retrieve. Gets the current report for the given commodity and subject. These are predefined tables that are part of the PDF publication data. This parameter is ignored if 'commodity' is provided. Use the 'commodity' parameter for time series data. Valid reports are: almonds_summary, almonds_supply_distribution, apples_selected_countries, apples_supply_distribution, barley_area_yield_production, barley_regional, barley_supply_disappearance, barley_world_production_consumption_stocks, barley_world_trade, beef_veal_production, beef_veal_trade, butter_production_consumption, butter_trade, cattle_stocks, cattle_trade, cheese_production_consumption, cheese_trade, cherries_selected_countries, cherries_supply_distribution, chicken_production, chicken_trade, china_grain_supply_demand, coarse_grains_area_yield_production, coarse_grains_regional, coarse_grains_world_production_consumption_stocks, coarse_grains_world_trade, coffee_arabica_production, coffee_consumption, coffee_ending_stocks, coffee_exports_green_bean, coffee_exports_soluble, coffee_exports_total, coffee_imports_green_bean, coffee_imports_soluble, coffee_imports_total, coffee_production, coffee_robusta_production, coffee_summary, coffee_summary_2, coffee_summary_3, coffee_summary_4, copra_palm_kernel_palm_oil_production, corn_area_yield_production, corn_barley_supply_demand, corn_regional, corn_supply_disappearance, corn_world_production_consumption_stocks, corn_world_trade, cotton_area_yield_production, cotton_area_yield_production_fcr, cotton_by_country, cotton_by_country_2, cotton_foreign_supply, cotton_monthly_changes, cotton_supply_distribution, cotton_supply_distribution_2, cotton_us_supply, cotton_world_supply, cotton_world_supply_use, cotton_world_supply_use_2, cottonseed_area_yield_production, eu_grain_supply_demand, grains_summary_comparison, grapefruit_selected_countries, grapes_selected_countries, grapes_supply_distribution, lemons_limes_selected_countries, milk_cow_numbers, milk_production_consumption, nonfat_dry_milk_production_consumption, nonfat_dry_milk_trade, oats_area_yield_production, oats_regional, oats_world_production_consumption_stocks, oats_world_trade, oilseeds_area_yield_production, oilseeds_china, oilseeds_eu, oilseeds_india, oilseeds_middle_east, oilseeds_products_world_supply_demand, oilseeds_southeast_asia, oilseeds_us_supply_distribution, oilseeds_world_commodity_view, oilseeds_world_country_view, orange_juice_supply_distribution, oranges_selected_countries, oranges_selected_countries_2, other_europe_grain_supply_demand, palm_coconut_fishmeal_world_supply_demand, palm_oil_world_supply, peaches_nectarines_selected_countries, peaches_nectarines_supply_distribution, peanut_area_yield_production, pears_selected_countries, pears_supply_distribution, pistachios_summary, pistachios_supply_distribution, pork_production, pork_trade, protein_meals_world_commodity_view, protein_meals_world_country_view, raisins_selected_countries, raisins_supply_distribution, rapeseed_area_yield_production, rapeseed_products_world_supply, rapeseed_products_world_supply_demand, rice_area_yield_production, rice_regional, rice_supply_demand, rice_world_production_consumption_stocks, rice_world_trade, russia_barley, russia_corn, russia_grain_supply_demand, russia_wheat, rye_area_yield_production, rye_regional, rye_world_production_consumption_stocks, rye_world_trade, sorghum_area_yield_production, sorghum_regional, sorghum_supply_disappearance, sorghum_world_production_consumption_stocks, sorghum_world_trade, soybean_meal_world_supply, soybean_oil_world_supply, soybeans_area_yield_production, soybeans_argentina_supply_distribution, soybeans_brazil_supply_distribution, soybeans_products_world_supply_demand, soybeans_products_world_trade, soybeans_us_supply_distribution, soybeans_world_supply, sugar_ending_stocks, sugar_imports_exports, sugar_production_consumption, sunflower_area_yield_production, sunflower_products_world_supply, sunflower_products_world_supply_demand, swine_stocks, swine_trade, tangerines_mandarins_selected_countries, us_grains_supply_distribution, vegetable_oils_minor_world_supply, vegetable_oils_world_commodity_view, vegetable_oils_world_country_view, walnuts_summary, walnuts_supply_distribution, wheat_area_yield_production, wheat_coarse_grains_supply_demand, wheat_coarse_grains_world_supply_demand, wheat_flour_products_world_trade, wheat_regional, wheat_supply_disappearance, wheat_world_production_consumption_stocks, whole_milk_powder_production_consumption, whole_milk_powder_trade, world_crop_production_summary |
| `commodity` | `no` | `string | null` | `-` | Commodity name to filter the data. If provided, retrieves time series data for the given commodity. Supplying both 'report_id' and 'commodity' will prioritize 'commodity' for time series data. Valid commodities are: almonds, apples, barley, beef, broiler, butter, cattle, cheese, cherries, chicken, coffee, corn, cotton, dry_whole_milk_powder, fluid_milk, grapefruit, grapes, lemons_limes, meal_copra, meal_cottonseed, meal_fish, meal_palm_kernel, meal_peanut, meal_rapeseed, meal_soybean, meal_sunflowerseed, millet, mixed_grain, nonfat_dry_milk, oats, oil_coconut, oil_cottonseed, oil_olive, oil_palm, oil_palm_kernel, oil_peanut, oil_rapeseed, oil_soybean, oil_sunflowerseed, oilseed_copra, oilseed_cottonseed, oilseed_palm_kernel, oilseed_peanut, oilseed_rapeseed, oilseed_soybean, oilseed_sunflowerseed, orange_juice, oranges, peaches_nectarines, pears, pistachios, pork, rice, rye, sorghum, sugar, swine, tangerines_mandarins, walnuts, wheat |
| `attribute` | `no` | `string | array | null` | `-` | accepts array values Attribute to filter the data. If None, retrieves all available attributes for the commodity. Parameter is ignored when commodity is None. Valid attributes depend on the commodity, an invalid choice will show the available attributes for the entered commodity. All attributes choices are: annual_pct_change_per_cap_cons, arabica_production, area_harvested, area_planted, balance, bean_exports, bean_imports, bearing_trees, beef_cows_beg_stocks, beet_sugar_production, begin_stock_ctrl_app, begin_stock_other, beginning_stocks, calf_slaughter, cane_sugar_production, catch_for_reduction, commercial_production, consumption_change, cow_change, cow_slaughter, cows_in_milk, cows_milk_production, crush, cy_exp_to_us, cy_exports, cy_imp_from_us, cy_imports, dairy_cows_beg_stocks, deliv_to_processors, dom_consump_ctrl_app, dom_consump_other, dom_leaf_consumption, domestic_consumption, domestic_use, end_stocks_ctrl_app, end_stocks_other, ending_stocks, export_change, exportable_production, exports, exports_percent_production, extr_rate, factory_use_consum, farm_sales_weight_prod, feed_dom_consumption, feed_use_dom_consum, feed_waste_dom_cons, filter_production, fluid_use_dom_consum, food_use_dom_cons, for_processing, fresh_dom_consumption, fresh_dom_consumption_alt, fsi_consumption, human_consumption, human_dom_consumption, import_change, imports, imports_percent_consumption, industrial_dom_cons, intra_eu_exports, intra_eu_exports_alt, intra_eu_imports, inventory_balance, inventory_change, inventory_reference, loss, loss_and_residual, milling_rate, my_exp_to_eu, my_imp_from_eu, my_imp_from_us, non_bearing_trees, non_comm_production, non_filter_production, other_disappearance, other_exports, other_foreign_cons, other_imports, other_milk_production, other_production, other_slaughter, other_use_losses, per_capita_consumption, population, prod_from_table_grapes, prod_from_wine_grapes, production, production_change, production_to_cows, production_to_sows, raw_exports, raw_imports, refined_exp_raw_val, refined_imp_raw_val, roast_ground_exports, roast_ground_imports, robusta_production, rough_production, rst_ground_dom_consum, seed_to_lint_ratio, slaughter_reference, slaughter_to_inventory, slaughter_to_total_supply, sme, soluble_dom_cons, soluble_exports, soluble_imports, sow_beginning_stocks, sow_change, sow_slaughter, stocks_to_use, stocks_to_use_months, total_disappearance, total_disappearance_alt, total_distribution, total_grape_crush, total_slaughter, total_supply, total_trees, total_use, total_utilization, ty_exports, ty_imp_from_us, ty_imports, us_leaf_dom_cons, us_leaf_imports, utilization_for_alcohol, utilization_for_sugar, weights, withdrawal_from_market, yield Multiple comma separated items allowed. |
| `country` | `no` | `string | array | null` | `-` | accepts array values Country code(s) to filter the data. If None, retrieves data for all countries. Parameter is ignored when commodity is None. Valid country codes include: afghanistan, albania, algeria, angola, argentina, armenia, australia, austria, azerbaijan, bahamas, bahrain, bangladesh, barbados, belarus, belgium, belize, benin, bhutan, bolivia, bosnia_and_herzegovina, botswana, brazil, brunei, bulgaria, burkina_faso, burma, burundi, cabo_verde, cambodia, cameroon, canada, caribbean, central_african_republic, central_america, chad, chile, china, colombia, comoros, congo_brazzaville, congo_kinshasa, costa_rica, cote_divoire, croatia, cuba, cyprus, czech_republic, czechia, denmark, djibouti, dominica, dominican_republic, east_asia, ecuador, egypt, el_salvador, equatorial_guinea, eritrea, estonia, eswatini, ethiopia, eu, eu_15, eu_25, european_union, fiji, finland, former_soviet_union, france, gabon, gambia, georgia, germany, ghana, greece, guatemala, guinea, guinea_bissau, guyana, haiti, honduras, hong_kong, hungary, iceland, india, indonesia, iran, iraq, ireland, israel, italy, ivory_coast, jamaica, japan, jordan, kazakhstan, kenya, kosovo, kuwait, kyrgyzstan, laos, latvia, lebanon, lesotho, liberia, libya, lithuania, luxembourg, macau, macedonia, madagascar, malawi, malaysia, maldives, mali, malta, mauritania, mauritius, mexico, middle_east, moldova, mongolia, montenegro, morocco, mozambique, myanmar, namibia, nepal, netherlands, new_caledonia, new_zealand, nicaragua, niger, nigeria, north_africa, north_america, north_korea, north_macedonia, norway, oceania, oman, other_europe, pakistan, panama, papua_new_guinea, paraguay, peru, philippines, poland, portugal, puerto_rico, qatar, reunion, romania, russia, rwanda, samoa, sao_tome_and_principe, saudi_arabia, senegal, serbia, seychelles, sierra_leone, singapore, slovakia, slovenia, solomon_islands, somalia, south_africa, south_america, south_asia, south_korea, south_sudan, southeast_asia, spain, sri_lanka, sub_saharan_africa, sudan, suriname, swaziland, sweden, switzerland, syria, taiwan, tajikistan, tanzania, thailand, togo, tonga, trinidad_and_tobago, tunisia, turkey, turkmenistan, uganda, ukraine, united_arab_emirates, united_kingdom, united_states, uruguay, uzbekistan, vanuatu, venezuela, vietnam, world, yemen, zambia, zimbabwe Multiple comma separated items allowed. |
| `aggregate_regions` | `no` | `boolean` | `false` | Whether to include regional and world aggregates in the data. Parameter is ignored when 'commodity' is None. |
| `start_year` | `no` | `integer | null` | `-` | Start year for filtering time series data. None returns from the beginning of the series. Parameter is ignored when 'commodity' is None. |
| `end_year` | `no` | `integer | null` | `-` | End year for filtering time series data. If None, returns up to the most recent year. Parameter is ignored when 'commodity' is None. |

---

### `commodity.psd_report`

```python
data.commodity.psd_report(commodity=..., year=..., month=...)
```

Summary: Psd Report

| Field | Value |
|---|---|
| Endpoint ID | `commodity.psd_report` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/commodity/psd_report` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `commodity` | `yes` | `string` | `-` | Commodity for the report. |
| `year` | `yes` | `integer` | `-` | Year of the report. |
| `month` | `yes` | `integer` | `-` | Month of the report. |

---

### `commodity.short_term_energy_outlook`

```python
data.commodity.short_term_energy_outlook(start_time=None, end_time=None, symbol=None, table='01', frequency='month')
```

Summary: Short Term Energy Outlook

| Field | Value |
|---|---|
| Endpoint ID | `commodity.short_term_energy_outlook` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/commodity/short_term_energy_outlook` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. If provided, overrides the 'table' parameter to return only the specified symbol from the STEO API. Multiple comma separated items allowed. |
| `table` | `no` | `string` | `01` | enum: 01, 02, 03a, 03b, 03c, 03d, 03e, 04a, 04b, 04c, 04d, 05a, 05b, 06, 07a, 07b, 07c, 07d1, 07d2, 07e, 08, 09a, 09b, 09c, 10a, 10b The specific table within the STEO dataset. Default is '01'. When 'symbol' is provided, this parameter is ignored. 01: US Energy Markets Summary 02: Nominal Energy Prices 03a: World Petroleum and Other Liquid Fuels Production, Consumption, and Inventories 03b: Non-OPEC Petroleum and Other Liquid Fuels Production 03c: World Petroleum and Other Liquid Fuels Production 03d: World Crude Oil Production 03e: World Petroleum and Other Liquid Fuels Consumption 04a: US Petroleum and Other Liquid Fuels Supply, Consumption, and Inventories 04b: US Hydrocarbon Gas Liquids (HGL) and Petroleum Refinery Balances 04c: US Regional Motor Gasoline Prices and Inventories 04d: US Biofuel Supply, Consumption, and Inventories 05a: US Natural Gas Supply, Consumption, and Inventories 05b: US Regional Natural Gas Prices 06: US Coal Supply, Consumption, and Inventories 07a: US Electricity Industry Overview 07b: US Regional Electricity Retail Sales 07c: US Regional Electricity Prices 07d1: US Regional Electricity Generation, Electric Power Sector 07d2: US Regional Electricity Generation, Electric Power Sector, continued 07e: US Electricity Generating Capacity 08: US Renewable Energy Consumption 09a: US Macroeconomic Indicators and CO2 Emissions 09b: US Regional Macroeconomic Data 09c: US Regional Weather Data 10a: Drilling Productivity Metrics 10b: Crude Oil and Natural Gas Production from Shale and Tight Formations |
| `frequency` | `no` | `string` | `month` | enum: month, quarter, annual The frequency of the data. Default is 'month'. |

---

### `commodity.weather_bulletins`

```python
data.commodity.weather_bulletins(year=2026, month=None, week=None)
```

Summary: Weather Bulletins

| Field | Value |
|---|---|
| Endpoint ID | `commodity.weather_bulletins` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/commodity/weather_bulletins` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `year` | `no` | `integer` | `2026` | Year of the data. Default is the current year. |
| `month` | `no` | `integer | null` | `-` | Month of the data. If not provided, data for the entire year is returned. |
| `week` | `no` | `integer | null` | `-` | Numeric week of the data, relative to the month. If not provided, data for the entire month is returned. |

---

### `commodity.weather_bulletins_download`

```python
data.commodity.weather_bulletins_download(, body=...)
```

Summary: Weather Bulletins Download

| Field | Value |
|---|---|
| Endpoint ID | `commodity.weather_bulletins_download` |
| HTTP | `POST` |
| Path | `/inner/v1/agent-data/commodity/weather_bulletins_download` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `body` | `yes` | `string | object | array` | `-` | URLs for reports to download. Multiple comma separated items allowed |

---

### `coverage.command_model`

```python
data.coverage.command_model()
```

Summary: Get Commands Model Map

| Field | Value |
|---|---|
| Endpoint ID | `coverage.command_model` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/coverage/command_model` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

No query parameters.

---

### `coverage.commands`

```python
data.coverage.commands()
```

Summary: Get Command Coverage

| Field | Value |
|---|---|
| Endpoint ID | `coverage.commands` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/coverage/commands` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

No query parameters.

---

### `coverage.providers`

```python
data.coverage.providers()
```

Summary: Get Provider Coverage

| Field | Value |
|---|---|
| Endpoint ID | `coverage.providers` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/coverage/providers` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

No query parameters.

---

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

---

### `currency.price.historical`

```python
data.currency.price.historical(symbol=..., start_time=None, end_time=None, interval='1d')
```

Summary: Historical

| Field | Value |
|---|---|
| Endpoint ID | `currency.price.historical` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/currency/price/historical` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Can use CURR1-CURR2 or CURR1CURR2 format. Multiple comma separated items allowed |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `interval` | `no` | `string` | `1d` | Time interval of the data to return. |

---

### `currency.reference_rates`

```python
data.currency.reference_rates()
```

Summary: Reference Rates

| Field | Value |
|---|---|
| Endpoint ID | `currency.reference_rates` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/currency/reference_rates` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `currency.search`

```python
data.currency.search(query=None)
```

Summary: Search

| Field | Value |
|---|---|
| Endpoint ID | `currency.search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/currency/search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `no` | `string | null` | `-` | Query to search for currency pairs. |

---

### `currency.snapshots`

```python
data.currency.snapshots(base='usd', quote_type='indirect', counter_currencies=None)
```

Summary: Snapshots

| Field | Value |
|---|---|
| Endpoint ID | `currency.snapshots` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/currency/snapshots` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `base` | `no` | `string` | `usd` | The base currency symbol. Multiple comma separated items allowed |
| `quote_type` | `no` | `string` | `indirect` | enum: direct, indirect Whether the quote is direct or indirect. Selecting 'direct' will return the exchange rate as the amount of domestic currency required to buy one unit of the foreign currency. Selecting 'indirect' (default) will return the exchange rate as the amount of foreign currency required to buy one unit of the domestic currency. |
| `counter_currencies` | `no` | `string | array | null` | `-` | accepts array values An optional list of counter currency symbols to filter for. None returns all. |

---

### `derivatives.futures.curve`

```python
data.derivatives.futures.curve(symbol=..., date=None, hours_ago=None)
```

Summary: Curve

| Field | Value |
|---|---|
| Endpoint ID | `derivatives.futures.curve` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/derivatives/futures/curve` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for.; Symbol to get data for.Default is 'VX_EOD'. Entered dates return the data nearest to the entered date. 'VX_AM' = Mid-Morning TWAP Levels 'VX_EOD' = 4PM Eastern Time Levels; Symbol to get data for. Default is 'btc' Supported symbols are: ['btc', 'eth', 'paxg'] |
| `date` | `no` | `string | null` | `-` | A specific date to get data for. Multiple comma separated items allowed |
| `hours_ago` | `no` | `integer | array | string | null` | `-` | accepts array values Compare the current curve with the specified number of hours ago. Default is None. Multiple comma separated items allowed. |

---

### `derivatives.futures.historical`

```python
data.derivatives.futures.historical(symbol=..., start_time=None, end_time=None, expiration=None, interval='1d')
```

Summary: Historical

| Field | Value |
|---|---|
| Endpoint ID | `derivatives.futures.historical` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/derivatives/futures/historical` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `expiration` | `no` | `string | null` | `-` | Future expiry date with format YYYY-MM |
| `interval` | `no` | `string` | `1d` | Time interval of the data to return. |

---

### `derivatives.futures.info`

```python
data.derivatives.futures.info(symbol=None)
```

Summary: Info

| Field | Value |
|---|---|
| Endpoint ID | `derivatives.futures.info` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/derivatives/futures/info` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. Perpetual contracts can be referenced by their currency pair - i.e, SOLUSDC - or by their official Deribit symbol - i.e, SOL_USDC-PERPETUAL For a list of currently available instruments, use `derivatives.futures.instruments()` Multiple comma separated items allowed. |

---

### `derivatives.futures.instruments`

```python
data.derivatives.futures.instruments()
```

Summary: Instruments

| Field | Value |
|---|---|
| Endpoint ID | `derivatives.futures.instruments` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/derivatives/futures/instruments` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `derivatives.options.chains`

```python
data.derivatives.options.chains(symbol=..., use_cache=True, delay='eod', date=None, option_type=None, moneyness='all', strike_gt=None, strike_lt=None, volume_gt=None, volume_lt=None, oi_gt=None, oi_lt=None, model='black_scholes', show_extended_price=True, include_related_symbols=False)
```

Summary: Chains

| Field | Value |
|---|---|
| Endpoint ID | `derivatives.options.chains` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/derivatives/options/chains` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `use_cache` | `no` | `boolean` | `true` | When True, the company directories will be cached for24 hours and are used to validate symbols. The results of the function are not cached. Set as False to bypass.; Caching is used to validate the supplied ticker symbol, or if a historical EOD chain is requested. To bypass, set to False. |
| `delay` | `no` | `string` | `eod` | enum: eod, realtime, delayed Whether to return delayed, realtime, or eod data. |
| `date` | `no` | `string | null` | `-` | The end-of-day date for options chains data.; A specific date to get data for. |
| `option_type` | `no` | `string | null` | `-` | The option type, call or put, 'None' is both (default). |
| `moneyness` | `no` | `string` | `all` | enum: otm, itm, all Return only contracts that are in or out of the money, default is 'all'. Parameter is ignored when a date is supplied. |
| `strike_gt` | `no` | `integer | null` | `-` | Return options with a strike price greater than the given value. Parameter is ignored when a date is supplied. |
| `strike_lt` | `no` | `integer | null` | `-` | Return options with a strike price less than the given value. Parameter is ignored when a date is supplied. |
| `volume_gt` | `no` | `integer | null` | `-` | Return options with a volume greater than the given value. Parameter is ignored when a date is supplied. |
| `volume_lt` | `no` | `integer | null` | `-` | Return options with a volume less than the given value. Parameter is ignored when a date is supplied. |
| `oi_gt` | `no` | `integer | null` | `-` | Return options with an open interest greater than the given value. Parameter is ignored when a date is supplied. |
| `oi_lt` | `no` | `integer | null` | `-` | Return options with an open interest less than the given value. Parameter is ignored when a date is supplied. |
| `model` | `no` | `string` | `black_scholes` | enum: black_scholes, bjerk The pricing model to use for options chains data, default is 'black_scholes'. Parameter is ignored when a date is supplied. |
| `show_extended_price` | `no` | `boolean` | `true` | Whether to include OHLC type fields, default is True. Parameter is ignored when a date is supplied. |
| `include_related_symbols` | `no` | `boolean` | `false` | Include related symbols that end in a 1 or 2 because of a corporate action, default is False. |

---

### `derivatives.options.snapshots`

```python
data.derivatives.options.snapshots(date=None, only_traded=True)
```

Summary: Snapshots

| Field | Value |
|---|---|
| Endpoint ID | `derivatives.options.snapshots` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/derivatives/options/snapshots` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `date` | `no` | `string | null` | `-` | The date of the data. Can be a datetime or an ISO datetime string. Data appears to go back to around 2022-06-01 Example: '2024-03-08T12:15:00+0400' |
| `only_traded` | `no` | `boolean` | `true` | Only include options that have been traded during the session, default is True. Setting to false will dramatically increase the size of the response - use with caution. |

---

### `derivatives.options.surface`

```python
data.derivatives.options.surface(target='implied_volatility', underlying_price=None, option_type='otm', dte_min=None, dte_max=None, moneyness=None, strike_min=None, strike_max=None, oi=False, volume=False, theme='dark', body=...)
```

Summary: Surface

| Field | Value |
|---|---|
| Endpoint ID | `derivatives.options.surface` |
| HTTP | `POST` |
| Path | `/inner/v1/agent-data/derivatives/options/surface` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `target` | `no` | `string` | `implied_volatility` | - |
| `underlying_price` | `no` | `number | null` | `-` | - |
| `option_type` | `no` | `string | null` | `otm` | - |
| `dte_min` | `no` | `integer | null` | `-` | - |
| `dte_max` | `no` | `integer | null` | `-` | - |
| `moneyness` | `no` | `number | null` | `-` | - |
| `strike_min` | `no` | `number | null` | `-` | - |
| `strike_max` | `no` | `number | null` | `-` | - |
| `oi` | `no` | `boolean` | `false` | - |
| `volume` | `no` | `boolean` | `false` | - |
| `theme` | `no` | `string` | `dark` | enum: dark, light |
| `body` | `yes` | `object` | `-` | JSON request body. |

---

### `derivatives.options.unusual`

```python
data.derivatives.options.unusual(symbol=None, start_time=None, end_time=None, trade_type=None, sentiment=None, min_value=None, max_value=None, limit=100000, source='delayed')
```

Summary: Unusual

| Field | Value |
|---|---|
| Endpoint ID | `derivatives.options.unusual` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/derivatives/options/unusual` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. (the underlying symbol) |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `trade_type` | `no` | `string | null` | `-` | The type of unusual activity to query for. |
| `sentiment` | `no` | `string | null` | `-` | The sentiment type to query for. |
| `min_value` | `no` | `integer | number | null` | `-` | The inclusive minimum total value for the unusual activity. |
| `max_value` | `no` | `integer | number | null` | `-` | The inclusive maximum total value for the unusual activity. |
| `limit` | `no` | `integer` | `100000` | The number of data entries to return. A typical day for all symbols will yield 50-80K records. The API will paginate at 1000 records. The high default limit (100K) is to be able to reliably capture the most days. The high absolute limit (1.25M) is to allow for outlier days. Queries at the absolute limit will take a long time, and might be unreliable. Apply filters to improve performance. |
| `source` | `no` | `string` | `delayed` | The source of the data. Either realtime or delayed. |

---

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

---

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

---

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

---

### `famafrench.breakpoints`

```python
data.famafrench.breakpoints(breakpoint_type='me', start_date=None, end_date=None)
```

Summary: Breakpoints

| Field | Value |
|---|---|
| Endpoint ID | `famafrench.breakpoints` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/famafrench/breakpoints` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `breakpoint_type` | `no` | `string` | `me` | Type of breakpoint to fetch. The breakpoints for month t use all NYSE stocks that have a CRSP share code of 10 or 11 and have good shares and price data. We exclude closed end funds and REITs. Breakpoints are computed either monthly or annually, see the description of each breakpoint type below. Data contains every fifth percentile, from 5% to 100%. ME -- Market Equity. Market equity (size) is price times shares outstanding. Price and shares outstanding are from CRSP. ME breakpoints are computed for each month. It is price times shares outstanding (divided by 1,000,000) at month end. BE/ME ----- BE/ME breakpoints are computed at the end of each June. The BE used in June of year t is the book equity for the last fiscal year end in t-1. ME is price times shares outstanding at the end of December of t-1. The breakpoints for year t use all NYSE stocks for which we have ME for December of t-1 and (positive) BE for the last fiscal year end in t-1. Operating Profitability ----------------------- Operating Profitability breakpoints are computed at the end of each June. OP for June of year t is annual revenues minus - cost of goods sold - interest expense - selling, general, and administrative expenses divided by book equity for the last fiscal year end in t-1. Please be aware that some of the value-weight averages of operating profitability for deciles 1 and 10 are extreme. These are driven by extraordinary values of OP for individual firms. We have spot checked the accounting data that produce the extraordinary values and all the numbers we examined accurately reflect the data in the firm's accounting statements. The breakpoints for year t use all NYSE stocks for which we have (positive) book equity data for t-1, non-missing revenues data for t-1, and non-missing data for at least one of the following: - cost of goods sold - selling, general and administrative expenses - interest expense for t-1. Investment ---------- Investment breakpoints are computed at the end of each June. Inv used in June of year t is the change in total assets from the fiscal year ending in year t-2 to the fiscal year ending in t-1, divided by t-2 total assets. The breakpoints for year t use all NYSE stocks for which we have total assets data for t-2 and t-1. E/P --- E/P (in percent) breakpoints are computed at the end of each June. The E used in June of year t is the earnings for the last fiscal year end in t-1. P (actually ME) is price times shares outstanding at the end of December of t-1. The breakpoints for year t use all NYSE stocks for which we have ME for December of t-1 and (positive) earnings for the last fiscal year end in t-1. CF/P ---- CF/P (in percent) breakpoints is computed at the end of each June. The CF used in June of year t is the cash flow for the last fiscal year end in t-1. P (actually ME) is price times shares outstanding at the end of December of t-1. The breakpoints for year t use all NYSE stocks for which we have ME for December of t-1 and (positive) cash flow for the last fiscal year end in t-1. D/P --- D/P (in percent) breakpoints are computed at the end of each June. The dividend yield in June of year t is the total dividends paid from July of t-1 to June of t per dollar of equity in June of t. The breakpoints for year t use NYSE stocks for which we have at least seven months (to compute the dividend yield) from July of t-1 to June of t. (Only six monthly returns are required in June 1926.) We do not include stocks that pay no dividends from July of t-1 to June of t. Prior 2-12 ---------- Prior return breakpoints are computed for each month. The prior return at the end of month t is the cumulative return from month t-11 to month t-1. The breakpoints for month t use NYSE stocks. To be included, a stock must have a price for the end of month t-12 and a good return for t-1. In addition, any missing returns from t-11 to t-2 must be -99.0, CRSP's code for a missing price. |
| `start_date` | `no` | `string | null` | `-` | Start date for the data. |
| `end_date` | `no` | `string | null` | `-` | End date for the data. |

---

### `famafrench.country_portfolio_returns`

```python
data.famafrench.country_portfolio_returns(country='united_kingdom', measure='usd', frequency='monthly', dividends=None, all_data_items_required=None, start_date=None, end_date=None)
```

Summary: Country Portfolio Returns

| Field | Value |
|---|---|
| Endpoint ID | `famafrench.country_portfolio_returns` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/famafrench/country_portfolio_returns` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `country` | `no` | `string` | `united_kingdom` | enum: austria, australia, belgium, canada, denmark, finland, france, germany, hong_kong, ireland, italy, japan, malaysia, netherlands, new_zealand, norway, singapore, spain, sweden, switzerland, united_kingdom Country to fetch the portfolio returns for. |
| `measure` | `no` | `string` | `usd` | The measure to fetch for the portfolio. Only 'annual' frequency is supported for 'ratios'. |
| `frequency` | `no` | `string` | `monthly` | The frequency of the data to fetch. Ignored when `measure` is set to 'ratios'. |
| `dividends` | `no` | `boolean | null` | `-` | When False, portoflios exclude dividends. |
| `all_data_items_required` | `no` | `boolean | null` | `-` | If True (default), includes firms with data for all four ratios. When False, includes only firms with Book-to-Market (B/M) data. |
| `start_date` | `no` | `string | null` | `-` | The start date for the data. Defaults to the earliest available date. |
| `end_date` | `no` | `string | null` | `-` | The end date for the data. Defaults to the latest available date. |

---

### `famafrench.factors`

```python
data.famafrench.factors(region='america', factor='3_factors', frequency='monthly', start_date=None, end_date=None)
```

Summary: Factors

| Field | Value |
|---|---|
| Endpoint ID | `famafrench.factors` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/famafrench/factors` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `region` | `no` | `string` | `america` | Region of focus. Default is America. |
| `factor` | `no` | `string` | `3_factors` | Factor to fetch. Default is the 3-Factor Model.Short/long-term reversals are available only for America. |
| `frequency` | `no` | `string` | `monthly` | Frequency of the factor data.Not all are available for all regions, and intervals depend on the factor selected. Weekly is only available for the US 3-Factor Model. |
| `start_date` | `no` | `string | null` | `-` | Start date of the data. Defaults to the complete data range. |
| `end_date` | `no` | `string | null` | `-` | End date of the data. Defaults to the complete data range. |

---

### `famafrench.international_index_returns`

```python
data.famafrench.international_index_returns(index='all', measure='usd', frequency='monthly', dividends=None, all_data_items_required=None, start_date=None, end_date=None)
```

Summary: International Index Returns

| Field | Value |
|---|---|
| Endpoint ID | `famafrench.international_index_returns` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/famafrench/international_index_returns` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `index` | `no` | `string` | `all` | International index to fetch the portfolio returns for. Defaults to 'all'. |
| `measure` | `no` | `string` | `usd` | The measure to fetch for the portfolio. Only 'annual' frequency is supported for 'ratios'. |
| `frequency` | `no` | `string` | `monthly` | The frequency of the data to fetch. Ignored when `measure` is set to 'ratios'. |
| `dividends` | `no` | `boolean | null` | `-` | When False, portoflios exclude dividends. |
| `all_data_items_required` | `no` | `boolean | null` | `-` | If True (default), includes firms with data for all four ratios. When False, includes only firms with Book-to-Market (B/M) data. |
| `start_date` | `no` | `string | null` | `-` | The start date for the data. Defaults to the earliest available date. |
| `end_date` | `no` | `string | null` | `-` | The end date for the data. Defaults to the latest available date. |

---

### `famafrench.regional_portfolio_returns`

```python
data.famafrench.regional_portfolio_returns(portfolio='developed_ex_us_6_portfolios_me_op', measure='value', frequency='monthly', start_date=None, end_date=None)
```

Summary: Regional Portfolio Returns

| Field | Value |
|---|---|
| Endpoint ID | `famafrench.regional_portfolio_returns` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/famafrench/regional_portfolio_returns` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `portfolio` | `no` | `string` | `developed_ex_us_6_portfolios_me_op` | enum: asia_pacific_ex_japan_25_portfolios_me_be-me, asia_pacific_ex_japan_25_portfolios_me_be-me_daily, asia_pacific_ex_japan_25_portfolios_me_inv, asia_pacific_ex_japan_25_portfolios_me_inv_daily, asia_pacific_ex_japan_25_portfolios_me_op, asia_pacific_ex_japan_25_portfolios_me_op_daily, asia_pacific_ex_japan_25_portfolios_me_prior_12_2, asia_pacific_ex_japan_25_portfolios_me_prior_250_20_daily, asia_pacific_ex_japan_32_portfolios_me_be-me_inv_2x4x4, asia_pacific_ex_japan_32_portfolios_me_be-me_op_2x4x4, asia_pacific_ex_japan_32_portfolios_me_inv_op_2x4x4, asia_pacific_ex_japan_6_portfolios_me_be-me, asia_pacific_ex_japan_6_portfolios_me_be-me_daily, asia_pacific_ex_japan_6_portfolios_me_inv, asia_pacific_ex_japan_6_portfolios_me_inv_daily, asia_pacific_ex_japan_6_portfolios_me_op, asia_pacific_ex_japan_6_portfolios_me_op_daily, asia_pacific_ex_japan_6_portfolios_me_prior_12_2, asia_pacific_ex_japan_6_portfolios_me_prior_250_20_daily, developed_25_portfolios_me_be-me, developed_25_portfolios_me_be-me_daily, developed_25_portfolios_me_inv, developed_25_portfolios_me_inv_daily, developed_25_portfolios_me_op, developed_25_portfolios_me_op_daily, developed_25_portfolios_me_prior_12_2, developed_25_portfolios_me_prior_250_20_daily, developed_32_portfolios_me_be-me_inv_2x4x4, developed_32_portfolios_me_be-me_op_2x4x4, developed_32_portfolios_me_inv_op_2x4x4, developed_6_portfolios_me_be-me, developed_6_portfolios_me_be-me_daily, developed_6_portfolios_me_inv, developed_6_portfolios_me_inv_daily, developed_6_portfolios_me_op, developed_6_portfolios_me_op_daily, developed_6_portfolios_me_prior_12_2, developed_6_portfolios_me_prior_250_20_daily, developed_ex_us_25_portfolios_me_be-me, developed_ex_us_25_portfolios_me_be-me_daily, developed_ex_us_25_portfolios_me_inv, developed_ex_us_25_portfolios_me_inv_daily, developed_ex_us_25_portfolios_me_op, developed_ex_us_25_portfolios_me_op_daily, developed_ex_us_25_portfolios_me_prior_12_2, developed_ex_us_25_portfolios_me_prior_250_20_daily, developed_ex_us_32_portfolios_me_be-me_inv_2x4x4, developed_ex_us_32_portfolios_me_be-me_op_2x4x4, developed_ex_us_32_portfolios_me_inv_op_2x4x4, developed_ex_us_6_portfolios_me_be-me, developed_ex_us_6_portfolios_me_be-me_daily, developed_ex_us_6_portfolios_me_inv, developed_ex_us_6_portfolios_me_inv_daily, developed_ex_us_6_portfolios_me_op, developed_ex_us_6_portfolios_me_op_daily, developed_ex_us_6_portfolios_me_prior_12_2, developed_ex_us_6_portfolios_me_prior_250_20_daily, emerging_markets_4_portfolios_be-me_inv, emerging_markets_4_portfolios_be-me_op, emerging_markets_4_portfolios_op_inv, emerging_markets_6_portfolios_me_be-me, emerging_markets_6_portfolios_me_inv, emerging_markets_6_portfolios_me_op, emerging_markets_6_portfolios_me_prior_12_2, europe_25_portfolios_me_be-me, europe_25_portfolios_me_be-me_daily, europe_25_portfolios_me_inv, europe_25_portfolios_me_inv_daily, europe_25_portfolios_me_op, europe_25_portfolios_me_op_daily, europe_25_portfolios_me_prior_12_2, europe_25_portfolios_me_prior_250_20_daily, europe_32_portfolios_me_be-me_inv_2x4x4, europe_32_portfolios_me_be-me_op_2x4x4, europe_32_portfolios_me_inv_op_2x4x4, europe_6_portfolios_me_be-me, europe_6_portfolios_me_be-me_daily, europe_6_portfolios_me_inv, europe_6_portfolios_me_inv_daily, europe_6_portfolios_me_op, europe_6_portfolios_me_op_daily, europe_6_portfolios_me_prior_12_2, europe_6_portfolios_me_prior_250_20_daily, japan_25_portfolios_me_be-me, japan_25_portfolios_me_be-me_daily, japan_25_portfolios_me_inv, japan_25_portfolios_me_inv_daily, japan_25_portfolios_me_op, japan_25_portfolios_me_op_daily, japan_25_portfolios_me_prior_12_2, japan_25_portfolios_me_prior_250_20_daily, japan_32_portfolios_me_be-me_inv_2x4x4, japan_32_portfolios_me_be-me_op_2x4x4, japan_32_portfolios_me_inv_op_2x4x4, japan_6_portfolios_me_be-me, japan_6_portfolios_me_be-me_daily, japan_6_portfolios_me_inv, japan_6_portfolios_me_inv_daily, japan_6_portfolios_me_op, japan_6_portfolios_me_op_daily, japan_6_portfolios_me_prior_12_2, japan_6_portfolios_me_prior_250_20_daily, north_america_25_portfolios_me_be-me, north_america_25_portfolios_me_be-me_daily, north_america_25_portfolios_me_inv, north_america_25_portfolios_me_inv_daily, north_america_25_portfolios_me_op, north_america_25_portfolios_me_op_daily, north_america_25_portfolios_me_prior_12_2, north_america_25_portfolios_me_prior_250_20_daily, north_america_32_portfolios_me_be-me_inv_2x4x4, north_america_32_portfolios_me_be-me_op_2x4x4, north_america_32_portfolios_me_inv_op_2x4x4, north_america_6_portfolios_me_be-me, north_america_6_portfolios_me_be-me_daily, north_america_6_portfolios_me_inv, north_america_6_portfolios_me_inv_daily, north_america_6_portfolios_me_op, north_america_6_portfolios_me_op_daily, north_america_6_portfolios_me_prior_12_2, north_america_6_portfolios_me_prior_250_20_daily The specific portfolio file to fetch. |
| `measure` | `no` | `string` | `value` | The measure to fetch for the portfolio. |
| `frequency` | `no` | `string` | `monthly` | The frequency of the data to fetch. Ignored when the portfolio ends with 'daily'. |
| `start_date` | `no` | `string | null` | `-` | The start date for the data. Defaults to the earliest available date. |
| `end_date` | `no` | `string | null` | `-` | The end date for the data. Defaults to the latest available date. |

---

### `famafrench.us_portfolio_returns`

```python
data.famafrench.us_portfolio_returns(portfolio='portfolios_formed_on_me', measure='value', frequency='monthly', start_date=None, end_date=None)
```

Summary: Us Portfolio Returns

| Field | Value |
|---|---|
| Endpoint ID | `famafrench.us_portfolio_returns` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/famafrench/us_portfolio_returns` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `portfolio` | `no` | `string` | `portfolios_formed_on_me` | enum: portfolios_formed_on_me, portfolios_formed_on_me_wout_div, portfolios_formed_on_me_daily, portfolios_formed_on_be-me, portfolios_formed_on_be-me_wout_div, portfolios_formed_on_be-me_daily, portfolios_formed_on_op, portfolios_formed_on_op_wout_div, portfolios_formed_on_op_daily, portfolios_formed_on_inv, portfolios_formed_on_inv_wout_div, portfolios_formed_on_inv_daily, 6_portfolios_2x3, 6_portfolios_2x3_wout_div, 6_portfolios_2x3_weekly, 6_portfolios_2x3_daily, 25_portfolios_5x5, 25_portfolios_5x5_wout_div, 25_portfolios_5x5_daily, 100_portfolios_10x10, 100_portfolios_10x10_wout_div, 100_portfolios_10x10_daily, 6_portfolios_me_op_2x3, 6_portfolios_me_op_2x3_wout_div, 6_portfolios_me_op_2x3_daily, 25_portfolios_me_op_5x5, 25_portfolios_me_op_5x5_wout_div, 25_portfolios_me_op_5x5_daily, 100_portfolios_me_op_10x10, 100_portfolios_10x10_me_op_wout_div, 100_portfolios_me_op_10x10_daily, 6_portfolios_me_inv_2x3, 6_portfolios_me_inv_2x3_wout_div, 6_portfolios_me_inv_2x3_daily, 25_portfolios_me_inv_5x5, 25_portfolios_me_inv_5x5_wout_div, 25_portfolios_me_inv_5x5_daily, 100_portfolios_me_inv_10x10, 100_portfolios_10x10_me_inv_wout_div, 100_portfolios_me_inv_10x10_daily, 25_portfolios_beme_op_5x5, 25_portfolios_beme_op_5x5_wout_div, 25_portfolios_beme_op_5x5_daily, 25_portfolios_beme_inv_5x5, 25_portfolios_beme_inv_5x5_wout_div, 25_portfolios_beme_inv_5x5_daily, 25_portfolios_op_inv_5x5, 25_portfolios_op_inv_5x5_wout_div, 25_portfolios_op_inv_5x5_daily, 32_portfolios_me_beme_op_2x4x4, 32_portfolios_me_beme_op_2x4x4_wout_div, 32_portfolios_me_beme_inv_2x4x4, 32_portfolios_me_beme_inv_2x4x4_wout_div, 32_portfolios_me_op_inv_2x4x4, 32_portfolios_me_op_inv_2x4x4_wout_div, portfolios_formed_on_e-p, portfolios_formed_on_e-p_wout_div, portfolios_formed_on_cf-p, portfolios_formed_on_cf-p_wout_div, portfolios_formed_on_d-p, portfolios_formed_on_d-p_wout_div, 6_portfolios_me_ep_2x3, 6_portfolios_me_ep_2x3_wout_div, 6_portfolios_me_cfp_2x3, 6_portfolios_me_cfp_2x3_wout_div, 6_portfolios_me_dp_2x3, 6_portfolios_me_dp_2x3_wout_div, 6_portfolios_me_prior_12_2, 6_portfolios_me_prior_12_2_daily, 25_portfolios_me_prior_12_2, 25_portfolios_me_prior_12_2_daily, 10_portfolios_prior_12_2, 10_portfolios_prior_12_2_daily, 6_portfolios_me_prior_1_0, 6_portfolios_me_prior_1_0_daily, 25_portfolios_me_prior_1_0, 25_portfolios_me_prior_1_0_daily, 10_portfolios_prior_1_0, 10_portfolios_prior_1_0_daily, 6_portfolios_me_prior_60_13, 6_portfolios_me_prior_60_13_daily, 25_portfolios_me_prior_60_13, 25_portfolios_me_prior_60_13_daily, 10_portfolios_prior_60_13, 10_portfolios_prior_60_13_daily, portfolios_formed_on_ac, 25_portfolios_me_ac_5x5, portfolios_formed_on_beta, 25_portfolios_me_beta_5x5, portfolios_formed_on_ni, 25_portfolios_me_ni_5x5, portfolios_formed_on_var, 25_portfolios_me_var_5x5, portfolios_formed_on_resvar, 25_portfolios_me_resvar_5x5, 5_industry_portfolios, 5_industry_portfolios_wout_div, 5_industry_portfolios_daily, 10_industry_portfolios, 10_industry_portfolios_wout_div, 10_industry_portfolios_daily, 12_industry_portfolios, 12_industry_portfolios_wout_div, 12_industry_portfolios_daily, 17_industry_portfolios, 17_industry_portfolios_wout_div, 17_industry_portfolios_daily, 30_industry_portfolios, 30_industry_portfolios_wout_div, 30_industry_portfolios_daily, 38_industry_portfolios, 38_industry_portfolios_wout_div, 38_industry_portfolios_daily, 48_industry_portfolios, 48_industry_portfolios_wout_div, 48_industry_portfolios_daily, 49_industry_portfolios, 49_industry_portfolios_wout_div, 49_industry_portfolios_daily The specific portfolio file to fetch. |
| `measure` | `no` | `string` | `value` | The measure to fetch for the portfolio. |
| `frequency` | `no` | `string` | `monthly` | The frequency of the data to fetch. Ignored if the portfolio ends with 'daily' or 'weekly'. |
| `start_date` | `no` | `string | null` | `-` | The start date for the data. Defaults to the earliest available date. |
| `end_date` | `no` | `string | null` | `-` | The end date for the data. Defaults to the latest available date. |

---

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

---

### `imf_utils.get_dataflow_dimensions`

```python
data.imf_utils.get_dataflow_dimensions(dataflow_id=..., output_format='json')
```

Summary: Get Dataflow Dimensions

| Field | Value |
|---|---|
| Endpoint ID | `imf_utils.get_dataflow_dimensions` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/imf_utils/get_dataflow_dimensions` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `dataflow_id` | `yes` | `string` | `-` | The IMF dataflow ID. Use `list_dataflows()` to see available dataflows. |
| `output_format` | `no` | `string` | `json` | - |

---

### `imf_utils.list_dataflow_choices`

```python
data.imf_utils.list_dataflow_choices()
```

Summary: List Dataflow Choices

| Field | Value |
|---|---|
| Endpoint ID | `imf_utils.list_dataflow_choices` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/imf_utils/list_dataflow_choices` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

No query parameters.

---

### `imf_utils.list_dataflows`

```python
data.imf_utils.list_dataflows(output_format='json')
```

Summary: List Dataflows

| Field | Value |
|---|---|
| Endpoint ID | `imf_utils.list_dataflows` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/imf_utils/list_dataflows` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `output_format` | `no` | `string` | `json` | - |

---

### `imf_utils.list_port_id_choices`

```python
data.imf_utils.list_port_id_choices()
```

Summary: List Port Id Choices

| Field | Value |
|---|---|
| Endpoint ID | `imf_utils.list_port_id_choices` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/imf_utils/list_port_id_choices` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

No query parameters.

---

### `imf_utils.list_table_choices`

```python
data.imf_utils.list_table_choices()
```

Summary: List Table Choices

| Field | Value |
|---|---|
| Endpoint ID | `imf_utils.list_table_choices` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/imf_utils/list_table_choices` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

No query parameters.

---

### `imf_utils.list_tables`

```python
data.imf_utils.list_tables()
```

Summary: List Tables

| Field | Value |
|---|---|
| Endpoint ID | `imf_utils.list_tables` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/imf_utils/list_tables` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

No query parameters.

---

### `imf_utils.presentation_table`

```python
data.imf_utils.presentation_table(dataflow_group=None, table=None, country=None, frequency=None, dimension_values=None, limit=1, raw=False)
```

Summary: Presentation Table

| Field | Value |
|---|---|
| Endpoint ID | `imf_utils.presentation_table` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/imf_utils/presentation_table` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `dataflow_group` | `no` | `string | null` | `-` | The IMF dataflow group. See presentation_table_choices() for options. |
| `table` | `no` | `string | null` | `-` | The IMF presentation table ID. See presentation_table_choices() for options. |
| `country` | `no` | `string | null` | `-` | Country code to filter the data. Enter multiple codes by joining on '+'. See presentation_table_choices() for options. Typical values are ISO3 country codes. |
| `frequency` | `no` | `string | null` | `-` | The data frequency. See presentation_table_choices() for options. Typical values are 'A' (annual), 'Q' (quarter), 'M' (month), or 'D' (day). |
| `dimension_values` | `no` | `array | string | null` | `-` | accepts array values Dimension selection for filtering. Format: 'DIM_ID1:VAL1+VAL2.' See presentation_table_choices() and list_dataflow_choices() for available dimensions and values. |
| `limit` | `no` | `integer` | `1` | Maximum number of records to retrieve per series. |
| `raw` | `no` | `boolean` | `false` | Return presentation table as raw JSON data if True. |

---

### `imf_utils.presentation_table_choices`

```python
data.imf_utils.presentation_table_choices(dataflow_group=None, table=None, country=None, frequency=None)
```

Summary: Presentation Table Choices

| Field | Value |
|---|---|
| Endpoint ID | `imf_utils.presentation_table_choices` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/imf_utils/presentation_table_choices` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `dataflow_group` | `no` | `string | null` | `-` | - |
| `table` | `no` | `string | null` | `-` | - |
| `country` | `no` | `string | null` | `-` | - |
| `frequency` | `no` | `string | null` | `-` | - |

---

### `index.available`

```python
data.index.available(use_cache=True)
```

Summary: Available

| Field | Value |
|---|---|
| Endpoint ID | `index.available` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/index/available` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `use_cache` | `no` | `boolean` | `true` | When True, the Cboe Index directory will be cached for 24 hours. Set as False to bypass.; Whether to use a cached request. Index data is from a single JSON file, updated each day after close. It is cached for one day. To bypass, set to False. |

---

### `index.constituents`

```python
data.index.constituents(symbol=..., historical=False, use_cache=True)
```

Summary: Constituents

| Field | Value |
|---|---|
| Endpoint ID | `index.constituents` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/index/constituents` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `historical` | `no` | `boolean` | `false` | Flag to retrieve historical removals and additions. |
| `use_cache` | `no` | `boolean` | `true` | Whether to use a cached request. Index data is from a single JSON file, updated each day after close. It is cached for one day. To bypass, set to False. |

---

### `index.price.historical`

```python
data.index.price.historical(symbol=..., start_time=None, end_time=None, interval='1d', use_cache=True, limit=10000)
```

Summary: Historical

| Field | Value |
|---|---|
| Endpoint ID | `index.price.historical` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/index/price/historical` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `interval` | `no` | `string` | `1d` | Time interval of the data to return. The most recent trading day is not including in daily historical data. Intraday data is only available for the most recent trading day at 1 minute intervals.; Time interval of the data to return. |
| `use_cache` | `no` | `boolean` | `true` | When True, the company directories will be cached for 24 hours and are used to validate symbols. The results of the function are not cached. Set as False to bypass. |
| `limit` | `no` | `integer | null` | `10000` | The number of data entries to return. |

---

### `index.search`

```python
data.index.search(query='', is_symbol=False, use_cache=True)
```

Summary: Search

| Field | Value |
|---|---|
| Endpoint ID | `index.search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/index/search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `no` | `string` | `` | Search query. |
| `is_symbol` | `no` | `boolean` | `false` | Whether to search by ticker symbol. |
| `use_cache` | `no` | `boolean` | `true` | When True, the Cboe Index directory will be cached for 24 hours. Set as False to bypass. |

---

### `index.sectors`

```python
data.index.sectors(symbol=..., use_cache=True)
```

Summary: Sectors

| Field | Value |
|---|---|
| Endpoint ID | `index.sectors` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/index/sectors` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `use_cache` | `no` | `boolean` | `true` | Whether to use a cached request. All Index data comes from a single JSON file that is updated daily. To bypass, set to False. If True, the data will be cached for 1 day. |

---

### `index.snapshots`

```python
data.index.snapshots(region='us', use_cache=True)
```

Summary: Snapshots

| Field | Value |
|---|---|
| Endpoint ID | `index.snapshots` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/index/snapshots` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `region` | `no` | `string` | `us` | The region of focus for the data - i.e., us, eu. |
| `use_cache` | `no` | `boolean` | `true` | Whether to use a cached request. Index data is from a single JSON file, updated each day after close. It is cached for one day. To bypass, set to False. |

---

### `index.sp500_multiples`

```python
data.index.sp500_multiples(start_time=None, end_time=None, series_name='pe_month')
```

Summary: Sp500 Multiples

| Field | Value |
|---|---|
| Endpoint ID | `index.sp500_multiples` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/index/sp500_multiples` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `series_name` | `no` | `string` | `pe_month` | The name of the series. Defaults to 'pe_month'. Multiple comma separated items allowed |

---

### `news.company`

```python
data.news.company(start_time=None, end_time=None, symbol=None, limit=None, date=None, display='full', updated_since=None, published_since=None, sort='created', order='desc', isin=None, cusip=None, channels=None, topics=None, authors=None, content_types=None, page=0, press_release=None, source=None, sentiment=None, language=None, topic=None, word_count_greater_than=None, word_count_less_than=None, is_spam=None, business_relevance_greater_than=None, business_relevance_less_than=None, offset=0)
```

Summary: Company

| Field | Value |
|---|---|
| Endpoint ID | `news.company` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/news/company` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `symbol` | `no` | `string | null` | `-` | Symbol to get data for. Multiple comma separated items allowed |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. |
| `date` | `no` | `string | null` | `-` | A specific date to get data for. |
| `display` | `no` | `string` | `full` | enum: headline, abstract, full Specify headline only (headline), headline + teaser (abstract), or headline + full body (full). |
| `updated_since` | `no` | `integer | null` | `-` | Number of seconds since the news was updated. |
| `published_since` | `no` | `integer | null` | `-` | Number of seconds since the news was published. |
| `sort` | `no` | `string` | `created` | enum: id, created, updated Key to sort the news by. |
| `order` | `no` | `string` | `desc` | enum: asc, desc Order to sort the news by. |
| `isin` | `no` | `string | null` | `-` | The company's ISIN. |
| `cusip` | `no` | `string | null` | `-` | The company's CUSIP. |
| `channels` | `no` | `string | null` | `-` | Channels of the news to retrieve. |
| `topics` | `no` | `string | null` | `-` | Topics of the news to retrieve. |
| `authors` | `no` | `string | null` | `-` | Authors of the news to retrieve. |
| `content_types` | `no` | `string | null` | `-` | Content types of the news to retrieve. |
| `page` | `no` | `integer | null` | `0` | Page number of the results. Use in combination with limit.; The page number to start from. Use with limit. |
| `press_release` | `no` | `boolean | null` | `-` | When true, will return only press releases for the given symbol(s). |
| `source` | `no` | `string | null` | `-` | The source of the news article.; A comma-separated list of the domains requested. Multiple comma separated items allowed. |
| `sentiment` | `no` | `string | null` | `-` | Return news only from this source. |
| `language` | `no` | `string | null` | `-` | Filter by language. Unsupported for yahoo source. |
| `topic` | `no` | `string | null` | `-` | Filter by topic. Unsupported for yahoo source. |
| `word_count_greater_than` | `no` | `integer | null` | `-` | News stories will have a word count greater than this value. Unsupported for yahoo source. |
| `word_count_less_than` | `no` | `integer | null` | `-` | News stories will have a word count less than this value. Unsupported for yahoo source. |
| `is_spam` | `no` | `boolean | null` | `-` | Filter whether it is marked as spam or not. Unsupported for yahoo source. |
| `business_relevance_greater_than` | `no` | `number | null` | `-` | News stories will have a business relevance score more than this value. Unsupported for yahoo source. Value is a decimal between 0 and 1. |
| `business_relevance_less_than` | `no` | `number | null` | `-` | News stories will have a business relevance score less than this value. Unsupported for yahoo source. Value is a decimal between 0 and 1. |
| `offset` | `no` | `integer | null` | `0` | Page offset, used in conjunction with limit. |

---

### `news.label_search`

```python
data.news.label_search(label=..., language_id=0, start_time=None, end_time=None, page=1, page_size=10)
```

Summary: Label Search

| Field | Value |
|---|---|
| Endpoint ID | `news.label_search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/news/label_search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `label` | `yes` | `integer | string` | `-` | News label type to search for. Accepts either the integer type code or the human-readable name: 1=Crypto, 2=Stocks, 6=Commodities & Forex, 7=Macro. |
| `language_id` | `no` | `integer | string | null` | `0` | Language filter. Accepts either the integer language code or a locale string (e.g. 'en', 'zh-CN', 'ja'). Defaults to 0 (English). |
| `start_time` | `no` | `string | integer | number | null` | `-` | Start of the time range. Accepts a datetime object, an ISO-8601 string, or a Unix timestamp (seconds or milliseconds). Converted to millisecond epoch before sending to the API. |
| `end_time` | `no` | `string | integer | number | null` | `-` | End of the time range. Accepts a datetime object, an ISO-8601 string, or a Unix timestamp (seconds or milliseconds). Converted to millisecond epoch before sending to the API. |
| `page` | `no` | `integer | null` | `1` | Page number for pagination (1-based). Defaults to 1. |
| `page_size` | `no` | `integer | null` | `10` | Number of news items per page. Defaults to 10. |

---

### `news.world`

```python
data.news.world(start_time=None, end_time=None, limit=None, date=None, display='full', updated_since=None, published_since=None, sort='created', order='desc', isin=None, cusip=None, channels=None, topics=None, authors=None, content_types=None, term=None, source=None, topic='general', page=None, sentiment=None, language=None, word_count_greater_than=None, word_count_less_than=None, is_spam=None, business_relevance_greater_than=None, business_relevance_less_than=None, offset=0)
```

Summary: World

| Field | Value |
|---|---|
| Endpoint ID | `news.world` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/news/world` |
| SDK | `supported` |
| Host | `supported` |
| Notes | Global news feed endpoint for macro/news-aware strategies. |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. The number of articles to return. |
| `date` | `no` | `string | null` | `-` | A specific date to get data for. |
| `display` | `no` | `string` | `full` | enum: headline, abstract, full Specify headline only (headline), headline + teaser (abstract), or headline + full body (full). |
| `updated_since` | `no` | `integer | null` | `-` | Number of seconds since the news was updated. |
| `published_since` | `no` | `integer | null` | `-` | Number of seconds since the news was published. |
| `sort` | `no` | `string` | `created` | enum: id, created, updated Key to sort the news by. |
| `order` | `no` | `string` | `desc` | enum: asc, desc Order to sort the news by. |
| `isin` | `no` | `string | null` | `-` | The ISIN of the news to retrieve. |
| `cusip` | `no` | `string | null` | `-` | The CUSIP of the news to retrieve. |
| `channels` | `no` | `string | null` | `-` | Channels of the news to retrieve. |
| `topics` | `no` | `string | null` | `-` | Topics of the news to retrieve. |
| `authors` | `no` | `string | null` | `-` | Authors of the news to retrieve. |
| `content_types` | `no` | `string | null` | `-` | Content types of the news to retrieve. |
| `term` | `no` | `string | null` | `-` | Search term to filter articles by. This overrides all other filters. |
| `source` | `no` | `string | null` | `-` | Filter by a specific publisher. Only valid when filter is set to source.; The source of the news article.; A comma-separated list of the domains requested. Multiple comma separated items allowed. |
| `topic` | `no` | `string | null` | `general` | The topic of the news to be fetched.; Filter by topic. Unsupported for yahoo source. |
| `page` | `no` | `integer | null` | `-` | Page number of the results. Use in combination with limit. |
| `sentiment` | `no` | `string | null` | `-` | Return news only from this source. |
| `language` | `no` | `string | null` | `-` | Filter by language. Unsupported for yahoo source. |
| `word_count_greater_than` | `no` | `integer | null` | `-` | News stories will have a word count greater than this value. Unsupported for yahoo source. |
| `word_count_less_than` | `no` | `integer | null` | `-` | News stories will have a word count less than this value. Unsupported for yahoo source. |
| `is_spam` | `no` | `boolean | null` | `-` | Filter whether it is marked as spam or not. Unsupported for yahoo source. |
| `business_relevance_greater_than` | `no` | `number | null` | `-` | News stories will have a business relevance score more than this value. Unsupported for yahoo source. Value is a decimal between 0 and 1. |
| `business_relevance_less_than` | `no` | `number | null` | `-` | News stories will have a business relevance score less than this value. Unsupported for yahoo source. Value is a decimal between 0 and 1. |
| `offset` | `no` | `integer | null` | `0` | Page offset, used in conjunction with limit. |

---

### `regulators.cftc.cot`

```python
data.regulators.cftc.cot(start_time=None, end_time=None, id='045601', report_type='legacy', futures_only=False)
```

Summary: Cot

| Field | Value |
|---|---|
| Endpoint ID | `regulators.cftc.cot` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/regulators/cftc/cot` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `start_time` | `no` | `integer | null` | `-` | Start time of the data as a Unix timestamp in milliseconds. Takes priority over start_date when both are provided. |
| `end_time` | `no` | `integer | null` | `-` | End time of the data as a Unix timestamp in milliseconds. Takes priority over end_date when both are provided. |
| `id` | `no` | `string` | `045601` | A string with the CFTC market code or other identifying string, such as the contract market name, commodity name, or commodity group - i.e, 'gold' or 'japanese yen'.Default report is Fed Funds Futures. Use the 'cftc_market_code' for an exact match. |
| `report_type` | `no` | `string` | `legacy` | enum: legacy, disaggregated, financial, supplemental The type of report to retrieve. Set `id` as 'all' to return all items in the report type (default date range returns the latest report). The Legacy report is broken down by exchange with reported open interest further broken down into three trader classifications: commercial, non-commercial and non-reportable. The Disaggregated reports are broken down by Agriculture and Natural Resource contracts. The Disaggregated reports break down reportable open interest positions into four classifications: Producer/Merchant, Swap Dealers, Managed Money and Other Reportables. The Traders in Financial Futures (TFF) report includes financial contracts. The TFF report breaks down the reported open interest into five classifications: Dealer, Asset Manager, Leveraged Money, Other Reportables and Non-Reportables. |
| `futures_only` | `no` | `boolean` | `false` | Returns the futures-only report. Default is False, for the combined report. |

---

### `regulators.cftc.cot_search`

```python
data.regulators.cftc.cot_search(query='')
```

Summary: Cot Search

| Field | Value |
|---|---|
| Endpoint ID | `regulators.cftc.cot_search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/regulators/cftc/cot_search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `no` | `string` | `` | Search query. |

---

### `regulators.sec.cik_map`

```python
data.regulators.sec.cik_map(symbol=..., use_cache=True)
```

Summary: Cik Map

| Field | Value |
|---|---|
| Endpoint ID | `regulators.sec.cik_map` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/regulators/sec/cik_map` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Symbol to get data for. |
| `use_cache` | `no` | `boolean | null` | `true` | Whether or not to use cache for the request, default is True. |

---

### `regulators.sec.filing_headers`

```python
data.regulators.sec.filing_headers(url='', use_cache=True)
```

Summary: Filing Headers

| Field | Value |
|---|---|
| Endpoint ID | `regulators.sec.filing_headers` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/regulators/sec/filing_headers` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `url` | `no` | `string` | `` | URL for the SEC filing. The specific URL is not directly used or downloaded, but is used to generate the base URL for the filing. e.g. https://www.sec.gov/Archives/edgar/data/317540/000031754024000045/coke-20240731.htm and https://www.sec.gov/Archives/edgar/data/317540/000031754024000045/ are both valid URLs for the same filing. |
| `use_cache` | `no` | `boolean` | `true` | Use cache for the index headers and cover page. Default is True. |

---

### `regulators.sec.htm_file`

```python
data.regulators.sec.htm_file(url='', use_cache=True)
```

Summary: Htm File

| Field | Value |
|---|---|
| Endpoint ID | `regulators.sec.htm_file` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/regulators/sec/htm_file` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `url` | `no` | `string` | `` | URL for the SEC filing. |
| `use_cache` | `no` | `boolean` | `true` | Cache the file for use later. Default is True. |

---

### `regulators.sec.institutions_search`

```python
data.regulators.sec.institutions_search(query='', use_cache=True)
```

Summary: Institutions Search

| Field | Value |
|---|---|
| Endpoint ID | `regulators.sec.institutions_search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/regulators/sec/institutions_search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `no` | `string` | `` | Search query. |
| `use_cache` | `no` | `boolean | null` | `true` | Whether or not to use cache. |

---

### `regulators.sec.rss_litigation`

```python
data.regulators.sec.rss_litigation()
```

Summary: Rss Litigation

| Field | Value |
|---|---|
| Endpoint ID | `regulators.sec.rss_litigation` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/regulators/sec/rss_litigation` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `regulators.sec.schema_files`

```python
data.regulators.sec.schema_files(taxonomy=None, year=None, component=None, category=None)
```

Summary: Schema Files

| Field | Value |
|---|---|
| Endpoint ID | `regulators.sec.schema_files` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/regulators/sec/schema_files` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `taxonomy` | `no` | `string | null` | `-` | Taxonomy family to explore. Omit to list all available taxonomies and their descriptions. |
| `year` | `no` | `integer | null` | `-` | Taxonomy year (e.g. 2011+ for us-gaap, varies by taxonomy). Defaults to the most recent year when omitted. |
| `component` | `no` | `string | null` | `-` | Presentation component to retrieve. Values are taxonomy-specific. Omit to return all components for the taxonomy. |
| `category` | `no` | `string | null` | `-` | Filter taxonomies by SEC filer category. |

---

### `regulators.sec.sic_search`

```python
data.regulators.sec.sic_search(query='', use_cache=True)
```

Summary: Sic Search

| Field | Value |
|---|---|
| Endpoint ID | `regulators.sec.sic_search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/regulators/sec/sic_search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `no` | `string` | `` | Search query. |
| `use_cache` | `no` | `boolean | null` | `true` | Whether or not to use cache. |

---

### `regulators.sec.symbol_map`

```python
data.regulators.sec.symbol_map(query=..., use_cache=True)
```

Summary: Symbol Map

| Field | Value |
|---|---|
| Endpoint ID | `regulators.sec.symbol_map` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/regulators/sec/symbol_map` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `yes` | `string` | `-` | Search query. |
| `use_cache` | `no` | `boolean | null` | `true` | Whether or not to use cache. If True, cache will store for seven days. |

---

### `sentiment.followin_coin_news`

```python
data.sentiment.followin_coin_news(symbol=..., limit=20)
```

Summary: Followin Coin News

| Field | Value |
|---|---|
| Endpoint ID | `sentiment.followin_coin_news` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/sentiment/followin_coin_news` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `symbol` | `yes` | `string` | `-` | Coin/token symbol to fetch news for (e.g. 'BTC', 'ETH'). |
| `limit` | `no` | `integer` | `20` | Maximum number of articles to return. Default 20. |

---

### `sentiment.followin_news`

```python
data.sentiment.followin_news(news_type='trending', limit=20)
```

Summary: Followin News

| Field | Value |
|---|---|
| Endpoint ID | `sentiment.followin_news` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/sentiment/followin_news` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `news_type` | `no` | `string` | `trending` | Type of news to fetch. 'trending' = hot news feed, 'flash' = flash/breaking news, 'kol_opinions' = KOL opinion articles. |
| `limit` | `no` | `integer` | `20` | Maximum number of articles to return. Default 20. |

---

### `sentiment.followin_trending_topics`

```python
data.sentiment.followin_trending_topics(limit=20)
```

Summary: Followin Trending Topics

| Field | Value |
|---|---|
| Endpoint ID | `sentiment.followin_trending_topics` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/sentiment/followin_trending_topics` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `limit` | `no` | `integer` | `20` | Maximum number of topics to return. Default 20. |

---

### `sentiment.market_fear_greed`

```python
data.sentiment.market_fear_greed()
```

Summary: Market Fear Greed

| Field | Value |
|---|---|
| Endpoint ID | `sentiment.market_fear_greed` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/sentiment/market_fear_greed` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|

---

### `sentiment.news`

```python
data.sentiment.news(category='all', limit=20)
```

Summary: News

| Field | Value |
|---|---|
| Endpoint ID | `sentiment.news` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/sentiment/news` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `category` | `no` | `string` | `all` | News category filter. 'all' fetches all 44 sources concurrently. Other options filter by source group: 'crypto_core' (7 sources), 'crypto_high_freq' (4), 'crypto_supplement' (6), 'macro' (4), 'kol' (4), 'tech_ai' (5), 'geopolitical' (5), 'reddit' (5), 'chinese_japanese' (2), 'other' (2). |
| `limit` | `no` | `integer` | `20` | Maximum number of articles to return per source. Default 20. |

---

### `sentiment.trending`

```python
data.sentiment.trending(filter='all-stocks', page=1)
```

Summary: Trending

| Field | Value |
|---|---|
| Endpoint ID | `sentiment.trending` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/sentiment/trending` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `filter` | `no` | `string` | `all-stocks` | Category or subreddit filter for trending data.; The subreddit or category filter. 'all-stocks' aggregates all stock-related subreddits, 'all-crypto' aggregates all crypto-related subreddits, '4chan' is /biz/ board, or specific subreddits like 'wallstreetbets', 'stocks', 'investing', 'cryptocurrency'. |
| `page` | `no` | `integer` | `1` | Page number for pagination. |

---

### `sentiment.twitter_list_timeline`

```python
data.sentiment.twitter_list_timeline(list_id=..., count=20, cursor='')
```

Summary: Twitter List Timeline

| Field | Value |
|---|---|
| Endpoint ID | `sentiment.twitter_list_timeline` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/sentiment/twitter_list_timeline` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `list_id` | `yes` | `string` | `-` | Twitter List ID to fetch tweets from. |
| `count` | `no` | `integer` | `20` | Number of tweets to return (max 100). |
| `cursor` | `no` | `string` | `` | Pagination cursor for next page. Leave empty for first page. |

---

### `sentiment.twitter_search`

```python
data.sentiment.twitter_search(query=..., count=20, cursor='', product='Latest')
```

Summary: Twitter Search

| Field | Value |
|---|---|
| Endpoint ID | `sentiment.twitter_search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/sentiment/twitter_search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `yes` | `string` | `-` | Search query string. |
| `count` | `no` | `integer` | `20` | Number of tweets to return (max 40). |
| `cursor` | `no` | `string` | `` | Pagination cursor for next page. Leave empty for first page. |
| `product` | `no` | `string` | `Latest` | Timeline product type. One of 'Latest' or 'Top'. |

---

### `sentiment.twitter_tweet_detail`

```python
data.sentiment.twitter_tweet_detail(tweet_id=...)
```

Summary: Twitter Tweet Detail

| Field | Value |
|---|---|
| Endpoint ID | `sentiment.twitter_tweet_detail` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/sentiment/twitter_tweet_detail` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `tweet_id` | `yes` | `string` | `-` | The focal tweet ID to fetch details for. |

---

### `sentiment.twitter_user_by_id`

```python
data.sentiment.twitter_user_by_id(user_id=...)
```

Summary: Twitter User By Id

| Field | Value |
|---|---|
| Endpoint ID | `sentiment.twitter_user_by_id` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/sentiment/twitter_user_by_id` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `user_id` | `yes` | `string` | `-` | Twitter user ID (numeric string). |

---

### `sentiment.twitter_user_by_name`

```python
data.sentiment.twitter_user_by_name(screen_name=...)
```

Summary: Twitter User By Name

| Field | Value |
|---|---|
| Endpoint ID | `sentiment.twitter_user_by_name` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/sentiment/twitter_user_by_name` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `screen_name` | `yes` | `string` | `-` | Twitter screen name / @handle (without @). |

---

### `uscongress.bill_info`

```python
data.uscongress.bill_info(bill_url=None)
```

Summary: Bill Info

| Field | Value |
|---|---|
| Endpoint ID | `uscongress.bill_info` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/uscongress/bill_info` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `bill_url` | `no` | `string | null` | `-` | Enter a base URL of a bill (e.g., 'https://api.congress.gov/v3/bill/119/s/1947?format=json'). Alternatively, you can enter a bill number (e.g., '119/s/1947'). |

---

### `uscongress.bill_text`

```python
data.uscongress.bill_text(, body=...)
```

Summary: Bill Text

| Field | Value |
|---|---|
| Endpoint ID | `uscongress.bill_text` |
| HTTP | `POST` |
| Path | `/inner/v1/agent-data/uscongress/bill_text` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `body` | `no` | `string | array | object | null` | `-` | List of direct bill URLs to download. Multiple comma separated items allowed. |

---

### `uscongress.bill_text_urls`

```python
data.uscongress.bill_text_urls(bill_url=..., is_workspace=False)
```

Summary: Bill Text Urls

| Field | Value |
|---|---|
| Endpoint ID | `uscongress.bill_text_urls` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/uscongress/bill_text_urls` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `bill_url` | `yes` | `string` | `-` | - |
| `is_workspace` | `no` | `boolean` | `false` | - |

---

### `uscongress.bills`

```python
data.uscongress.bills(congress=None, bill_type=None, start_date=None, end_date=None, limit=None, offset=None, sort_by='desc')
```

Summary: Bills

| Field | Value |
|---|---|
| Endpoint ID | `uscongress.bills` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/uscongress/bills` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `congress` | `no` | `integer | null` | `-` | Congress number (e.g., 118 for the 118th Congress). The 103rd Congress started in 1993, which is the earliest date supporting full text versions. Each Congress spans two years, starting in odd-numbered years. |
| `bill_type` | `no` | `string | null` | `-` | Bill type (e.g., "hr" for House bills). Must be one of: hr, s, hjres, sjres, hconres, sconres, hres, sres. Bills ----- A bill is the form used for most legislation, whether permanent or temporary, general or special, public or private. A bill originating in the House of Representatives is designated by the letters “H.R.”, signifying “House of Representatives”, followed by a number that it retains throughout all its parliamentary stages. Bills are presented to the President for action when approved in identical form by both the House of Representatives and the Senate. Joint Resolutions ----------------- Joint resolutions may originate either in the House of Representatives or in the Senate. There is little practical difference between a bill and a joint resolution. Both are subject to the same procedure, except for a joint resolution proposing an amendment to the Constitution. On approval of such a resolution by two-thirds of both the House and Senate, it is sent directly to the Administrator of General Services for submission to the individual states for ratification. It is not presented to the President for approval. A joint resolution originating in the House of Representatives is designated “H.J.Res.” followed by its individual number. Joint resolutions become law in the same manner as bills. Concurrent Resolutions ---------------------- Matters affecting the operations of both the House of Representatives and Senate are usually initiated by means of concurrent resolutions. A concurrent resolution originating in the House of Representatives is designated “H.Con.Res.” followed by its individual number. On approval by both the House of Representatives and Senate, they are signed by the Clerk of the House and the Secretary of the Senate. They are not presented to the President for action. Simple Resolutions ------------------ A matter concerning the operation of either the House of Representatives or Senate alone is initiated by a simple resolution. A resolution affecting the House of Representatives is designated “H.Res.” followed by its number. They are not presented to the President for action. |
| `start_date` | `no` | `string | null` | `-` | Start date of the data, in YYYY-MM-DD format. Filters bills by the last updated date. |
| `end_date` | `no` | `string | null` | `-` | End date of the data, in YYYY-MM-DD format. Filters bills by the last updated date. |
| `limit` | `no` | `integer | null` | `-` | The number of data entries to return. When None, default sets to 100 (max 250). Set to 0 for no limit (must be used with 'bill_type' and 'congress'). Setting to 0 will nullify the start_date, end_date, and offset parameters. |
| `offset` | `no` | `integer | null` | `-` | The starting record returned. 0 is the first record. |
| `sort_by` | `no` | `string` | `desc` | Sort by update date. Default is latest first. |

---

### `web_search.news`

```python
data.web_search.news(query=..., max_results=10, page=1)
```

Summary: News

| Field | Value |
|---|---|
| Endpoint ID | `web_search.news` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/web_search/news` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `yes` | `string` | `-` | Search query string. |
| `max_results` | `no` | `integer` | `10` | Maximum number of news results to return. |
| `page` | `no` | `integer` | `1` | Page number for pagination, starting at 1. |

---

### `web_search.web`

```python
data.web_search.web(query=..., max_results=10, page=1, backend='auto')
```

Summary: Web

| Field | Value |
|---|---|
| Endpoint ID | `web_search.web` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/web_search/web` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `yes` | `string` | `-` | Search query string. |
| `max_results` | `no` | `integer` | `10` | Maximum number of results to return. |
| `page` | `no` | `integer` | `1` | Page number for pagination, starting at 1. |
| `backend` | `no` | `string` | `auto` | enum: auto, duckduckgo, google, bing, brave, yandex, yahoo, wikipedia, grokipedia, mojeek Search engine backend. 'auto' queries multiple engines with automatic fallback for resilience. |

---

### `wikipedia.content`

```python
data.wikipedia.content(title=None, lang='en', intro_only=False)
```

Summary: Content

| Field | Value |
|---|---|
| Endpoint ID | `wikipedia.content` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/wikipedia/content` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `title` | `no` | `string | null` | `-` | Wikipedia article title to retrieve. |
| `lang` | `no` | `string` | `en` | Wikipedia language edition. |
| `intro_only` | `no` | `boolean` | `false` | Return only the introductory section instead of the full article. |

---

### `wikipedia.search`

```python
data.wikipedia.search(query=None, max_results=10, page=1, lang='en')
```

Summary: Search

| Field | Value |
|---|---|
| Endpoint ID | `wikipedia.search` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/wikipedia/search` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `query` | `no` | `string | null` | `-` | Search query string. |
| `max_results` | `no` | `integer` | `10` | Maximum number of results. |
| `page` | `no` | `integer` | `1` | Page number, starting at 1. |
| `lang` | `no` | `string` | `en` | Wikipedia language edition. |

---

### `wikipedia.summary`

```python
data.wikipedia.summary(title=None, lang='en')
```

Summary: Summary

| Field | Value |
|---|---|
| Endpoint ID | `wikipedia.summary` |
| HTTP | `GET` |
| Path | `/inner/v1/agent-data/wikipedia/summary` |
| SDK | `supported` |
| Host | `supported` |
| Notes | - |

#### Query parameters

| Param | Required | Type | Default | Notes |
|---|---|---|---|---|
| `title` | `no` | `string | null` | `-` | Wikipedia article title to retrieve. |
| `lang` | `no` | `string` | `en` | Wikipedia language edition. |
