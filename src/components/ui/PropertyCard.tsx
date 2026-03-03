import { Property } from "../../services/mockData";
import { Bed, Bath, Square, TrendingUp, Heart } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export function PropertyCard({ property, isSaved = false, onToggleSave }: PropertyCardProps) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-black/5 hover:shadow-md transition-shadow duration-200">
      <div className="relative h-48 w-full group">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide">
          {property.type}
        </div>
        
        <button 
          onClick={onToggleSave}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
        >
          <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>

        <div className="absolute bottom-3 left-3 bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {property.roi}% ROI
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div>
          <h3 className="font-serif text-lg font-medium text-gray-900 leading-tight line-clamp-1">
            {property.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{property.location}</p>
        </div>
        <div className="text-xl font-medium text-gray-900">
          AED {property.price.toLocaleString()}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="w-4 h-4" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
}
