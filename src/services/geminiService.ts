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

export async function generateAssistantResponse(history: Content[], profile?: UserProfile) {
  const profileContext = profile ? `
Current Investor Profile:
- Name: ${profile.name}
- Budget: ${profile.budget.toLocaleString()} AED
- Primary Goal: ${profile.investmentGoal}
- Preferred Areas: ${profile.preferredAreas.join(", ")}

Tailor your recommendations and tone based on this profile.
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
Always format currency in AED (e.g., AED 2,500,000).
Maintain a sophisticated, luxury concierge tone.
${profileContext}`,
      tools: [{ functionDeclarations: [searchPropertiesDeclaration, getMarketTrendsDeclaration, getDLDTransactionsDeclaration] }],
      temperature: 0.2,
    },
  });
}
