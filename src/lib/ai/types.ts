// ─────────────────────────────────────────────────
// PEAT AI — Core Types
// ─────────────────────────────────────────────────

export interface PromptInput {
  rawPrompt: string;
  category?: string;
  targetLLM?: TargetLLM;
  additionalContext?: string;
}

export interface EnhancedPrompt {
  id: string;
  objective: string;
  requirements: string[];
  behaviour: string[];
  technicalDetails: string[];
  interactionDetails: string[];
  edgeCases: string[];
  constraints: string[];
  implementationGuidance: string[];
  finalPrompt: string;
  assumptions: string[];
  originalPrompt: string;
  category: string;
  targetLLM: TargetLLM;
  createdAt: string;
}

export type TargetLLM =
  | "claude"
  | "chatgpt"
  | "gemini"
  | "cursor"
  | "antigravity"
  | "other";

export type PromptCategory =
  | "web-animations"
  | "ui-ux"
  | "frontend"
  | "backend"
  | "apis"
  | "database"
  | "authentication"
  | "responsive-design"
  | "performance"
  | "threejs-3d"
  | "framer-motion"
  | "gsap"
  | "forms"
  | "dashboards";

export type RefinementAction =
  | "more-technical"
  | "more-concise"
  | "add-constraints"
  | "add-requirement"
  | "regenerate";

export interface PromptHistoryEntry {
  id: string;
  originalPrompt: string;
  enhancedPrompt: EnhancedPrompt;
  category: string;
  targetLLM: TargetLLM;
  createdAt: string;
}

/**
 * Abstraction for prompt enhancement providers.
 * Allows swapping between mock, OpenAI, Anthropic, etc.
 */
export interface PromptEnhancer {
  enhancePrompt(input: PromptInput): Promise<EnhancedPrompt>;
  refinePrompt(
    current: EnhancedPrompt,
    action: RefinementAction,
    additionalInput?: string
  ): Promise<EnhancedPrompt>;
}

export const CATEGORY_LABELS: Record<PromptCategory, string> = {
  "web-animations": "Web Animations",
  "ui-ux": "UI/UX",
  frontend: "Frontend",
  backend: "Backend",
  apis: "APIs",
  database: "Database",
  authentication: "Authentication",
  "responsive-design": "Responsive Design",
  performance: "Performance",
  "threejs-3d": "Three.js / 3D",
  "framer-motion": "Framer Motion",
  gsap: "GSAP",
  forms: "Forms",
  dashboards: "Dashboards",
};

export const TARGET_LLM_LABELS: Record<TargetLLM, string> = {
  claude: "Claude",
  chatgpt: "ChatGPT",
  gemini: "Gemini",
  cursor: "Cursor",
  antigravity: "Antigravity",
  other: "Other",
};

export const EXAMPLE_PROMPTS = [
  "Build a pricing page with animated cards",
  "Add a realistic loading animation",
  "Make this dashboard responsive",
  "Create a drag-and-drop interaction",
  "Add a 3D product viewer",
];
