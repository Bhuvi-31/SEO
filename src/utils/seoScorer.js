// Dynamic SEO Scoring Engine for SEO Practice Lab
export function calculateSeoScores(website, userBacklinks = []) {
  if (!website || !website.pages) {
    return {
      overall: 0,
      onPage: 0,
      technical: 0,
      content: 0,
      offPage: 0,
      performance: 0,
      breakdown: []
    };
  }

  const breakdown = [];
  const pages = website.pages;
  const pageCount = pages.length;

  // --- 1. ON-PAGE SEO SCORE (Weight: 25%) ---
  let onPagePoints = 0;
  let maxOnPagePoints = pageCount * 40; // 4 checks per page (Title, MetaDesc, H1, Canonical)

  pages.forEach(page => {
    // Check 1: Title Tag
    if (page.title && page.title.length >= 30 && page.title.length <= 65) {
      if (page.focusKeyword && page.title.toLowerCase().includes(page.focusKeyword.toLowerCase())) {
        onPagePoints += 10;
        breakdown.push({ page: page.name, type: "On-Page", text: "Optimized title with focus keyword", points: +10 });
      } else {
        onPagePoints += 6;
        breakdown.push({ page: page.name, type: "On-Page", text: "Title present but missing focus keyword", points: +6 });
      }
    } else if (page.title) {
      onPagePoints += 4;
      breakdown.push({ page: page.name, type: "On-Page", text: "Title tag length needs improvement", points: +4 });
    }

    // Check 2: Meta Description
    if (page.metaDescription && page.metaDescription.length >= 100 && page.metaDescription.length <= 165) {
      onPagePoints += 10;
      breakdown.push({ page: page.name, type: "On-Page", text: "Optimal meta description length", points: +10 });
    } else if (page.metaDescription) {
      onPagePoints += 5;
      breakdown.push({ page: page.name, type: "On-Page", text: "Meta description present but non-ideal length", points: +5 });
    } else {
      breakdown.push({ page: page.name, type: "On-Page", text: "Missing meta description", points: 0 });
    }

    // Check 3: H1 Heading Structure
    if (page.h1 && page.h1.length > 5 && !page.multipleH1s) {
      onPagePoints += 10;
      breakdown.push({ page: page.name, type: "On-Page", text: "Single H1 tag present", points: +10 });
    } else if (page.multipleH1s) {
      onPagePoints += 3;
      breakdown.push({ page: page.name, type: "On-Page", text: "Multiple H1 tags detected", points: +3 });
    }

    // Check 4: Canonical Tag
    if (page.canonicalUrl && page.canonicalUrl.startsWith("https://")) {
      onPagePoints += 10;
      breakdown.push({ page: page.name, type: "On-Page", text: "Valid canonical tag present", points: +10 });
    }
  });

  const onPageScore = Math.min(100, Math.round((onPagePoints / maxOnPagePoints) * 100));

  // --- 2. TECHNICAL SEO SCORE (Weight: 25%) ---
  let techPoints = 0;
  let maxTechPoints = 100;

  // HTTPS check (20 pts)
  if (website.httpsEnabled) {
    techPoints += 20;
  }

  // Robots.txt check (20 pts)
  if (website.robotsTxt && !website.robotsTxt.includes("Disallow: /") && !website.robotsTxt.includes("Disallow: /services/seo")) {
    techPoints += 20;
  } else if (website.robotsTxt && !website.robotsTxt.includes("Disallow: /")) {
    techPoints += 10;
  }

  // XML Sitemap check (20 pts)
  const sitemapUrls = website.sitemap ? website.sitemap.length : 0;
  if (sitemapUrls >= pageCount) {
    techPoints += 20;
  } else if (sitemapUrls > 0) {
    techPoints += 10;
  }

  // Orphan pages check (20 pts)
  const orphanCount = pages.filter(p => p.isOrphan).length;
  if (orphanCount === 0) {
    techPoints += 20;
  } else {
    techPoints += Math.max(0, 20 - orphanCount * 10);
  }

  // Broken internal links check (20 pts)
  let brokenLinkCount = 0;
  pages.forEach(p => {
    p.internalLinks?.forEach(link => {
      if (link.targetId === "broken-page" || link.url.includes("special-promo-deal")) {
        brokenLinkCount++;
      }
    });
  });
  if (brokenLinkCount === 0) {
    techPoints += 20;
  } else {
    techPoints += Math.max(0, 20 - brokenLinkCount * 10);
  }

  const technicalScore = Math.min(100, Math.round(techPoints));

  // --- 3. CONTENT & IMAGE SEO SCORE (Weight: 20%) ---
  let contentPoints = 0;
  let totalImages = 0;
  let imagesWithAlt = 0;
  let totalWords = 0;

  pages.forEach(p => {
    const words = p.content ? p.content.split(/\s+/).filter(Boolean).length : 0;
    totalWords += words;

    if (words > 80) contentPoints += 10;
    else contentPoints += 4;

    p.images?.forEach(img => {
      totalImages++;
      if (img.altText && img.altText.trim().length > 3) {
        imagesWithAlt++;
      }
    });
  });

  const imageAltRatio = totalImages > 0 ? (imagesWithAlt / totalImages) : 1;
  const contentScore = Math.min(100, Math.round((contentPoints / (pageCount * 10)) * 60 + imageAltRatio * 40));

  // --- 4. OFF-PAGE SEO SCORE (Weight: 15%) ---
  // Base offpage score + boost from user pursued quality backlinks
  let baseOffPage = 55;
  if (userBacklinks && userBacklinks.length > 0) {
    userBacklinks.forEach(bl => {
      if (bl.spamRisk.includes("Low")) {
        baseOffPage += 10;
      } else if (bl.spamRisk.includes("Critical")) {
        baseOffPage -= 15; // Penalty for spam link
      }
    });
  }
  const offPageScore = Math.max(10, Math.min(100, Math.round(baseOffPage)));

  // --- 5. PERFORMANCE & SPEED SCORE (Weight: 15%) ---
  const perf = website.performanceMetrics || {};
  let perfPoints = 100;
  if (perf.lcp > 2.5) perfPoints -= Math.round((perf.lcp - 2.5) * 15);
  if (perf.cls > 0.1) perfPoints -= Math.round((perf.cls - 0.1) * 150);
  if (perf.inp > 200) perfPoints -= Math.round((perf.inp - 200) / 10);

  const performanceScore = Math.max(10, Math.min(100, Math.round(perfPoints)));

  // --- OVERALL WEIGHTED SCORE ---
  const overall = Math.round(
    onPageScore * 0.25 +
    technicalScore * 0.25 +
    contentScore * 0.20 +
    offPageScore * 0.15 +
    performanceScore * 0.15
  );

  return {
    overall,
    onPage: onPageScore,
    technical: technicalScore,
    content: contentScore,
    offPage: offPageScore,
    performance: performanceScore,
    breakdown,
    totalWords,
    totalImages,
    imagesWithAlt,
    orphanCount,
    brokenLinkCount
  };
}
