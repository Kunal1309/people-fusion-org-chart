"use client";

import { OrgTreeNode } from "./OrgTreeNode";
import { Employee, OrgChartNode, TEST_EMPLOYEE_IDS } from "@/types";

interface ChartCanvasProps {
  chartData: OrgChartNode | null;
  isLoading: boolean;
  hasError: boolean;
  error: string | null;
  currentEmployeeId: number | null;
  collapsedNodeIds: number[];
  searchResults: number[];
  zoom: number;
  onSelectEmployee: (employee: Employee) => void;
  onToggleNode: (id: number) => void;
  onRetry: () => void;
  onLoadChart: (id: number) => void;
}

export function ChartCanvas({
  chartData, isLoading, hasError, error, currentEmployeeId,
  collapsedNodeIds, searchResults, zoom,
  onSelectEmployee, onToggleNode, onRetry, onLoadChart,
}: ChartCanvasProps) {

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center pt-16 gap-4 overflow-auto p-8">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-60 h-20 rounded-lg border border-gray-200 bg-white animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>
          </svg>
        </div>
        <div className="text-center">
          <p className="font-medium text-gray-800">Failed to load chart</p>
          <p className="text-sm text-gray-500 mt-1">{error}</p>
        </div>
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          Try again
        </button>
        <div className="mt-2 flex flex-wrap items-center gap-2 justify-center">
          <span className="text-xs text-gray-400">Try another ID:</span>
          {TEST_EMPLOYEE_IDS.map(id => (
            <button
              key={id}
              onClick={() => onLoadChart(id)}
              className={`h-7 px-3 rounded-full text-xs font-semibold border transition-all ${
                currentEmployeeId === id
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "border-gray-200 text-gray-600 hover:border-indigo-300 bg-white"
              }`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <p className="text-sm text-gray-500">Select an employee ID to view the chart</p>
        <div className="flex flex-wrap items-center gap-2 justify-center mt-2">
          {TEST_EMPLOYEE_IDS.map(id => (
            <button
              key={id}
              onClick={() => onLoadChart(id)}
              className="h-7 px-3 rounded-full text-xs font-semibold border border-gray-200 text-gray-600 hover:border-indigo-300 hover:bg-indigo-50 bg-white transition-all"
            >
              {id}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-8">
      {/* Employee ID selector */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <span className="text-xs text-gray-400 font-medium">Employee:</span>
        {TEST_EMPLOYEE_IDS.map(id => (
          <button
            key={id}
            onClick={() => onLoadChart(id)}
            className={`h-7 px-3 rounded-full text-xs font-semibold border transition-all ${
              currentEmployeeId === id
                ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                : "border-gray-200 text-gray-500 hover:border-indigo-300 hover:bg-indigo-50 bg-white"
            }`}
          >
            {id}
          </button>
        ))}
      </div>

      {/* Tree */}
      <div
        className="inline-flex justify-center min-w-full pb-12 transition-transform duration-200"
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
      >
        <OrgTreeNode
          node={chartData}
          depth={0}
          highlightedIds={searchResults}
          onSelect={onSelectEmployee}
          collapsedNodeIds={collapsedNodeIds}
          onToggleExpand={onToggleNode}
        />
      </div>
    </div>
  );
}
