// ─────────────────────────────────────────────────
// PEAT AI — Engine Entry Point
// Modular provider architecture for swapping LLM backends
// ─────────────────────────────────────────────────

import { MockPromptEnhancer } from "./mockProvider";
import type { PromptEnhancer } from "./types";

export type ProviderType = "mock" | "openai" | "anthropic" | "gemini";

/**
 * Factory function to create the appropriate prompt enhancer.
 * Currently only mock is implemented — designed for easy extension.
 */
export function createPromptEnhancer(
  provider: ProviderType = "mock"
): PromptEnhancer {
  switch (provider) {
    case "mock":
      return new MockPromptEnhancer();
    // Future providers:
    // case "openai":
    //   return new OpenAIPromptEnhancer(process.env.OPENAI_API_KEY!);
    // case "anthropic":
    //   return new AnthropicPromptEnhancer(process.env.ANTHROPIC_API_KEY!);
    // case "gemini":
    //   return new GeminiPromptEnhancer(process.env.GEMINI_API_KEY!);
    default:
      return new MockPromptEnhancer();
  }
}

/**
 * Get the active provider based on environment configuration.
 * Falls back to mock if no API key is configured.
 */
export function getActiveProvider(): ProviderType {
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.GEMINI_API_KEY) return "gemini";
  return "mock";
}

// Singleton instance
let _enhancer: PromptEnhancer | null = null;

export function getPeatEngine(): PromptEnhancer {
  if (!_enhancer) {
    _enhancer = createPromptEnhancer(getActiveProvider());
  }
  return _enhancer;
}
