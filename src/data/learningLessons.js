export const LEARNING_LESSONS = [
  {
    id: "onpage-1",
    category: "On-Page SEO",
    title: "Title Tags & Character Length",
    difficulty: "Beginner",
    summary: "Understand why title tags are critical search ranking signals and how to write click-worthy headlines under 60 characters.",
    concept: `The <title> tag is one of the single most important on-page SEO elements. It appears as the blue clickable headline in Google SERPs and browser tabs.

Best practices for Title Tags:
• Keep length between 50 and 60 characters (or under 600px width).
• Place your primary target keyword closer to the front.
• Include your brand name at the end (e.g. "Primary Keyword | Brand Name").
• Make each title tag unique across your entire website.`,
    example: `❌ Bad: Home - Welcome to our company website where we sell services
✅ Good: Digital Marketing Agency in Salem | GreenLeaf Marketing`,
    quiz: {
      question: "What is the recommended character length range for Google SERP titles?",
      options: [
        "10 - 30 characters",
        "50 - 60 characters",
        "90 - 120 characters",
        "Unlimited"
      ],
      correctIndex: 1,
      explanation: "Google typically displays the first 50–60 characters (approx. 600 pixels) of a title tag. Titles longer than 60 characters will be truncated with an ellipsis (...)."
    }
  },
  {
    id: "onpage-2",
    category: "On-Page SEO",
    title: "Meta Descriptions & Call to Actions",
    difficulty: "Beginner",
    summary: "Learn how meta descriptions influence Click-Through Rates (CTR) even though they aren't direct ranking factors.",
    concept: `Meta descriptions provide a brief summary of a web page in search results. While Google doesn't use meta descriptions as a direct ranking score, a well-crafted description significantly boosts Click-Through Rate (CTR).

Key Guidelines:
• Keep between 145 and 160 characters.
• Include your primary keyword so Google bolds it when users search.
• End with a clear Call To Action (e.g., "Get a free audit today!").`,
    example: `❌ Bad: We do marketing services in Salem.
✅ Good: Looking for a top-rated digital marketing agency in Salem? We drive real traffic, leads, and sales. Call GreenLeaf today for a free audit!`,
    quiz: {
      question: "How does a well-optimized meta description directly benefit your site's search presence?",
      options: [
        "It directly increases your domain authority score.",
        "It improves Click-Through Rate (CTR) from search results.",
        "It speeds up page loading time.",
        "It automatically indexes your images."
      ],
      correctIndex: 1,
      explanation: "Meta descriptions entice searchers to click your result over competitors, directly improving your Organic Click-Through Rate (CTR)."
    }
  },
  {
    id: "tech-1",
    category: "Technical SEO",
    title: "Robots.txt & Crawl Control",
    difficulty: "Intermediate",
    summary: "Discover how search engine bots use robots.txt to discover or bypass pages on your website.",
    concept: `The robots.txt file tells search engine crawlers (like Googlebot) which URLs they can or cannot access on your site.

Important Rules:
• Disallow: /admin/ blocks private admin pages from being crawled.
• Disallow: / blocks your ENTIRE website from search engines!
• robots.txt does NOT guarantee a page won't be indexed if external links exist, but it prevents Googlebot from crawling it.`,
    example: `❌ Dangerous:
User-agent: *
Disallow: /

✅ Proper:
User-agent: *
Disallow: /admin/
Disallow: /tmp/
Sitemap: https://greenleafmarketing.com/sitemap.xml`,
    quiz: {
      question: "What happens if your robots.txt contains 'Disallow: /' for User-agent: *?",
      options: [
        "Your site will load twice as fast.",
        "Search engine crawlers are instructed NOT to crawl any page on your website.",
        "Only images will be blocked from Google Search.",
        "It forces Google to index all pages immediately."
      ],
      correctIndex: 1,
      explanation: "'Disallow: /' tells search bots that all directories and root paths are off-limits, which can devastate organic search indexing."
    }
  },
  {
    id: "tech-2",
    category: "Technical SEO",
    title: "Canonical URLs & Duplicate Content",
    difficulty: "Intermediate",
    summary: "Learn how rel='canonical' prevents duplicate content penalties across HTTP/HTTPS and URL parameters.",
    concept: `A canonical URL tag (rel="canonical") tells search engines which master version of a page to index when multiple URLs contain identical or nearly identical content.

Common Scenarios Requiring Canonicals:
1. http:// vs https:// versions
2. www vs non-www versions
3. E-commerce filtering parameters (e.g. ?category=shoes&color=red)`,
    example: `<link rel="canonical" href="https://greenleafmarketing.com/services/seo" />`,
    quiz: {
      question: "Why should every unique page include a self-referencing canonical tag?",
      options: [
        "To prevent duplicate content issues when users visit via different URL query strings or tracking parameters.",
        "To replace the need for an H1 heading.",
        "To increase server bandwidth.",
        "To compress high-resolution images."
      ],
      correctIndex: 0,
      explanation: "Self-referencing canonicals ensure search engines attribute link equity and indexing authority to the clean canonical URL regardless of parameter strings."
    }
  },
  {
    id: "offpage-1",
    category: "Off-Page SEO",
    title: "Backlink Quality vs Quantity",
    difficulty: "Advanced",
    summary: "Explore why a few relevant, high-authority links outweigh hundreds of spammy directory backlinks.",
    concept: `Backlinks are votes of confidence from other websites. However, Google's algorithms (like SpamBrain) actively evaluate link quality.

Key Off-Page Metrics:
• Topical Relevance: Is the linking site in a similar industry?
• Domain Authority (DA / DR): How trustworthy is the linking domain?
• Anchor Text: Does the link text look natural or overly optimized?
• Spam Risk: High ratio of outbound spam links flags penalty risk.`,
    example: `1 Link from a top regional news publisher (DA 75, High Relevance) > 500 Links from random directory sites (DA 10, High Spam Risk).`,
    quiz: {
      question: "Which backlink is most valuable for a local Digital Marketing agency in Salem?",
      options: [
        "100 links from unrelated foreign spam blogs.",
        "A contextual editorial link from an established Oregon Business Journal (DA 72).",
        "A footer link from a free online casino directory.",
        "An automated comment link on a fashion blog."
      ],
      correctIndex: 1,
      explanation: "Contextual links from high-authority, topically or regionally relevant websites pass maximum trust equity and topical authority."
    }
  }
];
