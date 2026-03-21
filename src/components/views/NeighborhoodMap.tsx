import { useState } from "react";
import { MapPin, Navigation, Search, Info, Star } from "lucide-react";

export function NeighborhoodMap() {
  const [activeArea, setActiveArea] = useState("Dubai Marina");

  const areas = [
    { name: "Dubai Marina", lat: "25.0805", lng: "55.1403", roi: "7.2%", vibe: "Waterfront Lifestyle" },
    { name: "Downtown Dubai", lat: "25.1972", lng: "55.2744", roi: "6.5%", vibe: "Luxury & Iconic" },
    { name: "Palm Jumeirah", lat: "25.1124", lng: "55.1390", roi: "5.8%", vibe: "Exclusive Beachfront" },
    { name: "Jumeirah Village Circle", lat: "25.0648", lng: "55.2068", roi: "8.1%", vibe: "Family & High Yield" }
  ];

  return (
    <div className="flex flex-col h-full bg-[#fcfcfc] w-full">
      {/* Header */}
      <div className="bg-white border-b border-black/5 px-6 py-6 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-indigo-600" />
              Interactive AI Map
            </h1>
            <p className="text-sm text-gray-500">Explore neighborhoods with real-time Google Maps data and AI insights.</p>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            {areas.map(area => (
              <button
                key={area.name}
                onClick={() => setActiveArea(area.name)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeArea === area.name 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {area.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {/* Google Maps Iframe Embed */}
        <iframe 
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115545.69871147572!2d55.145393!3d25.0750095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2s${encodeURIComponent(activeArea)}!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae`}
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: "contrast(1.1) saturate(1.2)" }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        ></iframe>

        {/* AI Overlay Panel */}
        <div className="absolute bottom-8 left-8 right-8 md:right-auto md:w-96 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 animate-in slide-in-from-bottom-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
              <Star className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">{activeArea}</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-500">Average ROI</span>
              <span className="font-bold text-emerald-600">{areas.find(a => a.name === activeArea)?.roi}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <span className="text-sm text-gray-500">Neighborhood Vibe</span>
              <span className="font-medium text-gray-900">{areas.find(a => a.name === activeArea)?.vibe}</span>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-xl mt-4">
              <p className="text-xs text-indigo-800 leading-relaxed font-medium">
                <span className="font-bold">AI Insight:</span> Demand in {activeArea} has increased by 14% this quarter. Google Search trends indicate high interest from European buyers looking for winter homes.
              </p>
            </div>

            <button className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <Search className="w-4 h-4" /> Search Properties Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
