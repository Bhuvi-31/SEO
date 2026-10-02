import React from "react";

export default function ScoreRing({ score = 0, size = 120, strokeWidth = 10, label = "SEO Score", sublabel = "" }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let color = "#ef4444"; // red
  if (score >= 80) color = "#10b981"; // green
  else if (score >= 60) color = "#f59e0b"; // orange

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="animate-ring transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold tracking-tight text-white">{score}</span>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{label}</span>
      </div>
      {sublabel && <span className="mt-2 text-xs text-slate-400 font-medium">{sublabel}</span>}
    </div>
  );
}
