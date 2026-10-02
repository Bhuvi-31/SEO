import React from "react";
import { AlertTriangle, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, showDetails: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Uncaught React Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
          <div className="w-full max-w-xl bg-slate-900 border border-red-500/30 rounded-2xl shadow-2xl p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-white">Something went wrong.</h1>
              <p className="text-sm text-slate-400">
                The SEO Practice Lab encountered an unexpected error during render.
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={this.handleReload}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Application
              </button>

              <button
                onClick={() => this.setState({ showDetails: !this.state.showDetails })}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition-all flex items-center gap-2"
              >
                <span>{this.state.showDetails ? "Hide Error Details" : "Debug Error Details"}</span>
                {this.state.showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {this.state.showDetails && (
              <div className="text-left p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs font-mono text-red-300 overflow-x-auto max-h-60">
                <p className="font-bold">{this.state.error?.toString()}</p>
                <pre className="text-[10px] text-slate-400">{this.state.errorInfo?.componentStack}</pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
