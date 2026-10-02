// ─────────────────────────────────────────────────
// PEAT AI — Refine Prompt API Route
// POST /api/refine
// ─────────────────────────────────────────────────

import { getPeatEngine } from "@/lib/ai/peatEngine";
import type { EnhancedPrompt, RefinementAction } from "@/lib/ai/types";
import { NextResponse } from "next/server";

const VALID_ACTIONS: RefinementAction[] = [
  "more-technical",
  "more-concise",
  "add-constraints",
  "add-requirement",
  "regenerate",
];

interface RefineRequest {
  currentPrompt: EnhancedPrompt;
  action: RefinementAction;
  additionalInput?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RefineRequest;

    if (!body.currentPrompt || !body.action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!VALID_ACTIONS.includes(body.action)) {
      return NextResponse.json(
        { error: `Invalid action. Must be one of: ${VALID_ACTIONS.join(", ")}` },
        { status: 400 }
      );
    }

    const engine = getPeatEngine();
    const refined = await engine.refinePrompt(
      body.currentPrompt,
      body.action,
      body.additionalInput
    );

    return NextResponse.json(refined);
  } catch (error) {
    console.error("Refinement failed:", error);
    return NextResponse.json(
      { error: "Failed to refine prompt. Please try again." },
      { status: 500 }
    );
  }
}
