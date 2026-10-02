import React from "react";

export function SimulatedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full uppercase tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      SIMULATED TRAINING DATA
    </span>
  );
}

export function SeverityBadge({ severity }) {
  if (severity === "critical") {
    return (
      <span className="px-2.5 py-1 text-[11px] font-bold bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg uppercase tracking-wider">
        🔴 Critical
      </span>
    );
  }
  if (severity === "warning") {
    return (
      <span className="px-2.5 py-1 text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg uppercase tracking-wider">
        🟠 Warning
      </span>
    );
  }
  return (
    <span className="px-2.5 py-1 text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg uppercase tracking-wider">
      🟢 Passed
    </span>
  );
}
