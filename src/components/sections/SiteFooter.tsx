import Link from "next/link";
import { Reveal } from "@/src/components/motion/Reveal";
import { Eyebrow } from "@/src/components/ui/primitives";
import { footer } from "@/src/content/contact";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-4">
            <Reveal y={12}>
              <p className="text-h4 font-medium text-ink">{footer.name}</p>
              <p className="narrative mt-2 max-w-[30ch] text-base text-ink-2">
                {footer.tagline}
              </p>
            </Reveal>
          </div>

          {/* Middle */}
          <nav aria-label="Footer" className="lg:col-span-4">
            <Reveal y={12} delay={0.05}>
              <Eyebrow className="mb-5 text-ink-4">Index</Eyebrow>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {footer.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-draw text-sm text-ink-2 hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="link-draw text-sm text-ink-2 hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          </nav>

          {/* Right */}
          <div className="lg:col-span-3 lg:col-start-10">
            <Reveal y={12} delay={0.1}>
              <Eyebrow className="mb-5 text-ink-4">Status</Eyebrow>
              <ul className="space-y-1.5">
                {footer.status.map((line, index) => (
                  <li
                    key={line}
                    className="flex items-start gap-2.5 text-sm text-ink-2"
                  >
                    {index === 0 ? null : (
                      <span
                        aria-hidden="true"
                        className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent"
                      />
                    )}
                    <span className={index === 0 ? "num" : ""}>{line}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Note */}
        <Reveal delay={0.08} className="mt-14 border-t border-line pt-8">
          <p className="narrative max-w-[58ch] text-base text-ink-3">{footer.note}</p>
        </Reveal>

        {/* Bottom bar */}
        <p className="num mt-10 font-mono text-mono uppercase tracking-[0.13em] text-ink-4">
          {footer.bottom}
        </p>
      </div>
    </footer>
  );
}
