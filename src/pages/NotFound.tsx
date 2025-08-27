// src/components/NotFoundPage.tsx
import { Logo } from "@/assets/icons/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className=" bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* 404 Illustration */}
        <div className="mb-12">
          <div className="relative inline-block">
            <div className="bg-[var(--primary)]/10 w-64 h-64 rounded-full flex items-center justify-center mx-auto">
              <Logo />
            </div>

            <Badge className="absolute -top-4 -right-4 bg-[var(--destructive)] text-[var(--destructive-foreground)] text-2xl px-4 py-2">
              404
            </Badge>
          </div>
        </div>

        {/* Content */}
        <Card className="border-[var(--border)] shadow-md bg-[var(--card)] mb-8">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl mb-4">
              Page Not Found
            </CardTitle>
            <CardDescription className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
              Oops! The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="px-8 py-3 text-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 transition-all duration-300"
                onClick={() => (window.location.href = "/")}
              >
                <Home className="h-5 w-5 mr-2" />
                Go to Homepage
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--accent)] transition-all duration-300"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
