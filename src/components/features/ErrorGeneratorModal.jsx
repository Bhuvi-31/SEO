import React from "react";
import { AlertOctagon, X, Zap } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";

export default function ErrorGeneratorModal() {
  const { showErrorGenerator, setShowErrorGenerator, injectSeoFlaw } = useSeoLab();

  if (!showErrorGenerator) return null;

  const flaws = [
    { id: "remove_meta_desc", name: "Remove Meta Description", desc: "Clears meta description on all pages", icon: "🔴" },
    { id: "remove_h1", name: "Remove H1 Tags", desc: "Deletes H1 headings across site", icon: "🔴" },
    { id: "duplicate_title", name: "Create Duplicate Titles", desc: "Sets identical title tag on every page", icon: "🟠" },
    { id: "broken_link", name: "Create Broken Internal Link", desc: "Injects 404 URL on Homepage", icon: "🔴" },
    { id: "remove_canonical", name: "Strip Canonical Tags", desc: "Removes rel='canonical' tags", icon: "🔴" },
    { id: "block_robots", name: "Block Site in robots.txt", desc: "Adds Disallow: / directive", icon: "🔴" },
    { id: "create_orphan", name: "Create Orphan Page", desc: "Isolates Blog page from internal links", icon: "🟠" },
    { id: "remove_https", name: "Disable HTTPS SSL", desc: "Reverts website to unencrypted HTTP", icon: "🔴" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                "Create SEO Problems" Simulator
              </h3>
              <p className="text-xs text-slate-400">
                Intentionally break your website to test your SEO auditing & troubleshooting skills!
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowErrorGenerator(false)}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {flaws.map(flaw => (
            <div
              key={flaw.id}
              className="flex items-center justify-between p-3.5 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-red-500/40 rounded-xl transition-all group"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{flaw.icon}</span>
                  <span className="text-xs font-bold text-white group-hover:text-red-300 transition-colors">
                    {flaw.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{flaw.desc}</p>
              </div>

              <button
                onClick={() => {
                  injectSeoFlaw(flaw.id);
                }}
                className="px-3 py-1.5 text-xs font-semibold bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white border border-red-500/30 rounded-lg transition-all flex items-center gap-1 shrink-0"
              >
                <Zap className="w-3.5 h-3.5" />
                Inject
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-800 text-xs text-slate-400">
          <span>After creating flaws, click <strong>"RUN FULL SEO AUDIT"</strong> to discover & fix them!</span>
          <button
            onClick={() => setShowErrorGenerator(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
