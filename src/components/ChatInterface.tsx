import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles, Building2, TrendingUp, MapPin } from "lucide-react";
import { generateAssistantResponse } from "../services/geminiService";
import { mockSearchProperties, mockGetMarketTrends, mockGetDLDTransactions, Property, MarketTrend, DLDTransaction } from "../services/mockData";
import { PropertyCard } from "./ui/PropertyCard";
import { MarketChart } from "./ui/MarketChart";
import { DLDTable } from "./ui/DLDTable";
import { Content, Part } from "@google/genai";
import ReactMarkdown from "react-markdown";
import { UserProfile } from "./views/InvestorProfile";

export type Message = {
  id: string;
  role: "user" | "model";
  text: string;
  properties?: Property[];
  marketData?: { location: string; trends: MarketTrend[] };
  dldData?: { area: string; transactions: DLDTransaction[] };
  isLoading?: boolean;
};

interface ChatInterfaceProps {
  investorProfile: UserProfile;
  savedPropertyIds: string[];
  onToggleSave: (id: string) => void;
  onLearnFact?: (fact: string) => void;
}

export function ChatInterface({ investorProfile, savedPropertyIds, onToggleSave, onLearnFact }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: `Welcome to MyDubai.io, ${investorProfile.name || 'investor'}. I am your elite real estate concierge. How can I assist you with your investment journey today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Keep track of the actual GenAI history
  const [history, setHistory] = useState<Content[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");
    
    const newUserMsg: Message = { id: Date.now().toString(), role: "user", text: userText };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    const newHistory: Content[] = [...history, { role: "user", parts: [{ text: userText }] }];
    
    try {
      await processTurn(newHistory);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "model", text: "I apologize, but I encountered an error processing your request. Please try again." },
      ]);
      setIsLoading(false);
    }
  };

  const processTurn = async (currentHistory: Content[]) => {
    const response = await generateAssistantResponse(currentHistory, investorProfile);
    
    const modelParts = response.candidates?.[0]?.content?.parts || [];
    const functionCalls = response.functionCalls;
    
    let textResponse = "";
    for (const part of modelParts) {
      if (part.text) {
        textResponse += part.text;
      }
    }

    const newModelMsg: Message = {
      id: Date.now().toString(),
      role: "model",
      text: textResponse,
    };

    let updatedHistory = [...currentHistory, { role: "model", parts: modelParts }];

    if (functionCalls && functionCalls.length > 0) {
      const functionResponses: Part[] = [];
      
      for (const call of functionCalls) {
        if (call.name === "searchProperties") {
          const args = call.args as any;
          const properties = mockSearchProperties(args);
          newModelMsg.properties = properties;
          
          functionResponses.push({
            functionResponse: {
              name: call.name,
              response: { properties },
            },
          });
        } else if (call.name === "getMarketTrends") {
          const args = call.args as any;
          const trends = mockGetMarketTrends(args.location);
          newModelMsg.marketData = { location: args.location, trends };
          
          functionResponses.push({
            functionResponse: {
              name: call.name,
              response: { trends },
            },
          });
        } else if (call.name === "getDLDTransactions") {
          const args = call.args as any;
          const transactions = mockGetDLDTransactions(args.area);
          newModelMsg.dldData = { area: args.area, transactions };
          
          functionResponses.push({
            functionResponse: {
              name: call.name,
              response: { transactions },
            },
          });
        } else if (call.name === "updateLearnedFacts") {
          const args = call.args as any;
          if (onLearnFact && args.fact) {
            onLearnFact(args.fact);
          }
          
          // Add a visual indicator to the chat
          newModelMsg.text += `\n\n*🧠 I've noted that down: ${args.fact}*`;
          
          functionResponses.push({
            functionResponse: {
              name: call.name,
              response: { success: true },
            },
          });
        }
      }
      
      setMessages((prev) => [...prev, newModelMsg]);
      
      // Send function responses back to the model to get a final natural language summary
      updatedHistory.push({ role: "user", parts: functionResponses });
      
      // Recursive call to get the final text response after function execution
      const finalResponse = await generateAssistantResponse(updatedHistory, investorProfile);
      const finalParts = finalResponse.candidates?.[0]?.content?.parts || [];
      
      let finalText = "";
      for (const part of finalParts) {
        if (part.text) finalText += part.text;
      }
      
      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        // Preserve any "noted down" indicators added during function execution
        const hasIndicator = lastMsg.text.includes("🧠");
        const newText = finalText ? (hasIndicator ? lastMsg.text + "\n\n" + finalText : finalText) : lastMsg.text;
        
        return [
          ...prev.slice(0, -1),
          { ...lastMsg, text: newText },
        ];
      });
      
      setHistory([...updatedHistory, { role: "model", parts: finalParts }]);
      setIsLoading(false);
      
    } else {
      setMessages((prev) => [...prev, newModelMsg]);
      setHistory(updatedHistory);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#fcfcfc]">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-4xl mx-auto ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`flex gap-4 max-w-[85%] ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.role === "user"
                    ? "bg-gray-900 text-white"
                    : "bg-[#d4af37] text-white shadow-md shadow-[#d4af37]/20"
                }`}
              >
                {msg.role === "user" ? "U" : <Sparkles className="w-5 h-5" />}
              </div>
              
              <div className="flex flex-col gap-4 min-w-0 w-full">
                {msg.text && (
                  <div
                    className={`px-6 py-4 rounded-3xl text-[15px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gray-900 text-white rounded-tr-sm"
                        : "bg-white border border-black/5 shadow-sm text-gray-800 rounded-tl-sm"
                    }`}
                  >
                    {msg.role === "model" ? (
                      <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-a:text-[#d4af37]">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                )}

                {msg.marketData && (
                  <div className="w-full mt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <MarketChart data={msg.marketData.trends} location={msg.marketData.location} />
                  </div>
                )}

                {msg.dldData && (
                  <div className="w-full mt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <DLDTable transactions={msg.dldData.transactions} area={msg.dldData.area} />
                  </div>
                )}

                {msg.properties && msg.properties.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 w-full animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                    {msg.properties.map((prop) => (
                      <PropertyCard 
                        key={prop.id} 
                        property={prop} 
                        isSaved={savedPropertyIds.includes(prop.id)}
                        onToggleSave={() => onToggleSave(prop.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex flex-col max-w-4xl mx-auto items-start">
            <div className="flex gap-4 max-w-[85%] flex-row">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d4af37] text-white shadow-md shadow-[#d4af37]/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="px-6 py-4 rounded-3xl bg-white border border-black/5 shadow-sm text-gray-800 rounded-tl-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                <span className="text-sm text-gray-500">Analyzing market data...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 md:p-6 bg-white border-t border-black/5">
        <div className="max-w-4xl mx-auto relative flex items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Downtown Dubai penthouses, Marina ROI, or general market trends..."
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-6 pr-16 py-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37] resize-none h-[60px] shadow-sm transition-all"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="max-w-4xl mx-auto mt-3 flex gap-4 justify-center text-xs text-gray-500 font-medium">
          <button onClick={() => setInput("Show me luxury penthouses in Downtown Dubai")} className="hover:text-[#d4af37] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 hover:border-[#d4af37]/30">
            <Building2 className="w-3.5 h-3.5" /> Penthouses
          </button>
          <button onClick={() => setInput("What are the recent DLD transactions in Palm Jumeirah?")} className="hover:text-[#d4af37] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 hover:border-[#d4af37]/30">
            <TrendingUp className="w-3.5 h-3.5" /> DLD Transactions
          </button>
          <button onClick={() => setInput("Find villas with high ROI")} className="hover:text-[#d4af37] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 hover:border-[#d4af37]/30">
            <MapPin className="w-3.5 h-3.5" /> High ROI Villas
          </button>
        </div>
      </div>
    </div>
  );
}
