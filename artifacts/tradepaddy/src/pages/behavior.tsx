import { useGetBehaviorSummary } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";

const SEVERITY_CONFIG: Record<string, { color: string; bg: string; border: string; dot: string }> = {
  critical: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", dot: "bg-red-400" },
  high: { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", dot: "bg-orange-400" },
  medium: { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", dot: "bg-yellow-400" },
  low: { color: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/30", dot: "bg-slate-400" },
};

const PATTERN_LABELS: Record<string, string> = {
  fomo_trading: "FOMO Trading",
  revenge_trading: "Revenge Trading",
  overtrading: "Overtrading",
  holding_losers: "Holding Losers",
  cutting_winners_early: "Cutting Winners Early",
  ignoring_stop_loss: "Ignoring Stop Loss",
  position_sizing_mistake: "Position Sizing Error",
};

export default function Behavior() {
  const { data: summary, isLoading } = useGetBehaviorSummary();

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        <Skeleton className="h-8 w-64 bg-slate-800/50" />
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 bg-slate-800/50 rounded-lg" />
          ))}
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-36 bg-slate-800/50 rounded-lg" />
        ))}
      </div>
    );
  }

  const patterns = summary?.patterns ?? [];
  const sortOrder = ["critical", "high", "medium", "low"];
  const sorted = [...patterns].sort(
    (a, b) => sortOrder.indexOf(a.severity) - sortOrder.indexOf(b.severity)
  );

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-mono text-foreground">Behavioral Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1 font-mono">
          AI-detected trading psychology patterns from your trade history
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/40 border-slate-800">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Patterns Found</p>
            <p className="text-3xl font-bold font-mono text-foreground mt-1">{patterns.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/40 border-slate-800">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Total Issues</p>
            <p className="text-3xl font-bold font-mono text-orange-400 mt-1">{summary?.totalIssues ?? 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/40 border-slate-800">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">PnL Impact</p>
            <p className="text-3xl font-bold font-mono text-red-400 mt-1">
              ${Math.abs(summary?.estimatedPnlImpact ?? 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/40 border-slate-800">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Discipline Score</p>
            <p className={`text-3xl font-bold font-mono mt-1 ${
              (summary?.improvementScore ?? 0) >= 70 ? "text-cyan-400" : 
              (summary?.improvementScore ?? 0) >= 50 ? "text-yellow-400" : "text-red-400"
            }`}>
              {summary?.improvementScore ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pattern Cards */}
      {sorted.length === 0 ? (
        <Card className="bg-slate-900/40 border-slate-800">
          <CardContent className="p-12 text-center">
            <div className="text-4xl mb-4 opacity-30">✓</div>
            <p className="text-muted-foreground font-mono text-sm">
              No behavioral issues detected yet. Keep trading and patterns will emerge.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sorted.map((pattern) => {
            const cfg = SEVERITY_CONFIG[pattern.severity] ?? SEVERITY_CONFIG.low;
            return (
              <Card key={pattern.id} className={`bg-slate-900/40 ${cfg.border} border`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot} flex-shrink-0`} />
                        <span className="font-mono font-bold text-foreground">
                          {PATTERN_LABELS[pattern.type] ?? pattern.type}
                        </span>
                        <Badge className={`text-xs font-mono uppercase border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                          {pattern.severity}
                        </Badge>
                        <span className="text-xs font-mono text-muted-foreground ml-auto">
                          {pattern.occurrences}x detected
                        </span>
                      </div>

                      <p className="text-sm font-mono text-muted-foreground leading-relaxed pl-5">
                        {pattern.description}
                      </p>

                      <div className={`${cfg.bg} ${cfg.border} border rounded-md p-3 ml-5`}>
                        <p className="text-xs font-mono uppercase tracking-wider mb-1 text-muted-foreground">
                          AI Recommendation
                        </p>
                        <p className="text-sm font-mono text-foreground">{pattern.recommendation}</p>
                      </div>

                      {pattern.impactOnPnl !== 0 && (
                        <div className="flex items-center gap-2 pl-5">
                          <span className="text-xs text-muted-foreground font-mono">Estimated PnL impact:</span>
                          <span className="text-xs font-mono text-red-400 font-bold">
                            -${Math.abs(pattern.impactOnPnl).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Footer advice */}
      {patterns.length > 0 && (
        <Card className="bg-cyan-950/20 border-cyan-500/20">
          <CardContent className="p-5">
            <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">How to use this data</p>
            <p className="text-sm font-mono text-muted-foreground leading-relaxed">
              Review each detected pattern and cross-reference with your Trade Replay data. 
              Patterns above are sorted by severity — start with Critical issues first. 
              Check your Coaching Report for an AI-generated action plan.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
