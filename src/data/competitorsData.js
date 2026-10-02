// Simulated Training Data for Competitor Benchmark & Gap Analysis
export const COMPETITORS_DATA = [
  {
    id: "comp-a",
    name: "Apex Marketing Salem",
    domain: "apexmarketingsalem.com",
    domainAuthority: 71,
    contentPages: 120,
    referringDomains: 280,
    organicKeywords: 8400,
    organicTraffic: "24.5K/mo",
    scores: {
      onPage: 88,
      technical: 92,
      content: 85,
      offPage: 79,
      performance: 80
    },
    strengths: ["High domain authority", "Deep blog library (120+ pages)", "Strong local news coverage"],
    gaps: ["Page speed is slightly slow (LCP 3.2s)", "Lacks structured schema markup on service pages"]
  },
  {
    id: "comp-b",
    name: "Pacific Rim SEO",
    domain: "pacificrimseo.com",
    domainAuthority: 58,
    contentPages: 80,
    referringDomains: 170,
    organicKeywords: 4900,
    organicTraffic: "12.8K/mo",
    scores: {
      onPage: 82,
      technical: 75,
      content: 78,
      offPage: 64,
      performance: 88
    },
    strengths: ["Fast mobile page speed", "Excellent YouTube & Video SEO integration"],
    gaps: ["Thin content on secondary service pages", "Multiple broken internal links"]
  },
  {
    id: "comp-c",
    name: "Salem Digital Pros",
    domain: "salemdigitalpros.com",
    domainAuthority: 44,
    contentPages: 35,
    referringDomains: 65,
    organicKeywords: 1800,
    organicTraffic: "3.2K/mo",
    scores: {
      onPage: 74,
      technical: 68,
      content: 65,
      offPage: 48,
      performance: 72
    },
    strengths: ["Strong Google Map Pack local listings", "Active social media presence"],
    gaps: ["Missing canonical tags on key pages", "Unoptimized image file sizes"]
  }
];
