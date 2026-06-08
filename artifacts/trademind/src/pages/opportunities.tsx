import { useState } from "react";
import { useGetTopOpportunities, useCreateAnalysis, useListAnalyses } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { getGetTopOpportunitiesQueryKey, getListAnalysesQueryKey } from "@workspace/api-client-react";

const RECOMMENDATION_COLOR: Record<string, string> = {
  buy: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  hold: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  wait: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  sell: "bg-red-500/20 text-red-400 border-red-500/30",
};

const SEVERITY_DOT: Record<string, string> = {
  buy: "bg-cyan-400",
  hold: "bg-yellow-400",
  wait: "bg-slate-400",
  sell: "bg-red-400",
};

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full bg-slate-800 rounded-full h-1.5">
      <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export default function Opportunities() {
  const [assetInput, setAssetInput] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: opportunities, isLoading } = useGetTopOpportunities();
  const { data: analyses } = useListAnalyses({ asset: selectedAsset ?? undefined });
  const { mutate: createAnalysis, isPending } = useCreateAnalysis({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetTopOpportunitiesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListAnalysesQueryKey() });
        setAssetInput("");
      },
    },
  });

  const selectedAnalysis = selectedAsset && analyses ? analyses[0] : null;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-mono text-foreground">Market Opportunities</h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono">
            AI-scored entry signals across the crypto market
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            value={assetInput}
            onChange={(e) => setAssetInput(e.target.value.toUpperCase())}
            placeholder="BTC, ETH, SOL..."
            className="w-40 font-mono bg-slate-900/60 border-slate-700 text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && assetInput.trim()) {
                createAnalysis({ data: { asset: assetInput.trim() } });
              }
            }}
          />
          <Button
            onClick={() => assetInput.trim() && createAnalysis({ data: { asset: assetInput.trim() } })}
            disabled={isPending || !assetInput.trim()}
            className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 font-mono text-sm"
            variant="outline"
          >
            {isPending ? "Analyzing..." : "Analyze"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Opportunities List */}
        <div className="xl:col-span-1 space-y-3">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-wider px-1">
            Top Signals
          </h2>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg bg-slate-800/50" />
            ))
          ) : !opportunities?.length ? (
            <Card className="bg-slate-900/40 border-slate-800">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground font-mono">
                  No signals yet. Analyze an asset to get started.
                </p>
              </CardContent>
            </Card>
          ) : (
            opportunities.map((opp) => (
              <Card
                key={opp.id}
                onClick={() => setSelectedAsset(opp.asset === selectedAsset ? null : opp.asset)}
                className={`bg-slate-900/40 border-slate-800 cursor-pointer transition-all hover:border-cyan-500/40 ${
                  selectedAsset === opp.asset ? "border-cyan-500/60 bg-cyan-500/5" : ""
                }`}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${SEVERITY_DOT[opp.recommendation] ?? "bg-slate-400"}`} />
                      <span className="font-mono font-bold text-foreground">{opp.asset}</span>
                    </div>
                    <Badge className={`text-xs font-mono uppercase border ${RECOMMENDATION_COLOR[opp.recommendation] ?? ""}`}>
                      {opp.recommendation}
                    </Badge>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-mono">Bullish</span>
                      <span className="text-xs font-mono text-cyan-400">{opp.bullishScore}%</span>
                    </div>
                    <ScoreBar value={opp.bullishScore} color="bg-cyan-500" />

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-mono">Confidence</span>
                      <span className="text-xs font-mono text-yellow-400">{opp.confidenceScore}%</span>
                    </div>
                    <ScoreBar value={opp.confidenceScore} color="bg-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Detail Panel */}
        <div className="xl:col-span-2">
          {!selectedAnalysis ? (
            <Card className="bg-slate-900/40 border-slate-800 h-full flex items-center justify-center min-h-[400px]">
              <CardContent className="text-center p-8">
                <div className="text-4xl mb-4 opacity-30">◎</div>
                <p className="text-muted-foreground font-mono text-sm">
                  Select an asset to view detailed analysis
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Main signal card */}
              <Card className="bg-slate-900/40 border-slate-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-mono text-foreground text-lg">
                      {selectedAnalysis.asset} — Deep Analysis
                    </CardTitle>
                    <Badge className={`text-sm font-mono uppercase border ${RECOMMENDATION_COLOR[selectedAnalysis.recommendation] ?? ""}`}>
                      {selectedAnalysis.recommendation}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                    {selectedAnalysis.summary}
                  </p>

                  {/* Score bars */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Bullish Score", value: selectedAnalysis.bullishScore, color: "bg-cyan-500" },
                      { label: "Bearish Score", value: selectedAnalysis.bearishScore, color: "bg-red-500" },
                      { label: "Confidence", value: selectedAnalysis.confidenceScore, color: "bg-yellow-500" },
                      { label: "Risk Score", value: selectedAnalysis.riskScore, color: "bg-orange-500" },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground font-mono">{label}</span>
                          <span className="text-xs font-mono text-foreground">{value}%</span>
                        </div>
                        <ScoreBar value={value} color={color} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Signal grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Technical */}
                <Card className="bg-slate-900/40 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      Technical Signals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(selectedAnalysis.technicalSignals as Record<string, unknown>).map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground font-mono capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-xs font-mono text-foreground">{String(v)}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Sentiment */}
                <Card className="bg-slate-900/40 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-mono text-yellow-400 uppercase tracking-wider">
                      Sentiment Signals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(selectedAnalysis.sentimentSignals as Record<string, unknown>).map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground font-mono capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-xs font-mono text-foreground">{String(v)}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* On-chain */}
                <Card className="bg-slate-900/40 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                      On-Chain Signals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {Object.entries(selectedAnalysis.onchainSignals as Record<string, unknown>).map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center flex-wrap gap-1">
                        <span className="text-xs text-muted-foreground font-mono capitalize">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-xs font-mono text-foreground text-right max-w-[60%]">{String(v)}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Evidence */}
                <Card className="bg-slate-900/40 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-mono text-green-400 uppercase tracking-wider">
                      Supporting Evidence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {(selectedAnalysis.evidence as string[]).map((e, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <span className="text-cyan-400 font-mono text-xs mt-0.5">›</span>
                        <span className="text-xs font-mono text-muted-foreground">{e}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Risk */}
              <Card className="bg-red-950/20 border-red-500/20">
                <CardContent className="p-4 flex gap-3 items-start">
                  <span className="text-red-400 font-mono text-sm mt-0.5">!</span>
                  <div>
                    <p className="text-xs font-mono text-red-400 uppercase tracking-wider mb-1">Risk Analysis</p>
                    <p className="text-sm font-mono text-muted-foreground">{selectedAnalysis.riskAnalysis}</p>
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
