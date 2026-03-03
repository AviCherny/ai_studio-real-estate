import { Property } from "../../services/mockData";
import { PropertyCard } from "../ui/PropertyCard";
import { Building2 } from "lucide-react";

interface SavedPropertiesProps {
  savedPropertyIds: string[];
  allProperties: Property[];
  onToggleSave: (id: string) => void;
}

export function SavedProperties({ savedPropertyIds, allProperties, onToggleSave }: SavedPropertiesProps) {
  const savedProperties = allProperties.filter(p => savedPropertyIds.includes(p.id));

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="font-serif text-3xl font-bold text-gray-900">Saved Properties</h2>
        <p className="text-gray-500 mt-2">Your curated list of investment opportunities.</p>
      </div>

      {savedProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties saved yet</h3>
          <p className="text-gray-500 text-center max-w-sm">
            Ask the AI assistant to find properties for you, and click the heart icon to save them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedProperties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              isSaved={true} 
              onToggleSave={() => onToggleSave(property.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
