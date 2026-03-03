import { ArrowRight, Brain, TrendingUp, Shield, Building2, CheckCircle2, Sparkles, Zap, LineChart, Lock } from "lucide-react";

interface LandingPageProps {
  onEnterApp: () => void;
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-gray-900 selection:bg-[#d4af37]/20">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-black/5 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#d4af37] rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight">MyDubai.io</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#why-us" className="hover:text-gray-900 transition-colors">The Advantage</a>
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onEnterApp} className="hidden md:block text-sm font-medium text-gray-600 hover:text-gray-900">Log in</button>
            <button onClick={onEnterApp} className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all flex items-center gap-2">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>The Only Agentic AI Connected to Live DLD Data</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-gray-900 max-w-4xl mx-auto leading-[1.1] mb-8">
            Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-yellow-600">Hidden 15% ROI</span> Before the Market Does.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Brokers show you what they want to sell. MyDubai.io shows you what the data says you should buy. Real-time DLD transactions, predictive yield modeling, and off-plan arbitrage.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onEnterApp} className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-2xl text-lg font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-gray-900/20">
              Access the AI Assistant <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-2xl text-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Why Pay For This Section (The "Secret Sauce") */}
      <section id="why-us" className="py-24 bg-gray-900 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Why Investors Pay $199/mo For This</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                The Dubai real estate market moves too fast for human brokers. By the time a "hot deal" reaches you, the arbitrage opportunity is gone. Here is your unfair advantage:
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Information Arbitrage</h3>
                    <p className="text-gray-400">We ingest live Dubai Land Department (DLD) transaction data. While others look at asking prices on PropertyFinder, you see actual clearing prices in real-time.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                    <LineChart className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Predictive Yield Modeling</h3>
                    <p className="text-gray-400">Our AI doesn't just search; it calculates. Tell it your budget, and it instantly models projected rental yields, service charges, and capital appreciation across 50+ neighborhoods.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Zero Broker Bias</h3>
                    <p className="text-gray-400">Brokers push inventory that pays the highest commission. Our AI is mathematically objective. It works exclusively for your ROI, not developer kickbacks.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-purple-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-gray-800 border border-gray-700 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-700 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-400 font-mono ml-2">Live AI Analysis</span>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="text-gray-400">&gt; Analyzing off-plan launches in Business Bay...</div>
                  <div className="text-emerald-400">&gt; Found: Peninsula Five (Select Group)</div>
                  <div className="text-gray-400">&gt; Cross-referencing DLD historical data...</div>
                  <div className="text-white bg-gray-700 p-3 rounded-lg border border-gray-600">
                    <span className="text-[#d4af37]">Insight:</span> Current asking price is 12% below the secondary market average for similar completed units in a 1km radius. Projected ROI upon handover: 8.4%.
                  </div>
                  <div className="text-gray-400">&gt; Action: Alerting Pro Investors.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white border-y border-black/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Beyond Simple Search</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">This is an Agentic AI. It executes complex, multi-step financial reasoning on your behalf.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-[#d4af37]">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Conversational Interface</h3>
              <p className="text-gray-600 leading-relaxed">No more clunky filters. Just say: "I have 5M AED. I want a villa with a pool, close to a British school, that will yield at least 6% net."</p>
            </div>
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-[#d4af37]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Live DLD Integration</h3>
              <p className="text-gray-600 leading-relaxed">The AI pulls live transaction tables directly into the chat. Verify asking prices against actual recorded sales instantly.</p>
            </div>
            <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-[#d4af37]">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Profiling</h3>
              <p className="text-gray-600 leading-relaxed">The system remembers your budget, risk tolerance, and goals, tailoring every single recommendation to your specific portfolio strategy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-[#fcfcfc]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Edge</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">One good investment decision pays for a lifetime of access.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Tier 1 */}
            <div className="p-8 rounded-3xl bg-white border border-gray-200 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Explorer</h3>
              <p className="text-gray-500 text-sm mb-6">For those just starting to look at Dubai.</p>
              <div className="mb-6"><span className="text-4xl font-bold text-gray-900">Free</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 text-gray-400" /> 10 AI queries per month</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 text-gray-400" /> Basic property search</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 text-gray-400" /> Standard market trends</li>
              </ul>
              <button onClick={onEnterApp} className="w-full py-3 rounded-xl border border-gray-200 text-gray-900 font-medium hover:bg-gray-50 transition-colors">Get Started</button>
            </div>
            
            {/* Tier 2 */}
            <div className="p-8 rounded-3xl bg-gray-900 text-white border border-gray-800 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-gray-900/20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#d4af37] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">Most Popular</div>
              <h3 className="text-xl font-bold mb-2">Pro Investor</h3>
              <p className="text-gray-400 text-sm mb-6">For active buyers and investors.</p>
              <div className="mb-6"><span className="text-4xl font-bold">$199</span><span className="text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Unlimited Agentic AI queries</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Live DLD Transaction Data</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Advanced ROI & Yield predictions</li>
                <li className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Early access to Off-plan launches</li>
              </ul>
              <button onClick={onEnterApp} className="w-full py-3 rounded-xl bg-[#d4af37] text-white font-medium hover:bg-[#c19b2e] transition-colors shadow-lg shadow-[#d4af37]/20">Start 7-Day Trial</button>
            </div>
            
            {/* Tier 3 */}
            <div className="p-8 rounded-3xl bg-white border border-gray-200 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Broker / Agency</h3>
              <p className="text-gray-500 text-sm mb-6">For real estate professionals.</p>
              <div className="mb-6"><span className="text-4xl font-bold">$999</span><span className="text-gray-500">/mo</span></div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 text-gray-400" /> Everything in Pro</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 text-[#d4af37]" /> Receive qualified buyer leads</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 text-gray-400" /> API Access to Market Data</li>
                <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 text-gray-400" /> White-label reports for clients</li>
              </ul>
              <button onClick={onEnterApp} className="w-full py-3 rounded-xl border border-gray-200 text-gray-900 font-medium hover:bg-gray-50 transition-colors">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-black/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-gray-400" />
            <span className="font-serif font-bold text-gray-900">MyDubai.io</span>
          </div>
          <p className="text-sm text-gray-500">© 2026 MyDubai.io. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
