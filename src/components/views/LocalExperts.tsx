import { useState } from "react";
import { Star, ShieldCheck, Languages, Wrench, Home, MessageSquare, ArrowRight, Award, Building } from "lucide-react";

// Mock Data for Experts
const experts = [
  {
    id: "e1",
    name: "Elena Rostova",
    company: "Luxury Homes Dubai",
    type: "Broker",
    rating: 4.9,
    reviews: 128,
    languages: ["🇬🇧 EN", "🇷🇺 RU", "🇮🇹 IT"],
    specialties: ["Palm Jumeirah", "Off-plan", "High ROI"],
    description: "Top 1% DLD registered broker. Specializes in finding undervalued off-plan properties for foreign investors.",
    image: "https://picsum.photos/seed/elena/150/150",
    verified: true,
    stats: { label: "Sales Vol (YTD)", value: "$42M" }
  },
  {
    id: "e2",
    name: "Ahmed Al-Maktoum",
    company: "Desert Rose Real Estate",
    type: "Broker",
    rating: 4.8,
    reviews: 245,
    languages: ["🇬🇧 EN", "🇦🇪 AR"],
    specialties: ["Downtown Dubai", "Luxury Penthouses", "Commercial"],
    description: "15 years of experience in the Dubai market. Deep connections with major developers like Emaar and Nakheel.",
    image: "https://picsum.photos/seed/ahmed/150/150",
    verified: true,
    stats: { label: "Properties Sold", value: "312" }
  },
  {
    id: "e3",
    name: "Turnkey Property Mgmt",
    company: "Turnkey LLC",
    type: "Property Manager",
    rating: 4.7,
    reviews: 89,
    languages: ["🇬🇧 EN", "🇦🇪 AR", "🇮🇳 HI"],
    specialties: ["Tenant Screening", "24/7 Maintenance", "Rent Collection"],
    description: "Full-service property management. You invest, we handle the rest. From fixing leaky faucets to legal tenant evictions.",
    image: "https://picsum.photos/seed/turnkey/150/150",
    verified: true,
    stats: { label: "Units Managed", value: "450+" }
  },
  {
    id: "e4",
    name: "BlueSky Maintenance & Mgmt",
    company: "BlueSky Group",
    type: "Property Manager",
    rating: 4.9,
    reviews: 412,
    languages: ["🇬🇧 EN", "🇨🇳 ZH", "🇫🇷 FR"],
    specialties: ["Short-term Rentals (Airbnb)", "Cleaning", "Interior Design"],
    description: "Maximize your yield with our premium short-term rental management. We handle Airbnb listings, dynamic pricing, and daily cleaning.",
    image: "https://picsum.photos/seed/bluesky/150/150",
    verified: true,
    stats: { label: "Avg Yield Boost", value: "+2.4%" }
  }
];

export function LocalExperts() {
  const [filter, setFilter] = useState<'All' | 'Broker' | 'Property Manager'>('All');

  const filteredExperts = experts.filter(e => filter === 'All' || e.type === filter);

  return (
    <div className="flex flex-col h-full bg-[#fcfcfc] overflow-y-auto w-full">
      {/* Header */}
      <div className="bg-white border-b border-black/5 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#d4af37] rounded-xl flex items-center justify-center shadow-lg shadow-[#d4af37]/20">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-gray-900">Trusted Partners</h1>
          </div>
          <p className="text-gray-500 max-w-2xl">
            Invest from anywhere in the world. Connect with top-rated, DLD-verified brokers to buy, and reliable property managers to handle tenants and maintenance.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto w-full px-6 py-8">
        
        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['All', 'Broker', 'Property Manager'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                filter === f 
                  ? "bg-gray-900 text-white shadow-md" 
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {f === 'All' ? 'All Partners' : f === 'Broker' ? 'Real Estate Brokers' : 'Property Managers'}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExperts.map((expert) => (
            <div key={expert.id} className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={expert.image} 
                    alt={expert.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-1">
                        {expert.name}
                        {expert.verified && <ShieldCheck className="w-4 h-4 text-blue-500" />}
                      </h3>
                      <div className="flex items-center gap-1 text-sm font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 text-[#d4af37] fill-current" />
                        {expert.rating}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 font-medium mb-2">{expert.company}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 ${
                        expert.type === 'Broker' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {expert.type === 'Broker' ? <Home className="w-3 h-3" /> : <Wrench className="w-3 h-3" />}
                        {expert.type}
                      </span>
                      <span className="text-xs text-gray-400">({expert.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6 line-clamp-2">
                  {expert.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Languages</p>
                    <div className="flex gap-1 text-sm">
                      {expert.languages.join(", ")}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{expert.stats.label}</p>
                    <p className="text-sm font-bold text-gray-900">{expert.stats.value}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {expert.specialties.map(spec => (
                      <span key={spec} className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                <button className="flex-1 bg-white border border-gray-200 text-gray-900 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Message
                </button>
                <button className="flex-1 bg-gray-900 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  Request Intro <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Upsell */}
        <div className="mt-8 bg-gradient-to-r from-[#d4af37]/10 to-transparent border border-[#d4af37]/20 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-bold text-gray-900 text-lg mb-1">Not sure who to choose?</h4>
            <p className="text-gray-600 text-sm">Our AI can match you with the perfect partner based on your investment strategy and native language.</p>
          </div>
          <button className="bg-[#d4af37] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#c19b2e] transition-colors whitespace-nowrap">
            Ask AI to Match Me
          </button>
        </div>

      </div>
    </div>
  );
}
