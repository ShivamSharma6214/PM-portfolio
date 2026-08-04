"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { ThemeToggle } from "@/src/components/ui/ThemeToggle";
import { a11y, buttons, mobileNavHeading, nav } from "@/src/content/microcopy";
import { profile } from "@/src/content/profile";

const SECTION_IDS = nav.map((item) => item.href.replace("#", ""));

export function SiteHeader({ variant = "home" }: { variant?: "home" | "sub" }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  /* Header gains a surface once the page has moved. Near the top nothing is
     "current" — the hero is not a nav destination — so the indicator clears. */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section. Observed, not computed on every scroll frame. */
  useEffect(() => {
    if (variant !== "home") return;
    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [variant]);

  /* Close the sheet on Escape, and lock the page behind it. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const homePrefix = variant === "home" ? "" : "/";

  return (
    <header
      data-print-hide
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/85 shadow-[0_1px_0_rgba(15,23,42,0.02)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
      style={{ height: "var(--header-h)" }}
    >
      <div className="shell flex h-full items-center justify-between gap-6">
        {/* Wordmark */}
        <Link
          href="/"
          className="group -ml-1 flex items-baseline gap-2.5 rounded px-1 py-1"
        >
          <span className="text-[0.95rem] font-medium tracking-[-0.015em] text-ink">
            {profile.name}
          </span>
          <span className="hidden font-mono text-mono uppercase tracking-[0.14em] text-ink-4 sm:inline">
            Builder-PM
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label={a11y.navLandmark} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = variant === "home" && active === id;
              return (
                <li key={item.href} className="relative">
                  <a
                    href={`${homePrefix}${item.href}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded px-3 py-2 text-sm transition-colors duration-[var(--dur-hover)] ${
                      isActive ? "text-ink" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {item.label}
                    {isActive ? (
                      reduced ? (
                        <span className="absolute inset-x-3 -bottom-0.5 h-px bg-accent" />
                      ) : (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-accent"
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden md:inline-flex" />

          {/* Wrapper, not `hidden sm:inline-flex` on the button: `hidden` and the
              button's own `inline-flex` are both display utilities, so the attribute
              order would not decide which wins. On small screens the résumé lives in
              the sheet instead. */}
          <span className="hidden sm:block">
            <Button
              href={profile.resumeHref}
              variant="secondary"
              size="sm"
              external
              aria-label={a11y.resumeLink}
            >
              {buttons.heroSecondary}
            </Button>
          </span>

          {/* Mobile trigger — a labelled control, not a bare hamburger. */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-sections"
            className="inline-flex h-9 items-center gap-2.5 rounded-full border border-line-2 bg-card px-4 font-mono text-mono uppercase tracking-[0.13em] text-ink-2 shadow-e1 lg:hidden"
          >
            {mobileNavHeading}
            <span aria-hidden="true" className="grid gap-[3px]">
              <span
                className={`block h-px w-3 bg-current transition-transform duration-300 ${open ? "translate-y-[4px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-3 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-3 bg-current transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Scroll progress — a hairline on the header's own edge. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
        style={{ scaleX: reduced ? 0 : progress }}
      />
      <span className="sr-only">{a11y.scrollProgress}</span>

      {/* Mobile sheet — sheet, not overlay. Hairline-ruled list. */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-sections"
            initial={reduced ? undefined : { opacity: 0, y: -8 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full border-b border-line bg-paper/95 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label={a11y.navLandmark} className="shell py-2">
              <ul className="ruled">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={`${homePrefix}${item.href}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4 text-h4 text-ink"
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="font-mono text-mono uppercase tracking-[0.14em] text-ink-4"
                      >
                        {item.href}
                      </span>
                    </a>
                  </li>
                ))}
                <li className="flex flex-wrap items-center gap-3 py-4">
                  <Button
                    href={profile.resumeHref}
                    variant="secondary"
                    size="sm"
                    external
                    aria-label={a11y.resumeLink}
                  >
                    {buttons.heroSecondary}
                  </Button>
                  <ThemeToggle />
                </li>
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
