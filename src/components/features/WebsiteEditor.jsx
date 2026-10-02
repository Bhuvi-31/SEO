import React, { useState } from "react";
import {
  FileText,
  Eye,
  Edit3,
  Globe,
  Heading,
  Key,
  Image as ImageIcon,
  Link,
  ShieldAlert,
  Save,
  HelpCircle,
  ExternalLink,
  Sparkles,
  Plus,
  Trash2
} from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function WebsiteEditor() {
  const { website, updatePage, activePageId, setActivePageId, triggerWhyModal } = useSeoLab();
  const [activeSubTab, setActiveSubTab] = useState("editor"); // 'editor' | 'live-preview' | 'serp-preview'

  const currentPage = website.pages.find(p => p.id === activePageId) || website.pages[0];

  const handleFieldChange = (field, value) => {
    updatePage(currentPage.id, { [field]: value });
  };

  const handleImageAltChange = (imgId, newAlt) => {
    const newImages = currentPage.images.map(img => {
      if (img.id === imgId) return { ...img, altText: newAlt };
      return img;
    });
    updatePage(currentPage.id, { images: newImages });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Page Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Simulated Page Editor</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            Practice Website Editor — {website.siteName}
          </h2>
          <p className="text-xs text-slate-400">Select any page to modify metadata, headings, body text, image ALTs, and canonical tags.</p>
        </div>

        {/* Preview Sub-tabs */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveSubTab("editor")}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              activeSubTab === "editor" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            Page Form Editor
          </button>
          <button
            onClick={() => setActiveSubTab("live-preview")}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              activeSubTab === "live-preview" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Live Page Preview
          </button>
          <button
            onClick={() => setActiveSubTab("serp-preview")}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              activeSubTab === "serp-preview" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            SERP Snippet Preview
          </button>
        </div>
      </div>

      {/* Page Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {website.pages.map(page => {
          const isActive = page.id === currentPage.id;
          const hasFlaws = !page.metaDescription || !page.canonicalUrl || page.isOrphan;

          return (
            <button
              key={page.id}
              onClick={() => setActivePageId(page.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <span>{page.name}</span>
              {hasFlaws && (
                <span className="w-2 h-2 rounded-full bg-amber-400" title="Contains unoptimized SEO issues" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content Area based on active subtab */}
      {activeSubTab === "editor" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Form Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Metadata Box */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  Meta Title & URL Slug
                </h3>
                <button
                  onClick={() => triggerWhyModal("Title & Meta Tags", "Title tags and URL slugs establish topical relevance for search crawlers. Keep titles under 60 characters.")}
                  className="text-slate-400 hover:text-white text-xs flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Why edit this?</span>
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-slate-300">Page Title Tag (&lt;title&gt;)</label>
                    <span className={`font-mono font-bold ${currentPage.title.length > 60 ? "text-amber-400" : "text-emerald-400"}`}>
                      {currentPage.title.length} / 60 chars
                    </span>
                  </div>
                  <input
                    type="text"
                    value={currentPage.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 font-mono"
                    placeholder="Page Title Tag"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">URL Slug</label>
                    <input
                      type="text"
                      value={currentPage.slug}
                      onChange={(e) => handleFieldChange("slug", e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">Canonical URL</label>
                    <input
                      type="text"
                      value={currentPage.canonicalUrl}
                      onChange={(e) => handleFieldChange("canonicalUrl", e.target.value)}
                      placeholder="https://greenleafmarketing.com/your-slug"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                    {!currentPage.canonicalUrl && (
                      <span className="text-[10px] text-red-400 font-bold mt-1 block">🔴 Missing canonical URL tag!</span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-slate-300">Meta Description</label>
                    <span className={`font-mono font-bold ${currentPage.metaDescription.length < 120 || currentPage.metaDescription.length > 165 ? "text-amber-400" : "text-emerald-400"}`}>
                      {currentPage.metaDescription.length} / 160 chars
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={currentPage.metaDescription}
                    onChange={(e) => handleFieldChange("metaDescription", e.target.value)}
                    placeholder="Write a concise meta description summarizing the page content with a call to action..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                  {!currentPage.metaDescription && (
                    <span className="text-[10px] text-red-400 font-bold mt-1 block">🔴 Missing Meta Description!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Headings & Content Editor */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Heading className="w-4 h-4 text-purple-400" />
                  Headings & Body Content
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Primary H1 Heading</label>
                  <input
                    type="text"
                    value={currentPage.h1}
                    onChange={(e) => handleFieldChange("h1", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Page Body Content</label>
                  <textarea
                    rows={6}
                    value={currentPage.content}
                    onChange={(e) => handleFieldChange("content", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Keywords & Image Alt Text */}
          <div className="space-y-6">
            {/* Focus Keywords */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" />
                Target Keywords
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Primary Focus Keyword</label>
                  <input
                    type="text"
                    value={currentPage.focusKeyword || ""}
                    onChange={(e) => handleFieldChange("focusKeyword", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Secondary Keywords</label>
                  <input
                    type="text"
                    value={currentPage.secondaryKeywords || ""}
                    onChange={(e) => handleFieldChange("secondaryKeywords", e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Image SEO Alt Text */}
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                Image ALT Text & Assets
              </h3>

              <div className="space-y-3">
                {currentPage.images && currentPage.images.length > 0 ? (
                  currentPage.images.map(img => (
                    <div key={img.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center justify-between font-mono text-slate-300">
                        <span>{img.fileName}</span>
                        <span className="text-[10px] text-slate-500">{img.fileSize}</span>
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 block mb-1">ALT Text</label>
                        <input
                          type="text"
                          value={img.altText}
                          onChange={(e) => handleImageAltChange(img.id, e.target.value)}
                          placeholder="Describe image for search engines..."
                          className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">No image elements on this page.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Page Preview Subtab */}
      {activeSubTab === "live-preview" && (
        <div className="p-6 bg-white text-slate-900 rounded-2xl shadow-xl space-y-6 max-w-4xl mx-auto border border-slate-200">
          <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Previewing: https://{website.domain}{currentPage.slug}</span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-700 rounded">LIVE RENDER</span>
          </div>

          <header className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900">{currentPage.h1 || currentPage.name}</h1>
            <p className="text-sm font-medium text-indigo-600">{currentPage.focusKeyword}</p>
          </header>

          <main className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <p>{currentPage.content}</p>

            {currentPage.h2s && currentPage.h2s.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-slate-100">
                {currentPage.h2s.map((h2, idx) => (
                  <div key={idx}>
                    <h2 className="text-xl font-bold text-slate-800">{h2}</h2>
                    <p className="text-xs text-slate-500 mt-1">Sample sub-section content under {h2}.</p>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      )}

      {/* SERP Snippet Preview Subtab */}
      {activeSubTab === "serp-preview" && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 max-w-3xl mx-auto">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            Google SERP Snippet Simulation
          </h3>

          <div className="p-5 bg-white text-slate-900 rounded-xl shadow-lg space-y-1 font-sans">
            <div className="flex items-center gap-2 text-xs text-[#202124]">
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px]">G</span>
              <span className="font-normal text-xs text-[#202124]">https://{website.domain}{currentPage.slug}</span>
            </div>

            <h3 className="text-xl text-[#1a0dab] font-normal hover:underline cursor-pointer truncate">
              {currentPage.title || "Untitled Page"}
            </h3>

            <p className="text-sm text-[#4d5156] line-clamp-2 leading-snug">
              {currentPage.metaDescription || "No meta description provided. Google will extract random text from your webpage..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
