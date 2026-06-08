import React from "react";
import { Link, useLocation } from "wouter";
import { 
  Activity, 
  BarChart2, 
  Briefcase, 
  LineChart, 
  Target, 
  BrainCircuit, 
  GraduationCap, 
  PlayCircle, 
  MessageSquare, 
  AlertTriangle 
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: Activity },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/trades", label: "Trades", icon: LineChart },
  { href: "/journal", label: "Journal", icon: Target },
  { href: "/analysis", label: "Analysis", icon: BarChart2 },
  { href: "/opportunities", label: "Opportunities", icon: Target },
  { href: "/behavior", label: "Behavior", icon: BrainCircuit },
  { href: "/coaching", label: "Coaching", icon: GraduationCap },
  { href: "/replay", label: "Replay", icon: PlayCircle },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/risk", label: "Risk", icon: AlertTriangle },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col h-full shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <span className="font-mono text-xl font-bold tracking-tight text-primary">TradeMind<span className="text-muted-foreground opacity-50">.ai</span></span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-bold">
            U
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">User Quant</span>
            <span className="text-xs text-muted-foreground">Pro Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground selection:bg-primary/30">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="flex-1 overflow-y-auto z-10 relative">
          <div className="p-6 md:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
