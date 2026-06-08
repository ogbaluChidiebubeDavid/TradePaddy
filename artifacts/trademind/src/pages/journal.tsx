import React from "react";
import { useListJournalEntries } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function Journal() {
  const { data: entries, isLoading } = useListJournalEntries();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Trade Journal</h1>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          <>
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </>
        ) : entries?.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No journal entries yet. Close a trade to automatically generate a journal entry.
            </CardContent>
          </Card>
        ) : (
          entries?.map(entry => (
            <Card key={entry.id} className="overflow-hidden border-l-4" style={{ borderLeftColor: entry.result === 'win' ? 'hsl(var(--chart-3))' : entry.result === 'loss' ? 'hsl(var(--chart-5))' : 'hsl(var(--muted))' }}>
              <CardHeader className="bg-muted/30 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-3">
                      {entry.asset}
                      <Badge variant="outline" className={entry.direction === 'long' ? 'text-green-500 border-green-500/50' : 'text-red-500 border-red-500/50'}>
                        {entry.direction.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={entry.result === 'win' ? 'bg-green-500/10 text-green-500' : entry.result === 'loss' ? 'bg-red-500/10 text-red-500' : 'bg-gray-500/10'}>
                        {entry.result.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <div className="text-sm text-muted-foreground mt-1">
                      {format(new Date(entry.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                    </div>
                  </div>
                  <div className={`text-xl font-bold ${entry.pnl > 0 ? 'text-green-500' : entry.pnl < 0 ? 'text-red-500' : ''}`}>
                    {entry.pnl > 0 ? '+' : ''}${entry.pnl.toLocaleString()} ({entry.pnlPercent.toFixed(2)}%)
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Entry Reason</h4>
                    <p className="text-sm">{entry.entryReason}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Market Conditions</h4>
                    <p className="text-sm">{entry.marketConditions}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">AI Recommendation</h4>
                    <p className="text-sm capitalize">
                      {entry.aiRecommendation}
                      <span className="text-muted-foreground ml-2">(User {entry.userAction})</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Lessons Learned</h4>
                    <p className="text-sm">{entry.lessonsLearned || "No lessons recorded yet."}</p>
                  </div>
                  {entry.behaviorFlags && entry.behaviorFlags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Behavior Flags</h4>
                      <div className="flex flex-wrap gap-2">
                        {entry.behaviorFlags.map((flag, i) => (
                          <Badge key={i} variant="secondary" className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
                            {flag.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}