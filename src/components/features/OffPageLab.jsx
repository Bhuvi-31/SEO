import React, { useState } from "react";
import { ExternalLink, ShieldCheck, AlertTriangle, HelpCircle, CheckCircle2, TrendingUp, Plus } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { MARKETPLACE_BACKLINKS, CURRENT_BACKLINK_PROFILE } from "../../data/backlinksData.js";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function OffPageLab() {
  const { userProgress, pursueBacklink, triggerWhyModal } = useSeoLab();
  const [activeSubTab, setActiveSubTab] = useState("marketplace"); // 'marketplace' | 'profile' | 'anchor'

  const pursuedIds = userProgress.pursuedBacklinks.map(b => b.id);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Off-Page SEO Simulator</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            Backlink Lab & Off-Page Strategy
          </h2>
          <p className="text-xs text-slate-400">Evaluate domain authority, topical relevance, spam risk, and anchor text distribution.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveSubTab("marketplace")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeSubTab === "marketplace" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Backlink Marketplace
          </button>
          <button
            onClick={() => setActiveSubTab("profile")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeSubTab === "profile" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Backlink Profile
          </button>
          <button
            onClick={() => setActiveSubTab("anchor")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeSubTab === "anchor" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Anchor Text Lab
          </button>
        </div>
      </div>

      {/* 1. Fictional Backlink Marketplace */}
      {activeSubTab === "marketplace" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Simulated Link Opportunities</h3>
            <button
              onClick={() => triggerWhyModal("Backlink Quality Factors", "Search engines evaluate authority (DA/DR), topical relevance, editorial placement, and spam risk. High-relevance editorial links pass maximum authority.")}
              className="text-xs text-indigo-400 flex items-center gap-1 hover:underline"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>What makes a good backlink?</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {MARKETPLACE_BACKLINKS.map(item => {
              const isPursued = pursuedIds.includes(item.id);
              const isSpam = item.spamRisk.includes("High") || item.spamRisk.includes("Critical");

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isPursued
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                      : "bg-slate-900/80 border-slate-800 text-slate-300"
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        {item.domain}
                      </h4>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-400 rounded-md">
                        {item.topic}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">{item.description}</p>
                    <p className="text-[11px] text-indigo-300 font-medium">💡 <strong>Why:</strong> {item.educationalWhy}</p>
                  </div>

                  <div className="flex items-center gap-6 text-xs font-mono shrink-0">
                    <div className="text-center">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">Authority</span>
                      <strong className="text-indigo-400 text-sm">{item.authority}/100</strong>
                    </div>

                    <div className="text-center">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">Relevance</span>
                      <strong className="text-emerald-400 text-sm">{item.relevance}%</strong>
                    </div>

                    <div className="text-center">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold block">Spam Risk</span>
                      <strong className={isSpam ? "text-red-400 text-sm font-bold" : "text-emerald-400 text-sm"}>
                        {item.spamRisk}
                      </strong>
                    </div>

                    <button
                      onClick={() => pursueBacklink(item)}
                      disabled={isPursued}
                      className={`px-4 py-2 font-bold rounded-xl text-xs transition-all ${
                        isPursued
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                          : isSpam
                          ? "bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white border border-red-500/30"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                      }`}
                    >
                      {isPursued ? "✅ Link Acquired" : isSpam ? "⚠️ Pursue (Risky)" : "Pursue Link (+50 XP)"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Backlink Profile Simulator */}
      {activeSubTab === "profile" && (
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Backlinks</span>
              <p className="text-2xl font-extrabold text-white mt-1">{CURRENT_BACKLINK_PROFILE.totalBacklinks}</p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400">Referring Domains</span>
              <p className="text-2xl font-extrabold text-indigo-400 mt-1">{CURRENT_BACKLINK_PROFILE.referringDomains}</p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400">DoFollow Ratio</span>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">{CURRENT_BACKLINK_PROFILE.doFollowRatio}%</p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400">Acquired Links</span>
              <p className="text-2xl font-extrabold text-amber-400 mt-1">{userProgress.pursuedBacklinks.length}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Referring Domains List</h4>
            {CURRENT_BACKLINK_PROFILE.topReferringDomains.map((domain, idx) => (
              <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <span className="font-bold text-white">{domain.domain}</span>
                <span className="text-slate-400">DR {domain.dr}</span>
                <span className="text-slate-400">{domain.links} links</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${domain.status === "Toxic" ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                  {domain.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Anchor Text Lab */}
      {activeSubTab === "anchor" && (
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Anchor Text Distribution</h3>
            <button
              onClick={() => triggerWhyModal("Anchor Text Diversity", "A natural anchor text profile contains a mix of brand names, naked URLs, and generic phrases. Exact match anchor text exceeding 30% triggers Google Penguin spam filters.")}
              className="text-xs text-indigo-400 flex items-center gap-1 hover:underline"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Anchor Rules</span>
            </button>
          </div>

          <div className="space-y-4">
            {CURRENT_BACKLINK_PROFILE.anchorTextDistribution.map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold text-slate-300">
                  <span>{item.type} ("{item.text}")</span>
                  <span className="font-mono text-indigo-400 font-bold">{item.percentage}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.percentage > 30 && item.type === "Exact Match" ? "bg-amber-400" : "bg-indigo-500"
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 leading-relaxed">
            <strong className="block font-bold mb-1">Educational Takeaway:</strong>
            Notice how Exact Match anchors represent 28% of the profile. Keep exact match anchors below 30% to avoid unnatural over-optimization penalties!
          </div>
        </div>
      )}
    </div>
  );
}
