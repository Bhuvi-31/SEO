import React, { useState } from "react";
import { Code2, CheckCircle2, Copy, HelpCircle } from "lucide-react";
import { useSeoLab } from "../../context/SeoLabContext.jsx";
import { SimulatedBadge } from "../common/Badge.jsx";

export default function SchemaLab() {
  const { website, triggerWhyModal } = useSeoLab();
  const [schemaType, setSchemaType] = useState("LocalBusiness");

  const generateSchema = () => {
    switch (schemaType) {
      case "LocalBusiness":
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": website.siteName,
          "image": `https://${website.domain}/images/logo.png`,
          "telephone": "(503) 555-0199",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "4820 Commercial St SE",
            "addressLocality": "Salem",
            "addressRegion": "OR",
            "postalCode": "97302",
            "addressCountry": "US"
          },
          "url": `https://${website.domain}`
        }, null, 2);

      case "Article":
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "10 Local SEO Tips for Salem Small Businesses",
          "image": `https://${website.domain}/images/blog.jpg`,
          "author": { "@type": "Organization", "name": website.siteName },
          "publisher": { "@type": "Organization", "name": website.siteName },
          "datePublished": "2026-09-01"
        }, null, 2);

      case "FAQPage":
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [{
            "@type": "Question",
            "name": "How long does local SEO take to show results in Salem?",
            "acceptedAnswer": { "@type": "Answer", "text": "Most local businesses see ranking improvements within 3 to 6 months." }
          }]
        }, null, 2);

      default:
        return "{}";
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Structured Data</span>
            <SimulatedBadge />
          </div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            Schema Markup Generator & Validator
          </h2>
          <p className="text-xs text-slate-400">Generate structured JSON-LD data to unlock rich snippets in Google Search results.</p>
        </div>

        <select
          value={schemaType}
          onChange={(e) => setSchemaType(e.target.value)}
          className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-bold"
        >
          <option value="LocalBusiness">LocalBusiness Schema</option>
          <option value="Article">Article Schema</option>
          <option value="FAQPage">FAQPage Schema</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            Generated JSON-LD Code
          </h3>
          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-indigo-300 overflow-x-auto">
            {generateSchema()}
          </pre>
        </div>

        <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Simulated Rich Snippet Validation
          </h3>

          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Valid JSON-LD Schema! Eligible for Google Rich Results.</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Schema markup helps search engines understand entity relationships. Adding LocalBusiness schema clarifies physical NAP (Name, Address, Phone) attributes.
          </p>
        </div>
      </div>
    </div>
  );
}
