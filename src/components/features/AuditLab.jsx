import React, { useState } from "react";
import {
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Zap,
  Globe
} from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { SeverityBadge, SimulatedBadge } from "../common/Badge.jsx";

export default function AuditLab() {
  const { website, scores, isAuditing, executeAudit, auditResults, setActiveTab, setActivePageId, updatePage, toggleHttps, updateRobots, updateSitemap, toggleOptimization } = useSeoLab();
  const [filterSeverity, setFilterSeverity] = useState("all"); // 'all' | 'critical' | 'warning' | 'passed'

  // Handle direct 1-click "Fix Now" triggers!
  const handleFixNow = (issue) => {
    switch (issue.fixType) {
      case "EDIT_PAGE":
        setActivePageId(issue.pageId);
        setActiveTab("practice-website");
        break;
      case "ENABLE_HTTPS":
        toggleHttps();
        break;
      case "UNBLOCK_ROBOTS":
        updateRobots("User-agent: *\nDisallow: /admin/");
        break;
      case "FIX_CANONICAL":
        updatePage(issue.pageId, { canonicalUrl: `https://${website.domain}/${issue.pageId === 'home' ? '' : issue.pageId}` });
        break;
      case "FIX_H1":
        updatePage(issue.pageId, { multipleH1s: false });
        break;
      case "REPAIR_BROKEN_LINK":
        setActivePageId(issue.pageId);
        setActiveTab("internal-linking");
        break;
      case "FIX_ALT_TEXT":
        setActivePageId(issue.pageId);
        setActiveTab("image-seo");
        break;
      case "FIX_ORPHAN":
        setActiveTab("internal-linking");
        break;
      case "ADD_TO_SITEMAP":
        setActiveTab("technical-seo");
        break;
      case "OPTIMIZE_PERFORMANCE":
        toggleOptimization("compressImages");
        toggleOptimization("lazyLoadImages");
        break;
      default:
        setActiveTab("practice-website");
        break;
    }
  };

  const results = auditResults;
  const filteredIssues = results?.issues ? results.issues.filter(i => filterSeverity === "all" || i.severity === filterSeverity) : [];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Automated Crawler Simulator</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            SEO Audit Engine & Issue Fixer
          </h2>
          <p className="text-xs text-slate-400">Scan all 7 pages for 15+ technical, on-page, and crawlability flaws with 1-click automatic fixes.</p>
        </div>

        <button
          onClick={executeAudit}
          disabled={isAuditing}
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
        >
          {isAuditing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
          <span>{isAuditing ? "Scanning Pages..." : "RUN FULL SEO AUDIT"}</span>
        </button>
      </div>

      {/* Crawling Animation View */}
      {isAuditing && (
        <div className="p-8 bg-slate-900/90 border border-emerald-500/30 rounded-2xl text-center space-y-4 animate-pulse">
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
          <h3 className="text-base font-bold text-white">Scanning Practice Website Pages...</h3>
          <div className="space-y-1 text-xs text-slate-400 font-mono">
            <p>✓ Checking titles & meta descriptions...</p>
            <p>✓ Scanning visual heading hierarchy (H1-H3)...</p>
            <p>✓ Auditing robots.txt rules & sitemap URLs...</p>
            <p>✓ Testing canonical tags & HTTPS security...</p>
            <p>✓ Evaluating Core Web Vitals speed metrics...</p>
          </div>
        </div>
      )}

      {/* Audit Results View */}
      {!isAuditing && results && (
        <div className="space-y-6">
          {/* Summary Score Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Audit Score</span>
              <p className="text-2xl font-extrabold text-indigo-400 mt-1">{scores.overall}/100</p>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Critical Flaws</span>
              <p className="text-2xl font-extrabold text-red-400 mt-1">{results.criticalCount}</p>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Warnings</span>
              <p className="text-2xl font-extrabold text-amber-400 mt-1">{results.warningCount}</p>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Passed Checks</span>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">{results.passedCount}</p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Filter Issues:</span>
            {["all", "critical", "warning", "passed"].map(sev => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  filterSeverity === sev ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* Issue Cards Stream */}
          <div className="space-y-4">
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <SeverityBadge severity={issue.severity} />
                    <h3 className="text-sm font-bold text-white">{issue.title}</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{issue.location}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <strong className="text-slate-300 block mb-0.5">Problem:</strong>
                    <p className="text-slate-400 leading-relaxed">{issue.problem}</p>
                  </div>
                  <div>
                    <strong className="text-slate-300 block mb-0.5">Why It Matters:</strong>
                    <p className="text-slate-400 leading-relaxed">{issue.whyItMatters}</p>
                  </div>
                  <div>
                    <strong className="text-indigo-400 block mb-0.5">How to Fix:</strong>
                    <p className="text-slate-300 leading-relaxed mb-2">{issue.howToFix}</p>
                    <button
                      onClick={() => handleFixNow(issue)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] rounded-lg shadow-md transition-all flex items-center gap-1.5"
                    >
                      <span>Fix Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
