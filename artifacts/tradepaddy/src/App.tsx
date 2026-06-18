import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Connect from "@/pages/connect";

import Dashboard from "@/pages/dashboard";
import Portfolio from "@/pages/portfolio";
import Trades from "@/pages/trades";
import Journal from "@/pages/journal";
import Analysis from "@/pages/analysis";
import Opportunities from "@/pages/opportunities";
import Behavior from "@/pages/behavior";
import Coaching from "@/pages/coaching";
import Replay from "@/pages/replay";
import Chat from "@/pages/chat";
import Risk from "@/pages/risk";
import SharePage from "@/pages/share";

const queryClient = new QueryClient();

function AuthGate() {
  const { connected, loading } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="font-mono text-3xl font-bold text-primary">TradePaddy<span className="text-muted-foreground opacity-50">.ai</span></div>
          <div className="text-muted-foreground text-sm animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (!connected) {
    return <Connect />;
  }

  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/trades" component={Trades} />
        <Route path="/journal" component={Journal} />
        <Route path="/analysis" component={Analysis} />
        <Route path="/opportunities" component={Opportunities} />
        <Route path="/behavior" component={Behavior} />
        <Route path="/coaching" component={Coaching} />
        <Route path="/replay" component={Replay} />
        <Route path="/chat" component={Chat} />
        <Route path="/risk" component={Risk} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Switch>
              <Route path="/share/trade/:id" component={SharePage} />
              <Route>
                <AuthGate />
              </Route>
            </Switch>
          </WouterRouter>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
