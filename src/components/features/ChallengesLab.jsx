import React, { useState } from "react";
import { Trophy, Sparkles, CheckCircle2, Zap, HelpCircle, RefreshCw, ArrowRight } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { CHALLENGES_DATA } from "../../data/challengesData.js";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function ChallengesLab() {
  const { website, userProgress, addXp, practiceMode, setPracticeMode, triggerWhyModal } = useSeoLab();
  const [completedList, setCompletedList] = useState([]);
  const [activeScenario, setActiveScenario] = useState(null);
  const [selectedScenarioOpt, setSelectedScenarioOpt] = useState(null);
  const [scenarioFeedback, setScenarioFeedback] = useState(null);

  const sampleScenarios = [
    {
      id: "sc-1",
      title: "Orphan Page Investigation",
      text: "A website has 100 pages, but 27 pages are not internally linked from any other page.",
      question: "What is the primary risk of orphan pages?",
      options: [
        "Search engine bots struggle to discover orphan pages, wasting link equity.",
        "Orphan pages automatically cause server 500 errors.",
        "They slow down browser font rendering.",
        "Google bans the domain within 24 hours."
      ],
      correctIndex: 0,
      explanation: "Orphan pages receive 0 internal PageRank equity, making them difficult for search crawlers to index and rank."
    },
    {
      id: "sc-2",
      title: "Duplicate Content Parameter Penalty",
      text: "An e-commerce site has identical product pages accessible via both http://site.com/shoes and http://site.com/shoes?ref=social.",
      question: "How should you resolve this duplicate content issue?",
      options: [
        "Delete the social media campaign.",
        "Add a self-referencing rel='canonical' tag to https://site.com/shoes.",
        "Block CSS stylesheet files in robots.txt.",
        "Convert all product names to uppercase."
      ],
      correctIndex: 1,
      explanation: "A canonical tag specifies the master URL version to consolidate indexing authority."
    }
  ];

  const handleVerifyChallenge = (ch) => {
    const passed = ch.checkFn(website);
    if (passed) {
      if (!completedList.includes(ch.id)) {
        setCompletedList(prev => [...prev, ch.id]);
        addXp(ch.xp, `Completed Challenge: ${ch.title}`);
      }
    } else {
      alert(`Challenge incomplete! ${ch.task}`);
    }
  };

  const handleGenerateScenario = () => {
    const randomSc = sampleScenarios[Math.floor(Math.random() * sampleScenarios.length)];
    setActiveScenario(randomSc);
    setSelectedScenarioOpt(null);
    setScenarioFeedback(null);
  };

  const handleAnswerScenario = (optIdx) => {
    setSelectedScenarioOpt(optIdx);
    if (optIdx === activeScenario.correctIndex) {
      setScenarioFeedback("Correct!");
      addXp(30, "Solved SEO Troubleshooting Scenario!");
    } else {
      setScenarioFeedback("Incorrect. Try reviewing the educational takeaway.");
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Gamified Challenges</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            SEO Challenges & Gamification Hub
          </h2>
          <p className="text-xs text-slate-400">Earn XP points, unlock Levels 1–5, and solve random troubleshooting scenarios.</p>
        </div>

        {/* Level Badge */}
        <div className="flex items-center gap-3 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl">
          <Trophy className="w-6 h-6 text-amber-400" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Student Rank</span>
            <span className="text-xs font-extrabold text-white">Lvl {userProgress.level} — {userProgress.levelName}</span>
          </div>
        </div>
      </div>

      {/* Mode Switcher Banner */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between text-xs">
        <span className="text-slate-300">Current Practice Mode: <strong className="text-indigo-400 uppercase font-bold">{practiceMode} Mode</strong></span>
        <div className="flex gap-2">
          {["learn", "practice", "challenge"].map(m => (
            <button
              key={m}
              onClick={() => setPracticeMode(m)}
              className={`px-3 py-1 rounded-lg font-bold capitalize transition-all ${
                practiceMode === m ? "bg-indigo-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Stream */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CHALLENGES_DATA.map(ch => {
          const isDone = completedList.includes(ch.id);

          return (
            <div key={ch.id} className={`p-6 rounded-2xl border transition-all space-y-3 ${isDone ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200" : "bg-slate-900/80 border-slate-800 text-slate-300"}`}>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 rounded-md">
                  {ch.level} • {ch.category}
                </span>
                <span className="text-xs font-bold text-amber-400 font-mono">+{ch.xp} XP</span>
              </div>

              <h3 className="text-sm font-bold text-white">{ch.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{ch.description}</p>
              <p className="text-[11px] text-indigo-300">🎯 <strong>Task:</strong> {ch.task}</p>

              <button
                onClick={() => handleVerifyChallenge(ch)}
                disabled={isDone}
                className={`w-full py-2 text-xs font-bold rounded-xl transition-all ${
                  isDone
                    ? "bg-emerald-500/20 text-emerald-400 cursor-default"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg"
                }`}
              >
                {isDone ? "✅ Challenge Completed!" : "Verify & Claim XP"}
              </button>
            </div>
          );
        })}
      </div>

      {/* SEO Scenario Generator */}
      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            SEO Mistake Scenario Generator
          </h3>
          <button
            onClick={handleGenerateScenario}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            GENERATE SEO SCENARIO
          </button>
        </div>

        {activeScenario && (
          <div className="space-y-4 pt-2 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <h4 className="font-bold text-white text-sm">{activeScenario.title}</h4>
              <p className="text-slate-300">{activeScenario.text}</p>
            </div>

            <p className="font-bold text-slate-200">{activeScenario.question}</p>

            <div className="space-y-2">
              {activeScenario.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerScenario(idx)}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    selectedScenarioOpt === idx
                      ? idx === activeScenario.correctIndex
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold"
                        : "bg-red-500/20 border-red-500 text-red-200 font-bold"
                      : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {scenarioFeedback && (
              <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-indigo-200">
                <strong className="block mb-1">{scenarioFeedback}</strong>
                <p className="text-slate-300">{activeScenario.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
