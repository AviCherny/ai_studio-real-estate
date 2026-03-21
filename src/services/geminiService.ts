import { GoogleGenAI, Type, FunctionDeclaration, Content } from "@google/genai";
import { UserProfile } from "../components/views/InvestorProfile";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const searchPropertiesDeclaration: FunctionDeclaration = {
  name: "searchProperties",
  description: "Search for real estate properties in Dubai based on user criteria.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      location: {
        type: Type.STRING,
        description: "The neighborhood or area in Dubai, e.g., 'Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah'.",
      },
      propertyType: {
        type: Type.STRING,
        description: "Type of property, e.g., 'Apartment', 'Villa', 'Townhouse', 'Penthouse'.",
      },
      minPrice: {
        type: Type.NUMBER,
        description: "Minimum price in AED.",
      },
      maxPrice: {
        type: Type.NUMBER,
        description: "Maximum price in AED.",
      },
      bedrooms: {
        type: Type.NUMBER,
        description: "Number of bedrooms.",
      },
    },
  },
};

export const getMarketTrendsDeclaration: FunctionDeclaration = {
  name: "getMarketTrends",
  description: "Get current real estate market trends and statistics for a specific area in Dubai.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      location: {
        type: Type.STRING,
        description: "The neighborhood or area in Dubai.",
      },
      metric: {
        type: Type.STRING,
        description: "The metric to retrieve, e.g., 'price_per_sqft', 'rental_yield', 'transaction_volume'.",
      },
    },
    required: ["location"],
  },
};

export const getDLDTransactionsDeclaration: FunctionDeclaration = {
  name: "getDLDTransactions",
  description: "Get official recent transaction records from the Dubai Land Department (DLD) for a specific area.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      area: {
        type: Type.STRING,
        description: "The neighborhood or area in Dubai to fetch transactions for.",
      },
    },
    required: ["area"],
  },
};

export const updateLearnedFactsDeclaration: FunctionDeclaration = {
  name: "updateLearnedFacts",
  description: "Saves a newly learned personal fact or preference about the user to their profile (e.g., 'Has a dog', 'Prefers quiet neighborhoods', 'Works from home').",
  parameters: {
    type: Type.OBJECT,
    properties: {
      fact: {
        type: Type.STRING,
        description: "The personal fact or preference to remember.",
      },
    },
    required: ["fact"],
  },
};

export const analyzeContractDeclaration: FunctionDeclaration = {
  name: "analyzeContract",
  description: "Analyze a real estate contract or SPA (Sales Purchase Agreement) for risks, hidden fees, and terms.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      documentName: {
        type: Type.STRING,
        description: "Name of the document being analyzed.",
      },
    },
    required: ["documentName"],
  },
};

export async function generateAssistantResponse(history: Content[], profile?: UserProfile) {
  const profileContext = profile ? `
Current Investor Profile:
- Name: ${profile.name}
- Budget: ${profile.budget.toLocaleString()} AED
- Primary Goal: ${profile.investmentGoal}
- Preferred Areas: ${profile.preferredAreas.join(", ")}
- Learned Facts (AI Memory): ${profile.learnedFacts && profile.learnedFacts.length > 0 ? profile.learnedFacts.join(", ") : "None yet."}

COMMUNITY & PROFILING INSTRUCTIONS:
You are not just a search engine; you are a community builder and long-term advisor.
- Naturally weave in light, conversational questions occasionally to learn about their lifestyle (e.g., "Do you have any pets?", "Do you commute often?", "Are you looking for a lively community or a quiet retreat?").
- When the user answers and reveals a preference, ALWAYS use the \`updateLearnedFacts\` tool to save it.
- Use these learned facts to highly personalize your recommendations (e.g., if they have a dog, emphasize parks and pet-friendly buildings).
` : "";

  return ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: history,
    config: {
      systemInstruction: `You are MyDubai.io, an elite, highly professional GenAI personal assistant for the Dubai real estate market. 
You help high-net-worth investors and buyers make data-driven decisions. 
Provide concise, professional, and highly insightful answers. 
When asked about properties, use the searchProperties tool to find relevant listings. 
When asked about market trends, use the getMarketTrends tool.
When asked about actual sales, transactions, or proof of value, use the getDLDTransactions tool to fetch official Dubai Land Department data.
When asked to analyze a contract or document, use the analyzeContract tool.
You also have access to Google Search. Use it to fetch real-time news, updates, or current events regarding Dubai real estate if asked.
Always format currency in AED (e.g., AED 2,500,000).
Maintain a sophisticated, luxury concierge tone.
${profileContext}`,
      tools: [
        { functionDeclarations: [searchPropertiesDeclaration, getMarketTrendsDeclaration, getDLDTransactionsDeclaration, updateLearnedFactsDeclaration, analyzeContractDeclaration] },
        { googleSearch: {} }
      ],
      temperature: 0.2,
    },
  });
}
