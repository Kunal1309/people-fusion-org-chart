"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBarProps } from "@/types";

export function SearchBar({ value, onChange, resultCount, placeholder = "Search employees…" }: SearchBarProps) {
  const hasQuery = value.trim().length > 0;

  return (
    <div className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search employees"
        className={cn(
          "h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-9",
          "text-sm text-slate-900 placeholder:text-slate-400",
          "outline-none transition-shadow",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
          "hover:border-slate-300"
        )}
      />
      {hasQuery && (
        <button type="button" onClick={() => onChange("")} aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
          <X size={14} />
        </button>
      )}
      {hasQuery && resultCount !== undefined && (
        <p className="absolute -bottom-5 left-0 text-xs text-slate-500">
          {resultCount === 0 ? "No results found" : `${resultCount} employee${resultCount !== 1 ? "s" : ""} found`}
        </p>
      )}
    </div>
  );
}
