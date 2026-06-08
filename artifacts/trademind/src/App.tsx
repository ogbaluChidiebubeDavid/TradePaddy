import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AppLayout } from "@/components/layout/AppLayout";

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

const queryClient = new QueryClient();

function Router() {
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
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;