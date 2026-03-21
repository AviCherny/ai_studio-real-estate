import { X, Check, CreditCard, ShieldCheck, Smartphone } from "lucide-react";

interface SubscriptionModalProps {
  onClose: () => void;
}

export function SubscriptionModal({ onClose }: SubscriptionModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Plans */}
        <div className="flex-1 p-8 md:p-10 bg-gray-50">
          <div className="flex justify-between items-center mb-8 md:hidden">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Upgrade Plan</h2>
            <button onClick={onClose} className="p-2 bg-gray-200 rounded-full text-gray-600"><X className="w-5 h-5" /></button>
          </div>
          
          <h2 className="hidden md:block font-serif text-3xl font-bold text-gray-900 mb-2">Unlock Elite Access</h2>
          <p className="text-gray-500 mb-8">Choose the plan that fits your real estate goals.</p>

          <div className="space-y-4">
            {/* Pro Investor Plan */}
            <div className="bg-white border-2 border-[#d4af37] rounded-2xl p-6 relative shadow-sm cursor-pointer">
              <div className="absolute top-0 right-0 bg-[#d4af37] text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl uppercase tracking-wider">
                Most Popular
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Pro Investor</h3>
                  <p className="text-sm text-gray-500">For serious buyers</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">$199</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Unlimited AI Contract Analysis</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Early access to Off-Plan launches</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Advanced ROI Simulator</li>
              </ul>
            </div>

            {/* Broker Agency Plan */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-colors cursor-pointer">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Broker Agency</h3>
                  <p className="text-sm text-gray-500">For real estate teams</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">$999</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> AI Lead Matching Engine</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> CRM Integration</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 10 Team Member Accounts</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Payment */}
        <div className="w-full md:w-[400px] bg-white p-8 md:p-10 flex flex-col relative">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full text-gray-600 hidden md:block">
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-lg font-bold text-gray-900 mb-6 mt-4 md:mt-0">Payment Details</h3>
          
          <div className="space-y-4 flex-1">
            {/* Google Pay Button */}
            <button className="w-full bg-black text-white rounded-xl py-3.5 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-md">
              <Smartphone className="w-5 h-5" />
              <span className="font-medium text-lg tracking-wide">Pay</span>
            </button>

            <div className="flex items-center gap-4 my-6">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Or pay with card</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Stripe Card Mock */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Card Information</label>
                <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
                  <div className="px-3 py-3 border-b border-gray-200 flex items-center gap-2 bg-white">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Card number" className="w-full outline-none text-sm" />
                  </div>
                  <div className="flex bg-white">
                    <input type="text" placeholder="MM / YY" className="w-1/2 px-3 py-3 border-r border-gray-200 outline-none text-sm" />
                    <input type="text" placeholder="CVC" className="w-1/2 px-3 py-3 outline-none text-sm" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Cardholder Name</label>
                <input type="text" placeholder="Name on card" className="w-full border border-gray-300 rounded-xl px-3 py-3 outline-none text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button 
              onClick={() => {
                alert("Payment processed successfully via Stripe! (Demo)");
                onClose();
              }}
              className="w-full bg-indigo-600 text-white rounded-xl py-4 font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
            >
              Subscribe for $199/mo
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Secured by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
