import { useState } from "react";
import { Save, User, Target, Wallet, MapPin } from "lucide-react";

export interface UserProfile {
  name: string;
  budget: number;
  investmentGoal: string;
  preferredAreas: string[];
}

interface InvestorProfileProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export function InvestorProfile({ profile, onUpdateProfile }: InvestorProfileProps) {
  const [localProfile, setLocalProfile] = useState<UserProfile>(profile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onUpdateProfile(localProfile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const areas = ["Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "Business Bay", "Emirates Hills", "Jumeirah Village Circle (JVC)"];

  const toggleArea = (area: string) => {
    setLocalProfile(prev => ({
      ...prev,
      preferredAreas: prev.preferredAreas.includes(area)
        ? prev.preferredAreas.filter(a => a !== area)
        : [...prev.preferredAreas, area]
    }));
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold text-gray-900">Investor Profile</h2>
        <p className="text-gray-500 mt-2">Customize your preferences to get hyper-personalized AI recommendations.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-black/5 p-8 space-y-8">
        {/* Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
            <User className="w-4 h-4 text-[#d4af37]" /> Full Name
          </label>
          <input 
            type="text" 
            value={localProfile.name}
            onChange={(e) => setLocalProfile({...localProfile, name: e.target.value})}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] transition-all"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="flex items-center justify-between text-sm font-medium text-gray-900 mb-3">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-[#d4af37]" /> Investment Budget (AED)
            </div>
            <span className="text-[#d4af37] font-bold">{localProfile.budget.toLocaleString()} AED</span>
          </label>
          <input 
            type="range" 
            min="1000000" 
            max="50000000" 
            step="500000"
            value={localProfile.budget}
            onChange={(e) => setLocalProfile({...localProfile, budget: parseInt(e.target.value)})}
            className="w-full accent-[#d4af37]"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>1M AED</span>
            <span>50M+ AED</span>
          </div>
        </div>

        {/* Investment Goal */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
            <Target className="w-4 h-4 text-[#d4af37]" /> Primary Goal
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Capital Appreciation", "High Rental Yield", "Luxury Holiday Home"].map(goal => (
              <button
                key={goal}
                onClick={() => setLocalProfile({...localProfile, investmentGoal: goal})}
                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  localProfile.investmentGoal === goal 
                    ? "bg-[#d4af37]/10 border-[#d4af37] text-[#d4af37]" 
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Areas */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-3">
            <MapPin className="w-4 h-4 text-[#d4af37]" /> Preferred Areas
          </label>
          <div className="flex flex-wrap gap-3">
            {areas.map(area => (
              <button
                key={area}
                onClick={() => toggleArea(area)}
                className={`px-4 py-2 rounded-full border text-sm transition-all ${
                  localProfile.preferredAreas.includes(area)
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
          {isSaved && <span className="text-emerald-500 text-sm font-medium animate-in fade-in">Profile updated successfully!</span>}
          <button 
            onClick={handleSave}
            className="bg-gray-900 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg shadow-gray-900/20"
          >
            <Save className="w-4 h-4" /> Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
