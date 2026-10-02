"use client";

// ─────────────────────────────────────────────────
// PEAT AI — Landing Page
// Hero → Demo → Before/After → How it Works → Use Cases → CTA
// ─────────────────────────────────────────────────

import { BeforeAfterDemo } from "@/components/before-after";
import { PeatLogo } from "@/components/peat-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Code2,
  Copy,
  Layers,
  MousePointerClick,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useState, useRef } from "react";

const HERO_EXAMPLE_INPUT = "Make the checkout button feel satisfying when clicked.";

const HERO_EXAMPLE_OUTPUT =
  "Build a checkout button with multi-phase tactile animation. Press: instant scale(0.97) with shadow reduction (80ms). On submit: morph from pill to circle (400ms), text fades to spinning arc loader. Success: circle expands to pill with spring easing, SVG checkmark draws in (500ms). Use transform/opacity only for 60fps…";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Describe your idea",
    description:
      "Write a rough, natural-language description of what you want to build. Don't worry about being precise — that's PEAT's job.",
    icon: MousePointerClick,
  },
  {
    step: "02",
    title: "PEAT analyzes & enhances",
    description:
      "PEAT identifies missing specifications, resolves ambiguity, and adds the technical details your coding AI needs.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Get your engineering prompt",
    description:
      "Copy the enhanced prompt and paste it into Claude, ChatGPT, Cursor, or any coding tool. Get better results on the first try.",
    icon: Target,
  },
];

const USE_CASES = [
  { label: "Web Animations", icon: "✨" },
  { label: "UI/UX", icon: "🎨" },
  { label: "Frontend", icon: "🖥️" },
  { label: "Backend", icon: "⚙️" },
  { label: "APIs", icon: "🔌" },
  { label: "Database", icon: "🗄️" },
  { label: "Authentication", icon: "🔐" },
  { label: "Responsive Design", icon: "📱" },
  { label: "Performance", icon: "⚡" },
  { label: "Three.js / 3D", icon: "🎲" },
  { label: "Framer Motion", icon: "🎬" },
  { label: "GSAP", icon: "🎯" },
  { label: "Forms", icon: "📝" },
  { label: "Dashboards", icon: "📊" },
];

const SUPPORTED_TOOLS = [
  { name: "Claude", color: "text-orange-400" },
  { name: "ChatGPT", color: "text-green-400" },
  { name: "Gemini", color: "text-blue-400" },
  { name: "Cursor", color: "text-purple-400" },
  { name: "Antigravity", color: "text-cyan-400" },
];

export default function LandingPage() {
  const [heroCopied, setHeroCopied] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = useCallback(() => {
    demoRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const copyExample = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(HERO_EXAMPLE_OUTPUT);
      setHeroCopied(true);
      setTimeout(() => setHeroCopied(false), 2000);
    } catch {
      setHeroCopied(true);
      setTimeout(() => setHeroCopied(false), 2000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─── NAVIGATION ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-4 lg:px-8">
          <PeatLogo size="sm" />
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToDemo}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              See an Example
            </button>
            <Link href="/workspace">
              <Button
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-5 gap-1.5"
              >
                Try PEAT
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium mb-6">
              <Sparkles className="w-3 h-3" />
              Prompt Engineering At Tips
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 leading-[1.1]">
              Stop prompting.
              <br />
              <span className="text-emerald-500">Start specifying.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              PEAT turns rough ideas into engineering-grade prompts for AI coding
              tools. Less back-and-forth. Better first outputs.
            </p>
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-12"
          >
            <Link href="/workspace">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 gap-2 text-base h-12 shadow-lg shadow-emerald-500/20"
              >
                Try PEAT
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToDemo}
              className="rounded-full px-6 h-12 text-base gap-2"
            >
              See an Example
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* ─── HERO INLINE DEMO ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-xl shadow-black/[0.03]">
              {/* Demo input */}
              <div className="p-4 border-b border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                    Rough Idea
                  </span>
                </div>
                <p className="text-sm text-foreground/70 italic pl-4">
                  &ldquo;{HERO_EXAMPLE_INPUT}&rdquo;
                </p>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center py-2.5 bg-emerald-500/[0.03]">
                <div className="flex items-center gap-2">
                  <div className="h-px w-6 bg-emerald-500/20" />
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                    PEAT
                  </span>
                  <div className="h-px w-6 bg-emerald-500/20" />
                </div>
              </div>

              {/* Demo output */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] text-emerald-500 font-medium uppercase tracking-wider">
                      Engineering Prompt
                    </span>
                  </div>
                  <button
                    onClick={copyExample}
                    className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {heroCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-foreground leading-relaxed pl-4">
                  {HERO_EXAMPLE_OUTPUT}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── BEFORE / AFTER ─── */}
      <section ref={demoRef} className="py-16 lg:py-24 px-4 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">
              See the difference
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              PEAT doesn&apos;t just make your prompt longer. It makes it
              precise. Here&apos;s what that looks like.
            </p>
          </div>

          <BeforeAfterDemo />
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-16 lg:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">
              How PEAT works
            </h2>
            <p className="text-muted-foreground">
              Three steps. One better prompt. Zero wasted iterations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className="bg-card border border-border/50 rounded-xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {step.step}
                    </span>
                    <step.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector arrow between cards */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-4 h-4 text-emerald-500/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── USE CASES ─── */}
      <section className="py-16 lg:py-24 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">
              What are you building?
            </h2>
            <p className="text-muted-foreground">
              PEAT adapts its enhancement based on what you&apos;re working on.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={uc.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
              >
                <Link
                  href="/workspace"
                  className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border/50 rounded-xl text-sm hover:border-emerald-500/30 hover:bg-emerald-500/[0.03] transition-all duration-200 group"
                >
                  <span className="text-base">{uc.icon}</span>
                  <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                    {uc.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SUPPORTED TOOLS ─── */}
      <section className="py-16 lg:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">
            Works with your favorite AI
          </h2>
          <p className="text-muted-foreground mb-10">
            PEAT generates prompts optimized for whatever coding tool you use.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {SUPPORTED_TOOLS.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-2 px-5 py-3 bg-card border border-border/50 rounded-xl"
              >
                <Code2 className={cn("w-4 h-4", tool.color)} />
                <span className="text-sm font-medium">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-16 lg:py-24 px-4 bg-muted/20">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              You know what you want.
              <br />
              <span className="text-emerald-500">
                PEAT helps you explain it.
              </span>
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Give your coding AI the details it needs. First try.
            </p>
            <Link href="/workspace">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-10 gap-2 text-base h-12 shadow-lg shadow-emerald-500/20"
              >
                Try PEAT — It&apos;s Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border/30 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <PeatLogo size="sm" />
          <p className="text-xs text-muted-foreground/50">
            PEAT AI — Prompt Engineering At Tips. Built for developers who use AI
            to build.
          </p>
        </div>
      </footer>
    </div>
  );
}
