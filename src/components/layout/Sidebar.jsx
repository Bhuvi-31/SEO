import React from "react";
import {
  LayoutDashboard,
  Globe,
  Search,
  FileCode,
  Cpu,
  Link2,
  FileText,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  Eye,
  Trophy,
  BarChart3,
  BookOpen,
  Settings,
  Code2,
  MapPin,
  FileCheck2,
  Network,
  Sun,
  Moon,
  Zap
} from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";

export default function Sidebar() {
  const { activeTab, setActiveTab, userProgress, darkMode, setDarkMode, setShowErrorGenerator } = useSeoLab();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "practice-website", label: "SEO Practice Website", icon: Globe, badge: "7 Pages" },
    { id: "onpage-seo", label: "On-Page SEO Lab", icon: FileCode },
    { id: "technical-seo", label: "Technical SEO Lab", icon: Cpu },
    { id: "image-seo", label: "Image SEO Lab", icon: Eye },
    { id: "internal-linking", label: "Internal Linking Lab", icon: Link2 },
    { id: "offpage-seo", label: "Off-Page SEO & Backlinks", icon: ExternalLink },
    { id: "keyword-research", label: "Keyword Research", icon: Search },
    { id: "serp-simulator", label: "SERP Simulator", icon: Eye },
    { id: "content-lab", label: "Content Optimization Lab", icon: FileText },
    { id: "competitor-analysis", label: "Competitor Analysis", icon: TrendingUp },
    { id: "seo-audit", label: "SEO Audit Engine", icon: ShieldCheck, highlight: true },
    { id: "seo-challenges", label: "SEO Challenges", icon: Trophy, badge: `${userProgress.xp} XP` },
    { id: "progress", label: "Progress & Skills", icon: BarChart3 },
    { id: "learning-center", label: "Learning Center", icon: BookOpen },
    { id: "schema-lab", label: "Schema Markup Lab", icon: Code2 },
    { id: "local-seo", label: "Local SEO Lab", icon: MapPin },
    { id: "architecture", label: "Site Architecture", icon: Network },
    { id: "report-generator", label: "SEO Report Generator", icon: FileCheck2 },
    { id: "settings", label: "Settings & Reset", icon: Settings }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white rounded-xl shadow-lg shadow-indigo-500/20">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
              SEO Practice Lab
            </h1>
            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">2026 Simulator</span>
          </div>
        </div>
      </div>

      {/* User Progress Pill */}
      <div className="mx-4 my-3 p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Student Level</span>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            Lvl {userProgress.level} — {userProgress.levelName}
          </div>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 rounded-md">
          {userProgress.xp} XP
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold"
                  : item.highlight
                  ? "bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 border border-indigo-500/20"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/70"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-400"}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    isActive ? "bg-indigo-800 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Controls */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <button
          onClick={() => setShowErrorGenerator(true)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl transition-all"
        >
          <Zap className="w-4 h-4 text-red-400" />
          "Create SEO Problems"
        </button>

        <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
          <span className="text-[11px]">Theme</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
            <span className="text-[10px] font-semibold">{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
