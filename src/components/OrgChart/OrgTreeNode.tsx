"use client";

import { OrgNodeCard } from "./OrgNodeCard";
import { Employee, OrgChartNode } from "@/types";

interface OrgTreeNodeProps {
  node: OrgChartNode;
  depth?: number;
  highlightedIds?: number[];
  onSelect: (employee: Employee) => void;
  collapsedNodeIds: number[];
  onToggleExpand: (id: number) => void;
}

export function OrgTreeNode({
  node, depth = 0, highlightedIds = [], onSelect, collapsedNodeIds, onToggleExpand,
}: OrgTreeNodeProps) {
  const { employee, children } = node;
  const hasChildren = (children?.length ?? 0) > 0;
  const isCollapsed = collapsedNodeIds.includes(employee.id);
  const isHighlighted = highlightedIds.includes(employee.id);
  const showChildren = hasChildren && !isCollapsed;
  const childCount = children?.length ?? 0;

  return (
    <div className="flex flex-col items-center node-enter" style={{ animationDelay: `${depth * 30}ms` }}>

      {/* Card */}
      <OrgNodeCard node={node} isHighlighted={isHighlighted} onSelect={onSelect} />

      {/* Connector + collapse badge */}
      {hasChildren && (
        <>
          <div className="w-px bg-gray-300 h-5" />
          <button
            onClick={() => onToggleExpand(employee.id)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm"
          >
            {isCollapsed ? (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                Contains {childCount}
              </>
            ) : (
              <>
                Contains {childCount}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m18 15-6-6-6 6"/></svg>
              </>
            )}
          </button>
          {showChildren && <div className="w-px bg-gray-300 h-5" />}
        </>
      )}

      {/* Children */}
      {showChildren && (
        <>
          {childCount === 1 ? (
            <OrgTreeNode
              node={children![0]}
              depth={depth + 1}
              highlightedIds={highlightedIds}
              onSelect={onSelect}
              collapsedNodeIds={collapsedNodeIds}
              onToggleExpand={onToggleExpand}
            />
          ) : (
            <div className="relative flex items-start gap-6">
              {/* Horizontal rail */}
              <div
                className="absolute top-0 h-px bg-gray-300"
                style={{ left: "120px", right: "120px" }}
              />
              {children!.map((child) => (
                <div key={child.employee.id} className="flex flex-col items-center">
                  <div className="w-px bg-gray-300 h-5" />
                  <OrgTreeNode
                    node={child}
                    depth={depth + 1}
                    highlightedIds={highlightedIds}
                    onSelect={onSelect}
                    collapsedNodeIds={collapsedNodeIds}
                    onToggleExpand={onToggleExpand}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
