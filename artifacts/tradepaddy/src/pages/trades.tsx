import React, { useState, useEffect } from "react";
import { 
  useListTrades, 
  useCreateTrade, 
  useUpdateTrade, 
  getListTradesQueryKey,
  useGetTradeStats,
  useGetMarketCandles,
  useGetMarketPrices
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Share2, Twitter, Copy, Check } from "lucide-react";

export default function Trades() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: trades, isLoading: loadingTrades } = useListTrades();
  const { data: stats, isLoading: loadingStats } = useGetTradeStats();
  
  const createTrade = useCreateTrade();
  const updateTrade = useUpdateTrade();
  const [open, setOpen] = useState(false);
  const [shareTrade, setShareTrade] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    asset: "BTC",
    direction: "long" as "long" | "short",
    entryPrice: "",
    quantity: "",
    entryReason: "Technical setup",
    marketConditions: "Bullish",
    aiRecommendation: "buy" as "buy" | "sell" | "wait" | "hold",
    userAction: "followed" as "followed" | "ignored" | "partial",
    stopLoss: "",
    takeProfit: "",
    isReal: false,
    orderType: "market" as "market" | "limit"
  });

  // Poll current prices every 3 seconds
  const { data: prices } = useGetMarketPrices({
    query: {
      refetchInterval: 3000,
      keepPreviousData: true
    } as any
  });

  const { data: candles, isLoading: loadingCandles } = useGetMarketCandles({
    asset: formData.asset,
    granularity: "5m",
    limit: 50
  }, {
    query: {
      enabled: open && !!formData.asset,
      refetchInterval: 15000
    } as any
  });

  // Sync market prices to entryPrice when in market mode
  useEffect(() => {
    if (formData.orderType === "market" && prices && prices[formData.asset]) {
      setFormData(prev => ({
        ...prev,
        entryPrice: String(prices[formData.asset])
      }));
    }
  }, [prices, formData.asset, formData.orderType]);

  useEffect(() => {
    if (candles && candles.length > 0 && formData.orderType === "limit" && !formData.entryPrice) {
      const lastPrice = candles[candles.length - 1].close;
      setFormData(prev => ({
        ...prev,
        entryPrice: String(lastPrice)
      }));
    }
  }, [candles, formData.orderType]);

  const handleAssetChange = (v: string) => {
    setFormData(prev => ({
      ...prev,
      asset: v,
      entryPrice: ""
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTrade.mutate({
      data: {
        ...formData,
        entryPrice: Number(formData.entryPrice),
        quantity: Number(formData.quantity),
        stopLoss: formData.stopLoss ? Number(formData.stopLoss) : null,
        takeProfit: formData.takeProfit ? Number(formData.takeProfit) : null,
        isReal: formData.isReal,
        orderType: formData.orderType
      }
    }, {
      onSuccess: () => {
        toast({ title: "Trade opened successfully" });
        queryClient.invalidateQueries({ queryKey: getListTradesQueryKey() });
        setOpen(false);
      },
      onError: (err: any) => {
        toast({ title: "Error opening trade", description: err.message, variant: "destructive" });
      }
    });
  };

  const [closingTrade, setClosingTrade] = useState<any | null>(null);

  const closePosition = (trade: any) => {
    setClosingTrade(trade);
  };

  const handleConfirmClose = () => {
    if (!closingTrade) return;
    const currentPrice = prices ? prices[closingTrade.asset] : null;
    
    updateTrade.mutate({
      id: closingTrade.id,
      data: {
        status: "closed" as const,
        exitPrice: currentPrice ? Number(currentPrice) : undefined,
        exitReason: "Market close"
      }
    }, {
      onSuccess: () => {
        toast({ title: "Trade closed successfully" });
        queryClient.invalidateQueries({ queryKey: getListTradesQueryKey() });
        setClosingTrade(null);
      },
      onError: (err: any) => {
        toast({ title: "Error closing trade", description: err.message, variant: "destructive" });
      }
    });
  };

  const getLiveTradePnl = (trade: any) => {
    if (trade.status === "closed") {
      return {
        pnl: trade.pnl,
        pnlPercent: trade.pnlPercent
      };
    }
    
    const currentPrice = prices ? prices[trade.asset] : null;
    if (!currentPrice) return { pnl: null, pnlPercent: null };
    
    const entry = parseFloat(trade.entryPrice);
    const qty = parseFloat(trade.quantity);
    let pnl = 0;
    if (trade.direction === "long") {
      pnl = (currentPrice - entry) * qty;
    } else {
      pnl = (entry - currentPrice) * qty;
    }
    const pnlPercent = ((currentPrice - entry) / entry) * 100 * (trade.direction === "long" ? 1 : -1);
    return { pnl, pnlPercent };
  };
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Trade Execution</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold uppercase tracking-wider">Open New Trade</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[850px] bg-slate-950 border-slate-800 text-slate-100">
            <DialogHeader>
              <DialogTitle className="font-mono text-cyan-400 text-lg uppercase tracking-wider">Execute Futures Trade</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
              {/* Left Column: Real-Time Candle Chart */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground uppercase">Live Market Feed</span>
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  {candles && candles.length > 0 && (
                    <div className="font-mono text-sm text-cyan-400 font-bold">
                      Last Price: ${candles[candles.length - 1].close.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="h-[280px] bg-slate-900/60 border border-slate-800 rounded-lg p-2 flex items-center justify-center">
                  {loadingCandles ? (
                    <Skeleton className="h-full w-full bg-slate-800/40" />
                  ) : candles && candles.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={candles} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis
                          dataKey="time"
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
                          labelFormatter={(t) => format(new Date(t), "MMM d, HH:mm")}
                          formatter={(v: any) => [`$${parseFloat(v).toLocaleString()}`, "Price"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="close"
                          stroke="#06b6d4"
                          strokeWidth={1.5}
                          fillOpacity={1}
                          fill="url(#chartGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <span className="text-muted-foreground font-mono text-xs">No chart data</span>
                  )}
                </div>
              </div>

              {/* Right Column: Order Form */}
              <form onSubmit={handleSubmit} className="md:col-span-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="font-mono text-xs uppercase text-slate-400">Asset</Label>
                    <Select value={formData.asset} onValueChange={handleAssetChange}>
                      <SelectTrigger className="bg-slate-900 border-slate-800 text-slate-100 font-mono">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-950 border-slate-800 text-slate-100">
                        <SelectItem value="BTC" className="font-mono">BTC/USDT</SelectItem>
                        <SelectItem value="ETH" className="font-mono">ETH/USDT</SelectItem>
                        <SelectItem value="SOL" className="font-mono">SOL/USDT</SelectItem>
                        <SelectItem value="XRP" className="font-mono">XRP/USDT</SelectItem>
                        <SelectItem value="ADA" className="font-mono">ADA/USDT</SelectItem>
                        <SelectItem value="DOGE" className="font-mono">DOGE/USDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-xs uppercase text-slate-400">Order Type</Label>
                    <Select value={formData.orderType} onValueChange={(v: any) => setFormData({...formData, orderType: v})}>
                      <SelectTrigger className="bg-slate-900 border-slate-800 text-slate-100 font-mono">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-950 border-slate-800 text-slate-100">
                        <SelectItem value="market" className="font-mono">Market</SelectItem>
                        <SelectItem value="limit" className="font-mono">Limit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="font-mono text-xs uppercase text-slate-400">Direction</Label>
                    <Select value={formData.direction} onValueChange={(v: any) => setFormData({...formData, direction: v})}>
                      <SelectTrigger className="bg-slate-900 border-slate-800 text-slate-100 font-mono">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-950 border-slate-800 text-slate-100">
                        <SelectItem value="long" className="font-mono text-green-400">Long</SelectItem>
                        <SelectItem value="short" className="font-mono text-red-400">Short</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-xs uppercase text-slate-400">Quantity</Label>
                    <Input type="number" step="any" placeholder="0.0" className="bg-slate-900 border-slate-800 font-mono" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="font-mono text-xs uppercase text-slate-400">
                      Entry Price {formData.orderType === "market" && <span className="text-[9px] text-cyan-400 animate-pulse font-normal">(Live)</span>}
                    </Label>
                    <Input 
                      type="number" 
                      step="any" 
                      className={`bg-slate-900 border-slate-800 font-mono ${formData.orderType === "market" ? "text-cyan-400 border-cyan-950 focus-visible:ring-0 opacity-80" : ""}`} 
                      value={formData.entryPrice} 
                      onChange={e => setFormData({...formData, entryPrice: e.target.value})} 
                      disabled={formData.orderType === "market"}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-xs uppercase text-slate-400">SL (Optional)</Label>
                    <Input type="number" step="any" className="bg-slate-900 border-slate-800 font-mono" value={formData.stopLoss} onChange={e => setFormData({...formData, stopLoss: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-950">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isReal"
                      checked={formData.isReal}
                      onCheckedChange={(checked) => setFormData({ ...formData, isReal: checked })}
                    />
                    <Label htmlFor="isReal" className="font-mono text-xs uppercase tracking-wider text-cyan-400 cursor-pointer">
                      Live Trade (Bitget API)
                    </Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="font-mono text-xs uppercase text-slate-400">Reason for Entry</Label>
                    <Input value={formData.entryReason} onChange={e => setFormData({...formData, entryReason: e.target.value})} className="bg-slate-900 border-slate-800 font-mono text-xs" required />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" disabled={createTrade.isPending} className="w-full bg-cyan-600 hover:bg-cyan-500 font-mono text-slate-950 font-bold uppercase tracking-wider">
                    {createTrade.isPending ? "Executing..." : formData.isReal ? "Place Real Order" : "Place Paper Order"}
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Trades</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingStats ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{stats?.totalTrades}</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingStats ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">{stats?.winRate ?? 0}%</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg PnL</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingStats ? <Skeleton className="h-8 w-16" /> : <div className="text-2xl font-bold">${stats?.avgPnl.toLocaleString()}</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total PnL</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingStats ? <Skeleton className="h-8 w-16" /> : <div className={`text-2xl font-bold ${stats?.totalPnl && stats.totalPnl > 0 ? "text-green-500" : "text-red-500"}`}>${stats?.totalPnl.toLocaleString()}</div>}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingTrades ? <Skeleton className="h-64 w-full" /> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Entry</TableHead>
                  <TableHead className="text-right">Exit</TableHead>
                  <TableHead className="text-right">PnL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades?.map(trade => {
                  const { pnl, pnlPercent } = getLiveTradePnl(trade);
                  const isLive = trade.status === "open" && prices && prices[trade.asset];
                  const currentPrice = prices ? prices[trade.asset] : null;

                  return (
                    <TableRow key={trade.id}>
                      <TableCell className="font-bold">{trade.asset}</TableCell>
                      <TableCell className="text-muted-foreground">{format(new Date(trade.createdAt), "MMM d, HH:mm")}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${trade.direction === 'long' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                          {trade.direction}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={trade.isReal ? "default" : "secondary"} className={trade.isReal ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30 font-mono text-xs uppercase" : "bg-slate-800 text-slate-400 font-mono text-xs uppercase"}>
                          {trade.isReal ? "Live" : "Paper"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">${trade.entryPrice.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono">
                        {trade.status === 'open' ? (
                          currentPrice ? (
                            <span className="text-cyan-400 font-semibold animate-pulse">
                              ${currentPrice.toLocaleString()}
                            </span>
                          ) : (
                            "-"
                          )
                        ) : (
                          trade.exitPrice ? `$${trade.exitPrice.toLocaleString()}` : '-'
                        )}
                      </TableCell>
                      <TableCell className={`text-right font-medium font-mono ${
                        pnl && pnl > 0 ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" : 
                        pnl && pnl < 0 ? "text-rose-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]" : "text-slate-400"
                      }`}>
                        {pnl != null ? (
                          <div className="flex flex-col items-end">
                            <span className="flex items-center gap-1.5 font-semibold">
                              {pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}
                              {isLive && (
                                <span className={`h-1.5 w-1.5 rounded-full ${pnl >= 0 ? "bg-emerald-400 animate-ping" : "bg-rose-500 animate-ping"}`} />
                              )}
                            </span>
                            <span className="text-xs opacity-80">
                              {pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%
                            </span>
                          </div>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${trade.status === 'open' ? 'bg-blue-500/20 text-blue-500' : 'bg-gray-500/20 text-gray-500'}`}>
                          {trade.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {trade.status === 'open' ? (
                            <Button size="sm" variant="destructive" className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-mono text-xs" onClick={() => closePosition(trade)} disabled={updateTrade.isPending}>
                              Close
                            </Button>
                          ) : (
                            <Button size="sm" className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 font-mono text-xs flex items-center gap-1" onClick={() => setShareTrade(trade)}>
                              <Share2 className="h-3.5 w-3.5" />
                              Share
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {trades?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                      No trades found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Share PnL Dialog Modal */}
      <Dialog open={!!shareTrade} onOpenChange={(open) => !open && setShareTrade(null)}>
        <DialogContent className="sm:max-w-[460px] bg-slate-950 border-slate-800 text-slate-100 p-6">
          <DialogHeader>
            <DialogTitle className="font-mono text-cyan-400 text-lg uppercase tracking-wider">Share Performance Card</DialogTitle>
          </DialogHeader>
          {shareTrade && (() => {
            const isWin = shareTrade.pnl ? shareTrade.pnl > 0 : false;
            const shareUrl = `${window.location.origin}/share/trade/${shareTrade.id}`;
            const tweetText = `Just closed a trade on TradePaddy.ai!\n\nAsset: $${shareTrade.asset}/USDT (${shareTrade.direction.toUpperCase()})\nPnL: ${shareTrade.pnlPercent >= 0 ? "+" : ""}${shareTrade.pnlPercent.toFixed(2)}% (${shareTrade.pnl >= 0 ? "+" : ""}$${shareTrade.pnl.toFixed(2)})\n\nCheck out my AI trade replay critique here: ${shareUrl}`;
            
            const handleCopy = () => {
              navigator.clipboard.writeText(shareUrl);
              setCopied(true);
              toast({ title: "Link copied to clipboard!" });
              setTimeout(() => setCopied(false), 2000);
            };

            const handleTweet = () => {
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, "_blank");
            };

            return (
              <div className="space-y-6 pt-4">
                {/* Card Preview */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl">
                  {/* Glowing orb matching PnL */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-20 ${
                    isWin ? "bg-emerald-500" : "bg-rose-500"
                  }`} />
                  
                  <div className="relative flex flex-col justify-between h-full space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="bg-gradient-to-tr from-cyan-600 to-purple-600 p-1.5 rounded text-[10px] text-slate-950 font-black tracking-tighter">
                          TP
                        </div>
                        <span className="text-xs font-bold text-slate-300">TradePaddy.ai</span>
                      </div>
                      <Badge variant={shareTrade.isReal ? "default" : "secondary"} className={
                        shareTrade.isReal ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-mono text-[10px] uppercase" : "bg-slate-800 text-slate-400 font-mono text-[10px] uppercase"
                      }>
                        {shareTrade.isReal ? "Bitget Live" : "Paper Trade"}
                      </Badge>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-slate-200">
                          {shareTrade.asset}/USDT
                        </span>
                        <Badge className={`text-[9px] font-bold font-mono px-1 py-0.5 border ${
                          shareTrade.direction === "long" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border-rose-500/30"
                        }`}>
                          {shareTrade.direction.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-[9px] text-slate-500 mt-1">Closed at {format(new Date(shareTrade.closedAt || shareTrade.createdAt), "yyyy-MM-dd HH:mm")}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Return on Investment</span>
                      <span className={`text-4xl font-black block tracking-tight ${
                        isWin ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]" : "text-rose-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                      }`}>
                        {shareTrade.pnlPercent >= 0 ? "+" : ""}{shareTrade.pnlPercent.toFixed(2)}%
                      </span>
                      <span className={`text-sm font-semibold block ${isWin ? "text-emerald-500/80" : "text-rose-500/80"}`}>
                        {shareTrade.pnl >= 0 ? "+" : ""}${shareTrade.pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-2 border-t border-slate-900 text-[10px]">
                      <div>
                        <span className="text-slate-500 block">Entry Price</span>
                        <span className="font-bold text-slate-300">${shareTrade.entryPrice.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Exit Price</span>
                        <span className="font-bold text-slate-300">${shareTrade.exitPrice ? shareTrade.exitPrice.toLocaleString() : "-"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={handleCopy} className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-mono text-xs flex items-center justify-center gap-1.5">
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied!" : "Copy Replay Link"}
                  </Button>
                  <Button onClick={handleTweet} className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold uppercase tracking-wider font-mono text-xs flex items-center justify-center gap-1.5">
                    <Twitter className="h-3.5 w-3.5 fill-current" />
                    Post on X
                  </Button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

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
            
            {prices && prices[closingTrade?.asset] && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3 flex justify-between items-center text-xs">
                <span className="text-slate-500">Estimated Exit Price</span>
                <span className="text-cyan-400 font-bold font-mono">${prices[closingTrade.asset].toLocaleString()}</span>
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