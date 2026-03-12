import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import {
  loadOrgChart, selectEmployee, toggleNodeCollapse,
  collapseAll, expandAll, setSearchQuery, clearSearch,
} from "@/store/slices/orgChartSlice";
import { Employee } from "@/types";

export function useOrgChart() {
  const dispatch = useAppDispatch();

  const chartData = useAppSelector((s) => s.orgChart.chartData);
  const selectedEmployeeId = useAppSelector((s) => s.orgChart.selectedEmployeeId);
  const collapsedNodeIds = useAppSelector((s) => s.orgChart.collapsedNodeIds);
  const searchQuery = useAppSelector((s) => s.orgChart.searchQuery);
  const searchResults = useAppSelector((s) => s.orgChart.searchResults);
  const loadingState = useAppSelector((s) => s.orgChart.loadingState);
  const error = useAppSelector((s) => s.orgChart.error);
  const currentEmployeeId = useAppSelector((s) => s.orgChart.currentEmployeeId);

  const selectedEmployee = useAppSelector((s): Employee | null => {
    if (!s.orgChart.selectedEmployeeId || !s.orgChart.chartData) return null;
    const queue = [s.orgChart.chartData];
    while (queue.length > 0) {
      const node = queue.shift()!;
      if (node.employee.id === s.orgChart.selectedEmployeeId) return node.employee;
      node.children?.forEach((c) => queue.push(c));
    }
    return null;
  });

  const isLoading = loadingState === "loading";
  const isSuccess = loadingState === "succeeded";
  const hasError = loadingState === "failed";
  const isSidebarOpen = selectedEmployeeId !== null;

  const loadChart = useCallback((employeeId: number) => {
    dispatch(loadOrgChart(employeeId));
  }, [dispatch]);

  const handleSelectEmployee = useCallback((employee: Employee) => {
    dispatch(selectEmployee(employee.id));
  }, [dispatch]);

  const handleCloseSidebar = useCallback(() => {
    dispatch(selectEmployee(null));
  }, [dispatch]);

  const handleToggleNode = useCallback((employeeId: number) => {
    dispatch(toggleNodeCollapse(employeeId));
  }, [dispatch]);

  const handleCollapseAll = useCallback(() => { dispatch(collapseAll()); }, [dispatch]);
  const handleExpandAll = useCallback(() => { dispatch(expandAll()); }, [dispatch]);

  const handleSearchChange = useCallback((query: string) => {
    dispatch(setSearchQuery(query));
  }, [dispatch]);

  const handleClearSearch = useCallback(() => { dispatch(clearSearch()); }, [dispatch]);

  useEffect(() => {
    dispatch(clearSearch());
  }, [currentEmployeeId, dispatch]);

  return {
    chartData, selectedEmployee, selectedEmployeeId, collapsedNodeIds,
    searchQuery, searchResults, loadingState, error, currentEmployeeId,
    isLoading, isSuccess, hasError, isSidebarOpen,
    loadChart, handleSelectEmployee, handleCloseSidebar, handleToggleNode,
    handleCollapseAll, handleExpandAll, handleSearchChange, handleClearSearch,
  };
}
