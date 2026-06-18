import React, { useState } from "react";
import { useCreateAnalysis, useGetAnalysis, getGetAnalysisQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Search, AlertTriangle, TrendingUp, TrendingDown, Activity, Globe, Newspaper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Analysis() {
  const [asset, setAsset] = useState("BTC");
  const [currentAnalysisId, setCurrentAnalysisId] = useState<number | null>(null);
  
  const { toast } = useToast();
  const createAnalysis = useCreateAnalysis();
  const { data: analysis, isLoading: loadingAnalysis } = useGetAnalysis(currentAnalysisId || 0, {
    query: { enabled: !!currentAnalysisId, queryKey: getGetAnalysisQueryKey(currentAnalysisId || 0) }
  });

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asset.trim()) return;
    
    createAnalysis.mutate({
      data: { asset: asset.toUpperCase() }
    }, {
      onSuccess: (data) => {
        setCurrentAnalysisId(data.id);
      },
      onError: (err: any) => {
        toast({ title: "Analysis failed", description: err.message, variant: "destructive" });
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Market Intelligence</h1>
        
        <form onSubmit={handleAnalyze} className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              value={asset} 
              onChange={e => setAsset(e.target.value)} 
              placeholder="Enter asset (e.g. BTC, ETH)" 
              className="pl-9"
            />
          </div>
          <Button type="submit" disabled={createAnalysis.isPending || !asset.trim()}>
            {createAnalysis.isPending ? "Analyzing..." : "Analyze"}
          </Button>
        </form>
      </div>

      {createAnalysis.isPending && (
        <div className="grid gap-6">
          <Skeleton className="h-48 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      )}

      {analysis && !createAnalysis.isPending && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-4xl font-bold">{analysis.asset}</h2>
                    <Badge variant="outline" className={`text-lg px-3 py-1 uppercase ${analysis.recommendation === 'buy' ? 'text-green-500 border-green-500' : analysis.recommendation === 'sell' ? 'text-red-500 border-red-500' : 'text-yellow-500 border-yellow-500'}`}>
                      {analysis.recommendation}
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground">{analysis.summary}</p>
                </div>
                
                <div className="flex gap-4 shrink-0">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">{analysis.bullishScore}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Bullish</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500">{analysis.bearishScore}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Bearish</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500">{analysis.confidenceScore}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Confidence</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Technical */}
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center gap-2 space-y-0">
                <Activity className="h-5 w-5 text-primary" />
                <CardTitle>Technical</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Trend</div>
                  <div className="font-semibold text-right capitalize">{analysis.technicalSignals.trend}</div>
                  <div className="text-muted-foreground">RSI</div>
                  <div className="font-semibold text-right">{analysis.technicalSignals.rsi}</div>
                  <div className="text-muted-foreground">MACD</div>
                  <div className="font-semibold text-right capitalize">{String(analysis.technicalSignals.macdSignal ?? "neutral")}</div>
                  <div className="text-muted-foreground">Bollinger</div>
                  <div className="font-semibold text-right text-xs">
                    {(analysis.technicalSignals as any).bollingerBands
                      ? `${((analysis.technicalSignals as any).bollingerBands as any).lower} – ${((analysis.technicalSignals as any).bollingerBands as any).upper}`
                      : "N/A"}
                  </div>
                  <div className="text-muted-foreground">Support</div>
                  <div className="font-semibold text-right">${analysis.technicalSignals.support?.toLocaleString()}</div>
                  <div className="text-muted-foreground">Resistance</div>
                  <div className="font-semibold text-right">${analysis.technicalSignals.resistance?.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>

            {/* Macro */}
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center gap-2 space-y-0">
                <Globe className="h-5 w-5 text-primary" />
                <CardTitle>Macro Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">Risk Mode</div>
                    <Badge variant="outline" className="capitalize">{analysis.macroSignals.riskMode}</Badge>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Fed Policy Outlook</div>
                    <div className="font-medium">{analysis.macroSignals.fedPolicy}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Macro Trend</div>
                    <div className="font-medium">{analysis.macroSignals.macroTrend}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sentiment */}
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center gap-2 space-y-0">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle>Sentiment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Fear/Greed</div>
                  <div className="font-semibold text-right">{analysis.sentimentSignals.fearGreedIndex}/100</div>
                  <div className="text-muted-foreground">Long/Short</div>
                  <div className="font-semibold text-right">{analysis.sentimentSignals.longShortRatio}</div>
                  <div className="text-muted-foreground">Funding Rate</div>
                  <div className="font-semibold text-right">{analysis.sentimentSignals.fundingRate}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm mb-1">Crowd Positioning</div>
                  <div className="text-sm font-medium">{analysis.sentimentSignals.crowdPositioning}</div>
                </div>
              </CardContent>
            </Card>

            {/* On-chain / Market Intel */}
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center gap-2 space-y-0">
                <TrendingDown className="h-5 w-5 text-primary" />
                <CardTitle>On-Chain & Institutional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Whale Activity</div>
                  <div className="font-medium">{String(analysis.onchainSignals.whaleActivity ?? "N/A")}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">ETF / Institutional</div>
                  <div className="font-medium">{String(analysis.onchainSignals.etfFlows ?? "N/A")}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">DeFi TVL</div>
                  <div className="font-medium">{String(analysis.onchainSignals.defiTvl ?? "N/A")}</div>
                </div>
              </CardContent>
            </Card>

            {/* News */}
            <Card className="md:col-span-2">
              <CardHeader className="pb-2 flex flex-row items-center gap-2 space-y-0">
                <Newspaper className="h-5 w-5 text-primary" />
                <CardTitle>Key Evidence & Events</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.evidence.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {!analysis && !createAnalysis.isPending && (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">Awaiting Target</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter an asset ticker above to deploy the intelligence engine. The system will aggregate macro, sentiment, technical, and on-chain data to synthesize a complete market view.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}