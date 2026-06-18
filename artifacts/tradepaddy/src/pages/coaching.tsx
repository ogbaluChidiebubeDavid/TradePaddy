import { useState } from "react";
import { useListCoachingReports, useGetCoachingReport, useGenerateCoachingReport } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { getListCoachingReportsQueryKey } from "@workspace/api-client-react";

type ReportType = "daily" | "weekly" | "monthly";

const SCORE_COLOR = (score: number) =>
  score >= 80 ? "text-cyan-400" : score >= 60 ? "text-yellow-400" : "text-red-400";

export default function Coaching() {
  const [reportType, setReportType] = useState<ReportType>("weekly");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: reports, isLoading } = useListCoachingReports({ type: reportType });
  const { data: selected, isLoading: loadingSelected } = useGetCoachingReport(selectedId ?? 0, {
    query: { enabled: selectedId != null } as any,
  });
  const { mutate: generate, isPending } = useGenerateCoachingReport({
    mutation: {
      onSuccess: (report) => {
        queryClient.invalidateQueries({ queryKey: getListCoachingReportsQueryKey() });
        setSelectedId(report.id);
      },
    },
  });

  const displayReport = selectedId && selected ? selected : (reports && reports[0]) ?? null;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold font-mono text-foreground">AI Coaching</h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono">
            Personalized performance analysis and improvement plans
          </p>
        </div>
        <Button
          onClick={() => generate({ data: { type: reportType } })}
          disabled={isPending}
          className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 font-mono"
          variant="outline"
        >
          {isPending ? "Generating..." : `Generate ${reportType} report`}
        </Button>
      </div>

      {/* Type tabs */}
      <div className="flex gap-2">
        {(["daily", "weekly", "monthly"] as ReportType[]).map((t) => (
          <button
            key={t}
            onClick={() => { setReportType(t); setSelectedId(null); }}
            className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-all ${
              reportType === t
                ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                : "bg-slate-900/40 text-muted-foreground border-slate-700 hover:border-slate-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Reports list */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider px-1">Past Reports</h2>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 bg-slate-800/50 rounded-lg" />
            ))
          ) : !reports?.length ? (
            <Card className="bg-slate-900/40 border-slate-800">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground font-mono">
                  No {reportType} reports yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            reports.map((r) => (
              <Card
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className={`bg-slate-900/40 border-slate-800 cursor-pointer hover:border-cyan-500/30 transition-all ${
                  (selectedId === r.id || (!selectedId && r.id === reports[0]?.id)) ? "border-cyan-500/40 bg-cyan-500/5" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-muted-foreground">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                    <span className={`text-lg font-bold font-mono ${SCORE_COLOR(r.tradingScore)}`}>
                      {r.tradingScore}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-foreground truncate">{r.title}</p>
                  {r.winRate != null && (
                    <p className="text-xs font-mono text-muted-foreground mt-1">
                      Win rate: {r.winRate}% · {r.totalTrades} trades
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Report detail */}
        <div className="xl:col-span-2">
          {loadingSelected || isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-32 bg-slate-800/50 rounded-lg" />
              <Skeleton className="h-48 bg-slate-800/50 rounded-lg" />
              <Skeleton className="h-40 bg-slate-800/50 rounded-lg" />
            </div>
          ) : !displayReport ? (
            <Card className="bg-slate-900/40 border-slate-800 min-h-[400px] flex items-center justify-center">
              <CardContent className="text-center p-8">
                <div className="text-4xl mb-4 opacity-30">◎</div>
                <p className="text-muted-foreground font-mono text-sm mb-4">
                  No reports available. Generate your first coaching report.
                </p>
                <Button
                  onClick={() => generate({ data: { type: reportType } })}
                  disabled={isPending}
                  className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 font-mono"
                  variant="outline"
                >
                  {isPending ? "Generating..." : "Generate Report"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Score header */}
              <Card className="bg-slate-900/40 border-slate-800">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="font-mono font-bold text-foreground text-lg">{displayReport.title}</h2>
                      <p className="text-sm font-mono text-muted-foreground mt-2 leading-relaxed">
                        {displayReport.summary}
                      </p>
                    </div>
                    <div className="text-right ml-6 flex-shrink-0">
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Trading Score</p>
                      <p className={`text-5xl font-bold font-mono ${SCORE_COLOR(displayReport.tradingScore)}`}>
                        {displayReport.tradingScore}
                      </p>
                      <p className="text-xs font-mono text-muted-foreground">/100</p>
                    </div>
                  </div>
                  {displayReport.winRate != null && (
                    <div className="flex gap-6 mt-4 pt-4 border-t border-slate-800">
                      <div>
                        <p className="text-xs text-muted-foreground font-mono">Win Rate</p>
                        <p className="text-lg font-bold font-mono text-cyan-400">{displayReport.winRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-mono">Total Trades</p>
                        <p className="text-lg font-bold font-mono text-foreground">{displayReport.totalTrades}</p>
                      </div>
                      {displayReport.totalPnl != null && (
                        <div>
                          <p className="text-xs text-muted-foreground font-mono">Total PnL</p>
                          <p className={`text-lg font-bold font-mono ${displayReport.totalPnl >= 0 ? "text-cyan-400" : "text-red-400"}`}>
                            {displayReport.totalPnl >= 0 ? "+" : ""}${displayReport.totalPnl.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Key Insights */}
              <Card className="bg-slate-900/40 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Key Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {displayReport.keyInsights.map((insight, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-cyan-400 font-mono text-sm mt-0.5">›</span>
                      <span className="text-sm font-mono text-muted-foreground">{insight}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Mistakes & Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-red-950/10 border-red-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-mono text-red-400 uppercase tracking-wider">Top Mistakes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {displayReport.topMistakes.map((m, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <span className="text-red-400 font-mono text-sm mt-0.5">!</span>
                        <span className="text-sm font-mono text-muted-foreground">{m}</span>
                      </div>
                    ))}
                    {displayReport.topMistakes.length === 0 && (
                      <p className="text-sm font-mono text-muted-foreground">No critical mistakes this period.</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-cyan-950/10 border-cyan-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Action Plan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {displayReport.recommendations.map((r, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <span className="text-cyan-400 font-mono text-sm mt-0.5 flex-shrink-0">{i + 1}.</span>
                        <span className="text-sm font-mono text-muted-foreground">{r}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Improvements */}
              <Card className="bg-yellow-950/10 border-yellow-500/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-mono text-yellow-400 uppercase tracking-wider">
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {displayReport.improvements.map((imp, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-yellow-400 font-mono text-sm mt-0.5">△</span>
                      <span className="text-sm font-mono text-muted-foreground">{imp}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
