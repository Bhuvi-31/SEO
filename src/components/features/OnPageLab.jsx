import React, { useState } from "react";
import {
  FileCode,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Heading,
  Key,
  Layers,
  Sparkles,
  BarChart2
} from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { analyzeContent } from "../../utils/contentAnalyzer.js";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function OnPageLab() {
  const { website, activePageId, setActivePageId, triggerWhyModal } = useSeoLab();
  const currentPage = website.pages.find(p => p.id === activePageId) || website.pages[0];

  const analysis = analyzeContent(currentPage.content, currentPage.focusKeyword, {
    h1: currentPage.h1,
    h2s: currentPage.h2s || [],
    h3s: currentPage.h3s || []
  });

  // Calculate specific title score out of 10
  let titleScore = 10;
  let titleTips = [];
  if (!currentPage.title) {
    titleScore = 0;
    titleTips.push("Title tag is missing entirely!");
  } else {
    if (currentPage.title.length < 30) {
      titleScore -= 3;
      titleTips.push("Title tag is too short (< 30 chars). Add relevant descriptors.");
    }
    if (currentPage.title.length > 60) {
      titleScore -= 2;
      titleTips.push("Title tag exceeds 60 characters and may be truncated on SERPs.");
    }
    if (currentPage.focusKeyword && !currentPage.title.toLowerCase().includes(currentPage.focusKeyword.toLowerCase())) {
      titleScore -= 3;
      titleTips.push(`Primary keyword '${currentPage.focusKeyword}' is missing from title.`);
    }
  }

  // Calculate meta desc score out of 10
  let descScore = 10;
  let descTips = [];
  if (!currentPage.metaDescription) {
    descScore = 0;
    descTips.push("Missing meta description!");
  } else {
    if (currentPage.metaDescription.length < 100) {
      descScore -= 3;
      descTips.push("Meta description is too short (< 100 chars). Expand on benefits.");
    }
    if (currentPage.metaDescription.length > 165) {
      descScore -= 2;
      descTips.push("Meta description is too long (> 165 chars).");
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">On-Page Laboratory</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            Interactive On-Page SEO Analyzer
          </h2>
          <p className="text-xs text-slate-400">Audit title tags, meta descriptions, visual heading trees, and keyword density in real-time.</p>
        </div>

        {/* Page selector pills */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {website.pages.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePageId(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                p.id === currentPage.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Title Tag Analyzer */}
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-blue-400">{titleScore}/10</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Title Tag Audit</h3>
            </div>
            <button
              onClick={() => triggerWhyModal("Title Tag Optimization", "Search engines treat the <title> tag as a key topic indicator. Placing focus keywords near the beginning improves ranking signals.")}
              className="text-slate-400 hover:text-white"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-200">
            "{currentPage.title || "<Missing Title>"}"
          </div>

          <div className="space-y-2 text-xs">
            {titleTips.length === 0 ? (
              <div className="p-3 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-xl flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Good keyword placement! Title length is within recommended 50–60 character range.</span>
              </div>
            ) : (
              titleTips.map((tip, idx) => (
                <div key={idx} className="p-2.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{tip}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 2. Meta Description Analyzer */}
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-purple-400">{descScore}/10</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Meta Description Audit</h3>
            </div>
            <button
              onClick={() => triggerWhyModal("Meta Description Best Practices", "A strong meta description improves Click-Through Rates (CTR). Aim for 120-160 characters with a clear call-to-action.")}
              className="text-slate-400 hover:text-white"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-200">
            "{currentPage.metaDescription || "<Missing Meta Description>"}"
          </div>

          <div className="space-y-2 text-xs">
            {descTips.length === 0 ? (
              <div className="p-3 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-xl flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Optimal meta description length! Includes clear summary and CTA.</span>
              </div>
            ) : (
              descTips.map((tip, idx) => (
                <div key={idx} className="p-2.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{tip}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 3. Visual Heading Structure Hierarchy Tree */}
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Heading className="w-4 h-4 text-indigo-400" />
              Visual Heading Hierarchy Tree
            </h3>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
            {currentPage.h1 ? (
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <span className="px-2 py-0.5 bg-indigo-500/20 rounded">H1</span>
                <span>{currentPage.h1}</span>
              </div>
            ) : (
              <div className="text-red-400 font-bold">🔴 Missing H1 Tag!</div>
            )}

            {currentPage.h2s?.map((h2, idx) => (
              <div key={idx} className="pl-6 flex items-center gap-2 text-purple-300">
                <span className="px-2 py-0.5 bg-purple-500/20 rounded text-[10px]">↳ H2</span>
                <span>{h2}</span>
              </div>
            ))}

            {currentPage.h3s?.map((h3, idx) => (
              <div key={idx} className="pl-12 flex items-center gap-2 text-slate-400">
                <span className="px-2 py-0.5 bg-slate-800 rounded text-[10px]">↳ H3</span>
                <span>{h3}</span>
              </div>
            ))}
          </div>

          {currentPage.multipleH1s && (
            <div className="p-3 bg-red-500/10 text-red-300 border border-red-500/30 rounded-xl text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>Multiple H1 tags detected! Convert extra H1s to H2 tags.</span>
            </div>
          )}
        </div>

        {/* 4. Keyword Optimization & Stuffing Warning */}
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              Keyword Density & Placement
            </h3>
            <span className="text-xs font-bold text-amber-400 font-mono">{analysis.densityPercent}% Density</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Focus Keyword</span>
              <p className="font-bold text-white mt-0.5">{currentPage.focusKeyword || "None"}</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Mentions / Words</span>
              <p className="font-bold text-white mt-0.5">{analysis.keywordCount} / {analysis.wordCount} words</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-300">Keyword in Title Tag?</span>
              <span className={analysis.inH1 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                {analysis.inH1 ? "✅ Yes" : "❌ No"}
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-300">Keyword in First 50 Words?</span>
              <span className={analysis.inFirstParagraph ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                {analysis.inFirstParagraph ? "✅ Yes" : "❌ No"}
              </span>
            </div>
          </div>

          {analysis.isKeywordStuffed && (
            <div className="p-3 bg-red-500/10 text-red-300 border border-red-500/30 rounded-xl text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>Keyword Stuffing Warning! Density exceeds 3.5%. Rewrite content naturally.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
