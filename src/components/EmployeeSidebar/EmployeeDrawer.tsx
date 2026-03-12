"use client";

import { Avatar } from "@/components/UI/Avatar";
import { cn, getEmployeeDisplayName, getEmployeeTitle } from "@/lib/utils";
import { Employee } from "@/types";

interface EmployeeDrawerProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

const ACCOUNT_SECTIONS = [
  { label: "Personal",  color: "text-indigo-500", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
  { label: "Work",      color: "text-indigo-500", icon: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" },
  { label: "Time",      color: "text-green-500",  icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2" },
  { label: "Payroll",   color: "text-green-500",  icon: "M2 17 12 22l10-5 M2 12l10 5 10-5 M2 7l10 5 10-5-10-5-10 5z" },
  { label: "Workplace", color: "text-indigo-500", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" },
];

export function EmployeeDrawer({ employee, isOpen, onClose }: EmployeeDrawerProps) {
  const displayName = employee ? getEmployeeDisplayName(employee) : "";
  const title = employee ? getEmployeeTitle(employee) : "";

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 sm:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer — full screen on mobile, side panel on desktop */}
      <div className={cn(
        "bg-white border-l border-gray-200 flex flex-col shrink-0 transition-all duration-300 overflow-hidden",
        // Mobile: fixed full screen slide up from bottom
        "fixed inset-x-0 bottom-0 z-40 rounded-t-2xl sm:rounded-none",
        "sm:relative sm:inset-auto sm:z-auto",
        isOpen
          ? "h-[90vh] sm:h-full sm:w-80 translate-y-0"
          : "h-0 sm:h-full sm:w-0 translate-y-full sm:translate-y-0"
      )}>
        {isOpen && employee && (
          <>
            {/* Mobile drag handle */}
            <div className="flex justify-center pt-2 pb-1 sm:hidden">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            {/* Purple header */}
            <div className="relative bg-indigo-500 pt-3 pb-6 px-4">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={onClose}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
                >
                  {/* Arrow right on desktop, X on mobile */}
                  <svg className="hidden sm:block" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                  <svg className="sm:hidden" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6 6 18M6 6l12 12"/>
                  </svg>
                </button>
                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-white/40 flex items-center justify-center mb-3 overflow-hidden bg-white/20">
                  <Avatar employee={employee} size="xl" className="ring-0" />
                </div>
                <h3 className="text-base font-bold text-white">{displayName}</h3>
                <p className="text-xs text-indigo-200 mt-0.5">{title}</p>
                {employee.department && (
                  <p className="text-xs text-indigo-200 mt-0.5 flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {employee.department}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-4">
                  {[
                    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
                    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
                    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
                  ].map((path, i) => (
                    <button key={i} className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <path d={path}/>
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {/* Basic details */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-800">Basic Details</h4>
                  <button className="text-gray-300 hover:text-gray-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6"/></svg>
                  </button>
                </div>
                <div className="space-y-2.5">
                  {employee.phone && (
                    <div className="flex items-center gap-2.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.75">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      <span className="text-xs text-gray-600">{employee.phone}</span>
                    </div>
                  )}
                  {employee.email && (
                    <div className="flex items-center gap-2.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.75">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      <span className="text-xs text-gray-600 truncate">{employee.email}</span>
                    </div>
                  )}
                  {employee.department && (
                    <div className="flex items-center gap-2.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.75">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span className="text-xs text-gray-600">{employee.department}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.75">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <span className={`text-xs font-medium ${employee.status === "ACTIVE" ? "text-green-600" : "text-gray-500"}`}>
                      {employee.status === "ACTIVE" ? "Active" : employee.status ?? "Unknown"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Account sections */}
              <div className="px-4 py-3">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Account Details</p>
                <div className="space-y-0.5">
                  {ACCOUNT_SECTIONS.map((section) => (
                    <button key={section.label}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center ${section.color}`}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                            <path d={section.icon}/>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{section.label}</span>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" className="group-hover:stroke-gray-400 transition-colors">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {["History", "Parent (s)", "Hierarchy"].map((section) => (
                <div key={section} className="border-t border-gray-100">
                  <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-medium text-gray-700">{section}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
