import React from "react";
import { Settings, RefreshCw, Trash2, ShieldAlert } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function SettingsTab() {
  const { handleReset } = useSeoLab();

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Lab Data Management</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            Simulator Settings & Reset
          </h2>
          <p className="text-xs text-slate-400">Manage persistence data and reset the practice website to factory default.</p>
        </div>
      </div>

      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          Factory Data Reset
        </h3>

        <p className="text-xs text-slate-400 leading-relaxed">
          Resetting will clear all your local edits and restore GreenLeaf Digital Marketing with the initial ~15 deliberate SEO flaws for fresh practice drills.
        </p>

        <button
          onClick={handleReset}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Reset Practice Website to Factory Default
        </button>
      </div>
    </div>
  );
}
