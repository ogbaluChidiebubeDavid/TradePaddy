import React, { useMemo } from "react";
import { useParams, Link } from "wouter";
import { 
  useGetPublicTrade, 
  useGetPublicTradeReplay,
  useGetMarketCandles
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { format } from "date-fns";
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  Brain, 
  Globe, 
  ShieldCheck, 
  Info, 
  ChevronRight,
  Sparkles
} from "lucide-react";

const FLAG_CONFIG: Record<string, { label: string; color: string }> = {
  fomo_trading: { label: "FOMO", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  revenge_trading: { label: "Revenge", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  ignoring_stop_loss: { label: "No Stop Loss", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  cutting_winners_early: { label: "Early Exit", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  overtrading: { label: "Overtrading", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  holding_losers: { label: "Holding Losers", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  position_sizing_mistake: { label: "Risk Management", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
};

export default function SharePage() {
  const { id } = useParams<{ id: string }>();
  const tradeId = parseInt(id ?? "0", 10);

  const { data: trade, isLoading: loadingTrade, error: tradeError } = useGetPublicTrade(tradeId, {
    query: { enabled: !!tradeId } as any
  });

  const { data: replay, isLoading: loadingReplay } = useGetPublicTradeReplay(tradeId, {
    query: { enabled: !!tradeId && trade?.status === "closed" } as any
  });

  // Calculate dynamic timeframe and granularity for the chart
  const candleParams = useMemo(() => {
    if (!trade) return null;
    const entryTime = new Date(trade.createdAt).getTime();
    const exitTime = trade.closedAt ? new Date(trade.closedAt).getTime() : Date.now();
    const duration = exitTime - entryTime;

    // 4 hours of padding before/after, or 15% of duration (whichever is larger)
    const padding = Math.max(4 * 3600 * 1000, Math.round(duration * 0.15));
    const startTime = entryTime - padding;
    const endTime = exitTime + padding;

    let granularity = "1H";
    if (duration < 6 * 3600 * 1000) granularity = "5m";
    else if (duration < 24 * 3600 * 1000) granularity = "15m";
    else if (duration < 4 * 24 * 3600 * 1000) granularity = "1H";
    else granularity = "4H";

    return { startTime, endTime, granularity };
  }, [trade]);

  const { data: candles, isLoading: loadingCandles } = useGetMarketCandles({
    asset: trade?.asset ?? "",
    startTime: candleParams ? String(candleParams.startTime) : undefined,
    endTime: candleParams ? String(candleParams.endTime) : undefined,
    granularity: candleParams?.granularity ?? "1H",
    limit: 150
  }, {
    query: { enabled: !!trade && !!candleParams } as any
  });

  if (loadingTrade) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="font-mono text-3xl font-bold text-cyan-400 animate-pulse">
            TradePaddy<span className="text-slate-500">.ai</span>
          </div>
          <div className="text-slate-400 text-sm font-mono animate-pulse">
            Fetching shared trade details...
          </div>
        </div>
      </div>
    );
  }

  if (tradeError || !trade) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6">
          <div className="text-red-400 text-5xl">⚠️</div>
          <h2 className="text-2xl font-bold font-mono text-slate-100">Trade Not Found</h2>
          <p className="text-sm text-slate-400 font-mono leading-relaxed">
            The trade link you requested is invalid, expired, or has been set to private.
          </p>
          <Link href="/">
            <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold uppercase tracking-wider font-mono">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isWin = trade.pnl ? trade.pnl > 0 : false;
  const pnlFormatted = trade.pnl != null ? `${isWin ? "+" : ""}$${trade.pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-";
  const pnlPercentFormatted = trade.pnlPercent != null ? `${trade.pnlPercent >= 0 ? "+" : ""}${trade.pnlPercent.toFixed(2)}%` : "-";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono flex flex-col items-center pb-12 overflow-x-hidden relative selection:bg-cyan-500 selection:text-slate-950">
      {/* Decorative neon blobs in background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-4xl px-4 py-6 flex items-center justify-between border-b border-slate-900/80 backdrop-blur z-10">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-cyan-600 to-purple-600 p-2 rounded-lg text-slate-950 font-black tracking-tighter">
            TP
          </div>
          <span className="text-xl font-bold text-slate-100">
            TradePaddy<span className="text-cyan-400">.ai</span>
          </span>
        </div>
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 text-xs flex items-center gap-1.5 font-mono">
            <Globe className="h-3.5 w-3.5" />
            Launch App
            <ChevronRight className="h-3 w-3" />
          </Button>
        </Link>
      </header>

      <main className="w-full max-w-4xl px-4 mt-8 space-y-8 z-10 flex-grow">
        {/* Visual Premium Card */}
        <div className="relative group">
          {/* Neon Border Glow */}
          <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${
            isWin ? "from-emerald-500/30 via-cyan-500/20 to-purple-500/10" : "from-rose-500/30 via-orange-500/20 to-purple-500/10"
          } opacity-75 blur-xl group-hover:opacity-100 transition duration-1000 group-hover:duration-200`} />
          
          <div className="relative bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
                    {trade.asset}/USDT
                  </span>
                  <Badge className={`text-xs font-bold font-mono px-2 py-0.5 border ${
                    trade.direction === "long" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border-rose-500/30"
                  }`}>
                    {trade.direction.toUpperCase()}
                  </Badge>
                  <Badge variant={trade.isReal ? "default" : "secondary"} className={
                    trade.isReal ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-mono text-xs uppercase" : "bg-slate-800 text-slate-400 font-mono text-xs uppercase"
                  }>
                    {trade.isReal ? "Bitget Live" : "Paper Trade"}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">Executed on {format(new Date(trade.createdAt), "PPP 'at' p")}</p>
              </div>

              <div className="text-left md:text-right">
                <div className={`text-4xl md:text-5xl font-black ${isWin ? "text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" : "text-rose-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]"}`}>
                  {pnlPercentFormatted}
                </div>
                <div className={`text-md font-semibold font-mono mt-1 ${isWin ? "text-emerald-500/80" : "text-rose-500/80"}`}>
                  {pnlFormatted}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-b border-slate-800/60 bg-slate-950/40 rounded-xl px-4 md:px-6">
              <div>
                <span className="text-xs text-slate-500 block mb-1">Entry Price</span>
                <span className="text-md font-bold text-slate-200">${trade.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">Exit Price</span>
                <span className="text-md font-bold text-slate-200">
                  {trade.exitPrice ? `$${trade.exitPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "Market Price"}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">Size (Qty)</span>
                <span className="text-md font-bold text-slate-200">{trade.quantity} {trade.asset}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block mb-1">Status</span>
                <span className={`text-md font-bold uppercase ${trade.status === "open" ? "text-cyan-400" : "text-slate-400"}`}>
                  {trade.status}
                </span>
              </div>
            </div>

            {trade.entryReason && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 text-cyan-400" />
                  Trader Entry Logic
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/20 border border-slate-800/40 p-4 rounded-xl">
                  {trade.entryReason}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* AI Analysis Section */}
        {trade.status === "closed" ? (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
              <h2 className="text-lg font-bold tracking-wider uppercase text-slate-200">
                AI Post-Mortem & Critique
              </h2>
            </div>

            {loadingReplay ? (
              <Card className="bg-slate-900/40 border-slate-800 p-6 space-y-4">
                <Skeleton className="h-6 w-1/4 bg-slate-800" />
                <Skeleton className="h-24 w-full bg-slate-800" />
              </Card>
            ) : replay ? (
              <div className="space-y-6">
                {/* Timeline Chart */}
                <Card className="bg-slate-900/40 border-slate-800 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-xs text-cyan-400 uppercase tracking-wider">
                      Trade Price Action Timeline
                    </h3>
                    <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span>Entry</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        <span>Exit</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-[250px] w-full bg-slate-950/40 rounded-lg border border-slate-900 p-2 flex items-center justify-center">
                    {loadingCandles ? (
                      <Skeleton className="h-full w-full bg-slate-800/40" />
                    ) : candles && candles.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={candles} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
                          <defs>
                            <linearGradient id="sharedReplayGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={isWin ? "#10b981" : "#ef4444"} stopOpacity={0.15}/>
                              <stop offset="95%" stopColor={isWin ? "#10b981" : "#ef4444"} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="time"
                            type="number"
                            domain={["dataMin", "dataMax"]}
                            tickFormatter={(t) => format(new Date(t), "HH:mm")}
                            stroke="#475569"
                            fontSize={9}
                            tickLine={false}
                          />
                          <YAxis
                            domain={["auto", "auto"]}
                            stroke="#475569"
                            fontSize={9}
                            tickLine={false}
                            tickFormatter={(v) => `$${v.toLocaleString()}`}
                          />
                          <RechartsTooltip
                            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }}
                            labelStyle={{ color: "#94a3b8", fontSize: "9px" }}
                            itemStyle={{ color: "#22d3ee", fontSize: "11px", fontFamily: "monospace" }}
                            labelFormatter={(t) => format(new Date(t), "MMM d, HH:mm:ss")}
                            formatter={(v: any) => [`$${parseFloat(v).toLocaleString()}`, "Price"]}
                          />
                          <Area
                            type="monotone"
                            dataKey="close"
                            stroke={isWin ? "#10b981" : "#ef4444"}
                            strokeWidth={1.5}
                            fillOpacity={1}
                            fill="url(#sharedReplayGradient)"
                          />
                          {/* Entry Timestamp Reference Line */}
                          <ReferenceLine
                            x={new Date(trade.createdAt).getTime()}
                            stroke="#10b981"
                            strokeWidth={1.5}
                            strokeDasharray="3 3"
                            label={{
                              value: "Entry",
                              position: "top",
                              fill: "#10b981",
                              fontSize: 9,
                              fontFamily: "monospace"
                            }}
                          />
                          {/* Exit Timestamp Reference Line */}
                          {trade.closedAt && (
                            <ReferenceLine
                              x={new Date(trade.closedAt).getTime()}
                              stroke="#ef4444"
                              strokeWidth={1.5}
                              strokeDasharray="3 3"
                              label={{
                                value: "Exit",
                                position: "top",
                                fill: "#ef4444",
                                fontSize: 9,
                                fontFamily: "monospace"
                              }}
                            />
                          )}
                          {/* Entry Price Reference Line */}
                          <ReferenceLine
                            y={trade.entryPrice}
                            stroke="#10b981"
                            strokeWidth={1}
                            strokeOpacity={0.6}
                            strokeDasharray="2 2"
                            label={{
                              value: `Buy: $${trade.entryPrice.toLocaleString()}`,
                              position: "insideLeft",
                              fill: "#10b981",
                              fontSize: 8,
                              fontFamily: "monospace"
                            }}
                          />
                          {/* Exit Price Reference Line */}
                          {trade.exitPrice && (
                            <ReferenceLine
                              y={trade.exitPrice}
                              stroke="#ef4444"
                              strokeWidth={1}
                              strokeOpacity={0.6}
                              strokeDasharray="2 2"
                              label={{
                                value: `Sell: $${trade.exitPrice.toLocaleString()}`,
                                position: "insideRight",
                                fill: "#ef4444",
                                fontSize: 8,
                                fontFamily: "monospace"
                              }}
                            />
                          )}
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <span className="text-muted-foreground font-mono text-xs">No price timeline data</span>
                    )}
                  </div>
                </Card>

                {/* Behavioral Patterns */}
                {replay.behaviorFlags && replay.behaviorFlags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Detected Patterns:</span>
                    {replay.behaviorFlags.map((flag) => {
                      const cfg = FLAG_CONFIG[flag];
                      return cfg ? (
                        <Badge key={flag} className={`text-xs font-mono border ${cfg.color}`}>
                          {cfg.label}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                )}

                {/* Consolidated AI Post-Mortem Critique */}
                <Card className="bg-slate-900/40 border-slate-800">
                  <CardHeader className="pb-3 border-b border-slate-800/40">
                    <CardTitle className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      AI Post-Mortem Critique & Lessons Learned
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-5">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Outcome Assessment (Was it a good trade?)
                      </span>
                      <p className="text-sm font-mono text-slate-300 leading-relaxed">
                        {replay.actualOutcome}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-800/40 space-y-1">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                        Errors Made & Good Strategy Followed
                      </span>
                      <p className="text-sm font-mono text-slate-300 leading-relaxed">
                        {replay.lessonsLearned}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-slate-900/40 border-slate-800 p-6 text-center">
                <p className="text-sm text-slate-400 leading-relaxed">
                  No post-mortem replay analysis has been generated for this trade yet.
                </p>
              </Card>
            )}
          </div>
        ) : (
          <div className="bg-cyan-950/10 border border-cyan-500/20 rounded-xl p-6 text-center space-y-3">
            <h3 className="font-bold text-cyan-400 font-mono text-md">Trade is currently ACTIVE</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Once the trader closes this position, TradePaddy's AI will perform a post-mortem critique analyzing market events, sentiment, whale moves, and behavioral patterns.
            </p>
          </div>
        )}

        {/* CTA to get user to check out TradePaddy.ai */}
        <div className="relative overflow-hidden bg-gradient-to-tr from-cyan-950/40 via-purple-950/20 to-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 text-center space-y-6">
          <div className="absolute top-0 right-0 h-32 w-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-100 font-mono">
              Are you making emotional trading mistakes?
            </h3>
            <p className="text-xs md:text-sm text-slate-400 font-mono leading-relaxed">
              TradePaddy.ai uses advanced LLMs to identify FOMO, revenge trading, and improper position sizing while providing live coaching breakdowns and trade replays.
            </p>
          </div>
          <Link href="/">
            <Button className="mt-2 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-slate-950 font-bold uppercase tracking-wider font-mono">
              Analyze Your Trades Free
              <ArrowUpRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl px-4 mt-16 text-center text-xs text-slate-600 font-mono">
        <p>© 2026 TradePaddy.ai - All rights reserved. Trade smart, analyze always.</p>
      </footer>
    </div>
  );
}
