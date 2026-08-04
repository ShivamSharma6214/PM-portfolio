import { loading } from "@/src/content/microcopy";

/**
 * Boot veil.
 *
 * A single centred line, mono, low contrast, gone at ~600ms. No spinner, no
 * percentage. Driven entirely by CSS — server-rendered so it is present at first
 * paint rather than flashing in after hydration, `pointer-events-none` so it never
 * blocks interaction, and resolved instantly under `prefers-reduced-motion`.
 *
 * The rotating alternates in the content are deliberately not wired: randomising
 * per visit needs client JS, and a splash that flickers on hydration costs more than
 * the variety is worth.
 */
export function Boot() {
  return (
    <div data-boot aria-hidden="true">
      <p>
        <span>{loading.primary[0]}</span>
        <span>{loading.primary[1]}</span>
      </p>
    </div>
  );
}
