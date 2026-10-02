// Initial Practice Website: GreenLeaf Digital Marketing
export const INITIAL_WEBSITE_DATA = {
  domain: "greenleafmarketing.com",
  siteName: "GreenLeaf Digital Marketing",
  primaryKeyword: "Digital Marketing Agency in Salem",
  httpsEnabled: false, // 🔴 Flaw: HTTP instead of HTTPS
  robotsTxt: `User-agent: *
Disallow: /admin/
Disallow: /services/seo  # 🔴 Flaw: Blocking important SEO landing page!`,
  sitemap: [
    { url: "https://greenleafmarketing.com/", lastmod: "2026-09-01", priority: "1.0", changefreq: "daily" },
    { url: "https://greenleafmarketing.com/about", lastmod: "2026-08-15", priority: "0.8", changefreq: "monthly" },
    { url: "https://greenleafmarketing.com/services", lastmod: "2026-08-20", priority: "0.9", changefreq: "weekly" },
    { url: "https://greenleafmarketing.com/services/seo", lastmod: "2026-08-20", priority: "0.9", changefreq: "weekly" },
    { url: "https://greenleafmarketing.com/services/social-media", lastmod: "2026-08-20", priority: "0.7", changefreq: "monthly" }
    // 🟠 Flaw: Missing /blog and /contact from sitemap
  ],
  performanceMetrics: {
    lcp: 3.8, // 🟠 Needs improvement (target < 2.5s)
    inp: 280, // 🟠 Needs improvement (target < 200ms)
    cls: 0.22, // 🔴 Poor (target < 0.1)
    fcp: 2.1,
    ttfb: 0.8,
    optimizations: {
      compressImages: false,
      lazyLoadImages: false,
      minifyCss: false,
      reduceJs: false,
      enableCaching: false,
      optimizeFonts: false
    }
  },
  pages: [
    {
      id: "home",
      name: "Home",
      slug: "/",
      title: "Home | GreenLeaf Digital Marketing",
      metaTitle: "Home - GreenLeaf", // 🟠 Too short (16 chars)
      metaDescription: "", // 🔴 Flaw: Missing Meta Description
      h1: "Welcome to Our Digital Marketing Company", // 🟠 Flaw: Missing primary keyword "Agency in Salem"
      h2s: ["Our Core Solutions", "Why Salem Businesses Choose Us", "Client Testimonials"],
      h3s: ["SEO Strategy", "Social Media Management", "Web Design"],
      focusKeyword: "Digital Marketing Agency in Salem",
      secondaryKeywords: "Salem SEO, Digital Marketing Salem, Local Marketing",
      content: `Welcome to GreenLeaf Digital Marketing! We are a digital marketing company based in Salem Oregon. We provide business growth solutions, web design, and social media campaigns for local businesses. Contact us today to discuss your digital marketing strategy and grow your brand in Salem.`,
      images: [
        {
          id: "img1",
          fileName: "IMG_8829.jpg", // 🟠 Flaw: Unoptimized file name
          altText: "", // 🔴 Flaw: Missing ALT text
          title: "Team at work",
          fileSize: "2.4 MB", // 🟠 Oversized image
          dimensions: "2400x1600",
          format: "JPEG",
          lazyLoading: false,
          compressed: false
        }
      ],
      canonicalUrl: "", // 🔴 Flaw: Missing Canonical URL
      internalLinks: [
        { text: "View Our Services", targetId: "services", url: "/services" }
      ],
      externalLinks: [],
      isOrphan: false
    },
    {
      id: "about",
      name: "About Us",
      slug: "/about",
      title: "About GreenLeaf Marketing Team",
      metaTitle: "About GreenLeaf Digital Marketing | Salem Team",
      metaDescription: "Learn about GreenLeaf Digital Marketing, a leading digital agency offering SEO and marketing services in Salem Oregon.",
      h1: "About Our Salem Marketing Team",
      h2s: ["Our Story & Mission", "Meet the Experts"],
      h3s: ["Our Values"],
      focusKeyword: "GreenLeaf Digital Marketing",
      secondaryKeywords: "Salem Marketing Team, About GreenLeaf",
      content: `Founded in Salem, GreenLeaf Digital Marketing has helped dozens of small and medium businesses expand their search visibility and convert leads. Our team combines technical SEO, creative content, and targeted ad management.`,
      images: [
        {
          id: "img2",
          fileName: "IMG_9042.png", // 🟠 Flaw: Non-descriptive file name
          altText: "Marketing team photo",
          title: "Salem Team",
          fileSize: "1.8 MB",
          dimensions: "1920x1080",
          format: "PNG",
          lazyLoading: false,
          compressed: false
        }
      ],
      canonicalUrl: "https://greenleafmarketing.com/about",
      internalLinks: [
        { text: "Home", targetId: "home", url: "/" }
      ],
      externalLinks: [],
      isOrphan: false
    },
    {
      id: "services",
      name: "Services",
      slug: "/services",
      title: "Services - GreenLeaf", // 🟠 Flaw: Duplicate/generic title
      metaTitle: "Services - GreenLeaf",
      metaDescription: "We offer SEO, social media, web design, and content marketing services in Salem.",
      h1: "Our Digital Marketing Services",
      h2s: ["Search Engine Optimization", "Social Media Marketing", "Content Creation"],
      h3s: [],
      focusKeyword: "Digital Marketing Services",
      secondaryKeywords: "SEO Salem, Social Media Salem",
      content: `Explore our full spectrum of internet marketing solutions tailored for businesses in Salem, Oregon. From technical search audits to social campaigns, we drive measurable ROI.`,
      images: [],
      canonicalUrl: "https://greenleafmarketing.com/services",
      internalLinks: [
        { text: "SEO Services", targetId: "seo-services", url: "/services/seo" },
        { text: "Social Media Services", targetId: "social-media", url: "/services/social-media" }
      ],
      externalLinks: [],
      isOrphan: false
    },
    {
      id: "seo-services",
      name: "SEO Services",
      slug: "/services/seo",
      title: "Best SEO Services in Salem | Boost Google Rankings | GreenLeaf",
      metaTitle: "Best SEO Services in Salem | Boost Google Rankings | GreenLeaf",
      metaDescription: "Affordable search engine optimization services in Salem Oregon. Rank #1 on Google with GreenLeaf Digital Marketing today.",
      h1: "SEO Services in Salem",
      h2s: ["Local SEO Strategy", "On-Page & Technical Audits", "Link Building Solutions"],
      h3s: ["Keyword Research", "On-Page Optimization"],
      focusKeyword: "SEO Services in Salem",
      secondaryKeywords: "Salem SEO Agency, Local SEO Salem, Search Engine Optimization Salem",
      content: `Our SEO services in Salem help local companies get discovered on search engines. We handle technical audits, keyword optimization, local citations, and high-quality link strategies. Contact our Salem SEO experts today.`,
      images: [
        {
          id: "img3",
          fileName: "salem-seo-chart.jpg",
          altText: "SEO Growth Chart for Salem Business",
          title: "SEO Analytics",
          fileSize: "180 KB",
          dimensions: "800x600",
          format: "JPEG",
          lazyLoading: true,
          compressed: true
        }
      ],
      canonicalUrl: "", // 🔴 Flaw: Missing Canonical Tag
      internalLinks: [
        { text: "Back to All Services", targetId: "services", url: "/services" }
      ],
      externalLinks: [],
      isOrphan: false,
      multipleH1s: true // 🔴 Flaw: Multiple H1 tags on page!
    },
    {
      id: "social-media",
      name: "Social Media Marketing",
      slug: "/services/social-media",
      title: "Social Media Management & Marketing | GreenLeaf Salem",
      metaTitle: "Social Media Management & Marketing | GreenLeaf Salem",
      metaDescription: "Engage your audience with professional social media management services for Salem businesses.",
      h1: "Social Media Marketing Services",
      h2s: ["Facebook & Instagram Ads", "Content Planning"],
      h3s: [],
      focusKeyword: "Social Media Marketing Salem",
      secondaryKeywords: "Social Media Management Salem",
      content: `Build a loyal brand following across Facebook, Instagram, and LinkedIn. Our Salem digital agency creates customized social content calendars and high-converting ad funnels.`,
      images: [],
      canonicalUrl: "https://greenleafmarketing.com/services/social-media",
      internalLinks: [
        { text: "Special Offer Package", targetId: "broken-page", url: "/services/special-promo-deal" } // 🔴 Flaw: Broken internal link!
      ],
      externalLinks: [],
      isOrphan: false
    },
    {
      id: "blog",
      name: "Blog",
      slug: "/blog",
      title: "Blog - Latest SEO & Digital Marketing Insights | GreenLeaf",
      metaTitle: "Blog - Latest SEO & Digital Marketing Insights | GreenLeaf",
      metaDescription: "Read our latest blog posts on local SEO strategies, content marketing tips, and Google algorithm updates in Salem.",
      h1: "Digital Marketing Blog",
      h2s: ["Recent Articles", "SEO Guides"],
      h3s: [],
      focusKeyword: "Digital Marketing Blog Salem",
      secondaryKeywords: "SEO Tips, Marketing Insights",
      content: `Welcome to the GreenLeaf Digital Marketing blog. Stay updated on modern search engine trends, Google updates, local business marketing tactics, and conversion strategies.`,
      images: [],
      canonicalUrl: "https://greenleafmarketing.com/blog",
      internalLinks: [],
      externalLinks: [],
      isOrphan: true // 🔴 Flaw: Orphan Page (No incoming internal links!)
    },
    {
      id: "contact",
      name: "Contact Us",
      slug: "/contact",
      title: "Contact Us | GreenLeaf Digital Marketing Agency",
      metaTitle: "Contact Us | GreenLeaf Digital Marketing Agency",
      metaDescription: "Contact GreenLeaf Digital Marketing today for a free SEO audit and marketing consultation in Salem Oregon.",
      h1: "Get in Touch with Our Salem Team",
      h2s: ["Office Location", "Send Us a Message"],
      h3s: [],
      focusKeyword: "Contact GreenLeaf Digital Marketing",
      secondaryKeywords: "Salem Marketing Consultation",
      content: `Ready to elevate your online presence? Reach out to GreenLeaf Digital Marketing in Salem, OR. Phone: (503) 555-0199, Email: info@greenleafmarketing.com.`,
      images: [],
      canonicalUrl: "https://greenleafmarketing.com/contact",
      internalLinks: [
        { text: "Home", targetId: "home", url: "/" }
      ],
      externalLinks: [],
      isOrphan: false
    }
  ]
};
