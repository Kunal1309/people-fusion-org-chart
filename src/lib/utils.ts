import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Employee, OrgChartNode } from "@/types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getEmployeeDisplayName(employee: Employee): string {
  if (employee.full_name) return employee.full_name;
  const first = employee.first_name?.trim() ?? "";
  const last = employee.last_name?.trim() ?? "";
  const combined = [first, last].filter(Boolean).join(" ");
  return combined || "Unknown Employee";
}

export function getEmployeeTitle(employee: Employee): string {
  return employee.position ?? employee.job_title ?? "—";
}

export function getAvatarColor(name: string): string {
  const COLORS = [
    "bg-blue-500","bg-emerald-500","bg-violet-500","bg-rose-500",
    "bg-amber-500","bg-cyan-500","bg-pink-500","bg-teal-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function searchEmployeesInTree(node: OrgChartNode, query: string): number[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: number[] = [];
  function traverse(n: OrgChartNode): void {
    const name = getEmployeeDisplayName(n.employee).toLowerCase();
    const title = getEmployeeTitle(n.employee).toLowerCase();
    const dept = (n.employee.department ?? "").toLowerCase();
    if (name.includes(q) || title.includes(q) || dept.includes(q)) {
      results.push(n.employee.id);
    }
    n.children?.forEach(traverse);
  }
  traverse(node);
  return results;
}

export function countNodes(node: OrgChartNode): number {
  return 1 + (node.children ?? []).reduce((acc, c) => acc + countNodes(c), 0);
}
