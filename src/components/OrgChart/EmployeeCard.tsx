"use client";

import { ChevronDown, ChevronRight, Info } from "lucide-react";
import { Avatar } from "@/components/UI/Avatar";
import { Badge } from "@/components/UI/Badge";
import { cn, getEmployeeDisplayName, getEmployeeTitle } from "@/lib/utils";
import { EmployeeCardProps } from "@/types";

export function EmployeeCard({ node, isHighlighted = false, onSelect, onToggleExpand, isCollapsed }: EmployeeCardProps) {
  const { employee, children } = node;
  const hasChildren = (children?.length ?? 0) > 0;
  const displayName = getEmployeeDisplayName(employee);
  const title = getEmployeeTitle(employee);

  return (
    <div
      className={cn(
        "group relative flex min-w-[200px] max-w-[220px] flex-col items-center",
        "rounded-xl border bg-white p-4 shadow-card transition-all duration-200",
        "hover:shadow-card-hover hover:-translate-y-0.5",
        isHighlighted && "ring-2 ring-blue-500 ring-offset-2 border-blue-200 bg-blue-50/30"
      )}
      role="article"
      aria-label={`${displayName}, ${title}`}
    >
      <button type="button" onClick={() => onSelect(employee)} aria-label={`View details for ${displayName}`}
        className="absolute right-2 top-2 rounded-full p-1 text-slate-300 opacity-0 group-hover:opacity-100 hover:bg-slate-100 hover:text-blue-600 transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <Info size={14} aria-hidden="true" />
      </button>

      <Avatar employee={employee} size="lg" className="mb-3" />

      <div className="w-full text-center">
        <p className="truncate text-sm font-semibold text-slate-800" title={displayName}>{displayName}</p>
        <p className="mt-0.5 truncate text-xs text-slate-500" title={title}>{title}</p>
      </div>

      {employee.department && (
        <Badge variant="info" className="mt-2 max-w-full truncate">{employee.department}</Badge>
      )}

      {hasChildren && (
        <button type="button" onClick={() => onToggleExpand(employee.id)}
          aria-expanded={!isCollapsed} aria-label={isCollapsed ? "Expand direct reports" : "Collapse direct reports"}
          className="mt-3 flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs text-slate-500 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {isCollapsed ? (
            <><ChevronRight size={12} aria-hidden="true" /><span>{children!.length} report{children!.length !== 1 ? "s" : ""}</span></>
          ) : (
            <><ChevronDown size={12} aria-hidden="true" /><span>Collapse</span></>
          )}
        </button>
      )}
    </div>
  );
}
