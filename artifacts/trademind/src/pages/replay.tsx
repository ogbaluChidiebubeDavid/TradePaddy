import { useState } from "react";
import { useListReplays, useGetReplay, useCreateReplay, useListTrades } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Skeleton } from "../components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { getListReplaysQueryKey } from "@workspace/api-client-react";

const FLAG_CONFIG: Record<string, { label: string; color: string }> = {
  fomo_trading: { label: "FOMO", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  revenge_trading: { label: "Revenge", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  ignoring_stop_loss: { label: "No Stop Loss", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  cutting_winners_early: { label: "Early Exit", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  overtrading: { label: "Overtrading", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
};

export default function Replay() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [tradeId, setTradeId] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: replays, isLoading } = useListReplays();
  const { data: closedTrades } = useListTrades({ status: "closed" });
  const { data: selected } = useGetReplay(selectedId ?? 0, {
    query: { enabled: selectedId != null },
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
                <SelectTrigger className="w-56 font-mono bg-slate-900/60 border-slate-700 text-sm">
                  <SelectValue placeholder="Select a trade..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
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
              {/* Header */}
              <Card className="bg-slate-900/40 border-slate-800">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
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
                      <div className="flex gap-6 text-sm font-mono text-muted-foreground">
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

              {/* Market Context */}
              <Card className="bg-slate-900/40 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    Market Context at Entry
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm font-mono text-muted-foreground">{displayReplay.marketContext}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground font-mono mb-1">Sentiment</p>
                      <p className="text-sm font-mono text-foreground">{displayReplay.sentimentConditions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono mb-1">Whale Activity</p>
                      <p className="text-sm font-mono text-foreground">{displayReplay.whaleActivity}</p>
                    </div>
                  </div>
                  {(displayReplay.newsEvents as string[]).length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground font-mono mb-2">Key Events</p>
                      {(displayReplay.newsEvents as string[]).map((e, i) => (
                        <div key={i} className="flex gap-2 items-start mb-1">
                          <span className="text-cyan-400 font-mono text-xs mt-0.5">›</span>
                          <span className="text-sm font-mono text-muted-foreground">{e}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Technical at entry */}
                <Card className="bg-slate-900/40 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-mono text-yellow-400 uppercase tracking-wider">
                      Technicals at Entry
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(displayReplay.technicalIndicators as Record<string, unknown>).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-xs text-muted-foreground font-mono capitalize">{k.toUpperCase()}</span>
                        <span className="text-xs font-mono text-foreground">{String(v)}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* AI vs User */}
                <Card className="bg-slate-900/40 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                      AI vs User Decision
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground font-mono">AI Recommended</p>
                      <Badge className="mt-1 font-mono uppercase border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                        {displayReplay.aiRecommendation}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono mb-1">Your Reasoning</p>
                      <p className="text-sm font-mono text-foreground">{displayReplay.userReasoning}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Outcome */}
              <Card className={`border ${displayReplay.pnl >= 0 ? "bg-cyan-950/10 border-cyan-500/20" : "bg-red-950/10 border-red-500/20"}`}>
                <CardHeader className="pb-2">
                  <CardTitle className={`text-xs font-mono uppercase tracking-wider ${displayReplay.pnl >= 0 ? "text-cyan-400" : "text-red-400"}`}>
                    Actual Outcome
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-mono text-muted-foreground">{displayReplay.actualOutcome}</p>
                </CardContent>
              </Card>

              {/* Lessons */}
              <Card className="bg-yellow-950/10 border-yellow-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-mono text-yellow-400 uppercase tracking-wider">
                    Lessons Learned
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-mono text-muted-foreground leading-relaxed">
                    {displayReplay.lessonsLearned}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
