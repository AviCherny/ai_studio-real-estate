import { useState } from "react";
import { Sparkles, Heart, X, Check, Eye, Lock } from "lucide-react";
import { TodoBlock } from "../ui/TodoBlock";

// Mock images for the vision board
const images = [
  { id: 1, url: "https://picsum.photos/seed/luxury1/600/800", style: "Minimalist Waterfront", vibe: "Serene" },
  { id: 2, url: "https://picsum.photos/seed/luxury2/600/800", style: "Brutalist Concrete", vibe: "Edgy" },
  { id: 3, url: "https://picsum.photos/seed/luxury3/600/800", style: "Classic Opulence", vibe: "Traditional" },
  { id: 4, url: "https://picsum.photos/seed/luxury4/600/800", style: "Eco-Modern", vibe: "Sustainable" },
  { id: 5, url: "https://picsum.photos/seed/luxury5/600/800", style: "High-Rise Glass", vibe: "Urban" },
  { id: 6, url: "https://picsum.photos/seed/luxury6/600/800", style: "Desert Retreat", vibe: "Private" },
];

interface VisionBoardProps {
  isPro: boolean;
}

export function VisionBoard({ isPro }: VisionBoardProps) {
  const [liked, setLiked] = useState<number[]>([]);
  const [disliked, setDisliked] = useState<number[]>([]);
  const [generating, setGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleLike = (id: number) => {
    const newLiked = [...liked, id];
    setLiked(newLiked);
    checkCompletion(newLiked, disliked);
  };

  const handleDislike = (id: number) => {
    const newDisliked = [...disliked, id];
    setDisliked(newDisliked);
    checkCompletion(liked, newDisliked);
  };

  const checkCompletion = (currentLiked: number[], currentDisliked: number[]) => {
    if (currentLiked.length + currentDisliked.length >= images.length) {
      setGenerating(true);
      setTimeout(() => {
        setGenerating(false);
        setShowResult(true);
      }, 3000); // Simulate AI generation
    }
  };

  const visibleImages = images.filter(img => !liked.includes(img.id) && !disliked.includes(img.id));

  return (
    <div className="flex flex-col h-full bg-[#fcfcfc] overflow-y-auto w-full font-sans">
      {/* Header */}
      <div className="bg-white border-b border-black/5 px-6 py-8 text-center sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex-1"></div>
          <div className="flex-1 text-center">
            <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <Eye className="w-6 h-6 text-indigo-600" /> Architectural DNA
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Swipe on aesthetics to train your AI Concierge. We'll decode your psychographic profile and generate your ultimate Dubai investment thesis.
            </p>
          </div>
          <div className="flex-1 flex justify-end">
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 py-8 flex flex-col items-center justify-center min-h-[60vh]">
        
        {generating ? (
          <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-1000">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 border-4 border-indigo-200 rounded-full animate-ping opacity-75"></div>
              <Sparkles className="w-10 h-10 text-indigo-600 animate-pulse" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">Synthesizing Your DNA...</h2>
            <p className="text-gray-500 text-center max-w-md">
              Analyzing your preference for {images.find(i => i.id === liked[0])?.style || 'luxury'} and {images.find(i => i.id === liked[1])?.style || 'modernity'}. Generating your bespoke portfolio.
            </p>
          </div>
        ) : showResult ? (
          <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Your Psychographic Profile is Ready</h2>
              <p className="text-gray-500">We've mapped your aesthetic and risk preferences.</p>
            </div>

            <TodoBlock 
              title="Save Profile to User Graph DB"
              description="The swipe data (liked/disliked styles) needs to be persisted to a graph database (e.g., Neo4j) to build the psychographic moat."
              action="POST /api/users/{id}/psychographics -> Store { styles: [...], riskTolerance: 'calculated' }"
            />

            <div className="mt-8 bg-white border border-gray-200 rounded-3xl p-8 shadow-xl relative overflow-hidden">
              {!isPro ? (
                <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-8">
                  <Lock className="w-12 h-12 text-[#d4af37] mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Unlock Your Investment Thesis</h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    Free users can train the AI, but generating the bespoke 15-page investment thesis requires Pro.
                  </p>
                  <button className="px-8 py-4 bg-[#d4af37] text-white font-bold rounded-xl hover:bg-[#c19b2e] transition-colors shadow-lg shadow-[#d4af37]/30 cursor-not-allowed opacity-80">
                    Upgrade to Pro ($199/mo)
                  </button>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-xl font-bold text-gray-900">AI Investment Thesis</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Based on your strong preference for <strong>{images.find(i => i.id === liked[0])?.style || 'Eco-Modern'}</strong> and <strong>{images.find(i => i.id === liked[1])?.style || 'High-Rise Glass'}</strong>, your profile indicates a high affinity for sustainable luxury with urban connectivity. 
                    <br/><br/>
                    We recommend targeting off-plan developments in <strong>Dubai Creek Harbour</strong> or <strong>Al Barari</strong>, focusing on properties with high ESG ratings, which currently show a 12% premium in secondary market liquidity.
                  </p>
                  
                  <TodoBlock 
                    title="Generate Thesis via Gemini Pro"
                    description="This text is currently static. It needs to be generated dynamically by passing the user's liked images and current market data to Gemini Pro."
                    action="Call Gemini Pro API with prompt: 'Generate investment thesis based on these architectural preferences: [styles]'"
                    isProGate={true}
                  />

                  <button className="w-full mt-6 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-xl">
                    Download Full PDF Report
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : visibleImages.length > 0 ? (
          <div className="relative w-full max-w-md aspect-[3/4] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95">
            <img 
              src={visibleImages[0].url} 
              alt="Architecture" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h3 className="font-serif text-2xl font-bold mb-1">{visibleImages[0].style}</h3>
              <p className="text-sm text-white/80 uppercase tracking-widest">{visibleImages[0].vibe}</p>
            </div>
            
            {/* Controls */}
            <div className="absolute bottom-6 right-6 flex gap-4">
              <button 
                onClick={() => handleDislike(visibleImages[0].id)}
                className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition-colors border border-white/30"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={() => handleLike(visibleImages[0].id)}
                className="w-14 h-14 bg-[#d4af37] rounded-full flex items-center justify-center hover:bg-[#c4a030] transition-colors shadow-lg shadow-[#d4af37]/40"
              >
                <Heart className="w-6 h-6 text-white fill-white" />
              </button>
            </div>
          </div>
        ) : null}

        {/* Progress Indicator */}
        {!generating && !showResult && visibleImages.length > 0 && (
          <div className="mt-8 flex gap-2">
            {images.map((img, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all ${
                  liked.includes(img.id) ? "w-8 bg-[#d4af37]" : 
                  disliked.includes(img.id) ? "w-4 bg-gray-300" : "w-4 bg-gray-200"
                }`}
              ></div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
