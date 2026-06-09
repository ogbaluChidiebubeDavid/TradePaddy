import React, { useState } from "react";
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
  AlertTriangle,
  LogOut,
  Wifi,
  Menu,
  X,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function SidebarContent({ onNavClick }: { onNavClick: () => void }) {
  const [location] = useLocation();
  const { uid, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const syncMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${BASE}/api/bitget/sync`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json() as { error: string };
        throw new Error(err.error || "Sync failed");
      }
      return res.json() as Promise<{ totalImported: number; spotFills: number; futuresFills: number }>;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      toast({
        title: `Synced ${data.totalImported} trades from Bitget`,
        description: `${data.spotFills} spot fills + ${data.futuresFills} futures fills imported`,
      });
    },
    onError: (err) => {
      toast({ title: "Sync failed", description: err.message, variant: "destructive" });
    },
  });

  const handleDisconnect = async () => {
    await logout();
    toast({ title: "Disconnected from Bitget" });
  };

  const shortUid = uid ? uid.slice(0, 10) + "..." : "Connected";

  return (
    <>
      <div className="h-16 flex items-center px-6 border-b border-border shrink-0">
        <span className="font-mono text-xl font-bold tracking-tight text-primary">TradePaddy<span className="text-muted-foreground opacity-50">.ai</span></span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              onClick={onNavClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border shrink-0 space-y-2">
        <div className="flex items-center gap-2 px-1 py-1">
          <Wifi className="w-3.5 h-3.5 text-green-500 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-green-500">Bitget Connected</span>
            <span className="text-xs text-muted-foreground truncate font-mono">{shortUid}</span>
          </div>
        </div>
        <button
          onClick={() => syncMutation.mutate()}
          disabled={syncMutation.isPending}
          className="flex items-center gap-2 w-full px-3 py-1.5 rounded-sm text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", syncMutation.isPending && "animate-spin")} />
          {syncMutation.isPending ? "Syncing..." : "Sync Bitget data"}
        </button>
        <button
          onClick={handleDisconnect}
          className="flex items-center gap-2 w-full px-3 py-1.5 rounded-sm text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Disconnect account
        </button>
      </div>
    </>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground selection:bg-primary/30">

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 border-r border-border bg-card flex-col h-full shrink-0">
        <SidebarContent onNavClick={() => {}} />
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile sidebar (slide-in) */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 z-50 bg-card border-r border-border flex flex-col transition-transform duration-300 md:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={closeSidebar}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <SidebarContent onNavClick={closeSidebar} />
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative min-w-0">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 h-14 border-b border-border bg-card/80 backdrop-blur z-10 relative shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-mono text-lg font-bold text-primary">
            TradePaddy<span className="text-muted-foreground opacity-50">.ai</span>
          </span>
        </div>

        <div className="flex-1 overflow-y-auto z-10 relative">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
