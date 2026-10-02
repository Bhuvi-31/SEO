import React, { useState } from "react";
import { Link2, AlertTriangle, CheckCircle2, HelpCircle, Plus, Trash2, Globe, Network } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function InternalLinkingLab() {
  const { website, updatePage, triggerWhyModal } = useSeoLab();
  const [selectedSourceId, setSelectedSourceId] = useState("home");
  const [newLinkText, setNewLinkText] = useState("");
  const [newLinkTarget, setNewLinkTarget] = useState("services");

  const sourcePage = website.pages.find(p => p.id === selectedSourceId) || website.pages[0];

  // Calculate incoming internal links map
  const incomingLinksCount = {};
  website.pages.forEach(p => {
    incomingLinksCount[p.id] = 0;
  });

  website.pages.forEach(p => {
    p.internalLinks?.forEach(link => {
      if (incomingLinksCount[link.targetId] !== undefined) {
        incomingLinksCount[link.targetId] += 1;
      }
    });
  });

  const handleAddLink = () => {
    if (!newLinkText || !newLinkTarget) return;

    const targetPage = website.pages.find(p => p.id === newLinkTarget);
    const targetUrl = targetPage ? targetPage.slug : `/${newLinkTarget}`;

    const newLink = { text: newLinkText, targetId: newLinkTarget, url: targetUrl };
    const updatedLinks = [...(sourcePage.internalLinks || []), newLink];

    updatePage(sourcePage.id, { internalLinks: updatedLinks });
    setNewLinkText("");

    // If target page was orphan, mark it as non-orphan!
    if (targetPage && targetPage.isOrphan) {
      updatePage(targetPage.id, { isOrphan: false });
    }
  };

  const handleRemoveLink = (idx) => {
    const updatedLinks = sourcePage.internalLinks.filter((_, index) => index !== idx);
    updatePage(sourcePage.id, { internalLinks: updatedLinks });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Internal Link Architecture</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            Visual Internal Linking & Node Graph
          </h2>
          <p className="text-xs text-slate-400">Detect orphan pages, broken internal links, and optimize PageRank link equity flow.</p>
        </div>

        <button
          onClick={() => triggerWhyModal("Internal Linking Strategy", "Internal links distribute PageRank authority across your site and help crawlers discover new pages. Orphan pages with 0 internal links cannot rank well.")}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Why Internal Links?</span>
        </button>
      </div>

      {/* Visual Node Graph */}
      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Network className="w-4 h-4 text-indigo-400" />
          Page Nodes & Incoming Links
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {website.pages.map(page => {
            const incoming = incomingLinksCount[page.id] || 0;
            const isOrphan = page.isOrphan || incoming === 0;

            return (
              <div
                key={page.id}
                onClick={() => setSelectedSourceId(page.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  selectedSourceId === page.id
                    ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg"
                    : isOrphan
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{page.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">{page.slug}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block">{incoming} incoming link(s)</span>
                </div>

                {isOrphan && (
                  <span className="mt-2 text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">🔴 Orphan Page</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add / Edit Links for Selected Page */}
      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4 max-w-3xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Internal Links outgoing from <strong className="text-white">{sourcePage.name}</strong>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={newLinkText}
            onChange={(e) => setNewLinkText(e.target.value)}
            placeholder="Anchor text (e.g. Read Our SEO Guide)"
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
          <select
            value={newLinkTarget}
            onChange={(e) => setNewLinkTarget(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            {website.pages.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.slug})</option>
            ))}
          </select>
          <button
            onClick={handleAddLink}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Add Internal Link
          </button>
        </div>

        <div className="space-y-2 pt-2">
          {sourcePage.internalLinks?.map((link, idx) => {
            const isBroken = link.targetId === "broken-page" || link.url.includes("special-promo-deal");

            return (
              <div key={idx} className={`p-3 rounded-xl border flex items-center justify-between text-xs ${isBroken ? "bg-red-500/10 border-red-500/30 text-red-300" : "bg-slate-950 border-slate-800 text-slate-300"}`}>
                <div>
                  <span className="font-bold">"{link.text}"</span>
                  <span className="text-[10px] text-slate-500 font-mono ml-2">→ {link.url}</span>
                  {isBroken && <span className="ml-2 font-bold text-red-400">🔴 Broken 404 Link!</span>}
                </div>

                <button onClick={() => handleRemoveLink(idx)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
