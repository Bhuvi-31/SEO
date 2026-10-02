import React from "react";
import { Sparkles, CheckCircle2, AlertTriangle, Info, Trophy } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";

export default function Toast() {
  const { toast } = useSeoLab();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900/90 text-white border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-md animate-bounce-short">
      {toast.type === "xp" && (
        <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl">
          <Sparkles className="w-5 h-5" />
        </div>
      )}
      {toast.type === "level" && (
        <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
          <Trophy className="w-5 h-5" />
        </div>
      )}
      {toast.type === "warning" && (
        <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
          <AlertTriangle className="w-5 h-5" />
        </div>
      )}
      {toast.type === "success" && (
        <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      )}
      {toast.type === "info" && (
        <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
          <Info className="w-5 h-5" />
        </div>
      )}

      <div>
        <p className="text-xs font-semibold text-slate-100">{toast.message}</p>
        {toast.xp > 0 && <span className="text-[10px] text-indigo-400 font-bold">+{toast.xp} XP</span>}
      </div>
    </div>
  );
}
