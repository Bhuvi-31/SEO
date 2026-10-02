import React from "react";
import { Network, Globe, Folder, FileText } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function ArchitectureLab() {
  const { website } = useSeoLab();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Site Taxonomy</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            Simulated Website Architecture & Depth Tree
          </h2>
          <p className="text-xs text-slate-400">Visualize page click depth, URL path structures, and hierarchy levels.</p>
        </div>
      </div>

      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Network className="w-4 h-4 text-cyan-400" />
          Tree Hierarchy View
        </h3>

        <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-indigo-400 font-bold">
            <Globe className="w-4 h-4" />
            <span>Home (/)</span>
          </div>

          <div className="pl-6 space-y-2 border-l border-slate-800 ml-2">
            <div className="flex items-center gap-2 text-slate-300">├── About (/about)</div>
            <div className="flex items-center gap-2 text-slate-300">├── Contact (/contact)</div>
            <div className="flex items-center gap-2 text-slate-300">├── Blog (/blog) {website.pages.find(p => p.id === "blog")?.isOrphan && <span className="text-amber-400 font-sans text-[10px] font-bold">(Orphan)</span>}</div>
            <div className="flex items-center gap-2 text-purple-300 font-bold">├── Services (/services)</div>
            <div className="pl-6 space-y-1 border-l border-slate-800 ml-2">
              <div className="flex items-center gap-2 text-slate-400">├── SEO Services (/services/seo)</div>
              <div className="flex items-center gap-2 text-slate-400">└── Social Media Marketing (/services/social-media)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
