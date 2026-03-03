import { useState } from "react";
import { ChatInterface } from "./components/ChatInterface";
import { LandingPage } from "./components/LandingPage";
import { SavedProperties } from "./components/views/SavedProperties";
import { InvestorProfile, UserProfile } from "./components/views/InvestorProfile";
import { Settings as SettingsView } from "./components/views/Settings";
import { BrokerDashboard } from "./components/views/BrokerDashboard";
import { TraditionalSearch } from "./components/views/TraditionalSearch";
import { ROISimulator } from "./components/views/ROISimulator";
import { LocalExperts } from "./components/views/LocalExperts";
import { properties } from "./services/mockData";
import { Building2, LayoutDashboard, Settings, User, Menu, X, Heart, Users, RefreshCw, Search, Calculator, Award } from "lucide-react";

type ViewState = 'landing' | 'assistant' | 'search' | 'simulator' | 'experts' | 'saved' | 'profile' | 'settings' | 'broker-leads';
type UserRole = 'investor' | 'broker';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('investor');
  
  // Global App State
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>([]);
  const [investorProfile, setInvestorProfile] = useState<UserProfile>({
    name: "Avi Cherny",
    budget: 5000000,
    investmentGoal: "Capital Appreciation",
    preferredAreas: ["Downtown Dubai", "Palm Jumeirah"]
  });

  const handleToggleSave = (id: string) => {
    setSavedPropertyIds(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
  };

  const toggleRole = () => {
    const newRole = userRole === 'investor' ? 'broker' : 'investor';
    setUserRole(newRole);
    if (newRole === 'broker') {
      navigateTo('broker-leads');
    } else {
      navigateTo('assistant');
    }
  };

  if (currentView === 'landing') {
    return <LandingPage onEnterApp={() => setCurrentView('assistant')} />;
  }

  return (
    <div className="flex h-screen w-full bg-[#fcfcfc] font-sans text-gray-900 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-black/5 flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('assistant')}>
            <div className="w-10 h-10 bg-[#d4af37] rounded-xl flex items-center justify-center shadow-lg shadow-[#d4af37]/20">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-tight text-gray-900">MyDubai.io</h1>
              <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400">Elite Concierge</p>
            </div>
          </div>
          <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Toggle for Demo */}
        <div className="px-6 pb-4">
          <button 
            onClick={toggleRole}
            className="w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors group"
          >
            <div className="flex flex-col items-start">
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">View App As</span>
              <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                {userRole === 'investor' ? 'Pro Investor ($199)' : 'Broker Agency ($999)'}
              </span>
            </div>
            <RefreshCw className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-1">
            {userRole === 'broker' && (
              <button 
                onClick={() => navigateTo('broker-leads')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  currentView === 'broker-leads' ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Users className={`w-5 h-5 ${currentView === 'broker-leads' ? "text-white" : ""}`} />
                Lead Center
              </button>
            )}

            <button 
              onClick={() => navigateTo('assistant')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                currentView === 'assistant' ? "bg-[#d4af37]/10 text-[#d4af37]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <LayoutDashboard className={`w-5 h-5 ${currentView === 'assistant' ? "text-[#d4af37]" : ""}`} />
              AI Assistant
            </button>

            <button 
              onClick={() => navigateTo('search')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                currentView === 'search' ? "bg-gray-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Search className={`w-5 h-5 ${currentView === 'search' ? "text-[#d4af37]" : ""}`} />
              Classic Search
            </button>

            {userRole === 'investor' && (
              <>
                <button 
                  onClick={() => navigateTo('simulator')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    currentView === 'simulator' ? "bg-gray-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Calculator className={`w-5 h-5 ${currentView === 'simulator' ? "text-[#d4af37]" : ""}`} />
                  ROI Simulator
                </button>
                <button 
                  onClick={() => navigateTo('experts')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    currentView === 'experts' ? "bg-gray-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Award className={`w-5 h-5 ${currentView === 'experts' ? "text-[#d4af37]" : ""}`} />
                  Trusted Partners
                </button>
              </>
            )}

            <button 
              onClick={() => navigateTo('saved')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-colors ${
                currentView === 'saved' ? "bg-gray-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Heart className={`w-5 h-5 ${currentView === 'saved' ? "text-[#d4af37]" : ""}`} />
                Saved Properties
              </div>
              {savedPropertyIds.length > 0 && (
                <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {savedPropertyIds.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => navigateTo('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                currentView === 'profile' ? "bg-gray-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <User className={`w-5 h-5 ${currentView === 'profile' ? "text-[#d4af37]" : ""}`} />
              Investor Profile
            </button>
            <button 
              onClick={() => navigateTo('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                currentView === 'settings' ? "bg-gray-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Settings className={`w-5 h-5 ${currentView === 'settings' ? "text-[#d4af37]" : ""}`} />
              Settings
            </button>
          </nav>

          {userRole === 'investor' && (
            <div className="mt-8 px-8">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Recent Inquiries</h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-600 truncate hover:text-[#d4af37] cursor-pointer transition-colors" onClick={() => navigateTo('assistant')}>Downtown Penthouses</div>
                <div className="text-sm text-gray-600 truncate hover:text-[#d4af37] cursor-pointer transition-colors" onClick={() => navigateTo('assistant')}>Marina ROI Analysis</div>
                <div className="text-sm text-gray-600 truncate hover:text-[#d4af37] cursor-pointer transition-colors" onClick={() => navigateTo('assistant')}>Palm Jumeirah Villas</div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-black/5 flex flex-col gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('profile')}>
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <img src="https://picsum.photos/seed/investor/100/100" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{investorProfile.name || "Investor"}</p>
              <p className="text-xs text-gray-500">{userRole === 'investor' ? 'Pro Member' : 'Agency Partner'}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Powered by Agentic AI</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#fcfcfc] overflow-y-auto">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-black/5 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#d4af37] rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-serif text-lg font-bold text-gray-900">MyDubai.io</h1>
          </div>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Dynamic View Rendering */}
        <div className="flex-1 relative">
          {currentView === 'assistant' && (
            <ChatInterface 
              investorProfile={investorProfile}
              savedPropertyIds={savedPropertyIds}
              onToggleSave={handleToggleSave}
            />
          )}
          {currentView === 'search' && (
            <TraditionalSearch 
              onSwitchToAI={() => navigateTo('assistant')}
              savedPropertyIds={savedPropertyIds}
              onToggleSave={handleToggleSave}
            />
          )}
          {currentView === 'simulator' && (
            <ROISimulator />
          )}
          {currentView === 'experts' && (
            <LocalExperts />
          )}
          {currentView === 'saved' && (
            <SavedProperties 
              savedPropertyIds={savedPropertyIds}
              allProperties={properties}
              onToggleSave={handleToggleSave}
            />
          )}
          {currentView === 'profile' && (
            <InvestorProfile 
              profile={investorProfile}
              onUpdateProfile={setInvestorProfile}
            />
          )}
          {currentView === 'settings' && (
            <SettingsView />
          )}
          {currentView === 'broker-leads' && (
            <BrokerDashboard />
          )}
        </div>
      </main>
    </div>
  );
}
