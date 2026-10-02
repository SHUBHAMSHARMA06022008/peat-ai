"use client";

// ─────────────────────────────────────────────────
// PEAT AI — Prompt Workspace
// Three-stage visual flow: Your Idea → PEAT → Engineering Prompt
// ─────────────────────────────────────────────────

import { BeforeAfter } from "@/components/before-after";
import { EnhancedPromptDisplay } from "@/components/enhanced-prompt-display";
import { PeatLogo } from "@/components/peat-logo";
import { ProcessingAnimation } from "@/components/processing-animation";
import { PromptHistory } from "@/components/prompt-history";
import { PromptInput } from "@/components/prompt-input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePromptHistory } from "@/hooks/use-prompt-history";
import type {
  EnhancedPrompt,
  RefinementAction,
  TargetLLM,
} from "@/lib/ai/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Columns3,
  Rows3,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

type AppState = "input" | "processing" | "result";
type ViewMode = "split" | "comparison";

export default function WorkspacePage() {
  const [appState, setAppState] = useState<AppState>("input");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState<EnhancedPrompt | null>(null);
  const [isRefining, setIsRefining] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const { history, addEntry, removeEntry, clearHistory } = usePromptHistory();

  const handleSubmit = useCallback(
    async (prompt: string, category?: string, targetLLM?: TargetLLM) => {
      setCurrentPrompt(prompt);
      setAppState("processing");
      setEnhancedPrompt(null);

      try {
        const response = await fetch("/api/enhance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rawPrompt: prompt,
            category,
            targetLLM,
          }),
        });

        if (!response.ok) {
          throw new Error("Enhancement failed");
        }

        const enhanced = (await response.json()) as EnhancedPrompt;
        setEnhancedPrompt(enhanced);
        setAppState("result");
        addEntry(enhanced);
      } catch (error) {
        console.error("Failed to enhance:", error);
        setAppState("input");
      }
    },
    [addEntry]
  );

  const handleRefine = useCallback(
    async (action: RefinementAction) => {
      if (!enhancedPrompt) return;
      setIsRefining(true);

      try {
        const response = await fetch("/api/refine", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentPrompt: enhancedPrompt,
            action,
          }),
        });

        if (!response.ok) throw new Error("Refinement failed");

        const refined = (await response.json()) as EnhancedPrompt;
        setEnhancedPrompt(refined);
        addEntry(refined);
      } catch (error) {
        console.error("Failed to refine:", error);
      } finally {
        setIsRefining(false);
      }
    },
    [enhancedPrompt, addEntry]
  );

  const handleReset = useCallback(() => {
    setAppState("input");
    setCurrentPrompt("");
    setEnhancedPrompt(null);
  }, []);

  const handleHistorySelect = useCallback(
    (entry: import("@/lib/ai/types").PromptHistoryEntry) => {
      setCurrentPrompt(entry.originalPrompt);
      setEnhancedPrompt(entry.enhancedPrompt);
      setAppState("result");
      setHistoryOpen(false);
    },
    []
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <header className="shrink-0 border-b border-border/50 bg-background/80 backdrop-blur-sm z-20">
        <div className="flex items-center justify-between h-14 px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <PeatLogo size="sm" />
            </Link>
            {appState === "result" && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                New Prompt
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {appState === "result" && (
              <div className="hidden sm:flex items-center bg-muted/50 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode("split")}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md transition-colors",
                    viewMode === "split"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Columns3 className="w-3 h-3" />
                  Split
                </button>
                <button
                  onClick={() => setViewMode("comparison")}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md transition-colors",
                    viewMode === "comparison"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Rows3 className="w-3 h-3" />
                  Compare
                </button>
              </div>
            )}

            <Sheet open={historyOpen} onOpenChange={setHistoryOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-muted-foreground"
                  />
                }
              >
                  <Clock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">History</span>
                  {history.length > 0 && (
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-500 rounded-full px-1.5 py-0.5 font-medium">
                      {history.length}
                    </span>
                  )}
              </SheetTrigger>
              <SheetContent side="right" className="w-[340px] p-4">
                <PromptHistory
                  history={history}
                  onSelect={handleHistorySelect}
                  onRemove={removeEntry}
                  onClear={clearHistory}
                  onClose={() => setHistoryOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {/* INPUT STATE */}
          {appState === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="h-full flex items-start justify-center overflow-y-auto"
            >
              <div className="w-full max-w-2xl mx-auto px-4 pt-8 pb-16 lg:pt-16">
                <div className="text-center mb-8">
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    What are you building?
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Describe your idea. PEAT turns it into a prompt your coding AI can execute.
                  </p>
                </div>

                <PromptInput
                  onSubmit={handleSubmit}
                  isProcessing={false}
                  initialValue={currentPrompt}
                />
              </div>
            </motion.div>
          )}

          {/* PROCESSING STATE */}
          {appState === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col items-center justify-center"
            >
              <div className="w-full max-w-lg mx-auto px-4">
                {/* Show the user's prompt */}
                <div className="bg-muted/30 rounded-xl p-4 mb-6 border border-border/30">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-medium">
                      Your prompt
                    </span>
                  </div>
                  <p className="text-sm text-foreground/70 italic">
                    &ldquo;{currentPrompt}&rdquo;
                  </p>
                </div>

                <ProcessingAnimation isProcessing={true} />
              </div>
            </motion.div>
          )}

          {/* RESULT STATE */}
          {appState === "result" && enhancedPrompt && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full overflow-hidden"
            >
              {viewMode === "comparison" ? (
                /* Comparison Mode */
                <div className="h-full overflow-y-auto p-4 lg:p-8">
                  <div className="max-w-5xl mx-auto">
                    <BeforeAfter prompt={enhancedPrompt} className="mb-8" />
                    <div className="border-t border-border/30 pt-6">
                      <EnhancedPromptDisplay
                        prompt={enhancedPrompt}
                        onRefine={handleRefine}
                        isRefining={isRefining}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* Split Mode — Three columns on desktop, stacked on mobile */
                <div className="h-full flex flex-col lg:flex-row">
                  {/* LEFT: Original Prompt */}
                  <div className="lg:w-[300px] xl:w-[340px] shrink-0 border-b lg:border-b-0 lg:border-r border-border/30 p-4 lg:p-5 overflow-y-auto">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <h3 className="text-sm font-semibold text-muted-foreground">
                        Your Idea
                      </h3>
                    </div>
                    <div className="bg-muted/20 rounded-xl p-4 border border-border/30">
                      <p className="text-sm text-foreground/70 italic leading-relaxed">
                        &ldquo;{enhancedPrompt.originalPrompt}&rdquo;
                      </p>
                    </div>

                    <div className="mt-4">
                      <PromptInput
                        onSubmit={handleSubmit}
                        isProcessing={false}
                        initialValue=""
                        compact
                      />
                    </div>
                  </div>

                  {/* CENTER: PEAT Arrow */}
                  <div className="hidden lg:flex flex-col items-center justify-center w-16 shrink-0 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-px h-16 bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent" />
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-md shadow-emerald-500/20"
                        >
                          <ArrowRight className="w-4 h-4 text-white" />
                        </motion.div>
                        <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
                          PEAT
                        </span>
                        <div className="w-px h-16 bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent" />
                      </div>
                    </div>
                  </div>

                  {/* Mobile PEAT indicator */}
                  <div className="flex lg:hidden items-center justify-center py-3 border-b border-border/30">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-12 bg-emerald-500/20" />
                      <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5 text-white rotate-90" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                        PEAT Enhanced
                      </span>
                      <div className="h-px w-12 bg-emerald-500/20" />
                    </div>
                  </div>

                  {/* RIGHT: Enhanced Prompt */}
                  <div className="flex-1 min-w-0 p-4 lg:p-5 overflow-y-auto">
                    <EnhancedPromptDisplay
                      prompt={enhancedPrompt}
                      onRefine={handleRefine}
                      isRefining={isRefining}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
