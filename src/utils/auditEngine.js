// Animated Crawler & SEO Audit Engine
export function runFullSeoAudit(website) {
  const issues = [];
  const pages = website.pages || [];

  // 1. Critical Issues (🔴 Red)
  if (!website.httpsEnabled) {
    issues.push({
      id: "crit-https",
      severity: "critical",
      title: "HTTPS Security Not Configured",
      location: "Site Level",
      problem: "Your website is currently served over unencrypted HTTP protocol.",
      whyItMatters: "Google explicitly uses HTTPS as a lightweight ranking factor and browser flags non-HTTPS sites as 'Not Secure', damaging visitor trust.",
      howToFix: "Enable SSL certificate and redirect all HTTP traffic to HTTPS.",
      fixType: "ENABLE_HTTPS"
    });
  }

  if (website.robotsTxt?.includes("Disallow: /services/seo")) {
    issues.push({
      id: "crit-robots-block",
      severity: "critical",
      title: "Blocked High-Value Page in robots.txt",
      location: "robots.txt",
      problem: "'Disallow: /services/seo' rule is preventing search engines from crawling the SEO Services landing page.",
      whyItMatters: "Blocked pages cannot be indexed or updated in Google Search results, losing all prospective organic traffic.",
      howToFix: "Remove the Disallow directive for /services/seo in robots.txt.",
      fixType: "UNBLOCK_ROBOTS"
    });
  }

  pages.forEach(page => {
    if (!page.metaDescription || page.metaDescription.trim().length === 0) {
      issues.push({
        id: `crit-metadesc-${page.id}`,
        severity: "critical",
        title: `Missing Meta Description on ${page.name}`,
        location: page.slug,
        problem: `The page '${page.name}' has no meta description defined.`,
        whyItMatters: "Without a meta description, Google auto-extracts random body snippets which lowers Organic Click-Through Rates (CTR).",
        howToFix: "Write a unique meta description between 120 and 160 characters containing your target keyword.",
        fixType: "EDIT_PAGE",
        pageId: page.id,
        targetField: "metaDescription"
      });
    }

    if (!page.canonicalUrl || page.canonicalUrl.trim().length === 0) {
      issues.push({
        id: `crit-canonical-${page.id}`,
        severity: "critical",
        title: `Missing Canonical URL on ${page.name}`,
        location: page.slug,
        problem: `No rel='canonical' link tag is specified on '${page.name}'.`,
        whyItMatters: "Canonical tags prevent duplicate content issues across URL variations, tracking parameters, and HTTP/HTTPS mirrors.",
        howToFix: `Set canonical URL to 'https://${website.domain}${page.slug === '/' ? '' : page.slug}'.`,
        fixType: "FIX_CANONICAL",
        pageId: page.id
      });
    }

    if (page.multipleH1s) {
      issues.push({
        id: `crit-multih1-${page.id}`,
        severity: "critical",
        title: `Multiple H1 Headings on ${page.name}`,
        location: page.slug,
        problem: `Page contains more than one H1 heading tag.`,
        whyItMatters: "A page should have exactly one H1 tag representing the primary topic. Multiple H1s confuse search crawler hierarchy.",
        howToFix: "Keep only one primary H1 tag and convert remaining top headlines to H2.",
        fixType: "FIX_H1",
        pageId: page.id
      });
    }

    // Broken links check
    page.internalLinks?.forEach(link => {
      if (link.targetId === "broken-page" || link.url.includes("special-promo-deal")) {
        issues.push({
          id: `crit-brokenlink-${page.id}`,
          severity: "critical",
          title: `Broken Internal Link on ${page.name}`,
          location: page.slug,
          problem: `Link text '${link.text}' points to a non-existent page (${link.url}).`,
          whyItMatters: "Broken links create 404 errors for users and waste Google crawler budget.",
          howToFix: "Update or remove the broken target URL.",
          fixType: "REPAIR_BROKEN_LINK",
          pageId: page.id
        });
      }
    });

    // Images missing ALT text
    page.images?.forEach(img => {
      if (!img.altText || img.altText.trim().length === 0) {
        issues.push({
          id: `crit-alt-${img.id}`,
          severity: "warning",
          title: `Missing ALT Text for ${img.fileName} on ${page.name}`,
          location: page.slug,
          problem: `Image file '${img.fileName}' has no alt text description.`,
          whyItMatters: "Alt text provides accessibility for visually impaired users and enables Google Image Search indexing.",
          howToFix: "Add descriptive ALT text containing relevant context.",
          fixType: "FIX_ALT_TEXT",
          pageId: page.id,
          imageId: img.id
        });
      }
    });

    // Orphan check
    if (page.isOrphan) {
      issues.push({
        id: `warn-orphan-${page.id}`,
        severity: "warning",
        title: `Orphan Page Detected: ${page.name}`,
        location: page.slug,
        problem: `The page '${page.name}' has 0 incoming internal links from other pages on your site.`,
        whyItMatters: "Search engine bots struggle to discover orphan pages, and users cannot navigate to them naturally.",
        howToFix: "Add an internal link pointing to this page from Home or Services.",
        fixType: "FIX_ORPHAN",
        pageId: page.id
      });
    }
  });

  // Sitemap missing pages
  if (website.sitemap) {
    const sitemapUrls = website.sitemap.map(s => s.url);
    pages.forEach(p => {
      const fullUrl = `https://${website.domain}${p.slug === '/' ? '' : p.slug}`;
      if (!sitemapUrls.includes(fullUrl)) {
        issues.push({
          id: `warn-sitemap-${p.id}`,
          severity: "warning",
          title: `Page Missing from XML Sitemap: ${p.name}`,
          location: "sitemap.xml",
          problem: `'${fullUrl}' is not listed in your XML sitemap.`,
          whyItMatters: "XML sitemaps guide crawlers to discover all important published URLs promptly.",
          howToFix: "Add page URL to sitemap in Technical SEO Lab.",
          fixType: "ADD_TO_SITEMAP",
          pageId: p.id,
          url: fullUrl
        });
      }
    });
  }

  // Performance warnings
  if (website.performanceMetrics?.lcp > 2.5) {
    issues.push({
      id: "warn-lcp",
      severity: "warning",
      title: `Slow Largest Contentful Paint (LCP: ${website.performanceMetrics.lcp}s)`,
      location: "Core Web Vitals",
      problem: "LCP exceeds Google's recommended threshold of 2.5 seconds.",
      whyItMatters: "LCP measures loading performance. Slow LCP increases bounce rate and lowers user experience signals.",
      howToFix: "Compress images, enable lazy loading, and minify CSS.",
      fixType: "OPTIMIZE_PERFORMANCE"
    });
  }

  // 3. Passed Checks (🟢 Green)
  const passed = [];
  if (website.httpsEnabled) passed.push("HTTPS Security Enabled");
  if (!website.robotsTxt?.includes("Disallow: /")) passed.push("Site Search Crawling Allowed in robots.txt");
  if (website.sitemap && website.sitemap.length > 0) passed.push("XML Sitemap Configured");
  if (pages.some(p => p.h1 && !p.multipleH1s)) passed.push("Proper H1 Heading Hierarchy on core pages");

  return {
    totalIssues: issues.length,
    criticalCount: issues.filter(i => i.severity === "critical").length,
    warningCount: issues.filter(i => i.severity === "warning").length,
    passedCount: passed.length,
    issues,
    passed
  };
}
