import React from "react";
import {
  Trophy,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  FileCode,
  Cpu,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Clock,
  Layers
} from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import ScoreRing from "../common/ScoreRing.jsx";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function Dashboard() {
  const { website, scores, userProgress, setActiveTab, setActivePageId, triggerWhyModal, setShowErrorGenerator, executeAudit } = useSeoLab();

  // Determine recommended tasks based on actual live score breakdowns
  const recommendations = [];
  if (scores.onPage < 85) {
    recommendations.push({
      id: "rec-metadesc",
      title: "Fix missing & non-ideal meta descriptions",
      category: "On-Page SEO",
      why: "Meta descriptions entice searchers to click your SERP snippet.",
      tab: "onpage-seo"
    });
  }
  if (scores.technical < 80) {
    recommendations.push({
      id: "rec-canonical",
      title: "Add canonical tags & unblock pages in robots.txt",
      category: "Technical SEO",
      why: "Canonicals prevent duplicate content penalties across URL variants.",
      tab: "technical-seo"
    });
  }
  if (scores.performance < 80) {
    recommendations.push({
      id: "rec-speed",
      title: "Improve page speed (LCP & CLS)",
      category: "Performance",
      why: "Fast loading pages improve Google Core Web Vitals rankings.",
      tab: "technical-seo"
    });
  }
  if (scores.orphanCount > 0) {
    recommendations.push({
      id: "rec-orphan",
      title: `Fix ${scores.orphanCount} orphan page(s)`,
      category: "Internal Linking",
      why: "Orphan pages receive no link equity and are hard for bots to index.",
      tab: "internal-linking"
    });
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 rounded-md uppercase tracking-wider">
              Practice Dashboard
            </span>
            <SimulatedBadge />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Welcome back, SEO Practitioner!</h2>
          <p className="text-xs text-slate-400">
            Target Website: <strong className="text-slate-200">{website.siteName}</strong> ({website.domain})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowErrorGenerator(true)}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 font-bold text-xs rounded-xl transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-red-400" />
            "Create SEO Problems"
          </button>
          <button
            onClick={() => setActiveTab("practice-website")}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            Edit Website Pages
          </button>
        </div>
      </div>

      {/* Main Score Overview & Ring Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Score Ring Box */}
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => triggerWhyModal("Overall SEO Score", "Overall score is a weighted average: On-Page (25%), Technical (25%), Content (20%), Off-Page (15%), and Performance (15%).")}
              className="text-slate-400 hover:text-white p-1"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Overall SEO Score</h3>
          <ScoreRing score={scores.overall} size={150} strokeWidth={12} label="SEO Score" sublabel="Live Practice Metrics" />
          <p className="mt-4 text-xs text-slate-400 max-w-xs">
            {scores.overall >= 80 ? "🎉 Excellent! Your website is highly optimized." : "Your SEO score is low. Follow recommended tasks below to fix issues."}
          </p>
        </div>

        {/* 5 Category Sub-Scores */}
        <div className="lg:col-span-2 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Score Breakdown by Category</h3>
            <span className="text-[11px] text-indigo-400 font-semibold">Updated in real-time</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div
              onClick={() => setActiveTab("onpage-seo")}
              className="p-4 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 rounded-xl cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">On-Page</span>
                <FileCode className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-2xl font-extrabold text-white">{scores.onPage}/100</span>
              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${scores.onPage}%` }} />
              </div>
            </div>

            <div
              onClick={() => setActiveTab("technical-seo")}
              className="p-4 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 rounded-xl cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">Technical</span>
                <Cpu className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-2xl font-extrabold text-white">{scores.technical}/100</span>
              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${scores.technical}%` }} />
              </div>
            </div>

            <div
              onClick={() => setActiveTab("content-lab")}
              className="p-4 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 rounded-xl cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">Content</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-2xl font-extrabold text-white">{scores.content}/100</span>
              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${scores.content}%` }} />
              </div>
            </div>

            <div
              onClick={() => setActiveTab("offpage-seo")}
              className="p-4 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 rounded-xl cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">Off-Page</span>
                <ExternalLink className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-2xl font-extrabold text-white">{scores.offPage}/100</span>
              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${scores.offPage}%` }} />
              </div>
            </div>

            <div
              onClick={() => setActiveTab("technical-seo")}
              className="p-4 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 rounded-xl cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">Performance</span>
                <Zap className="w-4 h-4 text-rose-400" />
              </div>
              <span className="text-2xl font-extrabold text-white">{scores.performance}/100</span>
              <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full transition-all duration-500" style={{ width: `${scores.performance}%` }} />
              </div>
            </div>

            <div
              onClick={executeAudit}
              className="p-4 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 rounded-xl cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-indigo-300">Run Audit</span>
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-xs font-bold text-white">Full Crawler Scan</span>
              <span className="text-[10px] text-indigo-300 font-semibold mt-1">Detect 15+ issues</span>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Progress & Recommended Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Tasks */}
        <div className="lg:col-span-2 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Recommended Priority Tasks
            </h3>
            <span className="text-xs text-slate-400 font-medium">Click task to fix</span>
          </div>

          <div className="space-y-3">
            {recommendations.length > 0 ? (
              recommendations.map(rec => (
                <div
                  key={rec.id}
                  onClick={() => setActiveTab(rec.tab)}
                  className="p-4 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-indigo-500/40 rounded-xl transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 rounded-md">
                        {rec.category}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {rec.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400">{rec.why}</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 group-hover:text-indigo-300 shrink-0">
                    <span>Fix Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-slate-800/20 rounded-xl border border-dashed border-slate-700">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">No Critical Flaws Detected!</h4>
                <p className="text-xs text-slate-400 mt-1">Great job! Try using "Create SEO Problems" to test your auditing skills.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              Recent Practice Activity
            </h3>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {userProgress.activityLog && userProgress.activityLog.length > 0 ? (
              userProgress.activityLog.map(act => (
                <div key={act.id} className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/40 text-xs">
                  <p className="font-semibold text-slate-200">{act.text}</p>
                  <span className="text-[10px] text-slate-400 font-medium block mt-1">{act.time}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-4">No recent activity logged yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
