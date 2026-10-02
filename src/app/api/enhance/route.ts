// ─────────────────────────────────────────────────
// PEAT AI — Enhance Prompt API Route
// POST /api/enhance
// ─────────────────────────────────────────────────

import { getPeatEngine } from "@/lib/ai/peatEngine";
import type { PromptInput } from "@/lib/ai/types";
import { NextResponse } from "next/server";

const MAX_PROMPT_LENGTH = 5000;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PromptInput;

    // Validation
    if (!body.rawPrompt || typeof body.rawPrompt !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid prompt" },
        { status: 400 }
      );
    }

    if (body.rawPrompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json(
        { error: `Prompt exceeds maximum length of ${MAX_PROMPT_LENGTH} characters` },
        { status: 400 }
      );
    }

    if (body.rawPrompt.trim().length < 5) {
      return NextResponse.json(
        { error: "Prompt is too short. Describe what you want to build." },
        { status: 400 }
      );
    }

    const engine = getPeatEngine();
    const enhanced = await engine.enhancePrompt({
      rawPrompt: body.rawPrompt.trim(),
      category: body.category,
      targetLLM: body.targetLLM,
      additionalContext: body.additionalContext,
    });

    return NextResponse.json(enhanced);
  } catch (error) {
    console.error("Enhancement failed:", error);
    return NextResponse.json(
      { error: "Failed to enhance prompt. Please try again." },
      { status: 500 }
    );
  }
}
