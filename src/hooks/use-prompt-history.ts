"use client";

// ─────────────────────────────────────────────────
// PEAT AI — History Hook
// Persists prompt history to localStorage
// ─────────────────────────────────────────────────

import type { EnhancedPrompt, PromptHistoryEntry } from "@/lib/ai/types";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "peat_history";
const MAX_HISTORY = 50;

export function usePromptHistory() {
  const [history, setHistory] = useState<PromptHistoryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      console.warn("Failed to load prompt history");
    }
    setLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      console.warn("Failed to save prompt history");
    }
  }, [history, loaded]);

  const addEntry = useCallback((enhanced: EnhancedPrompt) => {
    const entry: PromptHistoryEntry = {
      id: enhanced.id,
      originalPrompt: enhanced.originalPrompt,
      enhancedPrompt: enhanced,
      category: enhanced.category,
      targetLLM: enhanced.targetLLM,
      createdAt: enhanced.createdAt,
    };

    setHistory((prev) => {
      const updated = [entry, ...prev.filter((e) => e.id !== entry.id)];
      return updated.slice(0, MAX_HISTORY);
    });
  }, []);

  const removeEntry = useCallback((id: string) => {
    setHistory((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, addEntry, removeEntry, clearHistory, loaded };
}
