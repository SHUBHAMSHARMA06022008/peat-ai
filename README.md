<div align="center">

<br/>

<img src="https://img.shields.io/badge/PEAT_AI-prompt_engineering-10b981?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSIxMCIgZmlsbD0iIzEwYjk4MSIvPjxwYXRoIGQ9Ik0xMyAxMEgyMkMyNS44NjYgMTAgMjkgMTMuMTM0IDI5IDE3QzI5IDIwLjg2NiAyNS44NjYgMjQgMjIgMjRIMThWMzFIMTNWMTBaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0xOCAxNC41SDIxLjVDMjMuNDMzIDE0LjUgMjUgMTYuMDY3IDI1IDE4QzI1IDE5LjkzMyAyMy40MzMgMjEuNSAyMS41IDIxLjVIMThWMTQuNVoiIGZpbGw9IiMxMGI5ODEiLz48cGF0aCBkPSJNMjQgMjdMMzAgMjEuNUwyNCAxNiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlV2lkdGg9IjIuNSIgc3Ryb2tlTGluZWNhcD0icm91bmQiIHN0cm9rZUxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==" alt="PEAT AI" />

# PEAT AI

### Stop Prompting. Start Specifying.

**PEAT** turns rough, natural-language ideas into **engineering-grade prompts** for AI coding tools — so Claude, ChatGPT, Gemini, and Cursor build it right the first time.

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000?style=flat-square)](https://ui.shadcn.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-ff0055?style=flat-square&logo=framer)](https://www.framer.com/motion)

<br/>

</div>

---

## The Problem

AI coding tools have dramatically lowered the barrier to building software. But there's a gap between **what users describe** and **what LLMs actually need** to build it correctly.

Even the best models — Claude, ChatGPT, Gemini — frequently require multiple cycles of:

```
prompt → bad output → correct it → still wrong → correct again → ...
```

These iterations **waste time**, **consume credits**, and produce **inconsistent results**.

---

## What PEAT Does

PEAT is a **prompt-enhancement layer** that sits between your idea and your coding AI:

```
Human intent
      ↓
   PEAT AI
      ↓
Engineering-grade prompt
      ↓
Claude / ChatGPT / Gemini / Cursor / Antigravity
      ↓
  Better first output ✓
  Fewer iterations   ✓
```

**Example:**

| | |
|---|---|
| **You write** | `"Make the checkout button feel satisfying when clicked."` |
| **PEAT generates** | `"Build a checkout button with multi-phase tactile animation. Press: instant scale(0.97) with shadow reduction (80ms). On submit: morph from pill to circle (400ms), text fades to spinning arc loader. Success: circle expands to pill with spring easing (300ms), SVG checkmark draws in via stroke-dashoffset (500ms). Use transform/opacity only for 60fps. Include haptic feedback via navigator.vibrate. State machine: idle → pressed → processing → success|error. Respect prefers-reduced-motion…"` |

PEAT's value is **precision, not length**. It removes ambiguity and adds specifications that materially improve execution.

---

## Screenshots

<table>
  <tr>
    <td align="center"><b>Landing Page</b></td>
    <td align="center"><b>Workspace — Split View</b></td>
  </tr>
  <tr>
    <td><img src="docs/landing.png" alt="PEAT AI landing page with inline demo" width="400"/></td>
    <td><img src="docs/workspace.png" alt="Three-column workspace: idea → PEAT → engineering prompt" width="400"/></td>
  </tr>
  <tr>
    <td align="center"><b>Before / After</b></td>
    <td align="center"><b>Processing Animation</b></td>
  </tr>
  <tr>
    <td><img src="docs/compare.png" alt="Before/After comparison showing added specifications" width="400"/></td>
    <td><img src="docs/processing.png" alt="Step-by-step processing animation" width="400"/></td>
  </tr>
</table>

---

## Features

### 🏠 Landing Page
- Hero with live inline prompt demo (no static marketing images)
- Before/After comparison with tagged additions (`+ animation timing`, `+ physics`, `+ edge cases`)
- 3-step explainer, 14 use-case categories, supported LLM cards

### ⚡ Prompt Workspace
| Feature | Description |
|---|---|
| **Three-stage flow** | Your Idea → PEAT Processing → Engineering Prompt |
| **Split view** | Side-by-side three-column desktop layout |
| **Comparison view** | Before/After with highlighted additions |
| **Structured output** | Objective, Requirements, Behaviour, Technical Details, Edge Cases, Constraints, Implementation Guidance |
| **Raw prompt tab** | Full enhanced prompt in a copyable code block |
| **Copy to clipboard** | One-click copy of the complete engineering prompt |

### 🔧 Refinement Actions
After PEAT generates a prompt, you can:
- **Refine** — regenerate with a different angle
- **More Technical** — add deeper implementation specifics
- **More Concise** — strip to high-density essentials  
- **Add Constraints** — inject performance, a11y, browser compatibility constraints

### 📚 Prompt History
- Persisted to localStorage (up to 50 entries)
- Each entry stores: original prompt, enhanced prompt, category, target LLM, timestamp
- Reopen any previous prompt with one click

### 🎯 Context-Aware Enhancement
| Category | What PEAT Focuses On |
|---|---|
| Web Animations | Timing, easing, spring physics, transforms, GPU performance |
| Frontend / UI | Component structure, responsive breakpoints, a11y, state management |
| Backend / APIs | Request/response shapes, validation, error handling, auth, security |
| Database | Schema design, indexing, migrations, query performance |
| 3D / Three.js | Scene setup, geometry, materials, lighting, performance budget |

### 🔌 LLM Target Selection
Choose your target AI to get prompt formatting optimized for:
Claude · ChatGPT · Gemini · Cursor · Antigravity · Other

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Base UI) |
| Animation | Framer Motion |
| Icons | Lucide React |
| State | React hooks + localStorage |
| API | Next.js Route Handlers |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/peat-ai.git
cd peat-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run in development mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **No API key needed.** PEAT runs in demo mode out of the box with 6 realistic mock enhancements.

---

## Connecting a Real LLM

PEAT uses a modular provider architecture via the `PromptEnhancer` interface:

```typescript
// src/lib/ai/types.ts
interface PromptEnhancer {
  enhancePrompt(input: PromptInput): Promise<EnhancedPrompt>
  refinePrompt(current: EnhancedPrompt, action: RefinementAction): Promise<EnhancedPrompt>
}
```

To connect a real LLM, set one of these environment variables in `.env.local`:

```env
# Option 1: OpenAI
OPENAI_API_KEY=sk-...

# Option 2: Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Option 3: Google Gemini
GEMINI_API_KEY=AIza...
```

The engine factory in `src/lib/ai/peatEngine.ts` will auto-detect and use the configured provider. The mock provider is used as fallback when no key is present.

To implement a new provider, create a class implementing `PromptEnhancer` and register it in `peatEngine.ts`.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                   # Landing page
│   ├── layout.tsx                 # Root layout, metadata, dark mode
│   ├── globals.css                # Custom dark theme (blue-tinted neutrals + emerald)
│   ├── workspace/
│   │   └── page.tsx               # Three-stage prompt workspace
│   └── api/
│       ├── enhance/route.ts       # POST /api/enhance — validates & enhances
│       └── refine/route.ts        # POST /api/refine — refinement actions
│
├── lib/
│   └── ai/
│       ├── types.ts               # Core interfaces (PromptEnhancer, EnhancedPrompt, etc.)
│       ├── peatEngine.ts          # Provider factory + singleton
│       ├── systemPrompt.ts        # PEAT system prompt (detailed instruction set)
│       └── mockProvider.ts        # 6 realistic demo enhancements
│
├── components/
│   ├── peat-logo.tsx              # P mark SVG + wordmark
│   ├── prompt-input.tsx           # Large textarea + examples + selectors
│   ├── processing-animation.tsx   # Step-by-step progress indicators
│   ├── enhanced-prompt-display.tsx # Structured/raw output + action buttons
│   ├── before-after.tsx           # Comparison component (live + landing demo)
│   ├── prompt-history.tsx         # History panel with reopen/delete
│   └── ui/                        # shadcn/ui components
│
└── hooks/
    └── use-prompt-history.ts      # localStorage history with 50-entry limit
```

---

## API Reference

### `POST /api/enhance`

Enhances a raw prompt into an engineering specification.

**Request body:**
```json
{
  "rawPrompt": "Add a 3D animation when someone adds to cart",
  "category": "web-animations",
  "targetLLM": "claude"
}
```

**Response:**
```json
{
  "id": "peat_1234567890_abc123",
  "objective": "Implement a visually satisfying product-to-cart animation...",
  "requirements": ["..."],
  "behaviour": ["..."],
  "technicalDetails": ["..."],
  "interactionDetails": ["..."],
  "edgeCases": ["..."],
  "constraints": ["..."],
  "implementationGuidance": ["..."],
  "finalPrompt": "...",
  "assumptions": ["..."],
  "originalPrompt": "Add a 3D animation when someone adds to cart",
  "category": "web-animations",
  "targetLLM": "claude",
  "createdAt": "2026-10-02T13:37:00.000Z"
}
```

### `POST /api/refine`

Refines an existing enhanced prompt.

**Request body:**
```json
{
  "currentPrompt": { ...EnhancedPrompt },
  "action": "more-technical" | "more-concise" | "add-constraints" | "regenerate" | "add-requirement"
}
```

---

## Security

- **All LLM calls are server-side** — API keys never reach the client
- Input validated for length (max 5000 chars) and minimum content
- Rate limiting ready to add via Next.js middleware

---

## Roadmap

- [ ] Real LLM integrations (Anthropic, OpenAI, Gemini)
- [ ] User authentication (email / Google)
- [ ] Team workspaces with shared prompt library
- [ ] Browser extension — enhance prompts directly inside Claude/ChatGPT/Cursor
- [ ] Prompt versioning and diff view
- [ ] Export as markdown / JSON
- [ ] Prompt quality scoring

---

## The Vision

PEAT's long-term goal is a **browser extension** that lives inside your coding AI:

```
User types in Claude/ChatGPT/Cursor:
  "Make this animation better."

  [Enhance with PEAT ✦]

PEAT transforms the prompt before it's submitted.
Better result. First try.
```

---

## Contributing

Pull requests welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## License

MIT © Shubham Sharma

---

<div align="center">

Built for developers who use AI to build.

**[Try PEAT →](http://localhost:3000)**

</div>
