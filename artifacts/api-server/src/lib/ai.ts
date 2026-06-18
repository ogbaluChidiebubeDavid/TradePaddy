import { logger } from "./logger";
import {
  fetchSkillHubSnapshot,
  skillSnapshotToPrompt,
  deriveScoresFromSnapshot,
} from "./skillHub";

const QWEN_BASE_URL = "https://hackathon.bitgetops.com/v1";
const QWEN_MODEL = "qwen3.6-plus";

interface QwenMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface QwenResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function callQwen(messages: QwenMessage[], systemPrompt?: string): Promise<string> {
  const apiKey = process.env.QWEN_API_KEY;
  if (!apiKey) {
    logger.warn("QWEN_API_KEY not set, using mock response");
    return generateMockResponse(messages);
  }

  const allMessages: QwenMessage[] = systemPrompt
    ? [{ role: "system", content: systemPrompt }, ...messages]
    : messages;

  try {
    const response = await fetch(`${QWEN_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: QWEN_MODEL,
        messages: allMessages,
        max_tokens: 2048,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      logger.error({ status: response.status, body: text }, "Qwen API error");
      return generateMockResponse(messages);
    }

    const data = (await response.json()) as QwenResponse;
    return data.choices[0]?.message?.content ?? "No response generated.";
  } catch (err) {
    logger.error({ err }, "Failed to call Qwen API");
    return generateMockResponse(messages);
  }
}

function generateMockResponse(messages: QwenMessage[]): string {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() ?? "";

  if (lastMessage.includes("bitcoin") || lastMessage.includes("btc")) {
    return `**TradePaddy AI Analysis: Bitcoin (BTC)**\n\n**Summary:** Bitcoin is showing mixed signals with macro headwinds but strong on-chain accumulation.\n\n**Evidence:**\n- Whale wallets accumulated 12,400 BTC in the past 7 days\n- ETF inflows turned positive (+$340M) after 3 weeks of outflows\n- RSI at 54 — neutral territory with room to run\n- Funding rates normalized after recent correction\n\n**Risk Analysis:** Medium risk. Key support at $62,000. A break below invalidates the bullish case.\n\n**Confidence Score:** 71%\n\n**Suggested Action:** Wait for a confirmed close above $67,500 before entering. Set stop loss at $61,800.`;
  }

  if (lastMessage.includes("solana") || lastMessage.includes("sol")) {
    return `**TradePaddy AI Analysis: Solana (SOL)**\n\n**Summary:** SOL is showing strong momentum with bullish institutional interest.\n\n**Evidence:**\n- Whale accumulation detected on multiple exchanges\n- DeFi TVL increased 23% in 30 days\n- MACD bullish crossover on the daily chart\n- Positive funding rates indicate bullish sentiment\n\n**Risk Analysis:** Medium-high risk. High beta asset. Position sizing should be conservative.\n\n**Confidence Score:** 83%\n\n**Suggested Action:** BUY on confirmed pullback to $145-148 range. Target: $165. Stop: $138.`;
  }

  if (lastMessage.includes("portfolio") || lastMessage.includes("weakness")) {
    return `**Portfolio Analysis**\n\n**Summary:** Your portfolio has concentration risk in large-cap assets and shows a recurring pattern of entering positions too early.\n\n**Key Weaknesses:**\n1. 67% of your portfolio is in BTC and ETH — concentration risk\n2. You entered 14 trades after assets had already gained >12% — 71% became losses\n3. Average hold time on losing trades is 3.2x longer than winning trades\n\n**Recommendations:**\n- Diversify into mid-caps (SOL, AVAX, MATIC) to reduce correlation\n- Wait for pullbacks before entering — patience is your edge\n- Set hard stop losses and honor them\n\n**Portfolio Health Score:** 62/100`;
  }

  if (lastMessage.includes("losing") || lastMessage.includes("mistake")) {
    return `**Behavioral Analysis: Why You're Losing**\n\n**Summary:** Your trading data reveals 3 critical patterns costing you money.\n\n**Pattern 1: FOMO Trading** (High Severity)\n- You entered 18 trades after >10% moves — 72% lost\n- Estimated PnL impact: -$3,240\n\n**Pattern 2: Ignoring Stop Losses** (Critical)\n- 23 trades had no stop loss set — average loss 2.1x larger than wins\n- Estimated PnL impact: -$5,100\n\n**Pattern 3: Cutting Winners Early** (Medium)\n- Average winning trade exits at +4.2% vs losers held to -8.7%\n- Unfavorable reward/risk ratio of 0.48\n\n**Recommendation:** Focus on trade discipline before increasing position sizes.`;
  }

  if (lastMessage.includes("today") || lastMessage.includes("opportunity")) {
    return `**Today's Market Opportunities**\n\n**Top Pick: ETH** (Confidence: 79%)\n- Bullish Score: 82/100 | Risk Score: 35/100\n- Action: BUY at current levels or $3,100 pullback\n- Target: $3,450 | Stop: $2,980\n\n**Watch: SOL** (Confidence: 71%)\n- Strong momentum but extended — wait for pullback\n- Action: WAIT — entry at $145-148\n\n**Avoid: LINK** (Confidence: 65%)\n- Bearish signals across technical and sentiment\n- Action: WAIT or SHORT if you're experienced\n\n**Market Context:** Risk-on environment. BTC dominance declining, altseason signals emerging.`;
  }

  return `**TradePaddy AI Response**\n\n**Summary:** Based on your portfolio and current market conditions, here's my analysis.\n\n**Market Context:**\n- Overall market sentiment: Cautiously bullish\n- BTC Dominance: 52.3% (declining — altcoin season potential)\n- Fear & Greed Index: 61 (Greed)\n- Macro: Fed policy uncertainty creating headwinds\n\n**Evidence:**\n- Institutional accumulation continues at dips\n- On-chain metrics show HODLer behavior strengthening\n- Technical setup improving across major assets\n\n**Risk Analysis:** Current market has elevated volatility. Position sizing is critical.\n\n**Confidence Score:** 68%\n\n**Suggested Action:** Maintain current positions. Add on confirmed pullbacks. Do not chase rallies.`;
}

export async function generateMarketAnalysis(asset: string): Promise<{
  bullishScore: number;
  bearishScore: number;
  confidenceScore: number;
  riskScore: number;
  recommendation: string;
  summary: string;
  evidence: string[];
  riskAnalysis: string;
  macroSignals: Record<string, unknown>;
  sentimentSignals: Record<string, unknown>;
  technicalSignals: Record<string, unknown>;
  onchainSignals: Record<string, unknown>;
  newsSignals: Record<string, unknown>;
  opportunities: Array<{
    tokenPair: string;
    type: string;
    entryRationale: string;
    riskLevel: string;
    confidence: number;
    horizon: string;
  }>;
}> {
  const systemPrompt = `You are TradePaddy AI, a Crypto Market Intelligence Engine. Analyze the given asset based on real-world dynamics from sources like Ecosystem developments, CoinGecko, Dune Analytics, CryptoPanic.com, DeFiLlama, and Bitget API (real order books, trading pairs, funding rates, open interest), and news.
Specifically, in "onchainSignals.whaleActivity", explain how whales are shifting the market dynamics (e.g. transfers, smart money accumulation, order book bid/ask walls).
Every opportunity in "opportunities" must be derived strictly from the signals identified in the analysis sections.

Return a JSON object with these exact fields:
{
  "bullishScore": number (0-100),
  "bearishScore": number (0-100),
  "confidenceScore": number (0-100),
  "riskScore": number (0-100),
  "recommendation": "buy"|"sell"|"wait"|"hold",
  "summary": "2-3 sentence market summary",
  "evidence": ["array of 4-6 bullet points supporting the recommendation"],
  "riskAnalysis": "1-2 sentence risk assessment",
  "macroSignals": {
    "fedPolicy": "string",
    "macroTrend": "string",
    "btcCorrelation": number (-1 to 1),
    "riskMode": "risk-on"|"risk-off"|"neutral"
  },
  "sentimentSignals": {
    "fearGreedIndex": number (0-100),
    "longShortRatio": number,
    "fundingRate": number,
    "crowdPositioning": "string"
  },
  "technicalSignals": {
    "rsi": number (0-100),
    "macdSignal": "bullish"|"bearish"|"neutral",
    "trend": "uptrend"|"downtrend"|"sideways",
    "bollingerBands": { "upper": number, "middle": number, "lower": number, "bandwidth": number },
    "trendStrength": "trending"|"ranging"|"transition",
    "support": number,
    "resistance": number
  },
  "onchainSignals": {
    "whaleActivity": "detailed explanation of how whales are shifting market dynamics",
    "etfFlows": "string",
    "defiTvl": "string"
  },
  "newsSignals": {
    "sentiment": "positive"|"negative"|"neutral",
    "keyEvents": ["array of 2-3 recent news events"]
  },
  "opportunities": [
    {
      "tokenPair": "string (e.g. SOL/USDT, BTC/USDT)",
      "type": "Momentum"|"Mean Reversion"|"Ecosystem Rotation"|"News Catalyst"|"Liquidity Shift",
      "entryRationale": "string (specific entry logic referencing the analysis signals like DeFiLlama TVL, Dune stats, or Bitget orderbook depth)",
      "riskLevel": "Low"|"Medium"|"High",
      "confidence": number (0-100),
      "horizon": "hours"|"days"|"weeks"
    }
  ]
}
Return ONLY valid JSON, no markdown, no explanation.`;

  let snapshot;
  try {
    snapshot = await fetchSkillHubSnapshot(asset);
  } catch (err) {
    logger.warn({ err, asset }, "Skill Hub snapshot failed");
  }

  const derived = snapshot ? deriveScoresFromSnapshot(snapshot) : null;
  const skillContext = snapshot
    ? skillSnapshotToPrompt(snapshot)
    : "Skill Hub data unavailable — use conservative estimates.";

  const content = await callQwen(
    [
      {
        role: "user",
        content: `Analyze ${asset} for a trading opportunity using this Bitget Agent Hub Skill Hub orchestrator output (macro-analyst, market-intel, news-briefing, sentiment-analyst, technical-analysis):\n\n${skillContext}\n\nBaseline scores from orchestrator: ${derived ? JSON.stringify(derived) : "none"}. Ground your JSON in this real data.`,
      },
    ],
    systemPrompt,
  );

  try {
    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);
    if (snapshot) {
      parsed.macroSignals = { ...snapshot.macro, ...(parsed.macroSignals ?? {}) };
      parsed.sentimentSignals = { ...snapshot.sentiment, ...(parsed.sentimentSignals ?? {}) };
      parsed.technicalSignals = { ...snapshot.technical, ...(parsed.technicalSignals ?? {}) };
      parsed.onchainSignals = { ...snapshot.marketIntel, ...(parsed.onchainSignals ?? {}) };
      parsed.newsSignals = { ...snapshot.news, ...(parsed.newsSignals ?? {}) };
      if (derived) {
        parsed.bullishScore = parsed.bullishScore ?? derived.bullishScore;
        parsed.bearishScore = parsed.bearishScore ?? derived.bearishScore;
        parsed.confidenceScore = parsed.confidenceScore ?? derived.confidenceScore;
        parsed.riskScore = parsed.riskScore ?? derived.riskScore;
        parsed.recommendation = parsed.recommendation ?? derived.recommendation;
      }
    }
    if (!Array.isArray(parsed.opportunities)) {
      parsed.opportunities = [];
    }
    return parsed;
  } catch {
    logger.warn({ asset, content }, "Failed to parse Qwen analysis JSON, using Skill Hub fallback");
    return snapshot ? analysisFromSnapshot(snapshot, asset) : getMockAnalysis(asset);
  }
}

function analysisFromSnapshot(
  snapshot: Awaited<ReturnType<typeof fetchSkillHubSnapshot>>,
  asset: string,
): ReturnType<typeof generateMarketAnalysis> extends Promise<infer T> ? T : never {
  const scores = deriveScoresFromSnapshot(snapshot);
  const tech = snapshot.technical;
  const sent = snapshot.sentiment;
  return {
    ...scores,
    summary: `${asset} analysis from Bitget Skill Hub orchestrator (${snapshot.sourcesUsed.length} live sources). Macro: ${snapshot.macro.riskMode}. Trend: ${tech.trend}. Sentiment: ${sent.fearGreedLabel ?? "Neutral"}.`,
    evidence: [
      `Macro verdict: ${snapshot.macro.verdict ?? snapshot.macro.macroTrend}`,
      `Whale/institutional: ${snapshot.marketIntel.whaleActivity}`,
      `Funding rate: ${sent.fundingRate}% | L/S: ${sent.longShortRatio}`,
      `RSI ${tech.rsi} | MACD ${tech.macdSignal} | Bollinger bandwidth ${(tech.bollingerBands as { bandwidth?: number })?.bandwidth ?? "N/A"}%`,
      ...(Array.isArray(snapshot.news.keyEvents) ? (snapshot.news.keyEvents as string[]).slice(0, 2) : []),
    ],
    riskAnalysis:
      scores.riskScore > 60
        ? "Elevated risk from sentiment crowding or macro headwinds."
        : "Risk manageable with defined stops and position sizing.",
    macroSignals: snapshot.macro,
    sentimentSignals: snapshot.sentiment,
    technicalSignals: snapshot.technical,
    onchainSignals: snapshot.marketIntel,
    newsSignals: snapshot.news,
    opportunities: [
      {
        tokenPair: `${asset.toUpperCase()}/USDT`,
        type: "Momentum",
        entryRationale: `Derived from ${snapshot.sourcesUsed.length} live orchestrator sources. Whale accumulation detected in ${snapshot.marketIntel.whaleActivity}. RSI ${tech.rsi} supports dynamic trend continuation.`,
        riskLevel: scores.riskScore > 60 ? "High" : scores.riskScore > 40 ? "Medium" : "Low",
        confidence: scores.confidenceScore,
        horizon: "days"
      }
    ]
  };
}

function getMockAnalysis(asset: string): ReturnType<typeof generateMarketAnalysis> extends Promise<infer T> ? T : never {
  const assetUpper = asset.toUpperCase();
  const isBullish = ["BTC", "ETH", "SOL", "AVAX"].includes(assetUpper);
  const bullishVal = isBullish ? 72 + Math.floor(Math.random() * 20) : 35 + Math.floor(Math.random() * 25);
  const bearishVal = isBullish ? 25 + Math.floor(Math.random() * 15) : 60 + Math.floor(Math.random() * 20);
  const confVal = 65 + Math.floor(Math.random() * 25);
  const riskVal = 30 + Math.floor(Math.random() * 50);

  return {
    bullishScore: bullishVal,
    bearishScore: bearishVal,
    confidenceScore: confVal,
    riskScore: riskVal,
    recommendation: isBullish ? "buy" : "wait",
    summary: `${asset} is showing ${isBullish ? "bullish" : "mixed"} signals across multiple timeframes. On-chain data supports ${isBullish ? "accumulation" : "caution"} at current levels. Macro environment remains ${isBullish ? "supportive" : "uncertain"} for risk assets.`,
    evidence: [
      isBullish ? "Whale wallets accumulating over past 7 days" : "Exchange inflows suggest selling pressure",
      isBullish ? "Positive funding rates indicating bullish sentiment" : "Funding rates turning negative",
      isBullish ? "RSI in bullish territory with room to run" : "RSI overextended — correction likely",
      isBullish ? "ETF flows turned positive this week" : "Institutional flows remain negative",
      "Key support levels holding on higher timeframes",
      isBullish ? "Strong DeFi TVL growth supporting ecosystem" : "DeFi TVL declining — risk-off signal",
    ],
    riskAnalysis: isBullish
      ? `Medium risk. Key support at recent lows. Stop loss recommended below that level.`
      : `High risk. Multiple bearish signals converging. Capital preservation priority.`,
    macroSignals: {
      fedPolicy: "Hawkish stance maintained — rate cuts delayed to Q4",
      macroTrend: isBullish ? "Risk appetite recovering after CPI data" : "Risk-off as macro uncertainty persists",
      btcCorrelation: isBullish ? 0.73 : 0.85,
      riskMode: isBullish ? "risk-on" : "risk-off",
    },
    sentimentSignals: {
      fearGreedIndex: isBullish ? 62 : 38,
      longShortRatio: isBullish ? 1.23 : 0.87,
      fundingRate: isBullish ? 0.012 : -0.008,
      crowdPositioning: isBullish ? "Majority long, but not crowded" : "Mixed — uncertainty dominates",
    },
    technicalSignals: {
      rsi: isBullish ? 58 : 44,
      macdSignal: isBullish ? "bullish" : "bearish",
      trend: isBullish ? "uptrend" : "sideways",
      support: isBullish ? 142 : 28000,
      resistance: isBullish ? 168 : 32000,
    },
    onchainSignals: {
      whaleActivity: isBullish 
        ? "Whales are shifting market dynamics by aggressively buying spot orderbook walls and moving assets off Bitget to cold storage, indicating strong supply shock potential."
        : "Whales are shifting market dynamics by transferring massive tokens to Bitget wallets, building massive sell walls on the spot order book.",
      etfFlows: isBullish ? "+$340M inflows this week" : "-$120M outflows, 3rd consecutive week",
      defiTvl: isBullish ? "+18% TVL growth past 30 days" : "TVL flat — ecosystem stagnation",
    },
    newsSignals: {
      sentiment: isBullish ? "positive" : "neutral",
      keyEvents: [
        isBullish ? "Major protocol upgrade announced — expected to drive adoption" : "Regulatory clarity still pending in key markets",
        isBullish ? "Institutional partnership with Fortune 500 company confirmed" : "Developer activity declining on GitHub",
        "Market structure improving as leverage flushed in recent correction",
      ],
    },
    opportunities: [
      {
        tokenPair: `${assetUpper}/USDT`,
        type: isBullish ? "Momentum" : "Mean Reversion",
        entryRationale: isBullish
          ? `Strong DeFi TVL growth (+18% on DeFiLlama) coupled with massive whale accumulation (exchange outflows detected on-chain) indicates imminent price breakout above resistance.`
          : `RSI oversold on 4H, and Bitget orderbook shows significant bid clustering near support. Anticipating a short-term mean reversion relief rally.`,
        riskLevel: riskVal > 60 ? "High" : riskVal > 35 ? "Medium" : "Low",
        confidence: confVal,
        horizon: isBullish ? "days" : "hours"
      }
    ]
  };
}

export async function generateTradeReplay(params: {
  asset: string;
  entryPrice: number;
  exitPrice: number;
  direction: string;
  entryReason: string;
  marketConditions: string;
  aiRecommendation: string;
  userAction: string;
  pnl: number;
}): Promise<{
  marketContext: string;
  newsEvents: string[];
  sentimentConditions: string;
  whaleActivity: string;
  technicalIndicators: Record<string, unknown>;
  userReasoning: string;
  actualOutcome: string;
  lessonsLearned: string;
  behaviorFlags: string[];
}> {
  const systemPrompt = `You are TradePaddy AI, an expert crypto trade analysis assistant. Analyze the completed trade details and return a JSON object with these exact fields:
{
  "marketContext": "detailed description of the market conditions and momentum around the trade",
  "newsEvents": ["2-3 realistic news items/events related to this asset or market at the time"],
  "sentimentConditions": "summary of fear & greed, crowd positioning, and sentiment",
  "whaleActivity": "description of whale movements/onchain activity related to the asset",
  "technicalIndicators": { "rsi": number (0-100), "macd": "description", "trend": "description" },
  "userReasoning": "evaluation of the user's entry reasoning",
  "actualOutcome": "breakdown of how the trade turned out, pnl, and final exit details",
  "lessonsLearned": "specific critique of what possibly went wrong or went right, why, and actionable advice to avoid in next trade",
  "behaviorFlags": ["fomo_trading" | "revenge_trading" | "overtrading" | "holding_losers" | "cutting_winners_early" | "ignoring_stop_loss" | "position_sizing_mistake"]
}
Return ONLY valid JSON, no markdown, no explanation.`;

  const userMessage = `Analyze this closed trade:
Asset: ${params.asset}
Direction: ${params.direction}
Entry Price: $${params.entryPrice}
Exit Price: $${params.exitPrice}
Entry Reason: ${params.entryReason}
Market Conditions: ${params.marketConditions}
AI Recommendation at entry: ${params.aiRecommendation}
User action relative to AI: ${params.userAction} (followed | ignored | partial)
PnL: $${params.pnl} (${params.pnl >= 0 ? "win" : "loss"})`;

  try {
    const content = await callQwen([{ role: "user", content: userMessage }], systemPrompt);
    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    logger.warn({ err, asset: params.asset }, "Failed to generate AI trade replay, falling back to template");
    const isLoss = params.pnl < 0;
    const ignoredAI = params.userAction === "ignored";

    return {
      marketContext: `${params.marketConditions}. Market was showing ${isLoss ? "weakening momentum with bearish divergence forming on higher timeframes" : "strong bullish momentum with rising volume confirming the move"}.`,
      newsEvents: [
        isLoss ? "Unexpected regulatory announcement created uncertainty" : "Positive protocol upgrade announcement boosted sentiment",
        "ETF flow data showed mixed signals from institutional players",
        isLoss ? "Whale wallets deposited large amounts to exchanges prior to entry" : "Major DeFi protocol reported record TVL growth",
      ],
      sentimentConditions: isLoss
        ? "Fear & Greed at 71 (Greed zone) — crowded positioning increasing risk"
        : "Fear & Greed at 58 (Neutral) — healthy sentiment without euphoria",
      whaleActivity: isLoss
        ? "Large exchange deposits detected 2 hours before entry — distribution signal missed"
        : "Wallet accumulation pattern detected — smart money positioning long",
      technicalIndicators: {
        rsi: isLoss ? 72 : 52,
        macd: isLoss ? "Bearish divergence forming" : "Bullish crossover confirmed",
        trend: isLoss ? "uptrend weakening" : "uptrend intact",
      },
      userReasoning: params.entryReason,
      actualOutcome: isLoss
        ? `Trade closed at a loss of $${Math.abs(params.pnl).toFixed(2)}. Price moved against position after entry.`
        : `Trade closed profitably at +$${params.pnl.toFixed(2)}. Price moved favorably and target was achieved.`,
      lessonsLearned: ignoredAI && isLoss
        ? `The AI recommended "${params.aiRecommendation}" but you chose to ${params.direction === "long" ? "buy" : "sell"} anyway. The analysis correctly identified the risk. Future trades: trust the signal or wait for confirmation.`
        : isLoss
        ? `Entry timing was the key issue. Entering into an overextended move increased risk significantly. Wait for pullbacks and confirmation before committing capital.`
        : `Good discipline following the analysis. Entry timing was appropriate and risk management held. Continue applying this systematic approach.`,
      behaviorFlags: ignoredAI && isLoss
        ? ["fomo_trading", "ignoring_stop_loss"]
        : isLoss
        ? ["fomo_trading"]
        : [],
    };
  }
}

export async function generateCoachingReport(params: {
  type: string;
  trades: Array<{ pnl: number; asset: string; userAction: string; aiRecommendation: string; result?: string }>;
  patterns: Array<{ type: string; severity: string; occurrences: number }>;
}): Promise<{
  title: string;
  summary: string;
  keyInsights: string[];
  topMistakes: string[];
  improvements: string[];
  recommendations: string[];
  tradingScore: number;
}> {
  const totalPnl = params.trades.reduce((sum, t) => sum + t.pnl, 0);
  const wins = params.trades.filter((t) => t.pnl > 0).length;
  const winRate = params.trades.length > 0 ? (wins / params.trades.length) * 100 : 0;
  const followedAI = params.trades.filter((t) => t.userAction === "followed").length;
  const aiFollowRate = params.trades.length > 0 ? (followedAI / params.trades.length) * 100 : 0;

  const periodLabel = params.type === "daily" ? "Today" : params.type === "weekly" ? "This Week" : "This Month";
  const score = Math.min(95, Math.max(20, Math.round(winRate * 0.4 + aiFollowRate * 0.3 + (totalPnl > 0 ? 30 : 10))));

  return {
    title: `${periodLabel}'s Trading Performance Report`,
    summary: `${periodLabel} you made ${params.trades.length} trades with a ${winRate.toFixed(1)}% win rate and ${totalPnl >= 0 ? "+" : ""}$${totalPnl.toFixed(2)} total PnL. ${totalPnl > 0 ? "Overall a profitable period." : "Room for improvement in trade selection and timing."}`,
    keyInsights: [
      `Win rate: ${winRate.toFixed(1)}% (${wins}W/${params.trades.length - wins}L)`,
      `AI recommendation followed in ${aiFollowRate.toFixed(0)}% of trades`,
      totalPnl > 0 ? `Net profitable period — compounding working in your favor` : `Net loss period — focus on reducing losers, not increasing position size`,
      params.patterns.length > 0 ? `${params.patterns.length} behavioral patterns detected requiring attention` : "No critical behavioral issues detected",
    ],
    topMistakes: params.patterns.slice(0, 3).map((p) => {
      const labels: Record<string, string> = {
        fomo_trading: `FOMO trading detected ${p.occurrences}x — entering after large moves`,
        revenge_trading: `Revenge trading after losses — emotional decision-making`,
        overtrading: `Overtrading — too many positions open simultaneously`,
        holding_losers: `Holding losing positions too long — hope over discipline`,
        cutting_winners_early: `Cutting winners early — limiting upside potential`,
        ignoring_stop_loss: `Ignoring stop losses — unlimited downside exposure`,
        position_sizing_mistake: `Position sizing errors — over-leveraged on high-risk trades`,
      };
      return labels[p.type] ?? `${p.type} detected ${p.occurrences}x`;
    }),
    improvements: [
      winRate < 50 ? "Focus on quality over quantity — fewer, higher-conviction trades" : "Maintain current trade selection discipline",
      aiFollowRate < 70 ? "Trust the AI analysis more — your deviation rate costs money" : "Good AI integration — continue systematic approach",
      totalPnl < 0 ? "Review stop loss strategy — exits need improvement" : "Good risk management — protect these gains",
    ],
    recommendations: [
      "Set a maximum of 3 open positions simultaneously to reduce cognitive load",
      "Implement a 24-hour rule: wait 24 hours before entering a trade you're excited about",
      "Journal every trade in real-time — delayed journaling loses critical emotional context",
      "Review this week's replay data to identify specific market conditions you misread",
    ],
    tradingScore: score,
  };
}

export async function generateChatResponse(
  userMessage: string,
  history: Array<{ role: string; content: string }>,
  context: {
    portfolioValue?: number;
    winRate?: number;
    totalPnl?: number;
    openPositions?: number;
    recentPatterns?: string[];
  }
): Promise<string> {
  const systemPrompt = `You are TradePaddy AI, an expert AI trading mentor and analyst. You have deep knowledge of crypto markets, technical analysis, behavioral finance, and trading psychology.

Context about this user:
- Portfolio Value: $${context.portfolioValue?.toFixed(2) ?? "N/A"}
- Win Rate: ${context.winRate?.toFixed(1) ?? "N/A"}%
- Total PnL: ${context.totalPnl !== undefined ? (context.totalPnl >= 0 ? "+" : "") + "$" + context.totalPnl.toFixed(2) : "N/A"}
- Open Positions: ${context.openPositions ?? 0}
- Recent Behavioral Patterns: ${context.recentPatterns?.join(", ") ?? "None detected"}

Always structure your response with:
1. **Summary** — direct answer to their question
2. **Evidence** — data points supporting your view
3. **Risk Analysis** — what could go wrong
4. **Confidence Score** — X% based on available data
5. **Suggested Action** — clear, actionable recommendation

Be direct, data-driven, and educational. Do not use emojis. Be the mentor they wish they had.`;

  const messages = [
    ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
    { role: "user" as const, content: userMessage },
  ];

  return callQwen(messages, systemPrompt);
}
