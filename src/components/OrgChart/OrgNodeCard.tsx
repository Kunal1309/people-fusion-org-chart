"use client";

import { Avatar } from "@/components/UI/Avatar";
import { cn, getEmployeeDisplayName, getEmployeeTitle } from "@/lib/utils";
import { Employee, OrgChartNode } from "@/types";

interface OrgNodeCardProps {
  node: OrgChartNode;
  isHighlighted?: boolean;
  onSelect: (employee: Employee) => void;
}

export function OrgNodeCard({ node, isHighlighted = false, onSelect }: OrgNodeCardProps) {
  const { employee } = node;
  const displayName = getEmployeeDisplayName(employee);
  const title = getEmployeeTitle(employee);
  const childCount = node.children?.length ?? 0;

  return (
    <div
      onClick={() => onSelect(employee)}
      className={cn(
        "relative w-[200px] sm:w-[240px] bg-white rounded-lg border cursor-pointer",
        "transition-all duration-150 group",
        isHighlighted
          ? "border-indigo-400 shadow-md shadow-indigo-100"
          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
      )}
    >
      {/* Top */}
      <div className="p-3 sm:p-4 pb-2 sm:pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Avatar employee={employee} size="sm" className="shrink-0 ring-2 ring-white shadow-sm sm:hidden" />
            <Avatar employee={employee} size="md" className="shrink-0 ring-2 ring-white shadow-sm hidden sm:flex" />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate leading-tight">{displayName}</p>
              <p className="text-[11px] sm:text-xs text-indigo-500 truncate mt-0.5 leading-tight">{title}</p>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(employee); }}
            className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded text-gray-300 hover:text-indigo-500 hover:bg-indigo-50 transition-colors"
            aria-label={`View ${displayName}`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="h-px bg-gray-100 mx-3 sm:mx-4" />

      {/* Bottom */}
      <div className="px-3 sm:px-4 py-2 flex items-center gap-1.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.75">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <span className="text-[11px] sm:text-xs text-gray-400 font-medium">
          {employee.id} / {childCount > 0 ? childCount : "—"}
        </span>
      </div>
    </div>
  );
}
