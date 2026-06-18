import { db } from "./index";
import { 
  tradesTable, 
  journalEntriesTable, 
  tradeReplaysTable, 
  behaviorPatternsTable, 
  coachingReportsTable, 
  riskReportsTable, 
  portfolioSnapshotsTable,
  marketAnalysesTable
} from "./schema";

// LCG-based random generator for stable seed data
function srandom(seed: number) {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

async function seed() {
  console.log("Seeding database...");

  // Clean old tables
  await db.delete(tradesTable);
  await db.delete(journalEntriesTable);
  await db.delete(tradeReplaysTable);
  await db.delete(behaviorPatternsTable);
  await db.delete(coachingReportsTable);
  await db.delete(riskReportsTable);
  await db.delete(portfolioSnapshotsTable);
  await db.delete(marketAnalysesTable);

  const rand = srandom(42);
  const tokens = ['SOL', 'BTC', 'ETH', 'XRP', 'ADA', 'DOGE'];
  const emotions = ['Disciplined', 'Patient', 'FOMO', 'Greedy', 'Anxious', 'Angry'] as const;
  
  const mistakePool = [
    "FOMO Entry",
    "Over-leveraged",
    "Chasing Pumps",
    "Panic Selling",
    "Trusting Low-Timeframe Noise",
    "Trading News Late",
    "No Stop Loss Set",
    "Greedily Ignored Target",
    "Over-trading"
  ];

  const baseDate = new Date("2026-06-08T12:00:00Z");
  let currentBalance = 10000;
  const portfolioHistory: { date: string; balance: number }[] = [];

  const createdTrades = [];

  // 1. Generate 100 trades
  for (let i = 100; i >= 1; i--) {
    const hoursBack = (100 - i) * 14 + Math.floor(rand() * 8);
    const date = new Date(baseDate.getTime() - hoursBack * 60 * 60 * 1000);
    const token = tokens[Math.floor(rand() * tokens.length)];
    const type = rand() > 0.45 ? 'LONG' : 'SHORT';
    
    let entryPrice = 0;
    let size = 0;
    if (token === 'BTC') {
      entryPrice = Math.round(65000 + rand() * 7000);
      size = parseFloat((0.05 + rand() * 0.15).toFixed(3));
    } else if (token === 'ETH') {
      entryPrice = Math.round(3300 + rand() * 500);
      size = parseFloat((0.5 + rand() * 2).toFixed(2));
    } else if (token === 'SOL') {
      entryPrice = parseFloat((140 + rand() * 45).toFixed(2));
      size = Math.round(10 + rand() * 60);
    } else {
      entryPrice = parseFloat((0.5 + rand() * 1.5).toFixed(4));
      size = Math.round(500 + rand() * 2500);
    }

    const leverage = [1, 3, 5, 10, 15, 20][Math.floor(rand() * 6)];
    const status = i <= 3 ? 'open' : 'closed';
    
    let emotion = emotions[Math.floor(rand() * emotions.length)];
    if (leverage >= 15) {
      emotion = rand() > 0.5 ? 'FOMO' : 'Greedy';
    } else if (leverage === 1 || leverage === 3) {
      emotion = rand() > 0.5 ? 'Disciplined' : 'Patient';
    }
    
    let outcome: 'WIN' | 'LOSS' | 'PENDING' = 'PENDING';
    let pnl = 0;
    let exitPrice = 0;
    let mistakes: string[] = [];

    if (status === 'closed') {
      let winProb = 0.52;
      if (emotion === 'FOMO' || emotion === 'Angry' || emotion === 'Greedy') winProb = 0.28;
      if (emotion === 'Disciplined' || emotion === 'Patient') winProb = 0.72;
      
      const isWin = rand() < winProb;
      outcome = isWin ? 'WIN' : 'LOSS';

      const changePct = (0.01 + rand() * 0.08) * (type === 'LONG' ? 1 : -1) * (isWin ? 1 : -1);
      exitPrice = parseFloat((entryPrice * (1 + changePct)).toFixed(4));
      
      const directionMultiplier = type === 'LONG' ? 1 : -1;
      pnl = parseFloat((size * (exitPrice - entryPrice) * directionMultiplier * leverage).toFixed(2));
      
      if (isWin && pnl <= 0) pnl = Math.abs(pnl) || 10;
      if (!isWin && pnl >= 0) pnl = -Math.abs(pnl) || -10;

      if (!isWin) {
        if (emotion === 'FOMO') {
          mistakes = ['FOMO Entry', 'Chasing Pumps'];
        } else if (emotion === 'Greedy') {
          mistakes = ['Greedily Ignored Target', 'Over-leveraged'];
        } else if (emotion === 'Angry') {
          mistakes = ['Revenge Trading', 'Over-trading'];
        } else if (emotion === 'Anxious') {
          mistakes = ['Panic Selling', 'Trusting Low-Timeframe Noise'];
        } else {
          mistakes = [mistakePool[Math.floor(rand() * mistakePool.length)]];
        }
        if (leverage >= 10 && !mistakes.includes('Over-leveraged')) {
          mistakes.push('Over-leveraged');
        }
      }
      
      currentBalance += pnl;
    }

    let critique = "Awaiting outcome.";
    if (status === 'closed') {
      if (outcome === 'WIN') {
        critique = `Excellent execution. You managed your emotional state (${emotion}) effectively. Keeping position sizing correct and scaling out at resistance targets was highly disciplined.`;
      } else {
        if (mistakes.includes('FOMO Entry')) {
          critique = `You bought a local top after a rapid price spike. Your entry was driven by social media chatter and green bars rather than technical setups. Wait for a pullback to support.`;
        } else if (mistakes.includes('Over-leveraged')) {
          critique = `Using ${leverage}x leverage on a volatile asset narrowed your safety margin. You got stopped out by noise. Drop leverage below 5x.`;
        } else if (mistakes.includes('Panic Selling')) {
          critique = `You closed this trade at a loss early due to a low-timeframe pullback, but price ultimately hit your take-profit target. Stop watching the 1m charts; trust your stop loss.`;
        } else {
          critique = `A calculated trade that hit your stop loss. Accept the small loss as a cost of business and move to the next setup. Risk parameters were sound.`;
        }
      }
    }

    const entryReason = status === 'open' 
      ? `Rebounding off support with confirmations on the 4H RSI.` 
      : `Trading the breakout above key psychological resistance. Setup matches standard ${type === 'LONG' ? 'buying' : 'selling'} strategy.`;

    const marketConditions = {
      macro: rand() > 0.4 ? 'Risk-On' : 'Risk-Off',
      rsi: Math.round(35 + rand() * 40),
      macd: rand() > 0.5 ? 'Bullish Crossover' : 'Bearish Divergence',
      whale_activity: rand() > 0.5 ? 'Whale Accumulation' : 'Whale Deposits to Exchanges'
    };

    const isLong = type === 'LONG';
    const stopLoss = isLong ? entryPrice * 0.95 : entryPrice * 1.05;
    const takeProfit = isLong ? entryPrice * 1.10 : entryPrice * 0.90;

    const [insertedTrade] = await db.insert(tradesTable).values({
      asset: token,
      direction: type.toLowerCase() as "long" | "short",
      entryPrice: String(entryPrice),
      exitPrice: status === 'closed' ? String(exitPrice) : null,
      quantity: String(size),
      status: status,
      entryReason,
      exitReason: status === 'closed' ? "Target exit" : null,
      marketConditions: JSON.stringify(marketConditions),
      aiRecommendation: status === 'open' ? 'buy' : (outcome === 'WIN' ? 'buy' : 'wait'),
      userAction: 'followed',
      pnl: status === 'closed' ? String(pnl) : null,
      pnlPercent: status === 'closed' ? String(((exitPrice - entryPrice) / entryPrice) * 100 * (isLong ? 1 : -1)) : null,
      stopLoss: String(stopLoss),
      takeProfit: String(takeProfit),
      createdAt: date,
      closedAt: status === 'closed' ? new Date(date.getTime() + 4 * 60 * 60 * 1000) : null,
    }).returning();

    createdTrades.push({
      ...insertedTrade,
      pnlValue: pnl,
      entryPriceValue: entryPrice,
      exitPriceValue: exitPrice,
      sizeValue: size,
      leverage,
      outcome,
      emotion,
      mistakes,
      critique,
      marketConditions
    });

    // Save journal entry for closed trades
    if (status === 'closed') {
      const result = pnl > 0 ? "win" : pnl < 0 ? "loss" : "breakeven";
      await db.insert(journalEntriesTable).values({
        tradeId: insertedTrade.id,
        asset: insertedTrade.asset,
        direction: insertedTrade.direction,
        entryPrice: insertedTrade.entryPrice,
        exitPrice: String(exitPrice),
        entryReason: insertedTrade.entryReason,
        exitReason: insertedTrade.exitReason,
        marketConditions: insertedTrade.marketConditions,
        aiRecommendation: insertedTrade.aiRecommendation,
        userAction: insertedTrade.userAction,
        result,
        pnl: String(pnl),
        pnlPercent: insertedTrade.pnlPercent || "0",
        lessonsLearned: critique,
        notes: "Automated seed journal entry.",
        behaviorFlags: mistakes,
        createdAt: date
      });
    }

    const dateStr = date.toISOString().split('T')[0];
    if (!portfolioHistory.some(h => h.date === dateStr)) {
      portfolioHistory.push({ date: dateStr, balance: parseFloat(currentBalance.toFixed(2)) });
    }
  }

  // 2. Seed Replays (30 instances)
  console.log("Seeding 30 Replays...");
  const closedTrades = createdTrades.filter(t => t.status === 'closed');
  for (let r = 0; r < Math.min(30, closedTrades.length); r++) {
    const t = closedTrades[r];
    const timeSteps = [
      { offset: -120, event: 'Macro Signals', desc: 'DXY weakening, NASDAQ showing strength. Correlation implies positive tailwinds.' },
      { offset: -60, event: 'Whale Activity', desc: `Large wallet accumulations detected for ${t.asset} on spot exchanges.` },
      { offset: -30, event: 'Sentiment State', desc: 'Fear & Greed index spikes into Greedy zone. Funding rates begin to drift positive.' },
      { offset: 0, event: 'Execution Entry', desc: `User entered ${t.direction.toUpperCase()} position @ $${t.entryPriceValue} with ${t.leverage}x leverage.` },
      { offset: 60, event: 'Price Movement', desc: 'Asset tests critical psychological resistance band. High volatility observed.' },
      { offset: 120, event: 'Execution Close', desc: `Position settled @ $${t.exitPriceValue} yielding a PnL of $${t.pnlValue}.` }
    ];

    const timeline = timeSteps.map(step => {
      const stepTime = new Date(t.createdAt.getTime() + step.offset * 60000);
      const timeString = stepTime.toISOString().substring(11, 16);
      const priceOffsetRatio = (step.offset / 120) * 0.03 * (t.pnlValue >= 0 ? 1 : -1);
      const stepPrice = parseFloat((t.entryPriceValue * (1 + priceOffsetRatio)).toFixed(2));
      return {
        time: timeString,
        price: stepPrice,
        event: step.event,
        desc: step.desc,
        sentiment: step.offset <= 0 
          ? (t.emotion === 'FOMO' ? 'Hyper-Bullish' : 'Neutral')
          : (t.pnlValue >= 0 ? 'Extremely Positive' : 'Panicked')
      };
    });

    await db.insert(tradeReplaysTable).values({
      tradeId: t.id,
      asset: t.asset,
      entryDate: t.createdAt.toISOString().split("T")[0],
      entryPrice: t.entryPrice,
      exitPrice: t.exitPrice || "0",
      direction: t.direction,
      marketContext: `Market was showing ${t.pnlValue >= 0 ? 'strong bullish momentum' : 'weakening momentum with bearish divergence'}.`,
      newsEvents: ["Solana Breakpoint schedule finalized", "Bitcoin ETFs reporting positive flows"],
      sentimentConditions: `Fear & Greed index at ${t.pnlValue >= 0 ? 68 : 72}`,
      whaleActivity: t.marketConditions.whale_activity,
      technicalIndicators: { rsi: t.marketConditions.rsi, macd: t.marketConditions.macd },
      userReasoning: t.entryReason,
      aiRecommendation: t.aiRecommendation,
      actualOutcome: `Trade exited at $${t.exitPriceValue} with PnL $${t.pnlValue}`,
      lessonsLearned: t.critique,
      pnl: t.pnl || "0",
      pnlPercent: t.pnlPercent || "0",
      behaviorFlags: t.mistakes,
      createdAt: t.createdAt
    });
  }

  // 3. Seed Portfolio Snapshots
  console.log("Seeding Portfolio Snapshots...");
  portfolioHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  for (const h of portfolioHistory) {
    await db.insert(portfolioSnapshotsTable).values({
      totalValue: String(h.balance),
      totalPnl: String(h.balance - 10000),
      cashBalance: String(h.balance),
      investedValue: "0",
      timestamp: new Date(h.date),
    });
  }

  // 4. Seed Behavior Patterns
  console.log("Seeding Behavior Patterns...");
  const mistakeCounts: Record<string, number> = {};
  closedTrades.forEach(t => {
    t.mistakes.forEach(m => {
      mistakeCounts[m] = (mistakeCounts[m] || 0) + 1;
    });
  });

  const patterns = [
    { type: 'fomo_trading', severity: 'high', desc: 'Wait for structural pullbacks to the 20 EMA. Stop buying green candle run-ups.', rec: 'Implement a 3-minute pause before entering trades.' },
    { type: 'ignoring_stop_loss', severity: 'critical', desc: 'Failing to set hard stop losses leads to large losses on drawdowns.', rec: 'Never enter a position without setting a hard stop-loss first.' },
    { type: 'overtrading', severity: 'medium', desc: 'Entering too many positions simultaneously increases correlation and risk.', rec: 'Limit open trades to a maximum of 3 at any time.' }
  ];

  for (const p of patterns) {
    await db.insert(behaviorPatternsTable).values({
      type: p.type,
      severity: p.severity,
      description: p.desc,
      occurrences: mistakeCounts[p.type === 'fomo_trading' ? 'FOMO Entry' : p.type === 'ignoring_stop_loss' ? 'No Stop Loss Set' : 'Over-trading'] || Math.floor(rand() * 10),
      impactOnPnl: String(parseFloat((-150 - rand() * 400).toFixed(2))),
      recommendation: p.rec,
      exampleTradeIds: [],
    });
  }

  // 5. Seed Coaching Reports
  console.log("Seeding Coaching Reports...");
  const winRate = (closedTrades.filter(t => t.pnlValue > 0).length / closedTrades.length) * 100;
  const totalPnl = closedTrades.reduce((sum, t) => sum + t.pnlValue, 0);

  const coachingBase = {
    summary: `This week you executed ${closedTrades.length} trades with a ${winRate.toFixed(1)}% win rate. Overall net PnL is $${totalPnl.toFixed(2)}.`,
    keyInsights: [
      `Your sniped low-leverage support buys yielded consistent profits.`,
      `Chasing breakout pumps continues to be your biggest performance leak.`,
      `Average winning trade value is smaller than average losing trade value.`,
    ],
    topMistakes: [`FOMO entry on overextended assets.`, `Ignoring stop losses on high-leverage positions.`],
    improvements: [`Decrease average leverage on altcoin positions.`, `Set a hard maximum loss threshold per day.`],
    recommendations: [`Set leverage to 3x or below.`, `Enforce a 3-minute cooling-off period before market orders.`],
    tradingScore: String(Math.min(95, Math.max(30, winRate))),
    winRate: String(winRate),
    totalTrades: closedTrades.length,
    totalPnl: String(totalPnl),
  };

  await db.insert(coachingReportsTable).values({
    type: "daily",
    title: "Daily AI Trading Coach Report",
    ...coachingBase,
    summary: `Today you closed ${Math.min(5, closedTrades.length)} trades. Focus on patience and stop-loss discipline.`,
    periodStart: new Date(baseDate.getTime() - 24 * 60 * 60 * 1000),
    periodEnd: baseDate,
  });

  await db.insert(coachingReportsTable).values({
    type: "weekly",
    title: "Weekly AI Trading Coach Report",
    ...coachingBase,
    periodStart: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000),
    periodEnd: baseDate,
  });

  await db.insert(coachingReportsTable).values({
    type: "monthly",
    title: "Monthly AI Trading Coach Report",
    ...coachingBase,
    summary: `This month: ${closedTrades.length} trades, ${winRate.toFixed(1)}% win rate, $${totalPnl.toFixed(2)} net PnL. Rebalance and reduce FOMO entries.`,
    periodStart: new Date(baseDate.getTime() - 30 * 24 * 60 * 60 * 1000),
    periodEnd: baseDate,
  });

  // 6. Seed Risk Reports
  console.log("Seeding Risk Reports...");
  await db.insert(riskReportsTable).values({
    riskScore: "55.00",
    portfolioHealthScore: "78.00",
    maxExposureWarnings: ["ALT asset exposure exceeds 40% of total portfolio balance."],
    stopLossSuggestions: [
      { asset: "SOL", suggestedStopLoss: 142.50, currentPrice: 154.20 },
      { asset: "ETH", suggestedStopLoss: 3100.00, currentPrice: 3250.00 }
    ],
    positionSizeSuggestions: [
      { asset: "SOL", currentSize: 50, suggestedSize: 30 }
    ],
    concentrationRisks: ["Concentration risk detected in SOL. Recommend rebalancing."],
    summary: "Portfolio is relatively healthy but has high concentration in mid-caps and altcoins.",
    recommendations: ["Set strict stop losses on SOL and rebalance 15% of spot to stablecoins."],
  });

  // 7. Seed Opportunity / AI Analysis
  console.log("Seeding AI Analysis and Opportunities...");
  const opportunities = [
    { asset: "SOL", bullish: 87, bearish: 24, confidence: 83, risk: 28, recommendation: "buy", summary: "Solana is showing strong accumulation off the 50-day EMA support ($168). Whale activity tracks consistent transfers to cold storage.", evidence: ["Whale accumulation at $166-$170", "MACD golden cross confirmed on 4H", "DeFi TVL grew 4.8% today"], riskAnalysis: "Low risk. Breakdown below $165.00 invalidates setup." },
    { asset: "BTC", bullish: 55, bearish: 45, confidence: 78, risk: 60, recommendation: "wait", summary: "Bitcoin is currently ranging within a tight $68.2k to $70.5k band. Ranging indicators show chop.", evidence: ["Neutral institutional ETF flows", "RSI flat at 50", "MACD contracting near zero"], riskAnalysis: "Moderate risk. High chop probability for leverage positions." },
    { asset: "ETH", bullish: 40, bearish: 60, confidence: 65, risk: 52, recommendation: "wait", summary: "Ethereum is experiencing minor post-news profit-taking. Approaching key demand zone.", evidence: ["MACD bearish momentum daily", "Exchange deposits rising", "Outflows from spot desks"], riskAnalysis: "Moderate risk. Swing positions are viable but wait for bottom structure." }
  ];

  for (const o of opportunities) {
    await db.insert(marketAnalysesTable).values({
      asset: o.asset,
      bullishScore: String(o.bullish),
      bearishScore: String(o.bearish),
      confidenceScore: String(o.confidence),
      riskScore: String(o.risk),
      recommendation: o.recommendation,
      summary: o.summary,
      evidence: o.evidence,
      riskAnalysis: o.riskAnalysis,
      macroSignals: { fedPolicy: "Hawkish pause", trend: "Uptrend" },
      sentimentSignals: { fearGreedIndex: 68, longShortRatio: 1.85, fundingRate: 0.015 },
      technicalSignals: { rsi: 56, macd: "Bullish momentum" },
      onchainSignals: { whaleActivity: "Whale buying detected" },
      newsSignals: { sentiment: "Positive" },
    });
  }

  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
