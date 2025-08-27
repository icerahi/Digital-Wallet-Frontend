import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, Shield, Smartphone, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function FeatureSection() {
  const [isLoading, setIsLoading] = useState(true);

  const [features, setFeatures] = useState<any[]>([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setFeatures([
        {
          icon: <Smartphone className="h-8 w-8 text-[var(--primary)]" />,
          title: "Mobile First",
          description:
            "Seamless experience on all your devices with our responsive design",
        },
        {
          icon: <Shield className="h-8 w-8 text-green-500" />,
          title: "Bank-Level Security",
          description:
            "Advanced encryption and biometric authentication protect your funds",
        },
        {
          icon: <CreditCard className="h-8 w-8 text-[var(--primary)]" />,
          title: "Universal Payments",
          description:
            "Send money to anyone, anywhere with our global payment network",
        },
        {
          icon: <Users className="h-8 w-8 text-orange-500" />,
          title: "Shared Wallets",
          description:
            "Create group wallets for family, friends, and team expenses",
        },
      ]);

      setIsLoading(false);
    }, 1500); // Simulate 1.5s loading delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300">
          Powerful Features
        </h2>
        <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto transition-colors duration-300">
          Everything you need to manage your finances in one secure place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {isLoading
          ? // Skeleton loading for features
            Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                className="border-[var(--border)] shadow-md bg-[var(--card)]"
              >
                <CardHeader>
                  <Skeleton className="h-8 w-8 rounded-full mb-2" />
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mt-2" />
                </CardContent>
              </Card>
            ))
          : features.map((feature, index) => (
              <Card
                key={index}
                className="border-[var(--border)] shadow-md hover:shadow-lg transition-all duration-300 bg-[var(--card)] hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[var(--muted-foreground)]">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
