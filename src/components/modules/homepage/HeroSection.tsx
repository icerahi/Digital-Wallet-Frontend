import { Button } from "@/components/ui/button";

("use client");

import { cn } from "@/lib/utils";
// import { useTheme } from "next-themes";
import { Logo } from "@/assets/icons/Logo";
import { Link } from "react-router";
import { DotPattern } from "../../ui/shadcn-io/dot-pattern";
import { Particles } from "../../ui/shadcn-io/particles";

export const BackgroundPattern = () => {
  const resolvedTheme = "light"; //useTheme();
  const isLightTheme = resolvedTheme === "light";

  return (
    <>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:radial-gradient(ellipse,rgba(0,0,0,0.3)_30%,black_50%)]",
          "dark:fill-slate-700"
        )}
      />
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={isLightTheme ? "#000" : "#fff"}
        refresh
      />
    </>
  );
};

const HeroSection = () => {
  return (
    <div className="h-screen flex items-center justify-center px-6">
      <BackgroundPattern />

      {/* <div className="relative z-10 text-center w-full mx-auto">
        <div className="flex justify-center">
          <Logo />
        </div>

        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          💡 Your Money, Your Control.
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Send, receive, and manage your money anytime, anywhere. A wallet
          designed for the modern world.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base">
            Get Started
            <ArrowUpRight className="!h-5 !w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <CirclePlay className="!h-5 !w-5" /> Watch Demo
          </Button>
        </div>
      </div> */}
      {/* Hero Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center transition-all duration-500">
        <Logo />

        <h1 className="text-4xl md:text-6xl font-bold mb-6 transition-colors duration-300">
          Your Money, <span className="text-[var(--primary)]">Simplified</span>
        </h1>
        <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-10 transition-colors duration-300">
          The all-in-one digital wallet that makes payments, transfers, and
          financial management effortless and secure.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Button
            asChild
            size="lg"
            className="px-8 py-3 text-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 transition-all duration-300 transform hover:scale-105"
          >
            <Link to="/register">Try it now</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 text-lg border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--accent)] transition-all duration-300"
          >
            View Demo
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
