"use client";

// ─────────────────────────────────────────────────
// PEAT AI — Logo Component
// Distinctive P mark with transformation motif
// ─────────────────────────────────────────────────

import { cn } from "@/lib/utils";

interface PeatLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const sizes = {
  sm: { icon: 24, text: "text-base", gap: "gap-1.5" },
  md: { icon: 32, text: "text-xl", gap: "gap-2" },
  lg: { icon: 40, text: "text-2xl", gap: "gap-2.5" },
  xl: { icon: 56, text: "text-4xl", gap: "gap-3" },
};

export function PeatLogo({
  size = "md",
  showText = true,
  className,
}: PeatLogoProps) {
  const s = sizes[size];

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      {/* P Mark — transformation motif with arrow-like shape integrated into P */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Background shape */}
        <rect
          width="40"
          height="40"
          rx="10"
          className="fill-emerald-500"
        />
        {/* P letterform with transformation arrow */}
        <path
          d="M13 10H22C25.866 10 29 13.134 29 17C29 20.866 25.866 24 22 24H18V31H13V10Z"
          fill="white"
          fillOpacity="0.95"
        />
        {/* Inner cutout for the P bowl */}
        <path
          d="M18 14.5H21.5C23.433 14.5 25 16.067 25 18C25 19.933 23.433 21.5 21.5 21.5H18V14.5Z"
          className="fill-emerald-500"
        />
        {/* Transformation arrow — emerging from the P */}
        <path
          d="M24 27L30 21.5L24 16"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.9"
        />
      </svg>

      {showText && (
        <span
          className={cn(
            "font-bold tracking-tight text-foreground",
            s.text
          )}
        >
          PEAT
          <span className="text-emerald-500 font-light ml-0.5">AI</span>
        </span>
      )}
    </div>
  );
}

/** Minimal P mark for favicon/small contexts */
export function PeatMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="10" className="fill-emerald-500" />
      <path
        d="M13 10H22C25.866 10 29 13.134 29 17C29 20.866 25.866 24 22 24H18V31H13V10Z"
        fill="white"
        fillOpacity="0.95"
      />
      <path
        d="M18 14.5H21.5C23.433 14.5 25 16.067 25 18C25 19.933 23.433 21.5 21.5 21.5H18V14.5Z"
        className="fill-emerald-500"
      />
      <path
        d="M24 27L30 21.5L24 16"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.9"
      />
    </svg>
  );
}
