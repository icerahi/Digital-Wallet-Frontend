// src/components/TableLoader.tsx
import { Skeleton } from "@/components/ui/skeleton";

interface TableLoaderProps {
  rows?: number;
  columns?: number;
}

export function TableLoader({ rows = 5, columns = 4 }: TableLoaderProps) {
  return (
    <div className="space-y-2 my-3">
      {/* Table Header */}
      <div className="flex space-x-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-8 flex-1" />
        ))}
      </div>

      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-12 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
