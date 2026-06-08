import { useState } from "react";
import { useLocation } from "wouter";
import { connectBitget } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield, Zap, BarChart2, Brain, ExternalLink, Eye, EyeOff } from "lucide-react";

export default function Connect() {
  const [, setLocation] = useLocation();
  const { refresh } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ apiKey: "", secretKey: "", passphrase: "" });

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await connectBitget(form);
      await refresh();
      toast({ title: "Connected to Bitget!", description: "Your trading account is now linked." });
      setLocation("/");
    } catch (err) {
      toast({
        title: "Connection failed",
        description: err instanceof Error ? err.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="font-mono text-4xl font-bold tracking-tight text-primary mb-1">
            TradePaddy<span className="text-muted-foreground opacity-50">.ai</span>
          </div>
          <p className="text-muted-foreground text-sm mt-2">AI-Powered Trading Operating System</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 shadow-2xl">
          <h2 className="text-xl font-bold mb-1">Connect Your Bitget Account</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Link your Bitget API key to enable live trading, portfolio sync, and AI analysis on your real account.
          </p>

          <form onSubmit={handleConnect} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                placeholder="bg_xxxxxxxxxxxxxxxxxxxxx"
                value={form.apiKey}
                onChange={e => setForm({ ...form, apiKey: e.target.value })}
                required
                autoComplete="off"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="secretKey">Secret Key</Label>
              <div className="relative">
                <Input
                  id="secretKey"
                  type={showSecret ? "text" : "password"}
                  placeholder="Your secret key"
                  value={form.secretKey}
                  onChange={e => setForm({ ...form, secretKey: e.target.value })}
                  required
                  autoComplete="off"
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowSecret(!showSecret)}
                >
                  {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="passphrase">Passphrase</Label>
              <div className="relative">
                <Input
                  id="passphrase"
                  type={showPass ? "text" : "password"}
                  placeholder="Your API passphrase"
                  value={form.passphrase}
                  onChange={e => setForm({ ...form, passphrase: e.target.value })}
                  required
                  autoComplete="off"
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Connecting..." : "Connect Account"}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-border">
            <a
              href="https://www.bitget.com/account/newapi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              Create a Bitget API key (Bitget → Settings → API Management)
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          {[
            { icon: Shield, label: "Read-only safe", desc: "Your funds stay on Bitget" },
            { icon: Zap, label: "Live data", desc: "Real-time portfolio sync" },
            { icon: Brain, label: "AI analysis", desc: "Powered by Qwen 235B" },
            { icon: BarChart2, label: "Full OS", desc: "Journal, coaching, replay" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-card/50 border border-border rounded-md p-3 flex gap-2.5 items-start">
              <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <div className="text-xs font-medium">{label}</div>
                <div className="text-xs text-muted-foreground">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Your API credentials are encrypted in your session and never stored permanently.
        </p>
      </div>
    </div>
  );
}
