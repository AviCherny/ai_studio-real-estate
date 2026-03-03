import { DLDTransaction } from "../../services/mockData";
import { Building2, Calendar, MapPin, Tag } from "lucide-react";

interface DLDTableProps {
  transactions: DLDTransaction[];
  area: string;
}

export function DLDTable({ transactions, area }: DLDTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden w-full mb-4">
      <div className="p-5 border-b border-black/5 bg-gray-50 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg font-medium text-gray-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#d4af37]" />
            Official DLD Transactions
          </h3>
          <p className="text-sm text-gray-500 mt-1">Recent sales data for {area}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          Live Data Sync
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-white border-b border-black/5">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Property</th>
              <th className="px-6 py-4 font-medium">Price (AED)</th>
              <th className="px-6 py-4 font-medium">Size (Sqft)</th>
              <th className="px-6 py-4 font-medium">AED/Sqft</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {tx.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{tx.buildingName}</div>
                  <div className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                    <Tag className="w-3 h-3" /> {tx.type}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {tx.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {tx.sqft.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-[#d4af37] font-medium">
                  {Math.round(tx.price / tx.sqft).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
