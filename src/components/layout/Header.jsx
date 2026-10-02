import React from "react";
import { Play, Sparkles, RefreshCw, Zap, ShieldCheck, CheckCircle, HelpCircle } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function Header() {
  const { website, scores, practiceMode, setPracticeMode, executeAudit, isAuditing, setShowErrorGenerator, handleReset, triggerWhyModal } = useSeoLab();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-6">
      {/* Current Simulated Website Identifier */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">Target Site:</span>
          <span className="text-white font-bold">{website.siteName}</span>
          <span className="text-slate-500">({website.domain})</span>
        </div>

        <SimulatedBadge />
      </div>

      {/* Mode Selector & Quick Actions */}
      <div className="flex items-center gap-3">
        {/* Practice Mode Selector */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setPracticeMode("learn")}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              practiceMode === "learn" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Learn Mode
          </button>
          <button
            onClick={() => setPracticeMode("practice")}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              practiceMode === "practice" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Practice Mode
          </button>
          <button
            onClick={() => setPracticeMode("challenge")}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              practiceMode === "challenge" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Challenge Mode
          </button>
        </div>

        {/* Dynamic Score Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
          <span className="text-xs font-semibold text-slate-300">Live SEO Score:</span>
          <span className="text-sm font-extrabold text-indigo-400">{scores.overall}/100</span>
        </div>

        {/* RUN FULL SEO AUDIT CTA */}
        <button
          onClick={executeAudit}
          disabled={isAuditing}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50"
        >
          {isAuditing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Scanning Site...
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              RUN FULL SEO AUDIT
            </>
          )}
        </button>

        <button
          onClick={() => triggerWhyModal("SEO Scoring System", "Scores update dynamically in real-time as you optimize title tags, meta descriptions, image ALT text, canonical tags, speed metrics, and backlinks.")}
          className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl transition-colors"
          title="Why do scores change?"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
