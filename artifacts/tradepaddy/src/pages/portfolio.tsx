import React, { useState } from "react";
import { useGetPortfolio, useGetPortfolioHistory, useUpdateTrade } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Wifi, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface LivePortfolio {
  spotAssets: { coin: string; available: number; frozen: number; usdtValue: number }[];
  spotTotal: number;
  futuresEquity: number;
  futuresUnrealized: number;
  totalValue: number;
  livePositions: {
    asset: string;
    symbol: string;
    direction: string;
    entryPrice: number;
    markPrice: number;
    quantity: number;
    unrealizedPnl: number;
    leverage: number;
    liquidationPrice: number;
    marginMode: string;
    tradeId?: number | null;
  }[];
}

function useLivePortfolio() {
  return useQuery<LivePortfolio>({
    queryKey: ["bitget-portfolio"],
    queryFn: async () => {
      const res = await fetch(`${BASE}/api/bitget/portfolio`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch live portfolio");
      return res.json() as Promise<LivePortfolio>;
    },
    refetchInterval: 3000,
  });
}

export default function Portfolio() {
  const { data: liveData, isLoading: loadingLive, refetch } = useLivePortfolio();
  const { data: history, isLoading: loadingHistory } = useGetPortfolioHistory({ days: 30 });
  const [activeTab, setActiveTab] = useState<"spot" | "futures">("spot");

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const updateTrade = useUpdateTrade();
  const [closingTrade, setClosingTrade] = useState<any | null>(null);

  const handleConfirmClose = () => {
    if (!closingTrade) return;
    updateTrade.mutate({
      id: closingTrade.tradeId,
      data: {
        status: "closed" as const,
        exitPrice: closingTrade.markPrice,
        exitReason: "Portfolio close"
      }
    }, {
      onSuccess: () => {
        toast({ title: "Trade closed successfully" });
        queryClient.invalidateQueries({ queryKey: ["bitget-portfolio"] });
        setClosingTrade(null);
      },
      onError: (err: any) => {
        toast({ title: "Error closing trade", description: err.message, variant: "destructive" });
      }
    });
  };

  const totalValue = liveData?.totalValue ?? 0;
  const spotTotal = liveData?.spotTotal ?? 0;
  const futuresEquity = liveData?.futuresEquity ?? 0;
  const unrealizedPnl = liveData?.futuresUnrealized ?? 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-green-500">
            <Wifi className="w-3.5 h-3.5" />
            Live Bitget Data
          </div>
          <button
            onClick={() => refetch()}
            className="p-1.5 rounded text-muted-foreground hover:text-primary hover:bg-muted"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingLive ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Spot Balance</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingLive ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold">${spotTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Futures Equity</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingLive ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold">${futuresEquity.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Unrealized PnL</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingLive ? <Skeleton className="h-8 w-24" /> : (
              <div className={`text-2xl font-bold ${unrealizedPnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                {unrealizedPnl >= 0 ? "+" : ""}${unrealizedPnl.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["spot", "futures"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded text-sm font-medium transition-colors uppercase tracking-wide ${activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "spot" && (
        <Card>
          <CardHeader>
            <CardTitle>Spot Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingLive ? <Skeleton className="h-48 w-full" /> : (
              liveData?.spotAssets && liveData.spotAssets.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead className="text-right">Available</TableHead>
                      <TableHead className="text-right">Frozen</TableHead>
                      <TableHead className="text-right">Value (USDT)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {liveData.spotAssets
                      .sort((a, b) => b.usdtValue - a.usdtValue)
                      .map(asset => (
                        <TableRow key={asset.coin}>
                          <TableCell className="font-bold">{asset.coin}</TableCell>
                          <TableCell className="text-right font-mono text-sm">{asset.available.toLocaleString(undefined, { maximumFractionDigits: 8 })}</TableCell>
                          <TableCell className="text-right font-mono text-sm text-muted-foreground">{asset.frozen.toLocaleString(undefined, { maximumFractionDigits: 8 })}</TableCell>
                          <TableCell className="text-right font-medium">${asset.usdtValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center text-muted-foreground py-10">No spot assets found in your Bitget account.</div>
              )
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "futures" && (
        <Card>
          <CardHeader>
            <CardTitle>Open Futures Positions</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingLive ? <Skeleton className="h-48 w-full" /> : (
              liveData?.livePositions && liveData.livePositions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Side</TableHead>
                      <TableHead className="text-right">Entry</TableHead>
                      <TableHead className="text-right">Mark</TableHead>
                      <TableHead className="text-right">Size</TableHead>
                      <TableHead className="text-right">PnL</TableHead>
                      <TableHead className="text-right">Liq.</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {liveData.livePositions.map((pos, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="font-bold">{pos.asset}</div>
                          <div className="text-xs text-muted-foreground">{pos.leverage}x {pos.marginMode}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={pos.direction === "long" ? "text-green-500 border-green-500/30" : "text-red-500 border-red-500/30"}>
                            {pos.direction === "long" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                            {pos.direction.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm">${pos.entryPrice.toLocaleString(undefined, { maximumFractionDigits: 4 })}</TableCell>
                        <TableCell className="text-right font-mono text-sm">${pos.markPrice.toLocaleString(undefined, { maximumFractionDigits: 4 })}</TableCell>
                        <TableCell className="text-right font-mono text-sm">{pos.quantity}</TableCell>
                        <TableCell className={`text-right font-medium ${pos.unrealizedPnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {pos.unrealizedPnl >= 0 ? "+" : ""}${pos.unrealizedPnl.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-mono text-xs text-orange-500">${pos.liquidationPrice.toLocaleString(undefined, { maximumFractionDigits: 4 })}</TableCell>
                        <TableCell className="text-right col-actions">
                          {pos.tradeId ? (
                            <Button size="sm" variant="destructive" className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-mono text-xs" onClick={() => setClosingTrade(pos)} disabled={updateTrade.isPending}>
                              Close
                            </Button>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">No Trade ID</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center text-muted-foreground py-10">No open futures positions.</div>
              )
            )}
          </CardContent>
        </Card>
      )}

      {/* Portfolio History Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio History (30 Days)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {loadingHistory ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history ?? []}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={v => format(new Date(v as string), "MMM d")}
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 11 }}
                  tickFormatter={v => `$${(v as number).toLocaleString()}`}
                />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "6px" }}
                  formatter={(v: number) => [`$${v.toLocaleString()}`, "Value"]}
                  labelFormatter={v => format(new Date(v as string), "MMM d, yyyy")}
                />
                <Area
                  type="monotone"
                  dataKey="totalValue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Confirm Position Close Dialog Modal */}
      <Dialog open={!!closingTrade} onOpenChange={(open) => !open && setClosingTrade(null)}>
        <DialogContent className="sm:max-w-[420px] bg-slate-950 border-slate-800 text-slate-100 p-6 font-mono">
          <DialogHeader>
            <DialogTitle className="text-cyan-400 text-lg uppercase tracking-wider">Confirm Position Close</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              Are you sure you want to close your <span className="text-cyan-400 font-bold">{closingTrade?.asset}</span> {closingTrade?.direction === "long" ? "Long" : "Short"} position of <span className="text-cyan-400 font-bold">{closingTrade?.quantity}</span> units at the current market price?
            </p>
            
            {closingTrade?.markPrice && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3 flex justify-between items-center text-xs">
                <span className="text-slate-500">Estimated Exit Price</span>
                <span className="text-cyan-400 font-bold font-mono">${closingTrade.markPrice.toLocaleString()}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button onClick={() => setClosingTrade(null)} className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-bold uppercase tracking-wider">
                Cancel
              </Button>
              <Button onClick={handleConfirmClose} disabled={updateTrade.isPending} className="bg-red-600 hover:bg-red-500 text-slate-950 font-bold uppercase tracking-wider text-xs">
                {updateTrade.isPending ? "Closing..." : "Close Position"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
