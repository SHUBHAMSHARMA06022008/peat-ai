"use client";

// ─────────────────────────────────────────────────
// PEAT AI — Processing Animation Component
// Shows step-by-step analysis progress
// ─────────────────────────────────────────────────

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Brain, Search, Layers, Code2, CheckCircle2 } from "lucide-react";

const STEPS = [
  { text: "Understanding your intent…", icon: Brain, duration: 600 },
  { text: "Identifying missing specifications…", icon: Search, duration: 700 },
  { text: "Adding implementation details…", icon: Layers, duration: 600 },
  { text: "Building your engineering prompt…", icon: Code2, duration: 500 },
];

interface ProcessingAnimationProps {
  isProcessing: boolean;
  className?: string;
}

export function ProcessingAnimation({
  isProcessing,
  className,
}: ProcessingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!isProcessing) {
      setCurrentStep(0);
      setCompletedSteps([]);
      return;
    }

    let timeout: NodeJS.Timeout;
    let step = 0;

    const advance = () => {
      if (step < STEPS.length - 1) {
        setCompletedSteps((prev) => [...prev, step]);
        step++;
        setCurrentStep(step);
        timeout = setTimeout(advance, STEPS[step].duration);
      }
    };

    timeout = setTimeout(advance, STEPS[0].duration);

    return () => clearTimeout(timeout);
  }, [isProcessing]);

  if (!isProcessing) return null;

  return (
    <div className={cn("flex flex-col items-center gap-4 py-8", className)}>
      {/* Animated PEAT orb */}
      <motion.div
        className="relative w-16 h-16 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <span className="text-emerald-500 font-bold text-lg z-10">P</span>
      </motion.div>

      {/* Steps */}
      <div className="flex flex-col gap-2.5 min-w-[280px]">
        <AnimatePresence mode="wait">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === currentStep;
            const isComplete = completedSteps.includes(i);
            const isPending = i > currentStep;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: isPending ? 0.3 : 1,
                  x: 0,
                }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className={cn(
                  "flex items-center gap-3 text-sm transition-colors duration-300",
                  isActive && "text-emerald-500",
                  isComplete && "text-muted-foreground",
                  isPending && "text-muted-foreground/40"
                )}
              >
                {isComplete ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0",
                      isActive && "animate-pulse"
                    )}
                  />
                )}
                <span className={cn(isActive && "font-medium")}>
                  {step.text}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
