import React, { useState, useMemo } from "react";
import { 
  useListReplays, 
  useGetReplay, 
  useCreateReplay, 
  useListTrades,
  useGetTrade,
  useGetMarketCandles,
  getListReplaysQueryKey
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Skeleton } from "../components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const FLAG_CONFIG: Record<string, { label: string; color: string }> = {
  fomo_trading: { label: "FOMO", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  revenge_trading: { label: "Revenge", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  ignoring_stop_loss: { label: "No Stop Loss", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  cutting_winners_early: { label: "Early Exit", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  overtrading: { label: "Overtrading", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  holding_losers: { label: "Holding Losers", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  position_sizing_mistake: { label: "Risk Management", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
};

export default function Replay() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [tradeId, setTradeId] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: replays, isLoading } = useListReplays();
  const { data: closedTrades } = useListTrades({ status: "closed" });
  const { data: selected } = useGetReplay(selectedId ?? 0, {
    query: { enabled: selectedId != null } as any,
  });
  const { mutate: createReplay, isPending } = useCreateReplay({
    mutation: {
      onSuccess: (replay) => {
        queryClient.invalidateQueries({ queryKey: getListReplaysQueryKey() });
        setSelectedId(replay.id);
        setTradeId("");
      },
    },
  });

  const displayReplay = selectedId && selected ? selected : (replays && replays[0]) ?? null;

  // Fetch trade details for the selected replay to get exact times
  const { data: trade } = useGetTrade(displayReplay?.tradeId ?? 0, {
    query: { enabled: displayReplay != null } as any
  });

  // Calculate dynamic timeframe and granularity
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

  const { data: replayCandles, isLoading: loadingReplayCandles } = useGetMarketCandles({
    asset: displayReplay?.asset ?? "",
    startTime: candleParams ? String(candleParams.startTime) : undefined,
    endTime: candleParams ? String(candleParams.endTime) : undefined,
    granularity: candleParams?.granularity ?? "1H",
    limit: 150
  }, {
    query: { enabled: displayReplay != null && candleParams != null } as any
  });

  // Filter closed trades that don't have a replay yet
  const replayedTradeIds = new Set(replays?.map((r) => r.tradeId) ?? []);
  const unreplayedTrades = closedTrades?.filter((t) => !replayedTradeIds.has(t.id)) ?? [];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold font-mono text-foreground">Trade Replay</h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono">
            AI-powered post-mortem analysis of your completed trades
          </p>
        </div>
        <div className="flex gap-2 items-center">
          {unreplayedTrades.length > 0 && (
            <>
              <Select value={tradeId} onValueChange={setTradeId}>
                <SelectTrigger className="w-56 font-mono bg-slate-900/60 border-slate-700 text-sm text-slate-100">
                  <SelectValue placeholder="Select a trade..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                  {unreplayedTrades.map((t) => (
                    <SelectItem key={t.id} value={String(t.id)} className="font-mono text-sm">
                      #{t.id} {t.asset} {t.direction.toUpperCase()} — {t.pnl != null ? (t.pnl >= 0 ? "+" : "") + "$" + t.pnl.toFixed(2) : "N/A"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => tradeId && createReplay({ data: { tradeId: parseInt(tradeId) } })}
                disabled={isPending || !tradeId}
                className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 font-mono"
                variant="outline"
              >
                {isPending ? "Replaying..." : "Generate Replay"}
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Replay list */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider px-1">
            Replay Library ({replays?.length ?? 0})
          </h2>
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 bg-slate-800/50 rounded-lg" />
            ))
          ) : !replays?.length ? (
            <Card className="bg-slate-900/40 border-slate-800">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground font-mono">
                  No replays yet. Generate one from a closed trade.
                </p>
              </CardContent>
            </Card>
          ) : (
            replays.map((r) => (
              <Card
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className={`bg-slate-900/40 border-slate-800 cursor-pointer hover:border-cyan-500/30 transition-all ${
                  (selectedId === r.id || (!selectedId && r.id === replays[0]?.id)) ? "border-cyan-500/40 bg-cyan-500/5" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-foreground">{r.asset}</span>
                    <span className={`text-sm font-bold font-mono ${r.pnl >= 0 ? "text-cyan-400" : "text-red-400"}`}>
                      {r.pnl >= 0 ? "+" : ""}${r.pnl.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap mt-1">
                    <Badge className="text-xs font-mono border border-slate-700 bg-slate-800/50 text-slate-400">
                      {r.direction.toUpperCase()}
                    </Badge>
                    {(r.behaviorFlags as string[]).slice(0, 2).map((flag) => {
                      const cfg = FLAG_CONFIG[flag];
                      return cfg ? (
                        <Badge key={flag} className={`text-xs font-mono border ${cfg.color}`}>
                          {cfg.label}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mt-2">
                    {r.entryDate} — Trade #{r.tradeId}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Replay detail */}
        <div className="xl:col-span-2">
          {!displayReplay ? (
            <Card className="bg-slate-900/40 border-slate-800 min-h-[400px] flex items-center justify-center">
              <CardContent className="text-center p-8">
                <div className="text-4xl mb-4 opacity-30">⟲</div>
                <p className="text-muted-foreground font-mono text-sm">
                  Select or generate a replay to see the AI analysis
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Summary Header */}
              <Card className="bg-slate-900/40 border-slate-800">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-mono font-bold text-xl text-foreground">{displayReplay.asset}</span>
                        <Badge className="font-mono border border-slate-700 bg-slate-800/50 text-slate-400">
                          {displayReplay.direction.toUpperCase()}
                        </Badge>
                        {(displayReplay.behaviorFlags as string[]).map((flag) => {
                          const cfg = FLAG_CONFIG[flag];
                          return cfg ? (
                            <Badge key={flag} className={`text-xs font-mono border ${cfg.color}`}>
                              {cfg.label}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                      <div className="flex gap-6 text-sm font-mono text-muted-foreground flex-wrap">
                        <span>Entry: ${displayReplay.entryPrice.toLocaleString()}</span>
                        <span>Exit: ${displayReplay.exitPrice.toLocaleString()}</span>
                        <span>Date: {displayReplay.entryDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-3xl font-bold font-mono ${displayReplay.pnl >= 0 ? "text-cyan-400" : "text-red-400"}`}>
                        {displayReplay.pnl >= 0 ? "+" : ""}${displayReplay.pnl.toFixed(2)}
                      </p>
                      <p className={`text-sm font-mono ${displayReplay.pnl >= 0 ? "text-cyan-400/70" : "text-red-400/70"}`}>
                        {displayReplay.pnlPercent >= 0 ? "+" : ""}{displayReplay.pnlPercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price action chart for replay */}
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
                  {loadingReplayCandles ? (
                    <Skeleton className="h-full w-full bg-slate-800/40" />
                  ) : replayCandles && replayCandles.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={replayCandles} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
                        <defs>
                          <linearGradient id="replayGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={displayReplay.pnl >= 0 ? "#10b981" : "#ef4444"} stopOpacity={0.15}/>
                            <stop offset="95%" stopColor={displayReplay.pnl >= 0 ? "#10b981" : "#ef4444"} stopOpacity={0}/>
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
                          stroke={displayReplay.pnl >= 0 ? "#10b981" : "#ef4444"}
                          strokeWidth={1.5}
                          fillOpacity={1}
                          fill="url(#replayGradient)"
                        />
                        {/* Entry Timestamp Reference Line */}
                        {trade && (
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
                        )}
                        {/* Exit Timestamp Reference Line */}
                        {trade && trade.closedAt && (
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
                        {trade && (
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
                        )}
                        {/* Exit Price Reference Line */}
                        {trade && trade.exitPrice && (
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
                    <span className="text-muted-foreground font-mono text-xs">No price data for trade timeframe</span>
                  )}
                </div>
              </Card>

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
                      {displayReplay.actualOutcome}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-800/40 space-y-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Errors Made & Good Strategy Followed
                    </span>
                    <p className="text-sm font-mono text-slate-300 leading-relaxed">
                      {displayReplay.lessonsLearned}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
