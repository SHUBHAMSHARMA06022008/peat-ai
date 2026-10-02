"use client";

// ─────────────────────────────────────────────────
// PEAT AI — Enhanced Prompt Display
// Renders structured prompt output beautifully
// ─────────────────────────────────────────────────

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { EnhancedPrompt, RefinementAction } from "@/lib/ai/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Check,
  ClipboardCopy,
  Code2,
  Gauge,
  Lightbulb,
  ListChecks,
  MousePointerClick,
  RefreshCw,
  Scissors,
  Settings2,
  ShieldAlert,
  Target,
  Wrench,
  Zap,
} from "lucide-react";
import { useState, useCallback } from "react";

interface EnhancedPromptDisplayProps {
  prompt: EnhancedPrompt;
  onRefine: (action: RefinementAction) => void;
  isRefining: boolean;
  className?: string;
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  delay?: number;
}

function PromptSection({ title, icon, items, delay = 0 }: SectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="space-y-2.5"
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        {icon}
        {title}
      </div>
      <ul className="space-y-1.5 pl-6">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-sm text-muted-foreground leading-relaxed list-disc marker:text-emerald-500"
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function EnhancedPromptDisplay({
  prompt,
  onRefine,
  isRefining,
  className,
}: EnhancedPromptDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"structured" | "raw">(
    "structured"
  );

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt.finalPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = prompt.finalPrompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [prompt.finalPrompt]);

  const sections: SectionProps[] = [
    {
      title: "Requirements",
      icon: <ListChecks className="w-4 h-4 text-emerald-500" />,
      items: prompt.requirements,
    },
    {
      title: "Behaviour",
      icon: <MousePointerClick className="w-4 h-4 text-blue-500" />,
      items: prompt.behaviour,
    },
    {
      title: "Technical Details",
      icon: <Code2 className="w-4 h-4 text-amber-500" />,
      items: prompt.technicalDetails,
    },
    {
      title: "Interaction & Physics",
      icon: <Zap className="w-4 h-4 text-purple-500" />,
      items: prompt.interactionDetails,
    },
    {
      title: "Edge Cases",
      icon: <ShieldAlert className="w-4 h-4 text-orange-500" />,
      items: prompt.edgeCases,
    },
    {
      title: "Constraints",
      icon: <Gauge className="w-4 h-4 text-red-500" />,
      items: prompt.constraints,
    },
    {
      title: "Implementation Guidance",
      icon: <Wrench className="w-4 h-4 text-cyan-500" />,
      items: prompt.implementationGuidance,
    },
    {
      title: "Assumptions",
      icon: <Lightbulb className="w-4 h-4 text-yellow-500" />,
      items: prompt.assumptions,
    },
  ];

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-500" />
          <h3 className="font-semibold text-sm">Engineering Prompt</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("structured")}
            className={cn(
              "px-2.5 py-1 text-xs rounded-md transition-colors",
              activeTab === "structured"
                ? "bg-emerald-500/10 text-emerald-500 font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Structured
          </button>
          <button
            onClick={() => setActiveTab("raw")}
            className={cn(
              "px-2.5 py-1 text-xs rounded-md transition-colors",
              activeTab === "raw"
                ? "bg-emerald-500/10 text-emerald-500 font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Raw Prompt
          </button>
        </div>
      </div>

      {/* Objective */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3.5 mb-4 shrink-0"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <Target className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">
            Objective
          </span>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {prompt.objective}
        </p>
      </motion.div>

      {/* Content */}
      <ScrollArea className="flex-1 min-h-0">
        {activeTab === "structured" ? (
          <div className="space-y-5 pr-4 pb-4">
            {sections.map((section, i) => (
              <PromptSection
                key={section.title}
                {...section}
                delay={i * 0.05}
              />
            ))}
          </div>
        ) : (
          <div className="pr-4 pb-4">
            <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm leading-relaxed text-foreground whitespace-pre-wrap">
              {prompt.finalPrompt}
            </div>
          </div>
        )}
      </ScrollArea>

      <Separator className="my-3" />

      {/* Actions */}
      <div className="flex flex-wrap gap-2 shrink-0 pb-1">
        <Button
          variant="default"
          size="sm"
          onClick={copyToClipboard}
          className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1.5"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <ClipboardCopy className="w-3.5 h-3.5" />
              Copy Prompt
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onRefine("regenerate")}
          disabled={isRefining}
          className="gap-1.5"
        >
          <RefreshCw
            className={cn("w-3.5 h-3.5", isRefining && "animate-spin")}
          />
          Refine
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onRefine("more-technical")}
          disabled={isRefining}
          className="gap-1.5"
        >
          <Settings2 className="w-3.5 h-3.5" />
          More Technical
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onRefine("more-concise")}
          disabled={isRefining}
          className="gap-1.5"
        >
          <Scissors className="w-3.5 h-3.5" />
          More Concise
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onRefine("add-constraints")}
          disabled={isRefining}
          className="gap-1.5"
        >
          <Gauge className="w-3.5 h-3.5" />
          Add Constraints
        </Button>
      </div>
    </div>
  );
}
