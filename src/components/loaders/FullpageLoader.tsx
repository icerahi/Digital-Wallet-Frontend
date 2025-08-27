// src/components/FullPageLoader.tsx
import { Loader2 } from "lucide-react";

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-[var(--primary)]" />
        <span className="text-[var(--foreground)] font-medium">Loading...</span>
      </div>
    </div>
  );
}
