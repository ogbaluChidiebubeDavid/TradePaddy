import React, { useState } from "react";
import { 
  useListTrades, 
  useCreateTrade, 
  useUpdateTrade, 
  getListTradesQueryKey,
  useGetTradeStats
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
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function Trades() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: trades, isLoading: loadingTrades } = useListTrades();
  const { data: stats, isLoading: loadingStats } = useGetTradeStats();
  
  const createTrade = useCreateTrade();
  const updateTrade = useUpdateTrade();

  const [open, setOpen] = useState(false);
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
    takeProfit: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTrade.mutate({
      data: {
        ...formData,
        entryPrice: Number(formData.entryPrice),
        quantity: Number(formData.quantity),
        stopLoss: formData.stopLoss ? Number(formData.stopLoss) : null,
        takeProfit: formData.takeProfit ? Number(formData.takeProfit) : null,
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

  const closeTrade = (id: number) => {
    const exitPrice = prompt("Enter exit price:");
    if (!exitPrice) return;
    
    updateTrade.mutate({
      id,
      data: {
        status: "closed" as const,
        exitPrice: Number(exitPrice),
        exitReason: "Manual close"
      }
    }, {
      onSuccess: () => {
        toast({ title: "Trade closed successfully" });
        queryClient.invalidateQueries({ queryKey: getListTradesQueryKey() });
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Trade Execution</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Open New Trade</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Open New Trade</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Asset</Label>
                  <Input value={formData.asset} onChange={e => setFormData({...formData, asset: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Direction</Label>
                  <Select value={formData.direction} onValueChange={(v: any) => setFormData({...formData, direction: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="long">Long</SelectItem>
                      <SelectItem value="short">Short</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Entry Price</Label>
                  <Input type="number" step="any" value={formData.entryPrice} onChange={e => setFormData({...formData, entryPrice: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input type="number" step="any" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>Stop Loss (Optional)</Label>
                  <Input type="number" step="any" value={formData.stopLoss} onChange={e => setFormData({...formData, stopLoss: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Take Profit (Optional)</Label>
                  <Input type="number" step="any" value={formData.takeProfit} onChange={e => setFormData({...formData, takeProfit: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Entry Reason</Label>
                <Input value={formData.entryReason} onChange={e => setFormData({...formData, entryReason: e.target.value})} required />
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={createTrade.isPending}>
                  {createTrade.isPending ? "Executing..." : "Execute Trade"}
                </Button>
              </div>
            </form>
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
                  <TableHead className="text-right">Entry</TableHead>
                  <TableHead className="text-right">Exit</TableHead>
                  <TableHead className="text-right">PnL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades?.map(trade => (
                  <TableRow key={trade.id}>
                    <TableCell className="font-bold">{trade.asset}</TableCell>
                    <TableCell className="text-muted-foreground">{format(new Date(trade.createdAt), "MMM d, HH:mm")}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${trade.direction === 'long' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                        {trade.direction}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">${trade.entryPrice.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{trade.exitPrice ? `$${trade.exitPrice.toLocaleString()}` : '-'}</TableCell>
                    <TableCell className={`text-right font-medium ${trade.pnl && trade.pnl > 0 ? "text-green-500" : trade.pnl && trade.pnl < 0 ? "text-red-500" : ""}`}>
                      {trade.pnl ? `${trade.pnl > 0 ? "+" : ""}$${trade.pnl.toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${trade.status === 'open' ? 'bg-blue-500/20 text-blue-500' : 'bg-gray-500/20 text-gray-500'}`}>
                        {trade.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {trade.status === 'open' && (
                        <Button size="sm" variant="destructive" onClick={() => closeTrade(trade.id)} disabled={updateTrade.isPending}>
                          Close
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {trades?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      No trades found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}