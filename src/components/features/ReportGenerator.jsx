import React from "react";
import { FileCheck2, Printer, ShieldCheck, CheckCircle2, AlertTriangle, Globe } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function ReportGenerator() {
  const { website, scores } = useSeoLab();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">PDF Report Generator</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            Client-Ready SEO Executive Audit Report
          </h2>
          <p className="text-xs text-slate-400">Export a clean PDF report to present audit findings to clients or stakeholders.</p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF Report</span>
        </button>
      </div>

      {/* Printable Report Document Card */}
      <div className="p-8 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 space-y-6 print:p-0 print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">SEO PRACTICE LAB AUDIT REPORT</span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{website.siteName}</h1>
            <p className="text-xs text-slate-500 font-mono">Domain: {website.domain} • Date: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 font-semibold block">Overall Score</span>
            <span className="text-4xl font-extrabold text-indigo-600">{scores.overall}/100</span>
          </div>
        </div>

        {/* Score Breakdown Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Category Score Breakdown</h3>
          <div className="grid grid-cols-5 gap-3 text-center text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold block">On-Page</span>
              <strong className="text-lg text-slate-800">{scores.onPage}/100</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold block">Technical</span>
              <strong className="text-lg text-slate-800">{scores.technical}/100</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold block">Content</span>
              <strong className="text-lg text-slate-800">{scores.content}/100</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold block">Off-Page</span>
              <strong className="text-lg text-slate-800">{scores.offPage}/100</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold block">Performance</span>
              <strong className="text-lg text-slate-800">{scores.performance}/100</strong>
            </div>
          </div>
        </div>

        {/* Action Recommendations */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Executive Priority Recommendations</h3>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="p-3 bg-amber-50 rounded-xl border border-amber-200 font-medium">
              1. Optimize missing meta descriptions across landing pages to improve organic CTR.
            </li>
            <li className="p-3 bg-amber-50 rounded-xl border border-amber-200 font-medium">
              2. Add rel="canonical" tags to resolve parameter duplicate content risks.
            </li>
            <li className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 font-medium">
              3. Maintain high-quality editorial backlink acquisition to raise domain authority.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
