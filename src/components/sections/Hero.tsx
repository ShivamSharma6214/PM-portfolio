import Image from "next/image";
import { DrawRule } from "@/src/components/motion/DrawRule";
import { MaskLines } from "@/src/components/motion/MaskLines";
import { Reveal, RevealChild, Stagger } from "@/src/components/motion/Reveal";
import { Button } from "@/src/components/ui/Button";
import { CopyButton } from "@/src/components/ui/CopyButton";
import { Badge, Eyebrow } from "@/src/components/ui/primitives";
import { hero, techStrip } from "@/src/content/hero";
import { a11y, buttons } from "@/src/content/microcopy";
import { profile } from "@/src/content/profile";

const PORTRAIT_BLUR =
  "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAQAgCdASoMABAAA4BaJZQC7AD0cnt56UYAAP7dngZY6RH13ERkdiMPw5JaYpWHbtR8I4sVbZkK6u/QZ3ZJA60Ll5EWX7pPCpwu89YVKQ45DABmU19YApHkgAA=";

/**
 * Hero.
 *
 * Three bands, each answering one question in order:
 *
 *   A — the claim.    Badge, headline, subheadline, actions, and the portrait with
 *                     the proof strip lifted onto its own surface beside it.
 *   B — the context.  The lede at reading measure, with availability opposite it.
 *   C — the toolkit.  Four labelled groups, dense, for the keyword scan.
 *
 * The order matters. Previously the six-line lede sat between the headline and the
 * buttons, which pushed the call to action below the fold-line and made the first read
 * "claim, then a paragraph" instead of "claim, then act". Moving it into its own band
 * lets it breathe as editorial copy and puts the actions directly under the claim.
 *
 * Grid: type in columns 1–7, portrait in 9–12. Column 8 stays empty — that gap is what
 * lets the proof card overhang the portrait and still read as deliberate. The headline
 * is capped at 5.5rem so it fits inside its seven columns; at the previous 6.25rem it
 * overflowed the column and only looked correct because nothing happened to be there.
 */
export function Hero() {
  return (
    <section id="top" className="relative pt-10 lg:pt-16">
      {/* ==================================================== A — the claim */}
      <div className="shell">
        <div className="grid items-start gap-x-8 gap-y-16 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <Reveal y={12}>
              <Badge dot>{hero.eyebrow}</Badge>
            </Reveal>

            <MaskLines
              as="h1"
              lines={hero.headlineLines}
              className="mt-8 text-[clamp(2.75rem,5.6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.042em] text-ink"
            />

            <DrawRule className="mt-10 h-px w-full max-w-[30rem]" delay={0.3} />

            <Reveal delay={0.12} className="mt-8">
              <p className="narrative max-w-[38ch] text-[clamp(1.1875rem,0.5vw+1.05rem,1.5rem)] leading-[1.5] text-ink-2">
                {hero.subheadline}
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-11">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-4">
                <Button href="#work" variant="primary">
                  {buttons.heroPrimary}
                </Button>
                <Button
                  href={profile.resumeHref}
                  variant="secondary"
                  external
                  aria-label={a11y.resumeLink}
                >
                  {buttons.heroSecondary}
                </Button>
                <span className="ml-1 flex items-center gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    aria-label={a11y.emailLink}
                    className="link-draw font-mono text-mono-lg tracking-[0.05em] text-ink-2 hover:text-accent-hover"
                  >
                    {profile.email}
                  </a>
                  <CopyButton
                    value={profile.email}
                    label={`${buttons.copy} email address`}
                  />
                </span>
              </div>
            </Reveal>
          </div>

          {/* Portrait + proof */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal y={28} delay={0.06}>
              <div className="relative mx-auto w-full max-w-[24rem] lg:mx-0 lg:max-w-none">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] border border-line bg-inset shadow-e3">
                  <Image
                    src="/images/shivam-sharma-portrait.webp"
                    alt={hero.portraitAlt}
                    width={1000}
                    height={1333}
                    priority
                    placeholder="blur"
                    blurDataURL={PORTRAIT_BLUR}
                    sizes="(max-width: 640px) 88vw, (max-width: 1023px) 22rem, 28vw"
                    className="size-full object-cover object-top"
                  />
                </div>

                {/* The proof strip sits on its own surface, overhanging the image into
                    the empty eighth column. The photograph is never a picture inside
                    an empty box, and the numbers are never text on top of a face. */}
                <Stagger
                  className="relative z-10 -mt-12 ml-3 mr-5 grid grid-cols-2 overflow-hidden rounded-[10px] border border-line bg-card shadow-e3 sm:-mt-14 lg:-ml-14 lg:mr-0"
                  stagger={0.07}
                >
                  {hero.proof.map((point, index) => (
                    <RevealChild
                      key={point.label}
                      y={10}
                      className={`px-4 py-4 sm:px-5 sm:py-5 ${
                        index % 2 === 0 ? "border-r border-line" : ""
                      } ${index < 2 ? "border-b border-line" : ""}`}
                    >
                      <span className="num block text-[1.75rem] font-medium leading-none tracking-[-0.03em] text-ink">
                        {point.value}
                      </span>
                      <span className="mt-2 block font-mono text-mono uppercase leading-[1.5] tracking-[0.1em] text-ink-3">
                        {point.label}
                      </span>
                    </RevealChild>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ================================================== B — the context */}
      <div className="relative mt-14 lg:mt-20">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
        <div className="shell py-10 lg:py-12">
          <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="max-w-[62ch] text-[1.0625rem] leading-[1.7] text-ink-2">
                {hero.lede}
              </p>
            </Reveal>

            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.08}>
                <Eyebrow className="mb-3 text-ink-4">Availability</Eyebrow>
                <p className="flex items-start gap-2.5 text-sm leading-[1.6] text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {hero.availability}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================== C — the toolkit */}
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
        <div className="shell py-9 lg:py-11">
          <Stagger className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {techStrip.map((group) => (
              <RevealChild key={group.label} y={14}>
                <Eyebrow className="mb-4 text-ink-4">{group.label}</Eyebrow>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-inset px-2.5 py-1 font-mono text-mono tracking-[0.05em] text-ink-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealChild>
            ))}
          </Stagger>
        </div>

        {/* Scroll cue, on the hero's closing edge. Fades on first scroll. */}
        <p
          aria-hidden="true"
          className="shell hidden pb-2 text-right font-mono text-mono uppercase tracking-[0.2em] text-ink-4 lg:block"
        >
          {hero.scrollCue}
        </p>
      </div>
    </section>
  );
}
