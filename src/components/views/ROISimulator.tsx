import { useState } from "react";
import { Calculator, TrendingUp, DollarSign, PieChart, ArrowRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function ROISimulator() {
  const [propertyPrice, setPropertyPrice] = useState(2500000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(25);
  const [expectedRent, setExpectedRent] = useState(180000);
  const [serviceCharges, setServiceCharges] = useState(15000);
  const [appreciationRate, setAppreciationRate] = useState(5);

  // Calculations
  const downPayment = propertyPrice * (downPaymentPct / 100);
  const loanAmount = propertyPrice - downPayment;
  const monthlyInterestRate = (interestRate / 100) / 12;
  const numberOfPayments = loanTerm * 12;
  
  const monthlyMortgage = loanAmount > 0 
    ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
    : 0;

  const annualMortgage = monthlyMortgage * 12;
  const netAnnualIncome = expectedRent - serviceCharges - annualMortgage;
  const grossYield = (expectedRent / propertyPrice) * 100;
  const netYield = ((expectedRent - serviceCharges) / propertyPrice) * 100;
  const cashOnCashReturn = downPayment > 0 ? (netAnnualIncome / downPayment) * 100 : netYield;

  // Projection Data (5 years)
  const projectionData = Array.from({ length: 6 }).map((_, year) => {
    const propertyValue = propertyPrice * Math.pow(1 + (appreciationRate / 100), year);
    const equityBuilt = loanAmount > 0 ? (annualMortgage * year * 0.4) : 0; // Simplified principal paydown
    const totalEquity = downPayment + equityBuilt + (propertyValue - propertyPrice);
    
    return {
      year: `Year ${year}`,
      propertyValue: Math.round(propertyValue),
      equity: Math.round(totalEquity),
    };
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <div className="flex flex-col h-full bg-[#fcfcfc] overflow-y-auto w-full">
      <div className="bg-white border-b border-black/5 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#d4af37] rounded-xl flex items-center justify-center shadow-lg shadow-[#d4af37]/20">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-gray-900">ROI & Yield Simulator</h1>
          </div>
          <p className="text-gray-500 max-w-2xl">Model your investment returns, cash flow, and 5-year appreciation projections based on real-time Dubai market averages.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inputs Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#d4af37]" /> Purchase Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Property Price (AED)</label>
                <input 
                  type="number" 
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 font-mono"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Down Payment (%)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="20" max="100" step="5"
                    value={downPaymentPct}
                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                    className="flex-1 accent-[#d4af37]"
                  />
                  <span className="font-mono font-bold text-gray-900 w-12 text-right">{downPaymentPct}%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">{formatCurrency(downPayment)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Interest (%)</label>
                  <input 
                    type="number" step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Years</label>
                  <input 
                    type="number" 
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#d4af37]" /> Income & Expenses
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Expected Annual Rent</label>
                <input 
                  type="number" 
                  value={expectedRent}
                  onChange={(e) => setExpectedRent(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Annual Service Charges</label>
                <input 
                  type="number" 
                  value={serviceCharges}
                  onChange={(e) => setServiceCharges(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Est. Annual Appreciation (%)</label>
                <input 
                  type="number" step="0.5"
                  value={appreciationRate}
                  onChange={(e) => setAppreciationRate(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 p-4 rounded-2xl text-white">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Gross Yield</p>
              <p className="text-2xl font-serif">{grossYield.toFixed(2)}%</p>
            </div>
            <div className="bg-white border border-black/5 p-4 rounded-2xl">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Net Yield</p>
              <p className="text-2xl font-serif text-[#d4af37]">{netYield.toFixed(2)}%</p>
            </div>
            <div className="bg-white border border-black/5 p-4 rounded-2xl">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Cash on Cash</p>
              <p className="text-2xl font-serif text-gray-900">{cashOnCashReturn.toFixed(2)}%</p>
            </div>
            <div className="bg-white border border-black/5 p-4 rounded-2xl">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Monthly Cashflow</p>
              <p className={`text-xl font-mono font-bold ${netAnnualIncome > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {netAnnualIncome > 0 ? '+' : ''}{formatCurrency(netAnnualIncome / 12)}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#d4af37]" /> 5-Year Equity Projection
              </h3>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#111827" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#111827" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Area type="monotone" dataKey="propertyValue" name="Property Value" stroke="#d4af37" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                  <Area type="monotone" dataKey="equity" name="Total Equity" stroke="#111827" strokeWidth={2} fillOpacity={1} fill="url(#colorEquity)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Upsell inside Simulator */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold text-lg mb-1">Want personalized projections?</h4>
              <p className="text-gray-400 text-sm">Our AI can run this simulation automatically on any property you find in the chat, using real-time DLD data.</p>
            </div>
            <button className="bg-[#d4af37] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#c19b2e] transition-colors whitespace-nowrap flex items-center gap-2">
              Ask AI Assistant <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
