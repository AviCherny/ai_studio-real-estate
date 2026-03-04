import { useState } from "react";
import { Users, Filter, Search, Phone, Mail, MapPin, DollarSign, Star, Calendar, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";
import { UserProfile } from "./InvestorProfile";

// Mock Lead Data
const mockLeads = [
  {
    id: "L-1001",
    name: "Alexander Petrov",
    status: "New Match",
    budget: "5M - 8M AED",
    interest: "Palm Jumeirah Villas",
    matchScore: 98,
    date: "2 hours ago",
    phone: "+971 50 123 4567",
    email: "a.petrov@example.com",
    notes: "Looking for high ROI, ready to move in 3 months."
  },
  {
    id: "L-1002",
    name: "Sarah Jenkins",
    status: "Contacted",
    budget: "2M - 3M AED",
    interest: "Downtown Apartments",
    matchScore: 85,
    date: "1 day ago",
    phone: "+44 7700 900077",
    email: "s.jenkins@example.co.uk",
    notes: "First-time investor in Dubai. Needs ROI breakdown."
  },
  {
    id: "L-1003",
    name: "Mohammed Al-Fayed",
    status: "Viewing Scheduled",
    budget: "10M+ AED",
    interest: "Emirates Hills",
    matchScore: 92,
    date: "3 days ago",
    phone: "+971 55 987 6543",
    email: "m.alfayed@example.ae",
    notes: "Wants a golf course view. Viewing set for Thursday."
  },
  {
    id: "L-1004",
    name: "Elena Rossi",
    status: "New Match",
    budget: "1.5M - 2M AED",
    interest: "Dubai Marina",
    matchScore: 78,
    date: "5 hours ago",
    phone: "+39 333 123 4567",
    email: "e.rossi@example.it",
    notes: "Looking for off-plan opportunities."
  }
];

const columns = ["New Match", "Contacted", "Viewing Scheduled", "Offer Made"];

interface BrokerDashboardProps {
  investorProfile?: UserProfile;
}

export function BrokerDashboard({ investorProfile }: BrokerDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  // Inject the current user as a lead if they exist
  const leads = [...mockLeads];
  if (investorProfile) {
    const userLead = {
      id: "L-CURRENT-USER",
      name: investorProfile.name || "Current User",
      status: "New Match",
      budget: `${(investorProfile.budget / 1000000).toFixed(1)}M AED`,
      interest: investorProfile.preferredAreas.join(", ") || "General Inquiry",
      matchScore: 99, // High score because they are actively using the app
      date: "Just now",
      phone: "+971 50 000 0000",
      email: "user@mydubai.io",
      notes: `Goal: ${investorProfile.investmentGoal}. ${
        investorProfile.learnedFacts && investorProfile.learnedFacts.length > 0 
          ? `AI Notes: ${investorProfile.learnedFacts.join(". ")}` 
          : "Active user on the platform."
      }`
    };
    // Add to the beginning of the list
    leads.unshift(userLead);
  }

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.interest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#fcfcfc] overflow-y-auto w-full">
      {/* Header */}
      <div className="bg-white border-b border-black/5 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-900/20">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-gray-900">Lead Pipeline</h1>
            </div>
            <p className="text-gray-500">Manage your exclusive AI-qualified investor leads.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-2 font-medium text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Agency Pro Active
            </div>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm">
              <Filter className="w-4 h-4" /> Filter Leads
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="max-w-7xl mx-auto w-full px-6 py-8">
        
        {/* Search Bar */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search leads by name or area..." 
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Columns Grid */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
          {columns.map(column => (
            <div key={column} className="min-w-[320px] w-[320px] flex-shrink-0 snap-start">
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">{column}</h3>
                <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {filteredLeads.filter(l => l.status === column).length}
                </span>
              </div>
              
              <div className="space-y-4">
                {filteredLeads.filter(l => l.status === column).map(lead => (
                  <div 
                    key={lead.id} 
                    className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => setSelectedLead(selectedLead === lead.id ? null : lead.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{lead.name}</h4>
                        <p className="text-xs text-gray-400 font-mono mt-0.5">{lead.id} • {lead.date}</p>
                      </div>
                      <div className="bg-[#d4af37]/10 text-[#d4af37] px-2 py-1 rounded-lg flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold">{lead.matchScore}%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{lead.budget}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{lead.interest}</span>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedLead === lead.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 animate-in fade-in slide-in-from-top-2">
                        <div className="bg-gray-50 p-3 rounded-xl text-sm text-gray-700">
                          <span className="font-bold block mb-1 text-xs text-gray-500 uppercase">AI Notes:</span>
                          {lead.notes}
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-gray-900 text-white py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4" /> Call
                          </button>
                          <button className="flex-1 bg-white border border-gray-200 text-gray-900 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                            <Mail className="w-4 h-4" /> Email
                          </button>
                        </div>
                      </div>
                    )}

                    {!selectedLead || selectedLead !== lead.id ? (
                      <div className="mt-4 flex items-center text-xs font-bold text-[#d4af37] group-hover:text-[#c19b2e] transition-colors">
                        View Details <ArrowRight className="w-3 h-3 ml-1" />
                      </div>
                    ) : null}
                  </div>
                ))}

                {filteredLeads.filter(l => l.status === column).length === 0 && (
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400 text-sm font-medium">
                    No leads in this stage
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
