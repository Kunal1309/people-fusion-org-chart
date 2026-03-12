"use client";

import { EmployeeCard } from "./EmployeeCard";
import { cn } from "@/lib/utils";
import { OrgChartNodeProps } from "@/types";

export function OrgChartNode({ node, depth = 0, highlightedIds = [], onSelect, collapsedNodeIds, onToggleExpand }: OrgChartNodeProps) {
  const { employee, children } = node;
  const hasChildren = (children?.length ?? 0) > 0;
  const isCollapsed = collapsedNodeIds.includes(employee.id);
  const isHighlighted = highlightedIds.includes(employee.id);
  const showChildren = hasChildren && !isCollapsed;

  return (
    <div className={cn("flex flex-col items-center", depth > 0 && "animate-slide-up")}
      style={{ animationDelay: `${depth * 40}ms` }}>
      <EmployeeCard node={node} isHighlighted={isHighlighted} onSelect={onSelect} onToggleExpand={onToggleExpand} isCollapsed={isCollapsed} />

      {showChildren && <div className="h-6 w-px bg-slate-200" aria-hidden="true" />}

      {showChildren && (
        <div className="relative flex items-start gap-8">
          {children!.length > 1 && (
            <div className="absolute top-0 h-px bg-slate-200"
              style={{ left: `calc(50% / ${children!.length})`, right: `calc(50% / ${children!.length})` }}
              aria-hidden="true" />
          )}
          {children!.map((childNode) => (
            <div key={childNode.employee.id} className="flex flex-col items-center">
              <div className="h-6 w-px bg-slate-200" aria-hidden="true" />
              <OrgChartNode node={childNode} depth={depth + 1} highlightedIds={highlightedIds}
                onSelect={onSelect} collapsedNodeIds={collapsedNodeIds} onToggleExpand={onToggleExpand} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
