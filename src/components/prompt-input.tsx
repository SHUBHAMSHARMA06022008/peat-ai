"use client";

// ─────────────────────────────────────────────────
// PEAT AI — Prompt Input Component
// Large textarea with example suggestions
// ─────────────────────────────────────────────────

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CATEGORY_LABELS,
  EXAMPLE_PROMPTS,
  TARGET_LLM_LABELS,
  type PromptCategory,
  type TargetLLM,
} from "@/lib/ai/types";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";

interface PromptInputProps {
  onSubmit: (
    prompt: string,
    category?: string,
    targetLLM?: TargetLLM
  ) => void;
  isProcessing: boolean;
  initialValue?: string;
  compact?: boolean;
  className?: string;
}

const CATEGORY_ICONS: Record<string, string> = {
  "web-animations": "✨",
  "ui-ux": "🎨",
  frontend: "🖥️",
  backend: "⚙️",
  apis: "🔌",
  database: "🗄️",
  authentication: "🔐",
  "responsive-design": "📱",
  performance: "⚡",
  "threejs-3d": "🎲",
  "framer-motion": "🎬",
  gsap: "🎯",
  forms: "📝",
  dashboards: "📊",
};

export function PromptInput({
  onSubmit,
  isProcessing,
  initialValue = "",
  compact = false,
  className,
}: PromptInputProps) {
  const [prompt, setPrompt] = useState(initialValue);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedLLM, setSelectedLLM] = useState<TargetLLM>("claude");
  const [showCategories, setShowCategories] = useState(false);
  const [showLLMs, setShowLLMs] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setPrompt(initialValue);
  }, [initialValue]);

  const handleSubmit = useCallback(() => {
    if (!prompt.trim() || isProcessing) return;
    onSubmit(prompt.trim(), selectedCategory, selectedLLM);
  }, [prompt, selectedCategory, selectedLLM, isProcessing, onSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const handleExampleClick = useCallback((example: string) => {
    setPrompt(example);
    textareaRef.current?.focus();
  }, []);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Main textarea */}
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tell PEAT what you're trying to build…"
          className={cn(
            "resize-none border-border/50 bg-background focus:border-emerald-500/50 focus:ring-emerald-500/20 transition-all duration-200 text-[15px] leading-relaxed placeholder:text-muted-foreground/50",
            compact ? "min-h-[100px]" : "min-h-[160px]"
          )}
          disabled={isProcessing}
        />
        <div className="absolute bottom-2.5 right-2.5">
          <span className="text-xs text-muted-foreground/40">
            {prompt.length > 0 && `${prompt.length} / 5000`}
          </span>
        </div>
      </div>

      {/* Category & LLM selectors */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Category selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowCategories(!showCategories);
              setShowLLMs(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-border/50 hover:border-emerald-500/30 transition-colors text-muted-foreground hover:text-foreground"
          >
            {selectedCategory ? (
              <>
                <span>{CATEGORY_ICONS[selectedCategory]}</span>
                <span>
                  {CATEGORY_LABELS[selectedCategory as PromptCategory]}
                </span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3" />
                <span>Category</span>
              </>
            )}
            <ChevronDown className="w-3 h-3 ml-0.5" />
          </button>

          {showCategories && (
            <div className="absolute top-full mt-1 left-0 z-50 bg-popover border border-border rounded-lg shadow-lg p-1.5 min-w-[200px] grid grid-cols-2 gap-0.5">
              <button
                onClick={() => {
                  setSelectedCategory(undefined);
                  setShowCategories(false);
                }}
                className={cn(
                  "text-left px-2.5 py-1.5 text-xs rounded-md hover:bg-accent transition-colors",
                  !selectedCategory && "bg-emerald-500/10 text-emerald-500"
                )}
              >
                Auto-detect
              </button>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedCategory(key);
                    setShowCategories(false);
                  }}
                  className={cn(
                    "text-left px-2.5 py-1.5 text-xs rounded-md hover:bg-accent transition-colors flex items-center gap-1.5",
                    selectedCategory === key &&
                      "bg-emerald-500/10 text-emerald-500"
                  )}
                >
                  <span>{CATEGORY_ICONS[key]}</span>
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* LLM target selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLLMs(!showLLMs);
              setShowCategories(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-border/50 hover:border-emerald-500/30 transition-colors text-muted-foreground hover:text-foreground"
          >
            <span>Target:</span>
            <span className="font-medium text-foreground">
              {TARGET_LLM_LABELS[selectedLLM]}
            </span>
            <ChevronDown className="w-3 h-3 ml-0.5" />
          </button>

          {showLLMs && (
            <div className="absolute top-full mt-1 left-0 z-50 bg-popover border border-border rounded-lg shadow-lg p-1.5 min-w-[160px]">
              {Object.entries(TARGET_LLM_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedLLM(key as TargetLLM);
                    setShowLLMs(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-1.5 text-xs rounded-md hover:bg-accent transition-colors",
                    selectedLLM === key &&
                      "bg-emerald-500/10 text-emerald-500 font-medium"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Submit button */}
        <Button
          onClick={handleSubmit}
          disabled={!prompt.trim() || isProcessing}
          size="sm"
          className="ml-auto bg-emerald-500 hover:bg-emerald-600 text-white gap-1.5 rounded-full px-5"
        >
          {isProcessing ? (
            "Processing…"
          ) : (
            <>
              Enhance with PEAT
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </Button>
      </div>

      {/* Keyboard hint */}
      <p className="text-[11px] text-muted-foreground/40">
        Press{" "}
        <kbd className="px-1 py-0.5 text-[10px] bg-muted rounded border border-border/50">
          Ctrl
        </kbd>
        +
        <kbd className="px-1 py-0.5 text-[10px] bg-muted rounded border border-border/50">
          Enter
        </kbd>{" "}
        to submit
      </p>

      {/* Example prompts */}
      {!compact && (
        <div className="flex flex-col gap-2">
          <span className="text-xs text-muted-foreground/60 font-medium">
            Try an example:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {EXAMPLE_PROMPTS.map((example) => (
              <button
                key={example}
                onClick={() => handleExampleClick(example)}
                disabled={isProcessing}
                className="px-3 py-1.5 text-xs rounded-full border border-border/40 text-muted-foreground hover:text-foreground hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-200 disabled:opacity-50"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
