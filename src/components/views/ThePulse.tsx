import { useState, useEffect } from "react";
import { Activity, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, Zap, Globe, ShieldAlert, Lock } from "lucide-react";
import { TodoBlock } from "../ui/TodoBlock";

// Mock live data stream
const generateFeed = () => [
  { id: 1, type: "transaction", text: "Villa sold in Palm Jumeirah", value: "AED 45M", time: "Just now", trend: "up" },
  { id: 2, type: "intel", text: "AI Alert: Unusually high search volume for Dubai Hills", value: "+312%", time: "2m ago", trend: "up" },
  { id: 3, type: "launch", text: "Whisper Listing: Bulgari Residences Penthouse", value: "Off-Market", time: "15m ago", trend: "neutral" },
  { id: 4, type: "market", text: "Marina average yield adjustment", value: "7.2% → 7.4%", time: "1h ago", trend: "up" },
];

interface ThePulseProps {
  isPro: boolean;
}

export function ThePulse({ isPro }: ThePulseProps) {
  const [feed, setFeed] = useState(generateFeed());
  const [sentiment, setSentiment] = useState(84);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFeed(prev => {
        const newFeed = [...prev];
        // Randomly update the first item to simulate a live feed
        newFeed.unshift({
          id: Date.now(),
          type: "transaction",
          text: ["Apartment sold in Downtown", "Off-plan unit reserved in Creek Harbour", "Bulk buy in JVC"][Math.floor(Math.random() * 3)],
          value: `AED ${(Math.random() * 10 + 1).toFixed(1)}M`,
          time: "Just now",
          trend: "up"
        });
        return newFeed.slice(0, 6);
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white overflow-y-auto w-full font-sans">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-8 bg-black/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
              <h1 className="font-serif text-3xl font-bold tracking-tight">The Pulse</h1>
            </div>
            <p className="text-gray-400 text-sm">Real-time market heartbeat. The data advantage of the 1%.</p>
          </div>

          {/* AI Sentiment Score */}
          <div className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl p-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">AI Market Sentiment</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-emerald-400">{sentiment}</span>
                <span className="text-sm text-gray-500 mb-1">/ 100</span>
              </div>
            </div>
            <div className="h-12 w-px bg-white/10"></div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">24h Volume</p>
              <p className="text-xl font-bold text-white">AED 1.2B</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Live Feed (FOMO & Daily Habit) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Live Global Activity
            </h2>
            {!isPro && <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">Delayed 48h (Free Tier)</span>}
          </div>

          <TodoBlock 
            title="Real-time DLD WebSocket Integration"
            description="Currently using a mock interval. Needs connection to Dubai Land Department live transaction feed via WebSocket."
            action="Implement wss://api.dld.gov.ae/live-feed and parse incoming JSON streams."
          />
          
          <div className="space-y-3 relative">
            {!isPro && (
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a] pointer-events-none flex flex-col items-center justify-end pb-10">
                <div className="bg-black/80 backdrop-blur-md border border-[#d4af37]/30 p-6 rounded-2xl text-center max-w-sm pointer-events-auto">
                  <Lock className="w-8 h-8 text-[#d4af37] mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Unlock Live Feed</h3>
                  <p className="text-sm text-gray-400 mb-4">Free users see data delayed by 48 hours. Upgrade to Pro for real-time market advantage.</p>
                  <button className="w-full py-2 bg-[#d4af37] text-black font-bold rounded-xl hover:bg-[#c19b2e] transition-colors cursor-not-allowed opacity-80">
                    Upgrade to Pro ($199/mo)
                  </button>
                </div>
              </div>
            )}
            
            {feed.map((item, i) => (
              <div key={item.id} className={`bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center justify-between transition-colors ${!isPro && i > 1 ? 'opacity-30 blur-[2px]' : 'hover:bg-white/10 cursor-pointer'} animate-in fade-in slide-in-from-bottom-4`} style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.type === 'transaction' ? 'bg-emerald-500/20 text-emerald-400' :
                    item.type === 'intel' ? 'bg-indigo-500/20 text-indigo-400' :
                    'bg-[#d4af37]/20 text-[#d4af37]'
                  }`}>
                    {item.type === 'transaction' ? <TrendingUp className="w-5 h-5" /> :
                     item.type === 'intel' ? <Zap className="w-5 h-5" /> :
                     <ShieldAlert className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-200">{item.text}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> {!isPro ? "48h ago" : item.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Predictive Intel (Defensible Moat) */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full"></div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-300 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Predictive Intel
            </h2>
            
            {!isPro ? (
              <div className="relative z-10 flex flex-col items-center text-center py-6">
                <Lock className="w-8 h-8 text-indigo-400 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Pro Feature</h3>
                <p className="text-sm text-indigo-200/80 mb-4">Agentic AI scans millions of data points to predict market movements before they happen.</p>
                <button className="px-6 py-2 bg-indigo-500/20 border border-indigo-500/50 text-indigo-300 rounded-xl font-bold text-sm hover:bg-indigo-500/30 transition-colors cursor-not-allowed opacity-80">
                  Unlock Intel
                </button>
              </div>
            ) : (
              <div className="relative z-10">
                <p className="text-2xl font-serif font-bold text-white mb-2">JVC is about to pop.</p>
                <p className="text-sm text-indigo-200/80 mb-6 leading-relaxed">
                  Our AI detects a 42% surge in institutional wallet movements targeting Jumeirah Village Circle in the last 72 hours. Expected price correction: +8% in 30 days.
                </p>
                
                <TodoBlock 
                  title="Agentic AI Prediction Engine"
                  description="Currently hardcoded. Needs to run a daily cron job using Gemini Pro to analyze search volume, transaction velocity, and news sentiment."
                  action="Create backend cron job -> Call Gemini Pro -> Cache result in Redis -> Serve to Pro users."
                  isProGate={true}
                />
                
                <button className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm transition-colors shadow-[0_0_20px_rgba(99,102,241,0.4)] mt-4">
                  View AI-Matched Inventory
                </button>
              </div>
            )}
          </div>

          <div className="bg-white/5 border border-white/5 rounded-3xl p-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Global Capital Flow
            </h2>
            
            <TodoBlock 
              title="Capital Flow Data Source"
              description="Needs integration with banking APIs or blockchain analytics to track real cross-border capital movement into Dubai."
              action="Integrate Chainalysis API / SWIFT data proxy."
            />
            
            <div className="space-y-4 mt-6">
              {[
                { country: "United Kingdom", flow: "+12%", amount: "AED 450M" },
                { country: "Russia", flow: "+8%", amount: "AED 320M" },
                { country: "China", flow: "+24%", amount: "AED 890M" }
              ].map((c, i) => (
                <div key={i} className={`flex items-center justify-between ${!isPro ? 'opacity-50 blur-[1px]' : ''}`}>
                  <span className="text-sm text-gray-300">{c.country}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-white block">{c.amount}</span>
                    <span className="text-xs text-emerald-400 flex items-center justify-end gap-0.5"><ArrowUpRight className="w-3 h-3" /> {c.flow}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
