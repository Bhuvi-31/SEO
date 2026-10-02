import React, { useState } from "react";
import { BookOpen, CheckCircle2, XCircle, ArrowRight, HelpCircle } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { LEARNING_LESSONS } from "../../data/learningLessons.js";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function LearningCenter() {
  const { addXp } = useSeoLab();
  const [activeLessonId, setActiveLessonId] = useState(LEARNING_LESSONS[0].id);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const lesson = LEARNING_LESSONS.find(l => l.id === activeLessonId) || LEARNING_LESSONS[0];

  const handleLessonChange = (id) => {
    setActiveLessonId(id);
    setSelectedQuizIndex(null);
    setQuizSubmitted(false);
  };

  const handleCheckQuiz = () => {
    setQuizSubmitted(true);
    if (selectedQuizIndex === lesson.quiz.correctIndex) {
      addXp(20, `Passed Lesson Quiz: ${lesson.title}`);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">SEO Academy</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            SEO Learning Center & Practice Curriculum
          </h2>
          <p className="text-xs text-slate-400">Master search engine optimization principles through interactive concepts, examples, and quizzes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lesson Navigation Sidebar */}
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Lesson Library</h3>
          <div className="space-y-2">
            {LEARNING_LESSONS.map(item => (
              <button
                key={item.id}
                onClick={() => handleLessonChange(item.id)}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-all ${
                  item.id === lesson.id
                    ? "bg-indigo-600 border-indigo-500 text-white font-bold"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-indigo-300 block">{item.category}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Lesson Content */}
        <div className="lg:col-span-2 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4 space-y-1">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 rounded-md">
              {lesson.category} • {lesson.difficulty}
            </span>
            <h3 className="text-xl font-extrabold text-white">{lesson.title}</h3>
            <p className="text-xs text-slate-400">{lesson.summary}</p>
          </div>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 whitespace-pre-line">
              <h4 className="font-bold text-white text-sm">Core SEO Concept</h4>
              <p>{lesson.concept}</p>
            </div>

            <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-xl space-y-1 font-mono text-[11px]">
              <h4 className="font-bold text-indigo-400 font-sans text-xs">Example Code / Implementation</h4>
              <p className="whitespace-pre-line text-indigo-200">{lesson.example}</p>
            </div>
          </div>

          {/* Quiz */}
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-4 text-xs">
            <h4 className="font-bold text-white text-sm">Practice Quiz Checkpoint</h4>
            <p className="text-slate-300 font-medium">{lesson.quiz.question}</p>

            <div className="space-y-2">
              {lesson.quiz.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedQuizIndex(idx)}
                  disabled={quizSubmitted}
                  className={`w-full p-3 rounded-xl border text-left font-semibold transition-all ${
                    selectedQuizIndex === idx
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {!quizSubmitted ? (
              <button
                onClick={handleCheckQuiz}
                disabled={selectedQuizIndex === null}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <div className={`p-4 rounded-xl border leading-relaxed ${selectedQuizIndex === lesson.quiz.correctIndex ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200" : "bg-red-500/10 border-red-500/30 text-red-200"}`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  {selectedQuizIndex === lesson.quiz.correctIndex ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                  <span>{selectedQuizIndex === lesson.quiz.correctIndex ? "Correct! +20 XP" : "Incorrect."}</span>
                </div>
                <p className="mt-1 text-slate-300">{lesson.quiz.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
