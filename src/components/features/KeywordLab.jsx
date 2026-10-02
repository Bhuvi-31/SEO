import React, { useState } from "react";
import { Search, Filter, HelpCircle, CheckCircle2, XCircle, Sparkles, BookOpen } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { KEYWORDS_DATA, SEARCH_INTENT_QUIZ } from "../../data/keywordsData.js";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function KeywordLab() {
  const { addXp, triggerWhyModal } = useSeoLab();
  const [searchTerm, setSearchTerm] = useState("");
  const [intentFilter, setIntentFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("explorer"); // 'explorer' | 'quiz'

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState({});

  const filteredKeywords = KEYWORDS_DATA.filter(kw => {
    const matchesSearch = kw.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIntent = intentFilter === "All" || kw.intent === intentFilter;
    return matchesSearch && matchesIntent;
  });

  const handleQuizAnswer = (quizId, option) => {
    setQuizAnswers(prev => ({ ...prev, [quizId]: option }));
  };

  const handleCheckQuiz = (quizId, correctIntent) => {
    setQuizSubmitted(prev => ({ ...prev, [quizId]: true }));
    if (quizAnswers[quizId] === correctIntent) {
      addXp(25, "Correct Search Intent Quiz Answer!");
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Keyword Intelligence</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            Keyword Research & Search Intent Laboratory
          </h2>
          <p className="text-xs text-slate-400">Analyze search volume, keyword difficulty (KD), CPC, and practice identifying search intent.</p>
        </div>

        {/* Subtab navigation */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab("explorer")}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === "explorer" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Keyword Explorer
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === "quiz" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Search Intent Quiz
          </button>
        </div>
      </div>

      {/* 1. Keyword Explorer */}
      {activeTab === "explorer" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search keywords (e.g., SEO Salem, agency...)"
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Filter Intent:</span>
              <select
                value={intentFilter}
                onChange={(e) => setIntentFilter(e.target.value)}
                className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Intents</option>
                <option value="Informational">Informational</option>
                <option value="Commercial">Commercial</option>
                <option value="Transactional">Transactional</option>
                <option value="Navigational">Navigational</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Keyword</th>
                  <th className="p-3.5">Search Volume</th>
                  <th className="p-3.5">Difficulty (KD)</th>
                  <th className="p-3.5">CPC ($)</th>
                  <th className="p-3.5">Search Intent</th>
                  <th className="p-3.5">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredKeywords.map((kw, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-sans font-bold text-white flex items-center gap-2">
                      <span>{kw.keyword}</span>
                      {kw.isTarget && <span className="px-2 py-0.5 text-[9px] bg-indigo-500/20 text-indigo-300 rounded font-mono font-bold">Target</span>}
                    </td>
                    <td className="p-3.5 text-slate-200">{kw.volume.toLocaleString()}/mo</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${kw.kd > 50 ? "bg-red-500/20 text-red-400" : kw.kd > 30 ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                        {kw.kd}% ({kw.difficultyLabel})
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-300">${kw.cpc.toFixed(2)}</td>
                    <td className="p-3.5 font-sans">
                      <span className="px-2.5 py-1 text-[10px] font-extrabold bg-slate-800 text-indigo-300 border border-slate-700 rounded-lg">
                        {kw.intent}
                      </span>
                    </td>
                    <td className="p-3.5 text-emerald-400 font-bold">{kw.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Search Intent Quiz */}
      {activeTab === "quiz" && (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="p-5 bg-indigo-950/40 border border-indigo-500/30 rounded-2xl text-xs text-indigo-200">
            <h3 className="text-sm font-bold text-indigo-400 mb-1">Interactive Search Intent Quiz</h3>
            <p>Select the likely user search intent for each query below and submit to reveal the educational explanation!</p>
          </div>

          <div className="space-y-6">
            {SEARCH_INTENT_QUIZ.map((q) => {
              const selected = quizAnswers[q.id];
              const isSubmitted = quizSubmitted[q.id];
              const isCorrect = selected === q.intent;

              return (
                <div key={q.id} className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs text-slate-400">Keyword Query:</span>
                    <span className="text-sm font-bold text-white font-mono">"{q.keyword}"</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {q.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleQuizAnswer(q.id, opt)}
                        disabled={isSubmitted}
                        className={`p-3 rounded-xl border text-left font-bold transition-all ${
                          selected === opt
                            ? "bg-indigo-600 border-indigo-500 text-white"
                            : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {!isSubmitted ? (
                    <button
                      onClick={() => handleCheckQuiz(q.id, q.intent)}
                      disabled={!selected}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <div className={`p-4 rounded-xl border text-xs leading-relaxed ${isCorrect ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200" : "bg-red-500/10 border-red-500/30 text-red-200"}`}>
                      <div className="flex items-center gap-2 font-bold mb-1">
                        {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                        <span>{isCorrect ? "Correct!" : `Incorrect. Correct Intent: ${q.intent}`}</span>
                      </div>
                      <p className="mt-1 text-slate-300">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
