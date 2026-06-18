import { useGetRiskReport, useGetRiskHistory } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function RiskGauge({ score }: { score: number }) {
  const color = score < 35 ? "#22d3ee" : score < 65 ? "#eab308" : "#ef4444";
  const label = score < 35 ? "LOW" : score < 65 ? "MEDIUM" : "HIGH";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={`${(score / 100) * 251.2} 251.2`}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 1s ease-in-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-mono" style={{ color }}>{score}</span>
          <span className="text-xs font-mono text-muted-foreground">/100</span>
        </div>
      </div>
      <Badge
        className="font-mono text-sm px-4 py-1"
        style={{
          backgroundColor: `${color}20`,
          borderColor: `${color}40`,
          color,
        }}
      >
        {label} RISK
      </Badge>
    </div>
  );
}

export default function Risk() {
  const { data: report, isLoading } = useGetRiskReport();
  const { data: history } = useGetRiskHistory();

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        <Skeleton className="h-8 w-64 bg-slate-800/50" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-60 bg-slate-800/50 rounded-lg" />
          <Skeleton className="h-60 bg-slate-800/50 rounded-lg" />
        </div>
        <Skeleton className="h-48 bg-slate-800/50 rounded-lg" />
      </div>
    );
  }

  const riskHistoryData = history?.slice(-14).map((h, i) => ({
    day: `D-${14 - i}`,
    riskScore: h.riskScore,
    healthScore: h.portfolioHealthScore,
  })) ?? [];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-mono text-foreground">Risk Management</h1>
        <p className="text-sm text-muted-foreground mt-1 font-mono">
          Real-time portfolio risk assessment and position management
        </p>
      </div>

      {!report ? (
        <Card className="bg-slate-900/40 border-slate-800">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground font-mono text-sm">
              No positions open. Open some trades to see risk analysis.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Risk / Health gauges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/40 border-slate-800 flex items-center justify-center p-6">
              <div className="text-center space-y-2">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Risk Score</p>
                <RiskGauge score={Math.round(report.riskScore)} />
              </div>
            </Card>

            <Card className="bg-slate-900/40 border-slate-800 flex items-center justify-center p-6">
              <div className="text-center space-y-2">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Portfolio Health</p>
                <RiskGauge score={Math.round(report.portfolioHealthScore)} />
              </div>
            </Card>

            <Card className="bg-slate-900/40 border-slate-800 p-5 flex flex-col justify-between">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Summary</p>
              <p className="text-sm font-mono text-muted-foreground leading-relaxed flex-1">
                {report.summary}
              </p>
              <div className="flex gap-3 mt-4 flex-wrap">
                {(report.maxExposureWarnings as string[]).length > 0 && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 font-mono text-xs">
                    {(report.maxExposureWarnings as string[]).length} Exposure Warning
                  </Badge>
                )}
                {(report.stopLossSuggestions as unknown[]).length > 0 && (
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 font-mono text-xs">
                    {(report.stopLossSuggestions as unknown[]).length} Stop Loss Missing
                  </Badge>
                )}
              </div>
            </Card>
          </div>

          {/* Warnings */}
          {((report.maxExposureWarnings as string[]).length > 0 || (report.concentrationRisks as string[]).length > 0) && (
            <Card className="bg-red-950/10 border-red-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono text-red-400 uppercase tracking-wider">
                  Risk Warnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[...(report.maxExposureWarnings as string[]), ...(report.concentrationRisks as string[])].map((w, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="text-red-400 font-mono text-sm mt-0.5">!</span>
                    <span className="text-sm font-mono text-muted-foreground">{w}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Stop Loss suggestions */}
          {(report.stopLossSuggestions as Array<{ asset: string; suggestedStopLoss: number; currentPrice: number }>).length > 0 && (
            <Card className="bg-slate-900/40 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono text-orange-400 uppercase tracking-wider">
                  Stop Loss Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {(report.stopLossSuggestions as Array<{ asset: string; suggestedStopLoss: number; currentPrice: number }>).map((s, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-800/40 rounded p-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-foreground">{s.asset}</span>
                        <span className="text-xs font-mono text-muted-foreground">
                          Current: ${s.currentPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">Suggested Stop:</span>
                        <span className="text-sm font-mono text-orange-400 font-bold">
                          ${s.suggestedStopLoss.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          <Card className="bg-cyan-950/10 border-cyan-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Risk Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {(report.recommendations as string[]).map((r, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-cyan-400 font-mono text-sm mt-0.5 flex-shrink-0">{i + 1}.</span>
                  <span className="text-sm font-mono text-muted-foreground">{r}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Risk History Chart */}
          {riskHistoryData.length > 1 && (
            <Card className="bg-slate-900/40 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Risk Score History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={riskHistoryData}>
                    <defs>
                      <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 10, fontFamily: "monospace" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px", fontFamily: "monospace", fontSize: "12px" }}
                      labelStyle={{ color: "#94a3b8" }}
                    />
                    <Area type="monotone" dataKey="riskScore" stroke="#ef4444" fill="url(#riskGrad)" strokeWidth={2} name="Risk Score" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
