import { MarketTrend } from "../../services/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MarketChartProps {
  data: MarketTrend[];
  location: string;
}

export function MarketChart({ data, location }: MarketChartProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 w-full mb-4">
      <div className="mb-6">
        <h3 className="font-serif text-xl font-medium text-gray-900">Market Trends: {location}</h3>
        <p className="text-sm text-gray-500 mt-1">Average Price per Sqft (AED)</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              domain={['auto', 'auto']}
              tickFormatter={(value) => `AED ${value}`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              formatter={(value: number) => [`AED ${value.toFixed(0)}`, 'Price/Sqft']}
            />
            <Area 
              type="monotone" 
              dataKey="pricePerSqft" 
              stroke="#d4af37" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
