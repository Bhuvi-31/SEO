import React from "react";
import { MapPin, AlertTriangle, CheckCircle2, Globe, Phone, Clock } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function LocalSeoLab() {
  const { website } = useSeoLab();

  const citations = [
    { platform: "Google Business Profile", name: "GreenLeaf Digital Marketing", address: "4820 Commercial St SE, Salem, OR", phone: "(503) 555-0199", status: "Consistent" },
    { platform: "Yelp Business Listing", name: "GreenLeaf Marketing LLC", address: "4820 Commercial St, Salem, OR", phone: "(503) 555-0199", status: "Inconsistent Name" },
    { platform: "YellowPages Directory", name: "GreenLeaf Digital", address: "4820 Commercial St SE, Salem", phone: "(503) 555-[OLD]", status: "Inconsistent Phone" }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Local SEO & Map Pack</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            Local SEO & NAP Consistency Audit
          </h2>
          <p className="text-xs text-slate-400">Ensure consistent Name, Address, and Phone (NAP) details across local citation directories.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-400" />
            Master Business Profile (NAP)
          </h3>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong className="text-slate-500 text-[10px] block uppercase">Business Name</strong>
              <span className="font-bold text-white">{website.siteName}</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong className="text-slate-500 text-[10px] block uppercase">Address</strong>
              <span className="font-bold text-white">4820 Commercial St SE, Salem, OR 97302</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong className="text-slate-500 text-[10px] block uppercase">Phone</strong>
              <span className="font-bold text-white">(503) 555-0199</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Local Citation Directories Audit</h3>
          <div className="space-y-3">
            {citations.map((c, idx) => (
              <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-white">{c.platform}</h4>
                  <p className="text-slate-400">{c.name} • {c.address} • {c.phone}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${c.status === "Consistent" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
