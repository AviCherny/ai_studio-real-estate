import { Building2, Sparkles, TrendingUp, ShieldCheck, ArrowRight, Globe, Activity, Eye, CheckCircle2, Lock } from "lucide-react";

interface LandingPageProps {
  onEnterApp: () => void;
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#d4af37] selection:text-black font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 md:px-12 border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#d4af37] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <Building2 className="w-6 h-6 text-black" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight">MyDubai.io</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#vision" className="hover:text-white transition-colors">The Vision</a>
          <a href="#ecosystem" className="hover:text-white transition-colors">The Ecosystem</a>
          <a href="#moat" className="hover:text-white transition-colors">Our Moat</a>
        </div>
        <button 
          onClick={onEnterApp}
          className="px-6 py-2.5 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
        >
          Enter the OS
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#d4af37]/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            The Operating System for Global Real Estate
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tighter leading-[1.1] mb-8">
            Don't just buy property.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-200">Engineer your wealth.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mb-12 leading-relaxed">
            We are replacing the fragmented, opaque real estate market with a unified, AI-driven ecosystem. From predictive market intelligence to fractional syndicates, this is the definitive platform for the top 1% of global investors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={onEnterApp}
              className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              Access the Platform <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-md">
              Read the Manifesto
            </button>
          </div>
        </div>
      </main>

      {/* The "Why This is Huge" Section (Investor Pitch) */}
      <section id="moat" className="py-24 bg-black border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">The Defensible Advantage</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Why MyDubai.io is a category-defining product, not just another search portal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Moat 1 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group">
              <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">The Daily Habit Loop</h3>
              <p className="text-gray-400 leading-relaxed">
                Real estate is a low-frequency transaction. We solved this. <strong>"The Pulse"</strong> provides a live, addictive feed of global capital flows, VIP launches, and predictive AI intel, turning a yearly purchase into a daily habit.
              </p>
            </div>

            {/* Moat 2 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group">
              <div className="w-14 h-14 bg-[#d4af37]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-7 h-7 text-[#d4af37]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Psychographic Data Graph</h3>
              <p className="text-gray-400 leading-relaxed">
                Our <strong>Vision Board</strong> and AI Concierge don't just track what users click; they decode their architectural DNA and lifestyle. This proprietary data moat allows us to predict market demand before developers even break ground.
              </p>
            </div>

            {/* Moat 3 */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">The Ecosystem Flywheel</h3>
              <p className="text-gray-400 leading-relaxed">
                Investors bring capital. Developers bring inventory to access that capital. Service providers pay to access the investors. <strong>Multiplayer Syndicates</strong> create viral growth. Every new user increases the value for everyone else.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Monetization / Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-[#0a0a0a] border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">The Cost of Intelligence</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">One good investment decision pays for a lifetime of access.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tier 1 */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">The Voyeur (Free)</h3>
              <p className="text-gray-400 text-sm mb-6">For casual browsers.</p>
              <div className="mb-6"><span className="text-4xl font-bold text-white">Free</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-gray-400"><CheckCircle2 className="w-4 h-4 text-gray-500" /> Delayed market data (48h)</li>
                <li className="flex items-center gap-3 text-sm text-gray-400"><CheckCircle2 className="w-4 h-4 text-gray-500" /> 5 AI Concierge queries / month</li>
                <li className="flex items-center gap-3 text-sm text-gray-400"><CheckCircle2 className="w-4 h-4 text-gray-500" /> Basic Vision Board access</li>
                <li className="flex items-center gap-3 text-sm text-gray-600 line-through"><Lock className="w-4 h-4 text-gray-600" /> Live DLD Transactions</li>
              </ul>
              <button onClick={onEnterApp} className="w-full py-3 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition-colors">Start Exploring</button>
            </div>
            
            {/* Tier 2 */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-gray-900 to-black border border-[#d4af37]/50 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#d4af37] text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">The Sweet Spot</div>
              <h3 className="text-xl font-bold text-white mb-2">Pro Investor</h3>
              <p className="text-gray-400 text-sm mb-6">For active buyers ready to deploy capital.</p>
              <div className="mb-6"><span className="text-4xl font-bold text-white">$199</span><span className="text-gray-500">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-gray-200"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Live, real-time DLD Data</li>
                <li className="flex items-center gap-3 text-sm text-gray-200"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Unlimited Agentic AI (Gemini Pro)</li>
                <li className="flex items-center gap-3 text-sm text-gray-200"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> "The Daily Drop" early access</li>
                <li className="flex items-center gap-3 text-sm text-gray-200"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> AI Contract Analyzer</li>
              </ul>
              <button onClick={onEnterApp} className="w-full py-3 rounded-xl bg-[#d4af37] text-black font-bold hover:bg-[#c19b2e] transition-colors shadow-lg shadow-[#d4af37]/20">Start 7-Day Trial</button>
            </div>
            
            {/* Tier 3 */}
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col hover:bg-white/10 transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Ultimate (Whale)</h3>
              <p className="text-gray-400 text-sm mb-6">For funds, agencies, and UHNWIs.</p>
              <div className="mb-6"><span className="text-4xl font-bold text-white">$999</span><span className="text-gray-500">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Everything in Pro</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> API Access to Market Data</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Guaranteed Syndicate Allocation</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dedicated Human Concierge</li>
              </ul>
              <button onClick={onEnterApp} className="w-full py-3 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition-colors">Apply for Ultimate</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none"></div>
        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 relative z-10">Ready to build the future?</h2>
        <button 
          onClick={onEnterApp}
          className="px-10 py-5 bg-[#d4af37] text-black rounded-full font-bold text-xl hover:bg-[#c4a030] transition-all hover:scale-105 shadow-[0_0_40px_rgba(212,175,55,0.4)] relative z-10"
        >
          Initialize Platform
        </button>
      </footer>
    </div>
  );
}
