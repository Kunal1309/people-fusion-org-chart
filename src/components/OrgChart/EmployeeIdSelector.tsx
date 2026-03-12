"use client";

import { cn } from "@/lib/utils";
import { TEST_EMPLOYEE_IDS } from "@/types";

interface EmployeeIdSelectorProps {
  currentId: number | null;
  onSelect: (id: number) => void;
  disabled?: boolean;
}

export function EmployeeIdSelector({ currentId, onSelect, disabled = false }: EmployeeIdSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Select employee">
      <span className="text-xs font-medium text-slate-500 shrink-0">Employee ID:</span>
      {TEST_EMPLOYEE_IDS.map((id) => (
        <button key={id} type="button" disabled={disabled} onClick={() => onSelect(id)} aria-pressed={currentId === id}
          className={cn(
            "h-7 min-w-[2.5rem] rounded-full px-3 text-xs font-semibold border transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
            currentId === id
              ? "border-blue-500 bg-blue-600 text-white shadow-sm"
              : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50",
            disabled && "cursor-not-allowed opacity-50"
          )}>
          {id}
        </button>
      ))}
    </div>
  );
}
