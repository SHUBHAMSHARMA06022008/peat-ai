"use client";

// ─────────────────────────────────────────────────
// PEAT AI — Prompt History Panel
// Recent prompts with reopen capability
// ─────────────────────────────────────────────────

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { PromptHistoryEntry } from "@/lib/ai/types";
import { TARGET_LLM_LABELS } from "@/lib/ai/types";
import { cn } from "@/lib/utils";
import { Clock, Trash2, X } from "lucide-react";

interface PromptHistoryProps {
  history: PromptHistoryEntry[];
  onSelect: (entry: PromptHistoryEntry) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onClose?: () => void;
  className?: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export function PromptHistory({
  history,
  onSelect,
  onRemove,
  onClear,
  onClose,
  className,
}: PromptHistoryProps) {
  if (history.length === 0) {
    return (
      <div className={cn("flex flex-col", className)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Recent Prompts</h3>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-muted-foreground/50 text-center">
            No prompts yet.
            <br />
            Enhanced prompts will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Recent Prompts</h3>
          <span className="text-xs text-muted-foreground/50">
            ({history.length})
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-xs text-muted-foreground h-7 px-2"
          >
            Clear all
          </Button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-1.5 pr-2">
          {history.map((entry) => (
            <button
              key={entry.id}
              onClick={() => onSelect(entry)}
              className="w-full text-left group p-3 rounded-lg hover:bg-accent/50 transition-colors duration-150 border border-transparent hover:border-border/50"
            >
              <p className="text-sm text-foreground line-clamp-2 leading-snug mb-1.5">
                {entry.originalPrompt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground/50">
                    {formatDate(entry.createdAt)}
                  </span>
                  <span className="text-[11px] text-muted-foreground/30">
                    ·
                  </span>
                  <span className="text-[11px] text-muted-foreground/50">
                    {TARGET_LLM_LABELS[entry.targetLLM]}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(entry.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground/40 hover:text-destructive p-0.5"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
