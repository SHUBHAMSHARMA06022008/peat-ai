"use client";

// ─────────────────────────────────────────────────
// PEAT AI — Before / After Comparison
// Visual demonstration of PEAT's value
// ─────────────────────────────────────────────────

import { Badge } from "@/components/ui/badge";
import type { EnhancedPrompt } from "@/lib/ai/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Plus, MessageSquare, Zap } from "lucide-react";

interface BeforeAfterProps {
  prompt: EnhancedPrompt;
  className?: string;
}

const ADDED_CATEGORIES = [
  { label: "Animation timing", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  { label: "Easing behaviour", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  { label: "Physics parameters", color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
  { label: "Trigger conditions", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  { label: "Performance constraints", color: "text-red-500 bg-red-500/10 border-red-500/20" },
  { label: "Responsive behaviour", color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" },
  { label: "Edge cases", color: "text-orange-500 bg-orange-500/10 border-orange-500/20" },
  { label: "Accessibility", color: "text-pink-500 bg-pink-500/10 border-pink-500/20" },
];

export function BeforeAfter({ prompt, className }: BeforeAfterProps) {
  const addedCount =
    prompt.requirements.length +
    prompt.behaviour.length +
    prompt.technicalDetails.length +
    prompt.edgeCases.length +
    prompt.constraints.length;

  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-4 lg:gap-6 items-stretch", className)}>
      {/* BEFORE */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col"
      >
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Original
          </span>
        </div>
        <div className="flex-1 bg-muted/30 border border-border/50 rounded-xl p-5">
          <p className="text-base text-foreground/80 italic leading-relaxed">
            &ldquo;{prompt.originalPrompt}&rdquo;
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground/60">
            <span>{prompt.originalPrompt.split(" ").length} words</span>
            <span>·</span>
            <span>Underspecified</span>
          </div>
        </div>
      </motion.div>

      {/* Arrow */}
      <div className="hidden lg:flex flex-col items-center justify-center gap-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20"
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </motion.div>
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
          PEAT
        </span>
      </div>

      {/* Mobile Arrow */}
      <div className="flex lg:hidden items-center justify-center py-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <div className="h-px w-8 bg-emerald-500/30" />
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white rotate-90 lg:rotate-0" />
          </div>
          <div className="h-px w-8 bg-emerald-500/30" />
        </motion.div>
      </div>

      {/* AFTER */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-col"
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
            PEAT Enhanced
          </span>
        </div>
        <div className="flex-1 bg-emerald-500/[0.03] border border-emerald-500/15 rounded-xl p-5">
          <p className="text-sm text-foreground leading-relaxed line-clamp-4">
            {prompt.finalPrompt.slice(0, 300)}…
          </p>

          {/* What PEAT added */}
          <div className="mt-4 pt-3 border-t border-emerald-500/10">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Plus className="w-3 h-3 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">
                What PEAT added
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ADDED_CATEGORIES.slice(0, 6).map((cat, i) => (
                <motion.span
                  key={cat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.4 + i * 0.05 }}
                  className={cn(
                    "px-2 py-0.5 text-[11px] rounded-full border font-medium",
                    cat.color
                  )}
                >
                  + {cat.label}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-emerald-500/60">
            <span>{addedCount} specifications added</span>
            <span>·</span>
            <span>Production-ready</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/** Static demo version for the landing page */
export function BeforeAfterDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-4 lg:gap-6 items-stretch">
      {/* BEFORE */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col"
      >
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your Prompt
          </span>
        </div>
        <div className="flex-1 bg-muted/30 border border-border/50 rounded-xl p-5">
          <p className="text-base text-foreground/80 italic leading-relaxed">
            &ldquo;Make a 3D animation when I add something to cart.&rdquo;
          </p>
          <div className="mt-4 pt-3 border-t border-border/30">
            <p className="text-xs text-muted-foreground/50">
              12 words · No timing specs · No physics · No constraints · No edge cases
            </p>
          </div>
        </div>
      </motion.div>

      {/* Arrow */}
      <div className="hidden lg:flex flex-col items-center justify-center gap-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20"
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </motion.div>
        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
          PEAT
        </span>
      </div>

      <div className="flex lg:hidden items-center justify-center py-1">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2"
        >
          <div className="h-px w-8 bg-emerald-500/30" />
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white rotate-90" />
          </div>
          <div className="h-px w-8 bg-emerald-500/30" />
        </motion.div>
      </div>

      {/* AFTER */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col"
      >
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
            PEAT Enhanced
          </span>
        </div>
        <div className="flex-1 bg-emerald-500/[0.03] border border-emerald-500/15 rounded-xl p-5">
          <p className="text-sm text-foreground leading-relaxed">
            Implement a 650ms cart-add animation using spring-based interpolation
            (stiffness: 180, damping: 12). The product thumbnail translates along
            an arc toward the cart icon while scaling from 1.0 to 0.35 with a
            subtle Z-axis rotation of 8°. Use transform-based animation only…
          </p>

          <div className="mt-4 pt-3 border-t border-emerald-500/10">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Plus className="w-3 h-3 text-emerald-500" />
              <span className="text-xs font-semibold text-emerald-500">
                What PEAT added
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ADDED_CATEGORIES.map((cat, i) => (
                <motion.span
                  key={cat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: 0.5 + i * 0.06 }}
                  className={cn(
                    "px-2 py-0.5 text-[11px] rounded-full border font-medium",
                    cat.color
                  )}
                >
                  + {cat.label}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
