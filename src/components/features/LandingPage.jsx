import React from "react";
import { Globe, ShieldCheck, Zap, Search, Cpu, FileCode, ExternalLink, ArrowRight, Play, Trophy, Sparkles } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";

export default function LandingPage({ onStart }) {
  const { setActiveTab } = useSeoLab();

  const handleStart = () => {
    if (onStart) onStart();
    else setActiveTab("dashboard");
  };

  const featureCards = [
    { id: "onpage-seo", title: "On-Page SEO Lab", desc: "Analyze titles, meta descriptions, H1-H3 visual heading trees, and keyword placement density.", icon: FileCode, color: "from-blue-500 to-indigo-600" },
    { id: "technical-seo", title: "Technical SEO Lab", desc: "Edit robots.txt, XML sitemaps, canonical tags, HTTPS, mobile view, and Core Web Vitals speed.", icon: Cpu, color: "from-indigo-500 to-purple-600" },
    { id: "keyword-research", title: "Keyword Research", desc: "Explore training volumes, difficulty, CPC, search intent categories, and take intent quizzes.", icon: Search, color: "from-emerald-500 to-teal-600" },
    { id: "offpage-seo", title: "Backlink & Off-Page Lab", desc: "Evaluate fictional backlink domain authority, topical relevance, spam risk, and anchor text.", icon: ExternalLink, color: "from-amber-500 to-orange-600" },
    { id: "serp-simulator", title: "SERP Simulator", desc: "Preview Google search snippet results in real-time as you tweak page metadata.", icon: Globe, color: "from-pink-500 to-rose-600" },
    { id: "seo-audit", title: "SEO Audit Engine", desc: "Run full animated crawler scans to identify critical flaws, warnings, and apply 1-click fixes.", icon: ShieldCheck, color: "from-cyan-500 to-blue-600" },
    { id: "seo-challenges", title: "SEO Gamification", desc: "Earn XP points, unlock Levels 1 to 5, solve real scenarios, and track your skill growth.", icon: Trophy, color: "from-violet-500 to-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Glow ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Header */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-600/30">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-white">SEO Practice Lab</span>
            <span className="ml-2 text-xs font-semibold px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-md">2026 SaaS</span>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
        >
          <span>Enter Practice Lab</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-xs font-semibold text-indigo-300 mb-6">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Interactive SEO Training Simulator for Digital Marketing Students</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Learn SEO by <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Actually Doing SEO.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Practice On-Page, Technical, Content, and Off-Page SEO in a realistic simulated website environment. Edit web pages, run full crawler audits, fix flaws, and see instant score improvements!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-3"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start Practicing Now</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("onpage-seo");
              if (onStart) onStart();
            }}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm rounded-2xl transition-all"
          >
            Explore SEO Labs
          </button>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Comprehensive Interactive Laboratories</h2>
          <p className="text-xs text-slate-400">Everything you need to master search engine optimization hands-on</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => {
                  setActiveTab(card.id);
                  if (onStart) onStart();
                }}
                className="p-6 bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 rounded-2xl transition-all cursor-pointer group hover:-translate-y-1"
              >
                <div className={`p-3 w-12 h-12 bg-gradient-to-tr ${card.color} text-white rounded-xl shadow-lg mb-4 flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {card.desc}
                </p>
                <div className="flex items-center text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                  <span>Open Lab</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
