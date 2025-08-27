import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export const TestimonialSection = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [testimonials, setTestimonials] = useState<any[]>([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTestimonials([
        {
          name: "Sarah Johnson",
          role: "Freelance Designer",
          content:
            "This app has completely transformed how I manage my business finances. So intuitive!",
          rating: 5,
        },
        {
          name: "Michael Chen",
          role: "Small Business Owner",
          content:
            "The security features give me peace of mind. Best digital wallet I've used.",
          rating: 5,
        },
        {
          name: "Emma Rodriguez",
          role: "Student",
          content:
            "Splitting bills with roommates has never been easier. Love the shared wallets!",
          rating: 4,
        },
      ]);

      setIsLoading(false);
    }, 1500); // Simulate 1.5s loading delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-10 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300">
          Trusted by Millions
        </h2>
        <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto transition-colors duration-300">
          See what our users have to say about their experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {isLoading
          ? // Skeleton loading for testimonials
            Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={index}
                className="border-[var(--border)] shadow-md bg-[var(--card)]"
              >
                <CardHeader>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-5 w-5 mr-1" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-1" />
                  <Skeleton className="h-3 w-1/3" />
                </CardContent>
              </Card>
            ))
          : testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-[var(--border)] shadow-md bg-[var(--card)]"
              >
                <CardHeader>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-[var(--muted-foreground)]"
                        }`}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--card-foreground)] mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-[var(--muted-foreground)] text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};
