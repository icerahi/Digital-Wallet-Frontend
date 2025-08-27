// src/components/CardLoader.tsx
import { Skeleton } from "@/components/ui/skeleton";

interface CardLoaderProps {
  lines?: number;
  hasAvatar?: boolean;
  hasTitle?: boolean;
}

export function CardLoader({
  lines = 3,
  hasAvatar = false,
  hasTitle = true,
}: CardLoaderProps) {
  return (
    <div className="space-y-4">
      {hasAvatar && (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )}

      {hasTitle && <Skeleton className="h-8 w-3/4" />}

      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}

      <div className="flex space-x-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
