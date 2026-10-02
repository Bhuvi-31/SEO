import React, { useState } from "react";
import { FileText, Sparkles, CheckCircle2, AlertTriangle, HelpCircle, Layers, BarChart } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { analyzeContent } from "../../utils/contentAnalyzer.js";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function ContentLab() {
  const { website, updatePage, activePageId, triggerWhyModal } = useSeoLab();
  const currentPage = website.pages.find(p => p.id === activePageId) || website.pages[0];

  const analysis = analyzeContent(currentPage.content, currentPage.focusKeyword, {
    h1: currentPage.h1,
    h2s: currentPage.h2s || [],
    h3s: currentPage.h3s || []
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Content Intelligence</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            SEO Content Optimization Workspace
          </h2>
          <p className="text-xs text-slate-400">Evaluate readability, search intent alignment, heading structure, and topic completeness.</p>
        </div>

        <button
          onClick={() => triggerWhyModal("Content Quality & Helpful Content", "Google's Helpful Content System rewards original, comprehensive content that satisfies user search intent without keyword stuffing.")}
          className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-1.5"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Helpful Content Guide</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side Body Editor */}
        <div className="lg:col-span-2 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              Content Workspace Editor — {currentPage.name}
            </h3>
            <span className="text-xs font-mono text-indigo-400 font-bold">{analysis.wordCount} Words</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Target Focus Keyword</label>
              <input
                type="text"
                value={currentPage.focusKeyword}
                onChange={(e) => updatePage(currentPage.id, { focusKeyword: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Body Content</label>
              <textarea
                rows={10}
                value={currentPage.content}
                onChange={(e) => updatePage(currentPage.id, { content: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right Side Content Quality Scorecard */}
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Content Audit Scorecard
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Total Word Count</span>
              <span className={`font-mono font-bold ${analysis.wordCount > 100 ? "text-emerald-400" : "text-amber-400"}`}>
                {analysis.wordCount} words
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Readability Grade</span>
              <span className="font-bold text-indigo-400">{analysis.readabilityGrade}</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Keyword Density</span>
              <span className={`font-mono font-bold ${analysis.isKeywordStuffed ? "text-red-400" : "text-emerald-400"}`}>
                {analysis.densityPercent}%
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
            <h4 className="font-bold text-slate-300">Actionable Recommendations:</h4>
            {analysis.wordCount < 100 && (
              <p className="p-2.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-xl">
                ⚠️ Thin content detected. Expand article body beyond 250+ words to answer search intent completely.
              </p>
            )}
            {!analysis.inH1 && (
              <p className="p-2.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-xl">
                ⚠️ Include primary target keyword in H1 heading tag.
              </p>
            )}
            {analysis.wordCount >= 100 && analysis.inH1 && !analysis.isKeywordStuffed && (
              <p className="p-2.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-xl font-bold">
                🎉 Content optimization looks strong!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
