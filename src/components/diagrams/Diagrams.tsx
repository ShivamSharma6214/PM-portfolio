import type { ArchitectureLayer, FlowNode } from "@/src/content/types";

/**
 * Diagrams.
 *
 * No screenshots exist yet, and a stock dashboard would be worse than nothing. So the
 * imagery on this site is drawn from the architecture the case studies already
 * describe: boxes and arrows, one accent, generous whitespace, no service-icon
 * clutter. Precision-drawn rather than faux-sketch — an exact line reads truer to this
 * voice than a simulated hand.
 *
 * Nodes are sized to their content, never stretched to the container. A column of
 * full-width rounded rectangles reads as a form; a column of fitted boxes joined by
 * arrows reads as a system.
 */

function Node({
  node,
  emphasis = false,
  compact = false,
}: {
  node: FlowNode;
  emphasis?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`w-fit max-w-full rounded-[6px] border ${
        emphasis ? "border-accent/40 bg-accent-tint" : "border-line-2 bg-paper"
      } ${compact ? "px-3 py-2" : "px-4 py-2.5"}`}
    >
      <p
        className={`font-mono uppercase tracking-[0.11em] ${
          emphasis ? "text-accent" : "text-ink"
        } ${compact ? "text-mono" : "text-mono-lg"}`}
      >
        {node.label}
      </p>
      {node.detail && !compact ? (
        <p className="mt-1 text-xs leading-snug text-ink-3">{node.detail}</p>
      ) : null}
    </div>
  );
}

/** A hairline with a solid arrowhead. The only glyph in the diagrams. */
function Connector({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-col items-center ${compact ? "py-1 pl-4" : "py-1.5 pl-5"}`}
    >
      <span className={`block w-px bg-line-2 ${compact ? "h-3.5" : "h-5"}`} />
      <svg viewBox="0 0 8 6" width="8" height="6" className="text-line-2">
        <path d="M0 0 L4 6 L8 0 Z" fill="currentColor" />
      </svg>
    </div>
  );
}

/* ==========================================================================
   FlowDiagram — a linear pipeline, read top to bottom.
   ========================================================================== */

export function FlowDiagram({
  nodes,
  label,
  compact = false,
  emphasisIndex,
}: {
  nodes: readonly FlowNode[];
  label: string;
  compact?: boolean;
  emphasisIndex?: number;
}) {
  return (
    <figure className="w-full">
      <div
        role="img"
        aria-label={`${label}: ${nodes.map((node) => node.label).join(", then ")}.`}
        className="flex flex-col items-start"
      >
        {nodes.map((node, index) => (
          <div key={node.label} className="flex w-full flex-col items-start">
            <Node node={node} compact={compact} emphasis={emphasisIndex === index} />
            {index < nodes.length - 1 ? <Connector compact={compact} /> : null}
          </div>
        ))}
      </div>
      <figcaption className="mt-5 font-mono text-mono uppercase tracking-[0.13em] text-ink-4">
        {label}
      </figcaption>
    </figure>
  );
}

/* ==========================================================================
   BranchDiagram — ServiceHub. One entry point that resolves into two experiences,
   with operations deliberately detached. The shape is the architectural argument.
   ========================================================================== */

export function BranchDiagram({
  nodes,
  label,
  compact = false,
}: {
  nodes: readonly FlowNode[];
  label: string;
  compact?: boolean;
}) {
  if (nodes.length < 5) {
    return <FlowDiagram nodes={nodes} label={label} compact={compact} />;
  }
  const [auth, role, customer, provider, admin] = nodes;

  return (
    <figure className="w-full">
      <div
        role="img"
        aria-label={`${label}: ${auth.label}, then ${role.label}, which resolves to either ${customer.label} or ${provider.label}. ${admin.label} sits outside the application.`}
        className="flex flex-col items-start"
      >
        <Node node={auth} compact={compact} />
        <Connector compact={compact} />
        <Node node={role} compact={compact} emphasis />

        {/* Bracket into two experiences. Both branches are single-line nodes of equal
            height, so a spine drawn to 75% lands on the second node's centre. */}
        <div className="relative flex flex-col items-start gap-2 pl-9 pt-3">
          <span
            aria-hidden="true"
            className="absolute left-[1.3rem] top-0 h-[calc(75%+0.75rem)] w-px bg-line-2"
          />
          {[customer, provider].map((node) => (
            <div key={node.label} className="relative">
              <span
                aria-hidden="true"
                className="absolute left-[-0.9rem] top-1/2 h-px w-[0.9rem] bg-line-2"
              />
              <Node node={node} compact={compact} />
            </div>
          ))}
        </div>

        {/* Operations, detached — a different release cadence, drawn as one. */}
        <div className="mt-5 w-full border-t border-dashed border-line pt-5">
          <div
            className={`w-fit max-w-full rounded-[6px] border border-dashed border-line-2 bg-inset ${
              compact ? "px-3 py-2" : "px-4 py-2.5"
            }`}
          >
            <p
              className={`font-mono uppercase tracking-[0.11em] text-ink-2 ${
                compact ? "text-mono" : "text-mono-lg"
              }`}
            >
              {admin.label}
            </p>
            {admin.detail && !compact ? (
              <p className="mt-1 text-xs leading-snug text-ink-3">{admin.detail}</p>
            ) : null}
          </div>
        </div>
      </div>
      <figcaption className="mt-5 font-mono text-mono uppercase tracking-[0.13em] text-ink-4">
        {label}
      </figcaption>
    </figure>
  );
}

/* ==========================================================================
   LayerStack — the architecture section of a case study. Numbered layers, hairline
   separated, the layer name in sans and the reasoning at reading size.
   ========================================================================== */

export function LayerStack({ layers }: { layers: readonly ArchitectureLayer[] }) {
  return (
    <ol className="ruled border-t border-line">
      {layers.map((layer, index) => (
        <li key={layer.name} className="grid gap-x-8 gap-y-2 py-6 lg:grid-cols-12">
          <div className="flex items-baseline gap-4 lg:col-span-5">
            <span
              aria-hidden="true"
              className="num font-mono text-mono tracking-[0.13em] text-ink-4"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h4 className="text-h4 font-medium text-ink">{layer.name}</h4>
          </div>
          <p className="text-base text-ink-2 lg:col-span-7">{layer.body}</p>
        </li>
      ))}
    </ol>
  );
}
