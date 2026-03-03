import { useState } from "react";
import { Search, MapPin, Building, DollarSign, Filter, ArrowRight, Home, TrendingUp } from "lucide-react";
import { properties } from "../../services/mockData";
import { PropertyCard } from "../ui/PropertyCard";

interface TraditionalSearchProps {
  onSwitchToAI: () => void;
  savedPropertyIds: string[];
  onToggleSave: (id: string) => void;
}

export function TraditionalSearch({ onSwitchToAI, savedPropertyIds, onToggleSave }: TraditionalSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("Any");

  // Simple client-side filtering for the demo
  const filteredProperties = properties.filter(p => {
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || p.type === selectedType;
    
    let matchesPrice = true;
    if (priceRange === "Under 2M") matchesPrice = p.price < 2000000;
    if (priceRange === "2M - 5M") matchesPrice = p.price >= 2000000 && p.price <= 5000000;
    if (priceRange === "Over 5M") matchesPrice = p.price > 5000000;

    return matchesQuery && matchesType && matchesPrice;
  });

  return (
    <div className="flex flex-col h-full bg-[#fcfcfc] overflow-y-auto w-full">
      {/* Header & AI Upsell */}
      <div className="bg-white border-b border-black/5 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Property Search</h1>
            <p className="text-gray-500">Browse verified listings across Dubai's premium locations.</p>
          </div>
          
          <div className="bg-gradient-to-r from-[#d4af37]/10 to-yellow-500/10 border border-[#d4af37]/20 p-4 rounded-2xl flex items-center gap-4 max-w-md">
            <div className="w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#d4af37]/20">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 mb-0.5">Want smarter results?</p>
              <p className="text-xs text-gray-600 mb-2">Let our AI analyze ROI and DLD data for you.</p>
              <button 
                onClick={onSwitchToAI}
                className="text-xs font-bold text-[#d4af37] hover:text-[#c19b2e] flex items-center gap-1 transition-colors"
              >
                Switch to AI Assistant <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Filters */}
      <div className="max-w-5xl mx-auto w-full px-6 py-8">
        <div className="bg-white p-4 rounded-2xl border border-black/5 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by location or project name..." 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="relative min-w-[140px]">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select 
                className="w-full pl-9 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] transition-all text-sm font-medium text-gray-700 cursor-pointer"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>
            
            <div className="relative min-w-[140px]">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select 
                className="w-full pl-9 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] transition-all text-sm font-medium text-gray-700 cursor-pointer"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="Any">Any Price</option>
                <option value="Under 2M">Under 2M AED</option>
                <option value="2M - 5M">2M - 5M AED</option>
                <option value="Over 5M">Over 5M AED</option>
              </select>
            </div>

            <button className="bg-gray-900 text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Sort by:</span>
            <select className="bg-transparent font-medium text-gray-900 focus:outline-none cursor-pointer">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest ROI</option>
            </select>
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                isSaved={savedPropertyIds.includes(property.id)}
                onToggleSave={() => onToggleSave(property.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-black/5">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">We couldn't find any properties matching your current filters. Try adjusting your search criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedType("All");
                setPriceRange("Any");
              }}
              className="text-[#d4af37] font-medium hover:text-[#c19b2e] transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
