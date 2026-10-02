import React, { useState } from "react";
import { Eye, Globe, Search, HelpCircle, Edit3 } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function SerpSimulator() {
  const { website, updatePage, activePageId, setActivePageId, triggerWhyModal } = useSeoLab();
  const [searchQuery, setSearchQuery] = useState("Digital Marketing Agency in Salem");

  const currentPage = website.pages.find(p => p.id === activePageId) || website.pages[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">SERP Snippet Simulator</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            Google Search Result SERP Visualizer
          </h2>
          <p className="text-xs text-slate-400">Tweak page titles and meta descriptions to see how your snippet appears in organic Google search.</p>
        </div>

        <button
          onClick={() => triggerWhyModal("SERP Preview Mechanics", "This tool simulates Google Search engine result page rendering. Optimization directly increases user click-through rate (CTR).")}
          className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-1.5"
        >
          <HelpCircle className="w-4 h-4" />
          <span>SERP Guidance</span>
        </button>
      </div>

      {/* Simulated Search Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
        <div className="p-2 bg-slate-950 text-slate-400 rounded-xl">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Simulated Google Search Query..."
          className="flex-1 bg-transparent text-sm text-white font-medium focus:outline-none"
        />
        <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          SERP PREVIEW / SIMULATION
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side SERP Display */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main SERP Box */}
          <div className="p-6 bg-white text-slate-900 rounded-2xl shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center gap-2 text-xs text-[#202124]">
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px]">G</span>
              <span className="font-normal text-xs text-[#202124]">https://{website.domain}{currentPage.slug}</span>
            </div>

            <h3 className="text-xl text-[#1a0dab] font-medium hover:underline cursor-pointer">
              {currentPage.title || "Untitled Page"}
            </h3>

            <p className="text-sm text-[#4d5156] leading-snug">
              {currentPage.metaDescription || "Missing meta description! Google will automatically extract arbitrary body text from your webpage..."}
            </p>

            {/* Sitelinks Simulation */}
            {currentPage.id === "home" && (
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <h4 className="text-[#1a0dab] font-semibold hover:underline cursor-pointer">Services</h4>
                  <p className="text-slate-500 text-[11px]">Explore our full spectrum of digital marketing solutions in Salem.</p>
                </div>
                <div>
                  <h4 className="text-[#1a0dab] font-semibold hover:underline cursor-pointer">SEO Services</h4>
                  <p className="text-slate-500 text-[11px]">Local search engine optimization and technical audit packages.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Quick Editor */}
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-indigo-400" />
              Live Metadata Editor
            </h3>
            <span className="text-[10px] text-slate-500">{currentPage.name}</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Title Tag</label>
              <input
                type="text"
                value={currentPage.title}
                onChange={(e) => updatePage(currentPage.id, { title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Meta Description</label>
              <textarea
                rows={4}
                value={currentPage.metaDescription}
                onChange={(e) => updatePage(currentPage.id, { metaDescription: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
