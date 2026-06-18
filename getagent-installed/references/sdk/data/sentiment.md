# Sentiment Data Reference

Use this file when an agent needs detailed signatures and parameter
rules for one DataSDK domain. All generated `getagent.data` endpoints
are callable through the DataSDK wrapper.

## Contents
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

## Endpoint reference

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
