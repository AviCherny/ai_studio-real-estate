import { Wrench } from "lucide-react";

interface TodoBlockProps {
  title: string;
  description: string;
  action: string;
  isProGate?: boolean;
}

export function TodoBlock({ title, description, action, isProGate = false }: TodoBlockProps) {
  return (
    <div className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center text-center my-4 ${
      isProGate 
        ? "border-[#d4af37]/50 bg-[#d4af37]/5" 
        : "border-amber-500/50 bg-amber-500/5"
    }`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
        isProGate ? "bg-[#d4af37]/20" : "bg-amber-500/20"
      }`}>
        <Wrench className={`w-5 h-5 ${isProGate ? "text-[#d4af37]" : "text-amber-500"}`} />
      </div>
      <h4 className={`font-bold mb-2 ${isProGate ? "text-[#d4af37]" : "text-amber-500"}`}>
        {isProGate ? "PRO GATE / TODO: " : "TODO: "}{title}
      </h4>
      <p className="text-sm text-gray-400 mb-4 max-w-md">{description}</p>
      <div className={`text-xs font-mono px-3 py-1.5 rounded-lg border ${
        isProGate 
          ? "bg-black/50 text-[#d4af37] border-[#d4af37]/30" 
          : "bg-black/50 text-amber-300 border-amber-500/30"
      }`}>
        Action: {action}
      </div>
    </div>
  );
}
