import { useState } from "react";
import {
  AlertTriangle,
  Bug,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Home,
  LifeBuoy,
  RefreshCw,
  RotateCcw,
} from "lucide-react";

export interface FallbackProps {
  error: unknown;
  resetErrorBoundary: (...args: unknown[]) => void;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  let errorMessage = "An unexpected error occurred while loading this page.";

  if (isError(error)) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else if (error && typeof error === "object" && "message" in error) {
    errorMessage = String((error as { message: unknown }).message);
  }

  const timestamp = new Date().toLocaleString();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${errorMessage}\nTimestamp: ${timestamp}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard errors and keep the fallback accessible.
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.assign("/home");
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200/80 shadow-xl overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="p-6 space-y-4 border-b border-gray-100">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700 border border-red-200">
              ERR-500
            </span>
            <span className="text-xs text-gray-400 font-medium">{timestamp}</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-gray-900">
                Something went wrong
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                We encountered an unexpected error while loading this page. Please try again.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Bug className="h-4 w-4 text-gray-500" />
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Technical Details
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 rounded-md transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy Error"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDetails((value) => !value)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 rounded-md transition-colors"
                >
                  {showDetails ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  {showDetails ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {showDetails ? (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <pre className="max-h-40 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-gray-200 bg-white p-3 font-mono text-xs leading-5 text-gray-800">
                  {errorMessage}
                </pre>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={resetErrorBoundary}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </button>
            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Reload Page
            </button>
            <button
              type="button"
              onClick={handleGoHome}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Home className="h-4 w-4" />
              Go Home
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <LifeBuoy className="h-4 w-4 text-gray-400" />
            <span>Need help? Contact system support.</span>
          </div>
          <button
            type="button"
            onClick={() => window.location.assign("mailto:support@srm.edu")}
            className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
