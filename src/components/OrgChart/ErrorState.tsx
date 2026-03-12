"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center gap-4 rounded-xl border border-rose-200 bg-rose-50 px-8 py-12 text-center">
      <AlertCircle className="text-rose-500" size={32} aria-hidden="true" />
      <div>
        <p className="font-semibold text-rose-700">Failed to load org chart</p>
        <p className="mt-1 text-sm text-rose-600">{message}</p>
      </div>
      {onRetry && (
        <button type="button" onClick={onRetry}
          className="flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">
          <RefreshCw size={14} aria-hidden="true" /> Try again
        </button>
      )}
    </div>
  );
}
