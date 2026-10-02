import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { getStoredWebsite, saveStoredWebsite, resetStoredWebsite, getStoredUserProgress, saveStoredUserProgress, calculateLevel } from "../utils/storage.js";
import { calculateSeoScores } from "../utils/seoScorer.js";
import { runFullSeoAudit } from "../utils/auditEngine.js";

const SeoLabContext = createContext(null);

const VALID_TABS = [
  "dashboard", "practice-website", "onpage-seo", "technical-seo", "image-seo",
  "internal-linking", "offpage-seo", "keyword-research", "serp-simulator",
  "content-lab", "competitor-analysis", "seo-audit", "seo-challenges",
  "progress", "learning-center", "schema-lab", "local-seo", "architecture",
  "report-generator", "settings"
];

function getTabFromHash() {
  try {
    const hash = window.location.hash.replace(/^#\/?/, "");
    if (VALID_TABS.includes(hash)) return hash;
  } catch (e) {}
  return "dashboard"; // Default fallback route
}

export function SeoLabProvider({ children }) {
  const [website, setWebsite] = useState(getStoredWebsite);
  const [userProgress, setUserProgress] = useState(getStoredUserProgress);
  const [activeTab, setActiveTabState] = useState(getTabFromHash);
  const [activePageId, setActivePageId] = useState("home");
  const [darkMode, setDarkMode] = useState(true);
  const [practiceMode, setPracticeMode] = useState("practice"); // 'learn' | 'practice' | 'challenge'
  const [toast, setToast] = useState(null);
  const [whyModal, setWhyModal] = useState(null); // { title, explanation, concept }
  const [showErrorGenerator, setShowErrorGenerator] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResults, setAuditResults] = useState(null);

  const setActiveTab = (tab) => {
    const targetTab = VALID_TABS.includes(tab) ? tab : "dashboard";
    setActiveTabState(targetTab);
    try {
      window.location.hash = `#/${targetTab}`;
    } catch (e) {}
  };

  // Sync hash routing changes
  useEffect(() => {
    const handleHashChange = () => {
      const tabFromHash = getTabFromHash();
      setActiveTabState(tabFromHash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Sync state to local storage
  useEffect(() => {
    saveStoredWebsite(website);
  }, [website]);

  useEffect(() => {
    saveStoredUserProgress(userProgress);
  }, [userProgress]);

  // Sync dark mode class on <html> element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Calculate current scores dynamically
  const scores = calculateSeoScores(website, userProgress.pursuedBacklinks);

  // Toast Helper
  const showToast = (message, type = "success", xp = 0) => {
    setToast({ message, type, xp, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Add XP and handle leveling up
  const addXp = (amount, reason) => {
    setUserProgress(prev => {
      const newXp = prev.xp + amount;
      const levelInfo = calculateLevel(newXp);
      const leveledUp = levelInfo.level > prev.level;

      if (leveledUp) {
        try {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
        showToast(`🎉 LEVEL UP! You reached ${levelInfo.name} (Level ${levelInfo.level})`, "level", amount);
      } else {
        showToast(`+${amount} XP: ${reason}`, "xp", amount);
      }

      const newActivity = {
        id: `act-${Date.now()}`,
        text: `Earned +${amount} XP: ${reason}`,
        time: "Just now",
        type: "xp"
      };

      return {
        ...prev,
        xp: newXp,
        level: levelInfo.level,
        levelName: levelInfo.name,
        activityLog: [newActivity, ...prev.activityLog.slice(0, 19)]
      };
    });
  };

  // Update a specific page field
  const updatePage = (pageId, updatedFields) => {
    setWebsite(prev => {
      const newPages = prev.pages.map(p => {
        if (p.id === pageId) {
          return { ...p, ...updatedFields };
        }
        return p;
      });
      return { ...prev, pages: newPages };
    });

    addXp(15, `Updated On-Page settings for page: ${pageId}`);
  };

  // Toggle HTTPS
  const toggleHttps = () => {
    setWebsite(prev => {
      const nextVal = !prev.httpsEnabled;
      if (nextVal) {
        addXp(25, "Enabled HTTPS SSL security");
      }
      return { ...prev, httpsEnabled: nextVal };
    });
  };

  // Update robots.txt
  const updateRobots = (text) => {
    setWebsite(prev => ({ ...prev, robotsTxt: text }));
    addXp(15, "Modified robots.txt configuration");
  };

  // Update XML Sitemap
  const updateSitemap = (newSitemap) => {
    setWebsite(prev => ({ ...prev, sitemap: newSitemap }));
    addXp(20, "Updated XML Sitemap list");
  };

  // Performance toggles
  const toggleOptimization = (optKey) => {
    setWebsite(prev => {
      const currentOpts = prev.performanceMetrics.optimizations || {};
      const newOpts = { ...currentOpts, [optKey]: !currentOpts[optKey] };

      // Calculate new performance values
      let lcp = prev.performanceMetrics.lcp;
      let cls = prev.performanceMetrics.cls;
      let inp = prev.performanceMetrics.inp;

      if (newOpts.compressImages) lcp = Math.max(1.8, lcp - 0.8);
      if (newOpts.lazyLoadImages) lcp = Math.max(1.5, lcp - 0.5);
      if (newOpts.minifyCss) inp = Math.max(120, inp - 40);
      if (newOpts.reduceJs) inp = Math.max(100, inp - 50);
      if (newOpts.enableCaching) lcp = Math.max(1.2, lcp - 0.4);
      if (newOpts.optimizeFonts) cls = Math.max(0.04, cls - 0.12);

      addXp(20, `Applied Performance Optimization: ${optKey}`);

      return {
        ...prev,
        performanceMetrics: {
          ...prev.performanceMetrics,
          lcp: parseFloat(lcp.toFixed(1)),
          cls: parseFloat(cls.toFixed(2)),
          inp: Math.round(inp),
          optimizations: newOpts
        }
      };
    });
  };

  // Pursuit Backlink from Marketplace
  const pursueBacklink = (backlinkItem) => {
    setUserProgress(prev => {
      const alreadyHave = prev.pursuedBacklinks.some(b => b.id === backlinkItem.id);
      if (alreadyHave) return prev;

      if (backlinkItem.spamRisk.includes("Low")) {
        addXp(50, `Acquired high-quality backlink from ${backlinkItem.domain}`);
      } else {
        addXp(5, `Acquired link from ${backlinkItem.domain} (Watch out for spam risk!)`);
      }

      return {
        ...prev,
        pursuedBacklinks: [...prev.pursuedBacklinks, backlinkItem]
      };
    });
  };

  // Run SEO Audit Crawler
  const executeAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      const results = runFullSeoAudit(website);
      setAuditResults(results);
      setIsAuditing(false);
      addXp(30, "Executed full automated SEO Audit");
    }, 1800);
  };

  // One-click Chaos Generator ("Create SEO Problems")
  const injectSeoFlaw = (flawType) => {
    setWebsite(prev => {
      let newPages = [...prev.pages];
      let newRobots = prev.robotsTxt;
      let newSitemap = [...prev.sitemap];
      let newHttps = prev.httpsEnabled;

      switch (flawType) {
        case "remove_meta_desc":
          newPages = newPages.map(p => ({ ...p, metaDescription: "" }));
          showToast("🔴 Injected flaw: Removed meta descriptions across all pages!", "warning");
          break;
        case "remove_h1":
          newPages = newPages.map(p => ({ ...p, h1: "" }));
          showToast("🔴 Injected flaw: Removed H1 tag from pages!", "warning");
          break;
        case "duplicate_title":
          newPages = newPages.map(p => ({ ...p, title: "Services - GreenLeaf" }));
          showToast("🔴 Injected flaw: Set duplicate title on all pages!", "warning");
          break;
        case "broken_link":
          newPages[0].internalLinks.push({ text: "Special Offer", targetId: "broken-page", url: "/services/broken-link-404" });
          showToast("🔴 Injected flaw: Added broken internal link on Home page!", "warning");
          break;
        case "remove_canonical":
          newPages = newPages.map(p => ({ ...p, canonicalUrl: "" }));
          showToast("🔴 Injected flaw: Stripped canonical tags!", "warning");
          break;
        case "block_robots":
          newRobots = "User-agent: *\nDisallow: /";
          showToast("🔴 Injected flaw: Blocked entire site in robots.txt!", "warning");
          break;
        case "create_orphan":
          newPages[5].isOrphan = true;
          showToast("🔴 Injected flaw: Made Blog an orphan page!", "warning");
          break;
        case "remove_https":
          newHttps = false;
          showToast("🔴 Injected flaw: Disabled HTTPS security!", "warning");
          break;
        default:
          break;
      }

      return {
        ...prev,
        pages: newPages,
        robotsTxt: newRobots,
        sitemap: newSitemap,
        httpsEnabled: newHttps
      };
    });
  };

  // Reset initial website
  const handleReset = () => {
    const defaultData = resetStoredWebsite();
    setWebsite(defaultData);
    setAuditResults(null);
    showToast("Reset website back to default initial practice state!", "info");
  };

  // Trigger "WHY?" Modal
  const triggerWhyModal = (title, explanation, concept = "") => {
    setWhyModal({ title, explanation, concept });
  };

  return (
    <SeoLabContext.Provider
      value={{
        website,
        userProgress,
        scores,
        activeTab,
        setActiveTab,
        activePageId,
        setActivePageId,
        darkMode,
        setDarkMode,
        practiceMode,
        setPracticeMode,
        toast,
        showToast,
        whyModal,
        setWhyModal,
        triggerWhyModal,
        showErrorGenerator,
        setShowErrorGenerator,
        isAuditing,
        auditResults,
        executeAudit,
        updatePage,
        toggleHttps,
        updateRobots,
        updateSitemap,
        toggleOptimization,
        pursueBacklink,
        injectSeoFlaw,
        handleReset,
        addXp
      }}
    >
      {children}
    </SeoLabContext.Provider>
  );
}

export function useSeoLab() {
  const ctx = useContext(SeoLabContext);
  if (!ctx) throw new Error("useSeoLab must be used within a SeoLabProvider");
  return ctx;
}
