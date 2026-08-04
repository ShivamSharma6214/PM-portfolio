"use client";

import { useState } from "react";
import { evidenceLegend, projectColumns, skillGroups } from "@/src/content/skills";
import type { Evidence, ProjectKey } from "@/src/content/types";

/** Every group is rendered against the same five columns, so this reads as one graphic. */
const COLUMNS: readonly ProjectKey[] = ["CH", "UIQ", "SH", "DZ", "CS"];
const GRID = `minmax(0,1fr) repeat(${COLUMNS.length}, 3.25rem)`;

function Mark({
  evidence,
  active = false,
}: {
  evidence: Evidence | undefined;
  active?: boolean;
}) {
  if (!evidence) {
    // Absence is the signal. A faint dot marks the cell without competing with it.
    return <span aria-hidden="true" className="block size-1 rounded-full bg-line-2/80" />;
  }

  if (evidence === "stated") {
    return (
      <span
        aria-hidden="true"
        className={`block size-[11px] rounded-[2px] transition-[background-color,transform,box-shadow] duration-300 ${
          active
            ? "scale-110 bg-accent shadow-[0_0_0_3px_var(--accent-tint-2)]"
            : "bg-accent/85"
        }`}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`block size-[11px] rounded-[2px] border transition-[border-color,transform] duration-300 ${
        active ? "scale-110 border-accent" : "border-line-2"
      }`}
    />
  );
}

/** Spoken form of a row, so the mapping is legible without sight of the marks. */
function rowSummary(cells: Partial<Record<ProjectKey, Evidence>>): string {
  const stated = COLUMNS.filter((key) => cells[key] === "stated").map(
    (key) => projectColumns[key].name,
  );
  const inferred = COLUMNS.filter((key) => cells[key] === "inferred").map(
    (key) => projectColumns[key].name,
  );
  const parts: string[] = [];
  if (stated.length) parts.push(`named in ${stated.join(", ")}`);
  if (inferred.length) {
    parts.push(`in my toolkit, not yet attributed for ${inferred.join(", ")}`);
  }
  return parts.join("; ") || "no project attribution yet";
}

export function SkillsMatrix() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [activeColumn, setActiveColumn] = useState<ProjectKey | null>(null);

  const activeRow = skillGroups
    .flatMap((group) => group.rows)
    .find((row) => row.skill === activeSkill);

  const columnLit = (key: ProjectKey) =>
    activeColumn === key || Boolean(activeRow?.cells[key]);
  const anyHover = Boolean(activeSkill || activeColumn);

  return (
    <div>
      {/* -------------------------------------------------------------- Matrix */}
      <div
        className="hidden md:block"
        onMouseLeave={() => {
          setActiveSkill(null);
          setActiveColumn(null);
        }}
      >
        {/* Column headers. Sticky, because the matrix is taller than a viewport. */}
        <div
          className="sticky top-[var(--header-h)] z-10 grid items-end gap-x-2 border-b border-line-2 bg-paper pb-2.5 pt-3"
          style={{ gridTemplateColumns: GRID }}
        >
          <span className="font-mono text-mono uppercase tracking-[0.14em] text-ink-4">
            Skill
          </span>
          {COLUMNS.map((key) => {
            const column = projectColumns[key];
            const lit = columnLit(key);
            return (
              <button
                key={key}
                type="button"
                onMouseEnter={() => setActiveColumn(key)}
                onFocus={() => setActiveColumn(key)}
                onBlur={() => setActiveColumn(null)}
                className="flex flex-col items-center gap-1.5 rounded px-1 pt-1"
                aria-label={`Highlight ${column.name}`}
              >
                <span
                  className={`font-mono text-mono uppercase tracking-[0.13em] transition-colors duration-300 ${
                    anyHover ? (lit ? "text-accent" : "text-ink-4/60") : "text-ink-2"
                  }`}
                >
                  {column.short}
                </span>
                <span
                  aria-hidden="true"
                  className={`h-px w-full transition-colors duration-300 ${
                    lit ? "bg-accent" : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Groups */}
        {skillGroups.map((group) => (
          <section key={group.name} aria-label={group.name}>
            <h4 className="mt-9 mb-1 font-mono text-mono uppercase tracking-[0.14em] text-ink-3">
              {group.name}
            </h4>
            <ul>
              {group.rows.map((row) => {
                const isActive = activeSkill === row.skill;
                const dim = anyHover && !isActive && !activeColumn;
                return (
                  <li key={row.skill}>
                    <div
                      onMouseEnter={() => setActiveSkill(row.skill)}
                      className={`grid items-center gap-x-2 rounded-[4px] border-b border-line/70 py-2.5 transition-colors duration-200 ${
                        isActive ? "bg-accent-tint" : ""
                      }`}
                      style={{ gridTemplateColumns: GRID }}
                    >
                      <span
                        className={`pl-2 pr-4 text-sm transition-colors duration-200 ${
                          isActive ? "text-ink" : dim ? "text-ink-3" : "text-ink-2"
                        }`}
                      >
                        {row.skill}
                        <span className="sr-only"> — {rowSummary(row.cells)}.</span>
                      </span>
                      {COLUMNS.map((key) => (
                        <span
                          key={key}
                          className="flex items-center justify-center transition-opacity duration-200"
                          style={{
                            opacity: activeColumn && activeColumn !== key ? 0.3 : 1,
                          }}
                        >
                          <Mark
                            evidence={row.cells[key]}
                            active={isActive || activeColumn === key}
                          />
                        </span>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
            {group.note ? (
              <p className="mt-4 max-w-[58ch] pl-2 text-xs text-ink-3">{group.note}</p>
            ) : null}
          </section>
        ))}
      </div>

      {/* ------------------------------------------------------- Compact, small screens */}
      <div className="md:hidden">
        {skillGroups.map((group) => (
          <section key={group.name} aria-label={group.name} className="mt-9 first:mt-0">
            <h4 className="mb-3 font-mono text-mono uppercase tracking-[0.14em] text-ink-3">
              {group.name}
            </h4>
            <ul className="ruled border-t border-line">
              {group.rows.map((row) => (
                <li key={row.skill} className="py-3.5">
                  <p className="text-sm text-ink">{row.skill}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {COLUMNS.filter((key) => row.cells[key]).map((key) => (
                      <li
                        key={key}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-mono uppercase tracking-[0.1em] ${
                          row.cells[key] === "stated"
                            ? "border-accent/25 bg-accent-tint text-accent"
                            : "border-line text-ink-3"
                        }`}
                      >
                        <Mark evidence={row.cells[key]} />
                        {projectColumns[key].short}
                      </li>
                    ))}
                    {COLUMNS.every((key) => !row.cells[key]) ? (
                      <li className="font-mono text-mono uppercase tracking-[0.1em] text-ink-4">
                        Not yet attributed
                      </li>
                    ) : null}
                  </ul>
                </li>
              ))}
            </ul>
            {group.note ? <p className="mt-4 text-xs text-ink-3">{group.note}</p> : null}
          </section>
        ))}
      </div>

      {/* -------------------------------------------------------------- Legend */}
      <div className="mt-10 border-t border-line pt-6">
        <dl className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
          {evidenceLegend.map((entry) => (
            <div key={entry.level} className="flex items-center gap-2.5">
              <dt className="flex size-4 items-center justify-center">
                <Mark evidence={entry.level as Evidence} />
              </dt>
              <dd className="font-mono text-mono uppercase tracking-[0.11em] text-ink-3">
                {entry.label}
              </dd>
            </div>
          ))}
          <div className="flex items-center gap-2.5">
            <span className="flex size-4 items-center justify-center">
              <Mark evidence={undefined} />
            </span>
            <span className="font-mono text-mono uppercase tracking-[0.11em] text-ink-3">
              Not used
            </span>
          </div>
        </dl>
        <p className="mt-4 font-mono text-mono uppercase tracking-[0.11em] text-ink-4">
          {COLUMNS.map(
            (key) => `${projectColumns[key].short} ${projectColumns[key].name}`,
          ).join("  ·  ")}
        </p>
      </div>
    </div>
  );
}
