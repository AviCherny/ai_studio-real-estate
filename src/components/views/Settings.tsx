import { Bell, Shield, Moon, Globe, CreditCard } from "lucide-react";

export function Settings() {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 mt-2">Manage your account and application preferences.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden">
        <div className="divide-y divide-gray-100">
          
          {/* Notifications */}
          <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Push Notifications</h3>
                <p className="text-sm text-gray-500">Get alerts for new off-plan launches</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4af37]"></div>
            </label>
          </div>

          {/* Dark Mode */}
          <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Dark Mode</h3>
                <p className="text-sm text-gray-500">Switch to a darker theme</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4af37]"></div>
            </label>
          </div>

          {/* Language */}
          <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Language & Region</h3>
                <p className="text-sm text-gray-500">English (UAE) - AED</p>
              </div>
            </div>
            <span className="text-sm font-medium text-[#d4af37]">Edit</span>
          </div>

          {/* Billing */}
          <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Billing & Subscription</h3>
                <p className="text-sm text-gray-500">Pro Investor Plan ($199/mo)</p>
              </div>
            </div>
            <span className="text-sm font-medium text-[#d4af37]">Manage</span>
          </div>

          {/* Privacy */}
          <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Privacy & Security</h3>
                <p className="text-sm text-gray-500">Manage your data and API keys</p>
              </div>
            </div>
            <span className="text-sm font-medium text-[#d4af37]">View</span>
          </div>

        </div>
      </div>
    </div>
  );
}
