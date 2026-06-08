import React from "react";
import { useGetPortfolio, useGetPortfolioHistory } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

export default function Portfolio() {
  const { data: portfolio, isLoading: loadingPortfolio } = useGetPortfolio();
  const { data: history, isLoading: loadingHistory } = useGetPortfolioHistory({ days: 30 });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingPortfolio ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold">${portfolio?.totalValue.toLocaleString()}</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cash Balance</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingPortfolio ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold">${portfolio?.cashBalance.toLocaleString()}</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Invested Value</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingPortfolio ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold">${portfolio?.investedValue.toLocaleString()}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio History (30 Days)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {loadingHistory ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(val) => format(new Date(val), "MMM d")}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val.toLocaleString()}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  labelFormatter={(val) => format(new Date(val), "MMM d, yyyy")}
                  formatter={(val: number) => [`$${val.toLocaleString()}`, "Value"]}
                />
                <Area 
                  type="monotone" 
                  dataKey="totalValue" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Open Positions</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingPortfolio ? <Skeleton className="h-32 w-full" /> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Entry Price</TableHead>
                  <TableHead className="text-right">Current Price</TableHead>
                  <TableHead className="text-right">PnL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolio?.positions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No open positions.
                    </TableCell>
                  </TableRow>
                ) : (
                  portfolio?.positions.map(pos => (
                    <TableRow key={pos.id}>
                      <TableCell className="font-bold">{pos.asset}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${pos.direction === 'long' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                          {pos.direction}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{pos.quantity}</TableCell>
                      <TableCell className="text-right">${pos.entryPrice.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${pos.currentPrice.toLocaleString()}</TableCell>
                      <TableCell className={`text-right font-medium ${pos.pnl > 0 ? "text-green-500" : "text-red-500"}`}>
                        {pos.pnl > 0 ? "+" : ""}${pos.pnl.toLocaleString()} ({pos.pnlPercent.toFixed(2)}%)
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}