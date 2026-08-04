import type { ReactNode } from "react";
import type { ProjectStatus } from "@/src/content/types";

/* ==========================================================================
   Eyebrow — small mono uppercase label. Numbered, so the page reads as a document.
   ========================================================================== */

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-mono uppercase tracking-[0.14em] text-ink-3 ${className}`}
    >
      {children}
    </p>
  );
}

/* ==========================================================================
   Badge — hairline pill. Used for the hero eyebrow and inline meta.
   ========================================================================== */

export function Badge({
  children,
  dot = false,
  className = "",
}: {
  children: ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-start gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 font-mono text-mono uppercase tracking-[0.13em] text-ink-2 shadow-e1 ${className}`}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className="mt-[0.42em] size-1.5 shrink-0 rounded-full bg-accent"
        />
      ) : null}
      {children}
    </span>
  );
}

/* ==========================================================================
   Status — the only place colour encodes meaning besides links.
   ========================================================================== */

const statusTone: Record<ProjectStatus, string> = {
  Delivered: "text-ink-2",
  "In development": "text-accent",
  "In progress": "text-accent",
};

const statusDot: Record<ProjectStatus, string> = {
  Delivered: "bg-ink-4",
  "In development": "bg-accent",
  "In progress": "bg-accent",
};

export function Status({
  status,
  className = "",
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-mono uppercase tracking-[0.13em] ${statusTone[status]} ${className}`}
    >
      <span aria-hidden="true" className={`size-1.5 rounded-full ${statusDot[status]}`} />
      {status}
    </span>
  );
}

/* ==========================================================================
   Chip — mono tag. Dense grids of these replace the icon cloud.
   ========================================================================== */

export function Chip({
  children,
  tone = "solid",
  className = "",
}: {
  children: ReactNode;
  tone?: "solid" | "outline";
  className?: string;
}) {
  const tones = {
    solid: "border-transparent bg-inset text-ink-2",
    outline: "border-line bg-transparent text-ink-3",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-mono tracking-[0.06em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/* ==========================================================================
   Hairline — the structural device. Full-bleed by default.
   ========================================================================== */

export function Hairline({ className = "" }: { className?: string }) {
  return <hr aria-hidden="true" className={`h-px border-0 bg-line ${className}`} />;
}

/* ==========================================================================
   MediaSlot — an honest empty state where a screenshot will go.

   Deliberately not a black rectangle. A recessed panel, a faint diagonal weave and
   one line of mono copy explaining why there is nothing here yet. The absence of an
   image reads better than a generic one.
   ========================================================================== */

export function MediaSlot({
  label,
  className = "",
  ratio = "16 / 10",
}: {
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-[10px] border border-line bg-inset ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 11px, var(--inset-2) 11px 12px)",
        }}
      />
      <p className="relative max-w-[26ch] px-6 text-center font-mono text-mono uppercase leading-relaxed tracking-[0.13em] text-ink-4">
        {label}
      </p>
    </div>
  );
}

/* ==========================================================================
   Prose — the narrative voice. Serif, measured, never full-width.
   ========================================================================== */

export function Narrative({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`narrative space-y-5 text-lede text-ink-2 [&_strong]:font-medium [&_strong]:text-ink ${className}`}
    >
      {children}
    </div>
  );
}
