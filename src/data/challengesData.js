export const CHALLENGES_DATA = [
  {
    id: "ch-1",
    level: "Beginner",
    title: "Fix the Homepage Missing Meta Description",
    xp: 50,
    category: "On-Page SEO",
    description: "The homepage currently lacks a meta description tag, hurting organic search CTR.",
    task: "Navigate to the Page Editor for 'Home' and add a compelling meta description between 120 and 160 characters containing 'Digital Marketing Agency in Salem'.",
    targetPageId: "home",
    checkFn: (website) => {
      const home = website.pages.find(p => p.id === "home");
      return home && home.metaDescription.length >= 100 && home.metaDescription.length <= 170;
    }
  },
  {
    id: "ch-2",
    level: "Beginner",
    title: "Add ALT Text to Homepage Image",
    xp: 50,
    category: "Image SEO",
    description: "Search engines cannot read images without ALT text.",
    task: "Go to Image SEO or Page Editor for 'Home' and set descriptive ALT text for IMG_8829.jpg.",
    targetPageId: "home",
    checkFn: (website) => {
      const home = website.pages.find(p => p.id === "home");
      const img = home?.images?.[0];
      return img && img.altText && img.altText.trim().length >= 5;
    }
  },
  {
    id: "ch-3",
    level: "Intermediate",
    title: "Unblock SEO Services Page in robots.txt",
    xp: 100,
    category: "Technical SEO",
    description: "The SEO Services landing page is accidentally disallowed in robots.txt!",
    task: "Open the Technical SEO Lab, edit robots.txt, and remove 'Disallow: /services/seo'.",
    checkFn: (website) => {
      return !website.robotsTxt.includes("Disallow: /services/seo");
    }
  },
  {
    id: "ch-4",
    level: "Intermediate",
    title: "Fix Orphan Page & Add Internal Link to Blog",
    xp: 100,
    category: "Internal Linking",
    description: "The Blog page is an orphan page with 0 incoming internal links.",
    task: "Go to the Page Editor or Internal Linking Lab and add an internal link pointing to '/blog' from the Home or Services page.",
    checkFn: (website) => {
      // Check if any page links to blog
      return website.pages.some(p => p.id !== "blog" && p.internalLinks.some(link => link.targetId === "blog" || link.url === "/blog"));
    }
  },
  {
    id: "ch-5",
    level: "Advanced",
    title: "Enable HTTPS & Add Missing Sitemap URLs",
    xp: 250,
    category: "Technical SEO",
    description: "Security and complete sitemap indexing are vital for modern SEO.",
    task: "Toggle HTTPS to Enabled and add '/blog' and '/contact' to the XML sitemap in the Technical SEO Lab.",
    checkFn: (website) => {
      const hasBlogInSitemap = website.sitemap.some(s => s.url.includes("/blog"));
      const hasContactInSitemap = website.sitemap.some(s => s.url.includes("/contact"));
      return website.httpsEnabled && hasBlogInSitemap && hasContactInSitemap;
    }
  }
];
