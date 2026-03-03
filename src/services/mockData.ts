export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  imageUrl: string;
  roi: number;
}

export interface MarketTrend {
  month: string;
  pricePerSqft: number;
  transactionVolume: number;
}

export interface DLDTransaction {
  id: string;
  date: string;
  area: string;
  buildingName: string;
  price: number;
  sqft: number;
  type: string;
}

export const properties: Property[] = [
  {
    id: "p1",
    title: "Luxury Penthouse with Burj Khalifa View",
    location: "Downtown Dubai",
    price: 15000000,
    bedrooms: 4,
    bathrooms: 5,
    sqft: 6500,
    type: "Penthouse",
    imageUrl: "https://picsum.photos/seed/dubai-penthouse/800/600",
    roi: 5.2,
  },
  {
    id: "p2",
    title: "Modern Apartment in Marina Gate",
    location: "Dubai Marina",
    price: 3500000,
    bedrooms: 2,
    bathrooms: 3,
    sqft: 1400,
    type: "Apartment",
    imageUrl: "https://picsum.photos/seed/dubai-marina/800/600",
    roi: 6.8,
  },
  {
    id: "p3",
    title: "Signature Villa on the Fronds",
    location: "Palm Jumeirah",
    price: 28000000,
    bedrooms: 6,
    bathrooms: 7,
    sqft: 12000,
    type: "Villa",
    imageUrl: "https://picsum.photos/seed/dubai-palm/800/600",
    roi: 4.5,
  },
  {
    id: "p4",
    title: "Off-plan Investment Opportunity",
    location: "Business Bay",
    price: 1800000,
    bedrooms: 1,
    bathrooms: 2,
    sqft: 850,
    type: "Apartment",
    imageUrl: "https://picsum.photos/seed/dubai-businessbay/800/600",
    roi: 8.1,
  },
  {
    id: "p5",
    title: "Exclusive Mansion in Emirates Hills",
    location: "Emirates Hills",
    price: 45000000,
    bedrooms: 7,
    bathrooms: 8,
    sqft: 18000,
    type: "Villa",
    imageUrl: "https://picsum.photos/seed/dubai-emirateshills/800/600",
    roi: 3.8,
  },
  {
    id: "p6",
    title: "High-floor Apartment with Sea View",
    location: "Jumeirah Beach Residence",
    price: 4200000,
    bedrooms: 3,
    bathrooms: 4,
    sqft: 2100,
    type: "Apartment",
    imageUrl: "https://picsum.photos/seed/dubai-jbr/800/600",
    roi: 6.2,
  }
];

export function mockSearchProperties(criteria: any): Property[] {
  console.log("Searching properties with criteria:", criteria);
  let results = properties;
  
  if (criteria.location) {
    results = results.filter(p => p.location.toLowerCase().includes(criteria.location.toLowerCase()));
  }
  if (criteria.propertyType) {
    results = results.filter(p => p.type.toLowerCase() === criteria.propertyType.toLowerCase());
  }
  if (criteria.minPrice) {
    results = results.filter(p => p.price >= criteria.minPrice);
  }
  if (criteria.maxPrice) {
    results = results.filter(p => p.price <= criteria.maxPrice);
  }
  if (criteria.bedrooms) {
    results = results.filter(p => p.bedrooms >= criteria.bedrooms);
  }
  
  // Return top 3 matches or just random if no strict match to keep the demo engaging
  return results.length > 0 ? results.slice(0, 3) : properties.slice(0, 2);
}

export function mockGetMarketTrends(location: string): MarketTrend[] {
  console.log("Getting market trends for:", location);
  const basePrice = location.toLowerCase().includes("downtown") ? 2500 : 
                    location.toLowerCase().includes("palm") ? 3000 : 1800;
                    
  return [
    { month: "Jan", pricePerSqft: basePrice * 0.95, transactionVolume: 120 },
    { month: "Feb", pricePerSqft: basePrice * 0.96, transactionVolume: 145 },
    { month: "Mar", pricePerSqft: basePrice * 0.98, transactionVolume: 160 },
    { month: "Apr", pricePerSqft: basePrice * 1.02, transactionVolume: 190 },
    { month: "May", pricePerSqft: basePrice * 1.05, transactionVolume: 210 },
    { month: "Jun", pricePerSqft: basePrice * 1.08, transactionVolume: 250 },
  ];
}

export function mockGetDLDTransactions(area: string): DLDTransaction[] {
  console.log("Getting DLD transactions for:", area);
  const today = new Date();
  const format = (d: Date) => d.toISOString().split('T')[0];
  
  const basePrice = area.toLowerCase().includes("downtown") ? 2500 : 
                    area.toLowerCase().includes("palm") ? 3000 : 1800;

  return [
    {
      id: "tx1",
      date: format(new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000)),
      area: area,
      buildingName: `${area} Tower A`,
      price: basePrice * 1200,
      sqft: 1200,
      type: "Apartment",
    },
    {
      id: "tx2",
      date: format(new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000)),
      area: area,
      buildingName: `${area} Residences`,
      price: basePrice * 850,
      sqft: 850,
      type: "Apartment",
    },
    {
      id: "tx3",
      date: format(new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000)),
      area: area,
      buildingName: `Signature Villa ${area}`,
      price: basePrice * 5500,
      sqft: 5500,
      type: "Villa",
    },
    {
      id: "tx4",
      date: format(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)),
      area: area,
      buildingName: `${area} Heights`,
      price: basePrice * 1500,
      sqft: 1500,
      type: "Apartment",
    }
  ];
}
