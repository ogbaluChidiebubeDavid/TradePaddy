import { useState } from "react";
import { useGetTopOpportunities, useCreateAnalysis, useListAnalyses } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Skeleton } from "../components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { getGetTopOpportunitiesQueryKey, getListAnalysesQueryKey } from "@workspace/api-client-react";

const OPPORTUNITY_TYPE_COLOR: Record<string, string> = {
  "Momentum": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Mean Reversion": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Ecosystem Rotation": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "News Catalyst": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Liquidity Shift": "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const SEVERITY_DOT: Record<string, string> = {
  "Momentum": "bg-cyan-400",
  "Mean Reversion": "bg-yellow-400",
  "Ecosystem Rotation": "bg-purple-400",
  "News Catalyst": "bg-emerald-400",
  "Liquidity Shift": "bg-blue-400",
};

const RISK_LEVEL_COLOR: Record<string, string> = {
  "Low": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Medium": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "High": "bg-red-500/20 text-red-400 border-red-500/30",
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
  const [selectedOpp, setSelectedOpp] = useState<any | null>(null);
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

  const handleOppClick = (opp: any) => {
    if (selectedOpp && selectedOpp.tokenPair === opp.tokenPair) {
      setSelectedOpp(null);
      setSelectedAsset(null);
    } else {
      setSelectedOpp(opp);
      setSelectedAsset(opp.tokenPair.split('/')[0]);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-mono text-foreground">Market Opportunities</h1>
          <p className="text-sm text-muted-foreground mt-1 font-mono">
            Structured trade setups derived from ecosystem, orderbook, and whale indicators
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
            Top Setups
          </h2>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg bg-slate-800/50" />
            ))
          ) : !opportunities?.length ? (
            <Card className="bg-slate-900/40 border-slate-800">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground font-mono">
                  No trade setups detected yet. Enter an asset ticker above to scan.
                </p>
              </CardContent>
            </Card>
          ) : (
            opportunities.map((opp: any, idx: number) => (
              <Card
                key={idx}
                onClick={() => handleOppClick(opp)}
                className={`bg-slate-900/40 border-slate-800 cursor-pointer transition-all hover:border-cyan-500/40 ${
                  selectedOpp && selectedOpp.tokenPair === opp.tokenPair ? "border-cyan-500/60 bg-cyan-500/5" : ""
                }`}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${SEVERITY_DOT[opp.type] ?? "bg-cyan-400"}`} />
                      <span className="font-mono font-bold text-foreground">{opp.tokenPair}</span>
                    </div>
                    <Badge className={`text-xs font-mono border ${OPPORTUNITY_TYPE_COLOR[opp.type] ?? "text-slate-400"}`}>
                      {opp.type}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                    <span>Horizon: {opp.horizon}</span>
                    <Badge className={`text-[10px] font-mono border ${RISK_LEVEL_COLOR[opp.riskLevel] ?? ""}`}>
                      {opp.riskLevel} Risk
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground font-mono">Confidence</span>
                      <span className="text-xs font-mono text-cyan-400">{opp.confidence}%</span>
                    </div>
                    <ScoreBar value={opp.confidence} color="bg-cyan-500" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Detail Panel */}
        <div className="xl:col-span-2">
          {!selectedOpp || !selectedAnalysis ? (
            <Card className="bg-slate-900/40 border-slate-800 h-full flex items-center justify-center min-h-[400px]">
              <CardContent className="text-center p-8">
                <div className="text-4xl mb-4 opacity-30">◎</div>
                <p className="text-muted-foreground font-mono text-sm">
                  Select a setup card to view trade rationale & ecosystem intelligence
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Dynamic Trade Setup */}
              <Card className="border-cyan-500/20 bg-cyan-950/10">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-mono text-cyan-400 text-lg flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                      {selectedOpp.tokenPair} Active Setup
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs font-mono uppercase text-cyan-400 border-cyan-500/30">
                        {selectedOpp.type}
                      </Badge>
                      <Badge variant="outline" className={`text-xs font-mono uppercase ${RISK_LEVEL_COLOR[selectedOpp.riskLevel] ?? ""}`}>
                        {selectedOpp.riskLevel} Risk
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 font-mono">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 uppercase tracking-wider block">Entry Rationale</span>
                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 border border-slate-800/40 p-4 rounded-xl">
                      {selectedOpp.entryRationale}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                    <div>
                      <span className="text-slate-500">Expected Time Horizon</span>
                      <p className="text-slate-300 font-bold capitalize mt-0.5">{selectedOpp.horizon}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Setup Confidence</span>
                      <p className="text-cyan-400 font-bold mt-0.5">{selectedOpp.confidence}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main signal card */}
              <Card className="bg-slate-900/40 border-slate-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-mono text-foreground text-sm">
                      {selectedAnalysis.asset} — Deep Market Analysis
                    </CardTitle>
                    <Badge variant="outline" className={`text-xs font-mono uppercase ${selectedAnalysis.recommendation === 'buy' ? 'text-green-500 border-green-500/30' : 'text-red-500 border-red-500/30'}`}>
                      {selectedAnalysis.recommendation}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                    {selectedAnalysis.summary}
                  </p>

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
                      Technical Signals (Bitget API / CoinGecko)
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
                      Sentiment Signals (LunarCrush / CryptoPanic)
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

                {/* On-chain & Whales */}
                <Card className="md:col-span-2 bg-slate-900/40 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                      On-Chain Dynamics & Whale Movements (Dune / DeFiLlama / Glassnode)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm font-mono">
                    <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
                      <span className="text-xs text-purple-400 uppercase tracking-wider block mb-1">Whale Position & Market Shift</span>
                      <p className="text-slate-300 leading-relaxed text-sm">
                        {String(selectedAnalysis.onchainSignals.whaleActivity ?? "N/A")}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-muted-foreground block">ETF / Institutional Flows</span>
                        <p className="text-slate-200 mt-0.5">{String(selectedAnalysis.onchainSignals.etfFlows ?? "N/A")}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground block">DeFi TVL Trend (DeFiLlama)</span>
                        <p className="text-slate-200 mt-0.5">{String(selectedAnalysis.onchainSignals.defiTvl ?? "N/A")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Evidence */}
                <Card className="md:col-span-2 bg-slate-900/40 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-mono text-green-400 uppercase tracking-wider">
                      Supporting Evidence & Key Events (CryptoPanic News)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 font-mono">
                      {(selectedAnalysis.evidence as string[]).map((e, i) => (
                        <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                          <span className="text-cyan-400 shrink-0">›</span>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Risk */}
              <Card className="bg-red-950/20 border-red-500/20">
                <CardContent className="p-4 flex gap-3 items-start font-mono">
                  <span className="text-red-400 font-mono text-sm mt-0.5">!</span>
                  <div>
                    <p className="text-xs font-mono text-red-400 uppercase tracking-wider mb-1">Risk Analysis</p>
                    <p className="text-sm text-slate-300">{selectedAnalysis.riskAnalysis}</p>
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
