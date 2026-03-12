export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  full_name?: string;
  position?: string;
  job_title?: string;
  department?: string;
  email?: string;
  phone?: string;
  profile_pic?: string | null;
  thumb?: string | null;
  status?: "ACTIVE" | "INACTIVE" | string;
}

export interface OrgChartNode {
  employee: Employee;
  manager?: Employee | null;
  children?: OrgChartNode[];
  isExpanded?: boolean;
}

export interface PeopleChartApiResponse {
  status: "success" | "error" | string;
  message?: string;
  data: OrgChartNode;
}

export type LoadingState = "idle" | "loading" | "succeeded" | "failed";

export interface OrgChartState {
  chartData: OrgChartNode | null;
  selectedEmployeeId: number | null;
  collapsedNodeIds: number[];
  searchQuery: string;
  searchResults: number[];
  loadingState: LoadingState;
  error: string | null;
  currentEmployeeId: number | null;
}

export interface EmployeeCardProps {
  node: OrgChartNode;
  isHighlighted?: boolean;
  onSelect: (employee: Employee) => void;
  onToggleExpand: (employeeId: number) => void;
  isCollapsed: boolean;
}

export interface OrgChartNodeProps {
  node: OrgChartNode;
  depth?: number;
  highlightedIds?: number[];
  onSelect: (employee: Employee) => void;
  collapsedNodeIds: number[];
  onToggleExpand: (employeeId: number) => void;
}

export interface EmployeeSidebarProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
  placeholder?: string;
}

export const TEST_EMPLOYEE_IDS = [18, 21, 22, 23, 25, 29, 30] as const;
export type TestEmployeeId = (typeof TEST_EMPLOYEE_IDS)[number];
