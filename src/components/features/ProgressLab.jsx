import React from "react";
import { BarChart3, Trophy, CheckCircle2, Sparkles } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function ProgressLab() {
  const { userProgress, scores } = useSeoLab();

  const skills = [
    { name: "On-Page SEO", percent: Math.min(100, scores.onPage), color: "bg-blue-500" },
    { name: "Technical SEO", percent: Math.min(100, scores.technical), color: "bg-purple-500" },
    { name: "Off-Page SEO", percent: Math.min(100, scores.offPage), color: "bg-amber-500" },
    { name: "Keyword Research", percent: 76, color: "bg-emerald-500" },
    { name: "Content Optimization", percent: Math.min(100, scores.content), color: "bg-rose-500" },
    { name: "SEO Auditing", percent: Math.min(100, scores.overall), color: "bg-cyan-500" }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Skill Growth</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            SEO Mastery & Progress Tracking
          </h2>
          <p className="text-xs text-slate-400">Track your proficiency across all 6 core SEO skill domains.</p>
        </div>
      </div>

      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-indigo-400" />
          Skill Proficiency Metrics
        </h3>

        <div className="space-y-4">
          {skills.map((s, idx) => (
            <div key={idx} className="space-y-1.5 text-xs">
              <div className="flex justify-between font-bold text-slate-300">
                <span>{s.name}</span>
                <span className="font-mono text-indigo-400">{s.percent}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${s.color}`}
                  style={{ width: `${s.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
