# News Data Reference

Use this file when an agent needs detailed signatures and parameter
rules for one DataSDK domain. All generated `getagent.data` endpoints
are callable through the DataSDK wrapper.

## Contents
- [`news.company`](#newscompany)
- [`news.label_search`](#newslabel-search)
- [`news.world`](#newsworld)

## Endpoint reference

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
