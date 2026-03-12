import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPeopleChart } from "@/lib/apiClient";
import { searchEmployeesInTree } from "@/lib/utils";
import { OrgChartState, OrgChartNode } from "@/types";

const initialState: OrgChartState = {
  chartData: null,
  selectedEmployeeId: null,
  collapsedNodeIds: [],
  searchQuery: "",
  searchResults: [],
  loadingState: "idle",
  error: null,
  currentEmployeeId: null,
};

export const loadOrgChart = createAsyncThunk<OrgChartNode, number, { rejectValue: string }>(
  "orgChart/loadOrgChart",
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await fetchPeopleChart(employeeId);
      if (!response.data) return rejectWithValue("No chart data returned for this employee.");
      return response.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      return rejectWithValue(message);
    }
  }
);

const orgChartSlice = createSlice({
  name: "orgChart",
  initialState,
  reducers: {
    selectEmployee(state, action: PayloadAction<number | null>) {
      state.selectedEmployeeId = action.payload;
    },
    toggleNodeCollapse(state, action: PayloadAction<number>) {
      const id = action.payload;
      const idx = state.collapsedNodeIds.indexOf(id);
      if (idx === -1) state.collapsedNodeIds.push(id);
      else state.collapsedNodeIds.splice(idx, 1);
    },
    collapseAll(state) {
      if (!state.chartData) return;
      function collectParentIds(node: OrgChartNode): number[] {
        const ids: number[] = [];
        if (node.children?.length) {
          ids.push(node.employee.id);
          node.children.forEach((c) => ids.push(...collectParentIds(c)));
        }
        return ids;
      }
      state.collapsedNodeIds = collectParentIds(state.chartData);
    },
    expandAll(state) {
      state.collapsedNodeIds = [];
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      if (!action.payload.trim() || !state.chartData) {
        state.searchResults = [];
        return;
      }
      state.searchResults = searchEmployeesInTree(state.chartData, action.payload);
    },
    clearSearch(state) {
      state.searchQuery = "";
      state.searchResults = [];
    },
    resetChart() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadOrgChart.pending, (state, action) => {
        state.loadingState = "loading";
        state.error = null;
        state.currentEmployeeId = action.meta.arg;
        state.chartData = null;
        state.collapsedNodeIds = [];
        state.searchQuery = "";
        state.searchResults = [];
        state.selectedEmployeeId = null;
      })
      .addCase(loadOrgChart.fulfilled, (state, action) => {
        state.loadingState = "succeeded";
        state.chartData = action.payload;
        state.error = null;
      })
      .addCase(loadOrgChart.rejected, (state, action) => {
        state.loadingState = "failed";
        state.error = action.payload ?? "Failed to load chart.";
        state.chartData = null;
      });
  },
});

export const {
  selectEmployee, toggleNodeCollapse, collapseAll,
  expandAll, setSearchQuery, clearSearch, resetChart,
} = orgChartSlice.actions;

export default orgChartSlice.reducer;
