import React, { useState } from "react";
import {
  Cpu,
  Shield,
  FileCode,
  Smartphone,
  Zap,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Plus,
  Trash2,
  Lock,
  Unlock,
  RefreshCw
} from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function TechnicalLab() {
  const { website, toggleHttps, updateRobots, updateSitemap, toggleOptimization, triggerWhyModal } = useSeoLab();
  const [robotsInput, setRobotsInput] = useState(website.robotsTxt || "");
  const [newSitemapUrl, setNewSitemapUrl] = useState("");
  const [activeTab, setActiveTab] = useState("speed"); // 'speed' | 'robots' | 'sitemap' | 'https' | 'mobile'

  const perf = website.performanceMetrics || {};
  const opts = perf.optimizations || {};

  const handleSaveRobots = () => {
    updateRobots(robotsInput);
  };

  const handleAddSitemapUrl = () => {
    if (!newSitemapUrl) return;
    const newEntry = {
      url: newSitemapUrl,
      lastmod: new Date().toISOString().split("T")[0],
      priority: "0.8",
      changefreq: "monthly"
    };
    updateSitemap([...website.sitemap, newEntry]);
    setNewSitemapUrl("");
  };

  const handleRemoveSitemapUrl = (index) => {
    const updated = website.sitemap.filter((_, idx) => idx !== index);
    updateSitemap(updated);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Technical SEO Simulator</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            Technical SEO & Speed Laboratory
          </h2>
          <p className="text-xs text-slate-400">Configure robots.txt, XML sitemaps, canonicals, HTTPS security, and simulate Core Web Vitals optimizations.</p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab("speed")}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 ${
              activeTab === "speed" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Page Speed
          </button>
          <button
            onClick={() => setActiveTab("robots")}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 ${
              activeTab === "robots" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            robots.txt
          </button>
          <button
            onClick={() => setActiveTab("sitemap")}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 ${
              activeTab === "sitemap" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            XML Sitemap
          </button>
          <button
            onClick={() => setActiveTab("https")}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 ${
              activeTab === "https" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            HTTPS & SSL
          </button>
        </div>
      </div>

      {/* 1. Page Speed Lab */}
      {activeTab === "speed" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Core Web Vitals Metrics */}
          <div className="lg:col-span-2 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Simulated Core Web Vitals Metrics
              </h3>
              <SimulatedBadge />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">LCP (Largest Contentful Paint)</span>
                <p className={`text-2xl font-extrabold ${perf.lcp <= 2.5 ? "text-emerald-400" : "text-amber-400"}`}>
                  {perf.lcp}s
                </p>
                <span className="text-[10px] text-slate-500 font-semibold">{perf.lcp <= 2.5 ? "Good (< 2.5s)" : "Needs Work (> 2.5s)"}</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">INP (Interaction to Next Paint)</span>
                <p className={`text-2xl font-extrabold ${perf.inp <= 200 ? "text-emerald-400" : "text-amber-400"}`}>
                  {perf.inp}ms
                </p>
                <span className="text-[10px] text-slate-500 font-semibold">{perf.inp <= 200 ? "Good (< 200ms)" : "Needs Work (> 200ms)"}</span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">CLS (Cumulative Layout Shift)</span>
                <p className={`text-2xl font-extrabold ${perf.cls <= 0.1 ? "text-emerald-400" : "text-red-400"}`}>
                  {perf.cls}
                </p>
                <span className="text-[10px] text-slate-500 font-semibold">{perf.cls <= 0.1 ? "Good (< 0.1)" : "Poor (> 0.1)"}</span>
              </div>
            </div>

            {/* Educational Note */}
            <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs text-indigo-200 leading-relaxed">
              <strong className="text-indigo-400 block mb-1">Educational Practice note:</strong>
              These metrics represent practice simulation values. Apply the speed boosters on the right to see simulated LCP and CLS scores improve in real-time!
            </div>
          </div>

          {/* Speed Boosters Toggles */}
          <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Apply Speed Optimizations</h3>

            <div className="space-y-3 text-xs">
              {[
                { key: "compressImages", label: "Compress WebP Images", boost: "-0.8s LCP" },
                { key: "lazyLoadImages", label: "Enable Lazy Loading", boost: "-0.5s LCP" },
                { key: "minifyCss", label: "Minify CSS Assets", boost: "-40ms INP" },
                { key: "reduceJs", label: "Reduce Unused JS", boost: "-50ms INP" },
                { key: "enableCaching", label: "Enable Browser Caching", boost: "-0.4s LCP" },
                { key: "optimizeFonts", label: "Optimize Web Fonts", boost: "-0.12 CLS" }
              ].map(opt => (
                <div
                  key={opt.key}
                  onClick={() => toggleOptimization(opt.key)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    opts[opt.key]
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={!!opts[opt.key]} readOnly className="rounded text-indigo-600" />
                    <span>{opt.label}</span>
                  </div>
                  <span className="text-[10px] font-mono font-extrabold text-indigo-400">{opt.boost}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. robots.txt Simulator */}
      {activeTab === "robots" && (
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-purple-400" />
              Interactive robots.txt Editor
            </h3>
            <button
              onClick={() => triggerWhyModal("robots.txt Configuration", "robots.txt instructs web crawlers which pages or folders can or cannot be processed. Misconfigurations can block your site entirely.")}
              className="text-slate-400 hover:text-white"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">robots.txt File Contents</label>
            <textarea
              rows={8}
              value={robotsInput}
              onChange={(e) => setRobotsInput(e.target.value)}
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {robotsInput.includes("Disallow: /") && !robotsInput.includes("Disallow: /admin/") && (
            <div className="p-3 bg-red-500/10 text-red-300 border border-red-500/30 rounded-xl text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>DANGER: 'Disallow: /' blocks Googlebot from crawling your ENTIRE website!</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleSaveRobots}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
            >
              Save robots.txt Configuration
            </button>
          </div>
        </div>
      )}

      {/* 3. XML Sitemap Manager */}
      {activeTab === "sitemap" && (
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              XML Sitemap URL Manager
            </h3>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newSitemapUrl}
              onChange={(e) => setNewSitemapUrl(e.target.value)}
              placeholder="https://greenleafmarketing.com/your-page"
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              onClick={handleAddSitemapUrl}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add URL
            </button>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {website.sitemap?.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between font-mono text-xs text-slate-300">
                <span className="truncate">{item.url}</span>
                <div className="flex items-center gap-4 text-[10px] text-slate-500 shrink-0">
                  <span>Priority: {item.priority}</span>
                  <button onClick={() => handleRemoveSitemapUrl(idx)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. HTTPS Security */}
      {activeTab === "https" && (
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-6 max-w-xl mx-auto text-center">
          <div className="p-4 w-16 h-16 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20 mx-auto flex items-center justify-center">
            {website.httpsEnabled ? <Lock className="w-8 h-8 text-emerald-400" /> : <Unlock className="w-8 h-8 text-red-400" />}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">
              HTTPS Status: {website.httpsEnabled ? <span className="text-emerald-400">🟢 Secured (HTTPS)</span> : <span className="text-red-400">🔴 Insecure (HTTP)</span>}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Google uses HTTPS as an explicit lightweight ranking factor. Insecure HTTP sites display 'Not Secure' in browser address bars, increasing visitor bounce rates.
            </p>
          </div>

          <button
            onClick={toggleHttps}
            className={`px-6 py-3 font-bold text-xs rounded-xl shadow-lg transition-all ${
              website.httpsEnabled
                ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30"
            }`}
          >
            {website.httpsEnabled ? "Disable HTTPS (Create Flaw)" : "Enable HTTPS Security (+25 XP)"}
          </button>
        </div>
      )}
    </div>
  );
}
