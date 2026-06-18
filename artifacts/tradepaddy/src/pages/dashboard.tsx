import React from "react";
import { useGetDashboardSummary, useGetRecentActivity, useGetTopOpportunities } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function Dashboard() {
  const { data: summary, isLoading: loadingSummary } = useGetDashboardSummary({ query: { refetchInterval: 3000 } as any });
  const { data: activity, isLoading: loadingActivity } = useGetRecentActivity({ query: { refetchInterval: 3000 } as any });
  const { data: opportunities, isLoading: loadingOpps } = useGetTopOpportunities();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-bold tracking-tight">Mission Control</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold">${summary?.portfolioValue.toLocaleString()}</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total PnL</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className={`text-2xl font-bold ${summary?.totalPnl && summary.totalPnl > 0 ? "text-green-500" : "text-red-500"}`}>
                ${summary?.totalPnl.toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold">{summary?.winRate ?? 0}%</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSummary ? <Skeleton className="h-8 w-24" /> : (
              <div className="text-2xl font-bold">{summary?.riskScore}/100</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingActivity ? <Skeleton className="h-32 w-full" /> : (
              <div className="space-y-4">
                {activity?.slice(0, 5).map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm border-b border-border pb-2 last:border-0 last:pb-0">
                    <div>
                      <span className="font-medium">{item.description}</span>
                      <div className="text-xs text-muted-foreground">{format(new Date(item.timestamp), "MMM d, h:mm a")}</div>
                    </div>
                    {item.pnl && (
                      <span className={item.pnl > 0 ? "text-green-500" : "text-red-500"}>
                        {item.pnl > 0 ? "+" : "-"}${Math.abs(item.pnl).toLocaleString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingOpps ? <Skeleton className="h-32 w-full" /> : (
              <div className="space-y-4">
                {opportunities?.slice(0, 5).map((opp, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm border-b border-border pb-2 last:border-0 last:pb-0">
                    <div>
                      <span className="font-bold">{opp.tokenPair}</span>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">{opp.entryRationale}</div>
                    </div>
                    <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${opp.type === "Momentum" || opp.type === "News Catalyst" || opp.type === "Liquidity Shift" ? "bg-cyan-500/20 text-cyan-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {opp.type}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}