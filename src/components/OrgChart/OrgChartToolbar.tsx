"use client";

import { ChevronsDownUp, ChevronsUpDown, Users } from "lucide-react";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { cn } from "@/lib/utils";

interface OrgChartToolbarProps {
  searchQuery: string;
  searchResultCount: number;
  totalEmployees: number;
  onSearchChange: (value: string) => void;
  onCollapseAll: () => void;
  onExpandAll: () => void;
}

export function OrgChartToolbar({ searchQuery, searchResultCount, totalEmployees, onSearchChange, onCollapseAll, onExpandAll }: OrgChartToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-card">
      <SearchBar value={searchQuery} onChange={onSearchChange} resultCount={searchQuery ? searchResultCount : undefined} />
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Users size={14} aria-hidden="true" />
          <span className="text-xs">{totalEmployees} employee{totalEmployees !== 1 ? "s" : ""}</span>
        </div>
        <div className="h-4 w-px bg-slate-200" aria-hidden="true" />
        <button type="button" onClick={onExpandAll} aria-label="Expand all nodes"
          className={cn("flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500")}>
          <ChevronsUpDown size={13} aria-hidden="true" /> Expand all
        </button>
        <button type="button" onClick={onCollapseAll} aria-label="Collapse all nodes"
          className={cn("flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500")}>
          <ChevronsDownUp size={13} aria-hidden="true" /> Collapse all
        </button>
      </div>
    </div>
  );
}
