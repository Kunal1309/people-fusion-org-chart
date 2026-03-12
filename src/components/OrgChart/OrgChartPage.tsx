"use client";

import { useEffect, useState } from "react";
import { useOrgChart } from "@/hooks/useOrgChart";
import { countNodes } from "@/lib/utils";
import { LeftSidebar } from "./LeftSidebar";
import { TopBar } from "./TopBar";
import { ChartCanvas } from "./ChartCanvas";
import { EmployeeDrawer } from "../EmployeeSidebar/EmployeeDrawer";

export function OrgChartPage() {
  const {
    chartData, selectedEmployee, collapsedNodeIds, searchQuery, searchResults,
    isLoading, hasError, error, isSidebarOpen, currentEmployeeId,
    loadChart, handleSelectEmployee, handleCloseSidebar, handleToggleNode,
    handleCollapseAll, handleExpandAll, handleSearchChange,
  } = useOrgChart();

  const [activeTab, setActiveTab] = useState<"People" | "Position" | "Organization" | "Others">("People");
  const [zoom, setZoom] = useState(100);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!currentEmployeeId) loadChart(18);
  }, [currentEmployeeId, loadChart]);

  return (
    <div className="flex h-full w-full overflow-hidden bg-white">

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Left sidebar — hidden on mobile, slide in when open */}
      <div className={`
        fixed inset-y-0 left-0 z-50 md:relative md:z-auto md:flex
        transition-transform duration-300
        ${mobileNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <LeftSidebar onClose={() => setMobileNavOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <TopBar onMenuClick={() => setMobileNavOpen(true)} />

        {/* Page header */}
        <div className="px-4 md:px-8 pt-4 md:pt-6 pb-0 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Org Chart</h1>
              <p className="text-xs md:text-sm text-gray-500 mt-0.5 hidden sm:block">
                This is a collection of all hierarchy in the system, you can view, modify existing datasets or create new ones based on your preferences.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs md:text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                <span className="hidden sm:inline">Today</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-600 text-white text-xs md:text-sm font-medium hover:bg-indigo-700 transition-colors">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                </svg>
                <span className="hidden sm:inline">Configure</span>
              </button>
            </div>
          </div>

          {/* Tabs — scrollable on mobile */}
          <div className="flex gap-0 overflow-x-auto scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0">
            {(["People", "Position", "Organization", "Others"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-3 md:px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
                {tab === "Others" && (
                  <svg className="inline ml-1" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chart area */}
        <div className="flex flex-1 min-h-0 relative overflow-hidden">
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

            {/* Search bar */}
            <div className="px-4 md:px-8 py-2.5 border-b border-gray-100">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white w-full">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                {searchQuery && (
                  <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-2 py-0.5 rounded-full border border-indigo-200 shrink-0">
                    <span className="max-w-[80px] truncate">{searchQuery}</span>
                    <button onClick={() => handleSearchChange("")}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6 6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  </span>
                )}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search people..."
                  className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent min-w-0"
                />
              </div>
            </div>

            {/* Zoom + chart */}
            <div className="flex-1 relative overflow-hidden bg-gray-50/30">

              {/* Zoom controls */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-0.5 bg-white rounded-lg border border-gray-200 shadow-sm px-1.5 py-1">
                <button onClick={() => setZoom(z => Math.max(40, z - 10))}
                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/></svg>
                </button>
                <span className="text-xs font-medium text-gray-600 w-7 text-center tabular-nums">{zoom}</span>
                <button onClick={() => setZoom(z => Math.min(150, z + 10))}
                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                </button>
                <div className="w-px h-4 bg-gray-200 mx-0.5" />
                <button onClick={handleExpandAll}
                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" title="Expand all">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                  </svg>
                </button>
                <button onClick={handleCollapseAll}
                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" title="Collapse all">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/>
                    <line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/>
                  </svg>
                </button>
              </div>

              <ChartCanvas
                chartData={chartData}
                isLoading={isLoading}
                hasError={hasError}
                error={error}
                currentEmployeeId={currentEmployeeId}
                collapsedNodeIds={collapsedNodeIds}
                searchResults={searchResults}
                zoom={zoom}
                onSelectEmployee={handleSelectEmployee}
                onToggleNode={handleToggleNode}
                onRetry={() => currentEmployeeId && loadChart(currentEmployeeId)}
                onLoadChart={loadChart}
              />
            </div>
          </div>

          {/* Employee drawer — full screen on mobile */}
          <EmployeeDrawer
            employee={selectedEmployee}
            isOpen={isSidebarOpen}
            onClose={handleCloseSidebar}
          />
        </div>
      </div>
    </div>
  );
}
