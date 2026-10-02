// Simulated Training Data for Backlink Marketplace & Profile
export const MARKETPLACE_BACKLINKS = [
  {
    id: "bl-1",
    domain: "OregonBusinessJournal.com",
    topic: "Business & Economy",
    authority: 78,
    relevance: 92,
    traffic: "140K/mo",
    linkType: "Editorial Article",
    followType: "DoFollow",
    spamRisk: "Low (2%)",
    cost: "Free (Earned via PR)",
    description: "High-trust local publication featuring growing Salem tech and marketing businesses.",
    educationalWhy: "Topically and geographically relevant editorial links pass strong local search authority and referral traffic."
  },
  {
    id: "bl-2",
    domain: "GlobalTechDirectory24.net",
    topic: "General Directory",
    authority: 22,
    relevance: 15,
    traffic: "200/mo",
    linkType: "Directory Footer",
    followType: "DoFollow",
    spamRisk: "High (68%)",
    cost: "Instant Submission",
    description: "Automated link directory indexing thousands of random domains.",
    educationalWhy: "Warning: Search algorithms flag high-volume, low-relevance link networks. Acquiring this link can trigger a manual spam action or rank demotion."
  },
  {
    id: "bl-3",
    domain: "SalemChamberOfCommerce.org",
    topic: "Local Community",
    authority: 65,
    relevance: 95,
    traffic: "18K/mo",
    linkType: "Member Directory",
    followType: "DoFollow",
    spamRisk: "Low (1%)",
    cost: "Chamber Membership",
    description: "Official local business listing for Salem, Oregon companies.",
    educationalWhy: "Local Chamber of Commerce links validate physical business NAP (Name, Address, Phone) authority and boost Google Map Pack presence."
  },
  {
    id: "bl-4",
    domain: "SearchMarketingToday.io",
    topic: "Digital Marketing",
    authority: 84,
    relevance: 98,
    traffic: "320K/mo",
    linkType: "Guest Column",
    followType: "DoFollow",
    spamRisk: "Low (3%)",
    cost: "Content Contribution",
    description: "Industry-leading digital marketing blog covering technical SEO case studies.",
    educationalWhy: "Niche authority links signal strong topical relevance for your core service keywords."
  },
  {
    id: "bl-5",
    domain: "FreeBacklinkGenerator.xyz",
    topic: "Spam Network",
    authority: 12,
    relevance: 5,
    traffic: "0/mo",
    linkType: "Blog Comment",
    followType: "NoFollow",
    spamRisk: "Critical (89%)",
    cost: "Automated Script",
    description: "Spam link farm auto-posting links on unmoderated blogs.",
    educationalWhy: "Never use automated link generation tools. Search engines ignore or penalize links from known spam patterns."
  }
];

export const CURRENT_BACKLINK_PROFILE = {
  totalBacklinks: 137,
  referringDomains: 42,
  doFollowRatio: 78, // %
  noFollowRatio: 22, // %
  topReferringDomains: [
    { domain: "SalemChamber.org", dr: 65, links: 4, status: "Healthy" },
    { domain: "OregonTechTimes.com", dr: 58, links: 12, status: "Healthy" },
    { domain: "SalemLocalNews.net", dr: 44, links: 18, status: "Healthy" },
    { domain: "FreeLinkFarm123.com", dr: 8, links: 45, status: "Toxic" },
    { domain: "RandomForumUser.org", dr: 14, links: 22, status: "Suspicious" }
  ],
  anchorTextDistribution: [
    { type: "Brand Name", text: "GreenLeaf Digital Marketing", percentage: 45 },
    { type: "Exact Match", text: "Digital Marketing Agency Salem", percentage: 28 }, // 🟠 Warning if exact match > 30%
    { type: "Naked URL", text: "greenleafmarketing.com", percentage: 18 },
    { type: "Generic", text: "click here / website", percentage: 9 }
  ]
};
