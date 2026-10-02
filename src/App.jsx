import React, { useState } from "react";
import { SeoLabProvider, useSeoLab } from "./context/SeoLabContext.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import Header from "./components/layout/Header.jsx";
import Toast from "./components/common/Toast.jsx";
import WhyModal from "./components/common/WhyModal.jsx";
import ErrorGeneratorModal from "./components/features/ErrorGeneratorModal.jsx";

// Feature Views
import LandingPage from "./components/features/LandingPage.jsx";
import Dashboard from "./components/features/Dashboard.jsx";
import WebsiteEditor from "./components/features/WebsiteEditor.jsx";
import OnPageLab from "./components/features/OnPageLab.jsx";
import TechnicalLab from "./components/features/TechnicalLab.jsx";
import ImageSeoLab from "./components/features/ImageSeoLab.jsx";
import InternalLinkingLab from "./components/features/InternalLinkingLab.jsx";
import OffPageLab from "./components/features/OffPageLab.jsx";
import KeywordLab from "./components/features/KeywordLab.jsx";
import SerpSimulator from "./components/features/SerpSimulator.jsx";
import ContentLab from "./components/features/ContentLab.jsx";
import CompetitorLab from "./components/features/CompetitorLab.jsx";
import AuditLab from "./components/features/AuditLab.jsx";
import ChallengesLab from "./components/features/ChallengesLab.jsx";
import ProgressLab from "./components/features/ProgressLab.jsx";
import LearningCenter from "./components/features/LearningCenter.jsx";
import SchemaLab from "./components/features/SchemaLab.jsx";
import LocalSeoLab from "./components/features/LocalSeoLab.jsx";
import ArchitectureLab from "./components/features/ArchitectureLab.jsx";
import ReportGenerator from "./components/features/ReportGenerator.jsx";
import SettingsTab from "./components/features/SettingsTab.jsx";

function MainContent() {
  const { activeTab, setActiveTab } = useSeoLab();
  const [showLanding, setShowLanding] = useState(false); // Can be toggled if user clicks Landing

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "practice-website":
        return <WebsiteEditor />;
      case "onpage-seo":
        return <OnPageLab />;
      case "technical-seo":
        return <TechnicalLab />;
      case "image-seo":
        return <ImageSeoLab />;
      case "internal-linking":
        return <InternalLinkingLab />;
      case "offpage-seo":
        return <OffPageLab />;
      case "keyword-research":
        return <KeywordLab />;
      case "serp-simulator":
        return <SerpSimulator />;
      case "content-lab":
        return <ContentLab />;
      case "competitor-analysis":
        return <CompetitorLab />;
      case "seo-audit":
        return <AuditLab />;
      case "seo-challenges":
        return <ChallengesLab />;
      case "progress":
        return <ProgressLab />;
      case "learning-center":
        return <LearningCenter />;
      case "schema-lab":
        return <SchemaLab />;
      case "local-seo":
        return <LocalSeoLab />;
      case "architecture":
        return <ArchitectureLab />;
      case "report-generator":
        return <ReportGenerator />;
      case "settings":
        return <SettingsTab />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderActiveTab()}
        </main>
      </div>

      <Toast />
      <WhyModal />
      <ErrorGeneratorModal />
    </div>
  );
}

export default function App() {
  return (
    <SeoLabProvider>
      <MainContent />
    </SeoLabProvider>
  );
}
