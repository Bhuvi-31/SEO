import React from "react";
import { Image as ImageIcon, CheckCircle2, AlertTriangle, HelpCircle, FileText, Zap } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function ImageSeoLab() {
  const { website, updatePage, triggerWhyModal } = useSeoLab();

  // Gather all images across all pages
  const allImages = [];
  website.pages.forEach(p => {
    p.images?.forEach(img => {
      allImages.push({ ...img, pageId: p.id, pageName: p.name });
    });
  });

  const handleAltChange = (pageId, imgId, newAlt) => {
    const page = website.pages.find(p => p.id === pageId);
    if (!page) return;

    const newImages = page.images.map(img => {
      if (img.id === imgId) return { ...img, altText: newAlt };
      return img;
    });

    updatePage(pageId, { images: newImages });
  };

  const handleFilenameChange = (pageId, imgId, newName) => {
    const page = website.pages.find(p => p.id === pageId);
    if (!page) return;

    const newImages = page.images.map(img => {
      if (img.id === imgId) return { ...img, fileName: newName };
      return img;
    });

    updatePage(pageId, { images: newImages });
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Image SEO & Assets</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            Image SEO Optimization Laboratory
          </h2>
          <p className="text-xs text-slate-400">Optimize descriptive image file names, ALT text, and compression format for Google Image search.</p>
        </div>

        <button
          onClick={() => triggerWhyModal("Image SEO & Alt Text", "Search engines cannot see images visually. Alt text and descriptive file names (e.g., salem-seo-chart.jpg) provide topical context for indexing and accessibility.")}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Why Image SEO?</span>
        </button>
      </div>

      {/* Image Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allImages.map(img => {
          const isBadFilename = img.fileName.toLowerCase().startsWith("img_");
          const isMissingAlt = !img.altText || img.altText.trim().length === 0;

          return (
            <div key={img.id} className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-indigo-400">Page: {img.pageName}</span>
                <span className="text-[10px] font-mono text-slate-500">{img.dimensions} • {img.fileSize}</span>
              </div>

              {/* Status Warnings */}
              {isBadFilename && (
                <div className="p-2.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-xl text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Non-descriptive filename ({img.fileName}). Rename to keywords!</span>
                </div>
              )}

              {isMissingAlt && (
                <div className="p-2.5 bg-red-500/10 text-red-300 border border-red-500/30 rounded-xl text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Missing ALT Text description. Accessibility & Image SEO compromised.</span>
                </div>
              )}

              {/* Editable Fields */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Image File Name</label>
                  <input
                    type="text"
                    value={img.fileName}
                    onChange={(e) => handleFilenameChange(img.pageId, img.id, e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl font-mono text-white focus:outline-none focus:border-indigo-500"
                  />
                  {isBadFilename && (
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      💡 Try renaming to: <code className="text-indigo-400 font-bold">digital-marketing-seo-salem.jpg</code>
                    </span>
                  )}
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Image ALT Text</label>
                  <input
                    type="text"
                    value={img.altText}
                    onChange={(e) => handleAltChange(img.pageId, img.id, e.target.value)}
                    placeholder="e.g. Salem Digital Marketing Team at Office"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
