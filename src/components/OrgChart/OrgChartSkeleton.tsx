import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-slate-200", className)} aria-hidden="true" />;
}

function SkeletonCard() {
  return (
    <div className="flex min-w-[200px] flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="h-3 w-28" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function OrgChartSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 py-12" role="status" aria-label="Loading org chart…">
      <SkeletonCard />
      <div className="h-6 w-px bg-slate-200" />
      <div className="flex items-start gap-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="h-6 w-px bg-slate-200" />
            <SkeletonCard />
          </div>
        ))}
      </div>
    </div>
  );
}
