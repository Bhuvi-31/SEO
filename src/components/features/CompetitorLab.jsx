import React, { useState } from "react";
import { TrendingUp, Award, Layers, Globe, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { COMPETITORS_DATA } from "../../data/competitorsData.js";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function CompetitorLab() {
  const { website, scores, triggerWhyModal } = useSeoLab();
  const [selectedCompId, setSelectedCompId] = useState("comp-a");

  const comp = COMPETITORS_DATA.find(c => c.id === selectedCompId) || COMPETITORS_DATA[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Competitive Benchmark</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            Competitor Analysis & SEO Gap Simulator
          </h2>
          <p className="text-xs text-slate-400">Compare GreenLeaf Digital Marketing against 3 realistic market competitors.</p>
        </div>

        {/* Competitor Selector Pills */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {COMPETITORS_DATA.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCompId(c.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedCompId === c.id ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-side Benchmark Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Your Website Card */}
        <div className="p-6 bg-slate-900/80 border border-indigo-500/30 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              Your Site: {website.siteName}
            </h3>
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 rounded-md">
              Score: {scores.overall}/100
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Domain Authority</span>
              <p className="text-xl font-extrabold text-white mt-0.5">38 / 100</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Indexed Pages</span>
              <p className="text-xl font-extrabold text-white mt-0.5">{website.pages.length} pages</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Referring Domains</span>
              <p className="text-xl font-extrabold text-indigo-400 mt-0.5">42 domains</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Est. Organic Traffic</span>
              <p className="text-xl font-extrabold text-emerald-400 mt-0.5">1.8K / mo</p>
            </div>
          </div>
        </div>

        {/* Selected Competitor Card */}
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Competitor: {comp.name}
            </h3>
            <span className="text-xs font-mono text-slate-400">{comp.domain}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Domain Authority</span>
              <p className="text-xl font-extrabold text-amber-400 mt-0.5">{comp.domainAuthority} / 100</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Indexed Pages</span>
              <p className="text-xl font-extrabold text-white mt-0.5">{comp.contentPages} pages</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Referring Domains</span>
              <p className="text-xl font-extrabold text-indigo-400 mt-0.5">{comp.referringDomains} domains</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Est. Organic Traffic</span>
              <p className="text-xl font-extrabold text-emerald-400 mt-0.5">{comp.organicTraffic}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Gap Analysis Box */}
      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-400" />
          SEO Gap Analysis Insights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2 text-emerald-200">
            <h4 className="font-bold flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              Your Strengths vs {comp.name}:
            </h4>
            <p>Your technical SEO setup and page speed optimizations are cleaner than {comp.name}'s legacy codebase.</p>
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2 text-amber-200">
            <h4 className="font-bold flex items-center gap-1.5 text-amber-400">
              <AlertCircle className="w-4 h-4" />
              Content & Authority Gaps:
            </h4>
            <p>{comp.name} has {comp.contentPages} published pages ({comp.contentPages - website.pages.length} more than you) and {comp.referringDomains} referring domains.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
