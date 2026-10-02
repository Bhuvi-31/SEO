import React from "react";
import { HelpCircle, X, CheckCircle2, Lightbulb } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";

export default function WhyModal() {
  const { whyModal, setWhyModal } = useSeoLab();

  if (!whyModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">SEO Concept & Mechanics</span>
              <h3 className="text-lg font-bold text-white">{whyModal.title}</h3>
            </div>
          </div>
          <button
            onClick={() => setWhyModal(null)}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              Why this matters for Search Engines
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {whyModal.explanation}
            </p>
          </div>

          {whyModal.concept && (
            <div className="bg-indigo-950/40 rounded-xl p-4 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed">
              <strong className="text-indigo-400 block mb-1">Educational Takeaway:</strong>
              {whyModal.concept}
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>SEO Practice Lab Educational Standard (2026)</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setWhyModal(null)}
            className="px-5 py-2.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg transition-all"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
