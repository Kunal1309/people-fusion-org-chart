import { Users } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <Users className="text-slate-400" size={28} aria-hidden="true" />
      </div>
      <div>
        <p className="font-semibold text-slate-700">No chart loaded</p>
        <p className="mt-1 text-sm text-slate-400">Select an employee ID above to view their organisational chart</p>
      </div>
    </div>
  );
}
