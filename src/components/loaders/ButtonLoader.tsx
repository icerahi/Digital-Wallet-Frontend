// src/components/ButtonLoader.tsx
import { Loader2 } from "lucide-react";

interface ButtonLoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ButtonLoader({
  size = "md",
  className = "",
}: ButtonLoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  );
}
