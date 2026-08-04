import { Section, SectionHead } from "@/src/components/layout/Section";
import { Reveal } from "@/src/components/motion/Reveal";
import { ArrowUpRight, Button } from "@/src/components/ui/Button";
import { CopyButton } from "@/src/components/ui/CopyButton";
import { Eyebrow } from "@/src/components/ui/primitives";
import { contact, contactMeta } from "@/src/content/contact";
import { a11y, buttons } from "@/src/content/microcopy";
import { profile } from "@/src/content/profile";

/**
 * Contact.
 *
 * No imagery, no envelope icon, no map pin, no form with a chirpy placeholder. The
 * address is the design: set as the largest single element in the section, with the
 * copy affordance in mono beside it. The detail list carries everything else, so the
 * address is never printed twice in one viewport.
 */
export function Contact() {
  const details = contact.details.filter((detail) => detail.label !== "Email");

  return (
    <Section id={contactMeta.id} tone="card">
      <SectionHead meta={contactMeta} />

      <div className="shell mt-10 lg:mt-12">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="space-y-5">
              {contact.body.map((paragraph) => (
                <p key={paragraph} className="max-w-[56ch] text-lede text-ink-2">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            {/* The address, at scale. */}
            <Reveal delay={0.08} className="mt-12 lg:mt-14">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  aria-label={a11y.emailLink}
                  className="link-draw text-[clamp(1.375rem,4.4vw,3.125rem)] font-medium leading-[1.1] tracking-[-0.035em] text-ink transition-colors duration-[var(--dur-hover)] hover:text-accent-hover"
                >
                  {profile.email}
                </a>
                <CopyButton
                  value={profile.email}
                  label={`${buttons.copy} email address`}
                />
              </div>
            </Reveal>

            <Reveal delay={0.14} className="mt-10">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
                <Button href={`mailto:${profile.email}`} variant="primary">
                  {buttons.contactPrimary}
                </Button>
                <Button href={profile.links.linkedin} variant="secondary" external>
                  {buttons.contactSecondary}
                  <ArrowUpRight className="text-ink-3" />
                </Button>
                <Button
                  href={profile.resumeHref}
                  variant="quiet"
                  external
                  aria-label={a11y.resumeLink}
                >
                  {buttons.heroSecondary}
                </Button>
                <Button href={profile.links.github} variant="quiet" external>
                  GitHub
                  <ArrowUpRight className="text-ink-4" />
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Direct details */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal y={16} delay={0.06}>
              <Eyebrow className="mb-6 text-ink-4">Direct</Eyebrow>
              <dl className="ruled border-t border-line">
                {details.map((detail) => (
                  <div key={detail.label} className="py-4">
                    <dt className="font-mono text-mono uppercase tracking-[0.13em] text-ink-4">
                      {detail.label}
                    </dt>
                    <dd className="mt-1.5 text-base text-ink">
                      {detail.label === "Phone" ? (
                        <a
                          href={`tel:${detail.value.replace(/\s/g, "")}`}
                          className="link-draw num"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <span className={detail.label === "Graduating" ? "num" : ""}>
                          {detail.value}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
