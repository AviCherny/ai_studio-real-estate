import { useState } from "react";
import { Globe, Users, Briefcase, Zap, Building, Key, ArrowRight, ShieldCheck, Coins, TrendingUp } from "lucide-react";

export function EcosystemHub() {
  const [activeAlert, setActiveAlert] = useState<{title: string, message: string} | null>(null);

  const showAlert = (title: string, message: string) => {
    setActiveAlert({ title, message });
    setTimeout(() => setActiveAlert(null), 4000);
  };

  return (
    <div className="flex flex-col h-full bg-[#fcfcfc] overflow-y-auto w-full relative">
      {/* Toast Alert */}
      {activeAlert && (
        <div className="absolute top-4 right-4 z-50 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl border border-gray-700 animate-in fade-in slide-in-from-top-4">
          <h4 className="font-bold mb-1">{activeAlert.title}</h4>
          <p className="text-sm text-gray-300">{activeAlert.message}</p>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-black/5 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-gray-900">The Ecosystem</h1>
          </div>
          <p className="text-gray-500 max-w-2xl">
            More than just a search engine. MyDubai.io connects every player in the real estate lifecycle—creating a powerful network effect where everyone wins.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 py-8 space-y-12">
        
        {/* Section 1: Fractional Ownership */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Coins className="w-5 h-5 text-[#d4af37]" />
                Fractional Ownership (Crowdfunding)
              </h2>
              <p className="text-sm text-gray-500">Lowering the barrier to entry. Invest in premium Dubai real estate from $5,000.</p>
            </div>
            <button 
              onClick={() => showAlert("Coming Soon", "The full fractional ownership marketplace is launching in Q3. Stay tuned!")}
              className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Atlantis The Royal - Villa Share", total: "20M AED", funded: 85, min: "50,000 AED", apy: "12.5%" },
              { title: "Downtown Burj View Apt", total: "3.5M AED", funded: 42, min: "10,000 AED", apy: "8.2%" },
              { title: "Marina Waterfront Studio", total: "1.8M AED", funded: 95, min: "5,000 AED", apy: "9.1%" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-lg">{item.apy} APY</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div className="bg-[#d4af37] h-2 rounded-full" style={{ width: `${item.funded}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span>{item.funded}% Funded</span>
                  <span>Target: {item.total}</span>
                </div>
                <button 
                  onClick={() => showAlert("Investment Initiated", `Starting investment flow for ${item.title} with minimum ${item.min}. (Demo)`)}
                  className="w-full py-2 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors"
                >
                  Invest {item.min}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Service Providers Marketplace */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                The "After-Sale" Marketplace
              </h2>
              <p className="text-sm text-gray-500">Connecting investors with verified local professionals for a seamless experience.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: ShieldCheck, title: "Golden Visa Lawyers", desc: "Legal setup & residency", color: "text-purple-600", bg: "bg-purple-50" },
              { icon: Key, title: "Property Management", desc: "Airbnb & long-term rentals", color: "text-emerald-600", bg: "bg-emerald-50" },
              { icon: Building, title: "Interior Designers", desc: "Furnish for higher yields", color: "text-orange-600", bg: "bg-orange-50" },
              { icon: TrendingUp, title: "Mortgage Brokers", desc: "Financing for non-residents", color: "text-blue-600", bg: "bg-blue-50" }
            ].map((service, i) => (
              <div 
                key={i} 
                onClick={() => showAlert("Service Provider Network", `Connecting you with verified ${service.title} professionals in Dubai. (Demo)`)}
                className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col items-center text-center hover:border-gray-300 transition-colors cursor-pointer group"
              >
                <div className={`w-12 h-12 ${service.bg} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{service.title}</h3>
                <p className="text-xs text-gray-500">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Developer Launchpad */}
        <section className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4af37] rounded-full blur-[100px] opacity-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm tracking-wider uppercase mb-3">
                <Zap className="w-4 h-4" /> Exclusive Developer Launchpad
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">Off-Plan Projects, Matched by AI.</h2>
              <p className="text-gray-400 mb-6">
                Developers launch their projects directly into our ecosystem. Our AI instantly matches the new inventory with the exact investors looking for those specs, bypassing traditional marketing costs.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => showAlert("Developer Launchpad", "Accessing exclusive off-plan inventory matched to your AI profile. (Demo)")}
                  className="px-6 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                >
                  View Upcoming Launches
                </button>
                <button 
                  onClick={() => showAlert("Developer Portal", "Redirecting to the Developer Portal to list your new project. (Demo)")}
                  className="px-6 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-colors"
                >
                  I'm a Developer
                </button>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-4">Next AI Match Drop</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Emaar Beachfront Phase 3</span>
                    <span className="text-[#d4af37] font-bold">In 2 days</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div className="bg-[#d4af37] h-1.5 rounded-full w-[80%]"></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">1,204 investors in our ecosystem match this profile.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
