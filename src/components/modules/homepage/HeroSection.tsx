import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";

import { Logo } from "@/assets/icons/Logo";

("use client");

import { cn } from "@/lib/utils";
// import { useTheme } from "next-themes";
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

      <div className="relative z-10 text-center w-full mx-auto">
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
      </div>
    </div>
  );
};

export default HeroSection;
