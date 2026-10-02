// Simulated Training Data for Keyword Research
export const KEYWORDS_DATA = [
  {
    keyword: "Digital Marketing Agency in Salem",
    volume: 1800,
    kd: 42,
    cpc: 7.50,
    intent: "Commercial",
    trend: "+15%",
    difficultyLabel: "Medium",
    related: ["Digital marketing services Salem", "Best marketing company Salem", "Salem digital agency"],
    isTarget: true
  },
  {
    keyword: "SEO Services in Salem",
    volume: 1200,
    kd: 38,
    cpc: 8.20,
    intent: "Transactional",
    trend: "+22%",
    difficultyLabel: "Medium",
    related: ["Local SEO Salem", "SEO consultant Salem OR", "Affordable SEO Salem"],
    isTarget: true
  },
  {
    keyword: "What is On-Page SEO?",
    volume: 14500,
    kd: 68,
    cpc: 2.10,
    intent: "Informational",
    trend: "+5%",
    difficultyLabel: "Hard",
    related: ["On page SEO checklist", "How to optimize title tags", "On page vs off page SEO"],
    isTarget: false
  },
  {
    keyword: "Best Social Media Agency Salem Oregon",
    volume: 480,
    kd: 24,
    cpc: 4.80,
    intent: "Commercial",
    trend: "+8%",
    difficultyLabel: "Easy",
    related: ["Facebook ads Salem", "Instagram marketing Salem"],
    isTarget: false
  },
  {
    keyword: "GreenLeaf Digital Marketing login",
    volume: 210,
    kd: 5,
    cpc: 0.50,
    intent: "Navigational",
    trend: "0%",
    difficultyLabel: "Easy",
    related: ["GreenLeaf Salem contact", "GreenLeaf customer portal"],
    isTarget: false
  },
  {
    keyword: "How to fix orphan pages in SEO",
    volume: 3200,
    kd: 45,
    cpc: 3.40,
    intent: "Informational",
    trend: "+12%",
    difficultyLabel: "Medium",
    related: ["Internal link audit tool", "Finding unlinked pages"],
    isTarget: false
  },
  {
    keyword: "Hire local SEO specialist Salem OR",
    volume: 350,
    kd: 29,
    cpc: 9.10,
    intent: "Transactional",
    trend: "+18%",
    difficultyLabel: "Easy",
    related: ["SEO agency price Salem", "Local business marketing consultant"],
    isTarget: false
  }
];

export const SEARCH_INTENT_QUIZ = [
  {
    id: 1,
    keyword: "best SEO tools for beginners",
    intent: "Commercial",
    options: ["Informational", "Commercial", "Navigational", "Transactional"],
    explanation: "Users searching for 'best [product/tool]' are evaluating options before making a purchase decision, indicating Commercial Investigation intent."
  },
  {
    id: 2,
    keyword: "how to create a sitemap xml",
    intent: "Informational",
    options: ["Informational", "Commercial", "Navigational", "Transactional"],
    explanation: "Queries starting with 'how to' seek knowledge or instructions, making it Informational intent."
  },
  {
    id: 3,
    keyword: "buy SEO audit report template",
    intent: "Transactional",
    options: ["Informational", "Commercial", "Navigational", "Transactional"],
    explanation: "Words like 'buy', 'order', or 'pricing' signify immediate Transactional purchase intent."
  },
  {
    id: 4,
    keyword: "GreenLeaf Marketing address Salem",
    intent: "Navigational",
    options: ["Informational", "Commercial", "Navigational", "Transactional"],
    explanation: "The user is looking for a specific brand or physical destination, which is Navigational intent."
  }
];
