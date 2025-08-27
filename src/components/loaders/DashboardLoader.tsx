// src/components/DashboardLoader.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { CardLoader } from "./CardLoader";

export function DashboardLoader() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-6 border border-[var(--border)] rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-6 w-12" />
            </div>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="p-6 border border-[var(--border)] rounded-lg">
        <div className="mb-6">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <CardLoader lines={2} hasAvatar={true} />
      </div>
    </div>
  );
}
