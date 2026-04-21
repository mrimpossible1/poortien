"use client";

import { useMemo, useState } from "react";
import type {
  ProteinCategory,
  ProteinType,
  ProteinWithDerived,
  SortDir,
  SortKey,
} from "@/lib/types";
import {
  PROTEIN_CATEGORY_LABELS,
  PROTEIN_TYPE_LABELS,
} from "@/lib/types";
import {
  formatNumber,
  formatPricePerGram,
  formatUSD,
} from "@/lib/calc";

type Props = {
  items: ProteinWithDerived[];
};

type Column = {
  key: SortKey;
  label: string;
  numeric: boolean;
};

const COLUMNS: Column[] = [
  { key: "name", label: "Product", numeric: false },
  { key: "proteinGrams", label: "Protein (g)", numeric: true },
  { key: "price", label: "Price", numeric: true },
  { key: "pricePerGramProtein", label: "$/g protein", numeric: true },
  { key: "pricePer20gProtein", label: "$/20g protein", numeric: true },
  { key: "calories", label: "Calories", numeric: true },
  { key: "caloriesPerGramProtein", label: "cal/g protein", numeric: true },
];

const TYPE_ORDER: ProteinType[] = ["grocery", "convenience", "fast-food"];

// Light-mode tints built on the 4-color palette (navy / red / orange / yellow)
const TYPE_STYLES: Record<ProteinType, string> = {
  grocery:
    "bg-[#003049]/10 text-[#003049] border-[#003049]/30",
  convenience:
    "bg-[#F77F00]/12 text-[#B55F00] border-[#F77F00]/40",
  "fast-food":
    "bg-[#D62828]/10 text-[#A31F1F] border-[#D62828]/35",
};

const CATEGORY_ORDER: ProteinCategory[] = [
  "drink",
  "yogurt",
  "snack",
  "whey",
  "meal",
];

const CATEGORY_STYLES: Record<ProteinCategory, string> = {
  drink: "bg-[#003049]/10 text-[#003049] border-[#003049]/30",
  yogurt: "bg-[#FCBF49]/30 text-[#7A5A00] border-[#FCBF49]/60",
  snack: "bg-[#D62828]/10 text-[#A31F1F] border-[#D62828]/35",
  whey: "bg-[#F77F00]/12 text-[#B55F00] border-[#F77F00]/40",
  meal: "bg-[#001F30]/8 text-[#001F30] border-[#001F30]/25",
};

type Preset = {
  id: string;
  label: string;
  types?: ProteinType[];
  categories?: ProteinCategory[];
  sortKey?: SortKey;
  sortDir?: SortDir;
};

// Quick-filter presets — one click resets filters + sort to a useful slice
const PRESETS: Preset[] = [
  {
    id: "cheapest",
    label: "Cheapest $/20g",
    sortKey: "pricePer20gProtein",
    sortDir: "asc",
  },
  { id: "drinks", label: "Drinks", categories: ["drink"] },
  { id: "whey", label: "Whey powder", categories: ["whey"] },
  { id: "yogurt", label: "Yogurt", categories: ["yogurt"] },
  { id: "snacks", label: "Snacks", categories: ["snack"] },
  { id: "fast-food", label: "Fast food", types: ["fast-food"] },
  { id: "on-the-go", label: "On the go", types: ["convenience"] },
  { id: "bulk", label: "Bulk / grocery", types: ["grocery"] },
];

export default function ProteinTable({ items }: Props) {
  const [query, setQuery] = useState("");
  const [activeTypes, setActiveTypes] = useState<Set<ProteinType>>(
    () => new Set(TYPE_ORDER)
  );
  const [activeCategories, setActiveCategories] = useState<Set<ProteinCategory>>(
    () => new Set(CATEGORY_ORDER)
  );
  const [sortKey, setSortKey] = useState<SortKey>("pricePer20gProtein");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const filteredSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = items.filter((i) => {
      if (!activeTypes.has(i.type)) return false;
      if (!activeCategories.has(i.category)) return false;
      if (q) {
        const hay = `${i.name} ${i.variant}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      const as = String(av).toLowerCase();
      const bs = String(bv).toLowerCase();
      if (as < bs) return sortDir === "asc" ? -1 : 1;
      if (as > bs) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [items, query, activeTypes, activeCategories, sortKey, sortDir]);

  // Best value = lowest $/g protein WITHIN the currently visible set
  const bestId = useMemo(() => {
    if (filteredSorted.length === 0) return null;
    return filteredSorted.reduce((best, cur) =>
      cur.pricePerGramProtein < best.pricePerGramProtein ? cur : best
    ).id;
  }, [filteredSorted]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function toggleType(type: ProteinType) {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        if (next.size > 1) next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  }

  function toggleCategory(cat: ProteinCategory) {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  }

  function applyPreset(preset: Preset) {
    setActiveTypes(new Set(preset.types ?? TYPE_ORDER));
    setActiveCategories(new Set(preset.categories ?? CATEGORY_ORDER));
    setSortKey(preset.sortKey ?? "pricePer20gProtein");
    setSortDir(preset.sortDir ?? "asc");
    setQuery("");
  }

  function resetAll() {
    setActiveTypes(new Set(TYPE_ORDER));
    setActiveCategories(new Set(CATEGORY_ORDER));
    setSortKey("pricePer20gProtein");
    setSortDir("asc");
    setQuery("");
  }

  const typeCounts = useMemo(() => {
    const counts: Record<ProteinType, number> = {
      grocery: 0,
      convenience: 0,
      "fast-food": 0,
    };
    for (const i of items) counts[i.type]++;
    return counts;
  }, [items]);

  const categoryCounts = useMemo(() => {
    const counts: Record<ProteinCategory, number> = {
      drink: 0,
      yogurt: 0,
      snack: 0,
      whey: 0,
      meal: 0,
    };
    for (const i of items) counts[i.category]++;
    return counts;
  }, [items]);

  // Detect if current state matches a preset exactly so we can highlight it
  const activePresetId = useMemo(() => {
    for (const p of PRESETS) {
      const expectedTypes = new Set(p.types ?? TYPE_ORDER);
      const expectedCats = new Set(p.categories ?? CATEGORY_ORDER);
      if (
        setEquals(expectedTypes, activeTypes) &&
        setEquals(expectedCats, activeCategories) &&
        (p.sortKey ?? "pricePer20gProtein") === sortKey &&
        (p.sortDir ?? "asc") === sortDir &&
        query.trim() === ""
      ) {
        return p.id;
      }
    }
    return null;
  }, [activeTypes, activeCategories, sortKey, sortDir, query]);

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <input
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:max-w-sm px-4 py-2.5 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition"
        />
        <div className="text-sm text-[var(--color-muted)]">
          {filteredSorted.length} of {items.length}{" "}
          {items.length === 1 ? "product" : "products"}
        </div>
      </div>

      {/* Quick presets */}
      <div className="mb-4">
        <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1.5">
          Quick filter
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => {
            const active = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`px-3 py-1.5 rounded-full text-sm border font-medium transition ${
                  active
                    ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                    : "bg-[var(--color-card)] text-[var(--color-foreground)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                }`}
                aria-pressed={active}
              >
                {preset.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={resetAll}
            className="px-3 py-1.5 rounded-full text-sm border border-dashed border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:border-[var(--color-muted)] transition"
          >
            Show all
          </button>
        </div>
      </div>

      <div className="mb-2">
        <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1.5">
          Where
        </div>
        <div className="flex flex-wrap gap-2">
          {TYPE_ORDER.map((type) => {
            const active = activeTypes.has(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${
                  active
                    ? TYPE_STYLES[type]
                    : "bg-transparent text-[var(--color-muted)] border-[var(--color-border)] hover:text-[var(--color-foreground)]"
                }`}
                aria-pressed={active}
              >
                {PROTEIN_TYPE_LABELS[type]}{" "}
                <span className="opacity-70">({typeCounts[type]})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-5 mt-3">
        <div className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] mb-1.5">
          What
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_ORDER.map((cat) => {
            const active = activeCategories.has(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${
                  active
                    ? CATEGORY_STYLES[cat]
                    : "bg-transparent text-[var(--color-muted)] border-[var(--color-border)] hover:text-[var(--color-foreground)]"
                }`}
                aria-pressed={active}
              >
                {PROTEIN_CATEGORY_LABELS[cat]}{" "}
                <span className="opacity-70">({categoryCounts[cat]})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-[var(--color-border)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-card)] text-[var(--color-muted)]">
            <tr>
              {COLUMNS.map((col) => {
                const isActive = sortKey === col.key;
                const arrow = isActive ? (sortDir === "asc" ? "↑" : "↓") : "";
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={`px-4 py-3 font-medium whitespace-nowrap ${
                      col.numeric ? "text-right" : "text-left"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className={`inline-flex items-center gap-1 hover:text-[var(--color-foreground)] transition whitespace-nowrap ${
                        isActive ? "text-[var(--color-foreground)]" : ""
                      } ${col.numeric ? "flex-row-reverse" : ""}`}
                    >
                      <span>{col.label}</span>
                      <span className="text-xs w-3">{arrow}</span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredSorted.map((p) => {
              const isBest = p.id === bestId;
              return (
                <tr
                  key={p.id}
                  className={`border-t border-[var(--color-border)] transition ${
                    isBest
                      ? "bg-[var(--color-accent-dim)]"
                      : "hover:bg-[var(--color-card-hover)]"
                  }`}
                >
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="font-semibold text-[var(--color-foreground)]">
                          {p.name}
                        </span>
                        {isBest && (
                          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--color-accent)] text-white font-semibold">
                            Best
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[var(--color-muted)]">
                        {p.variant}
                      </div>
                      <div className="flex items-center flex-wrap gap-1.5 mt-0.5">
                        <TypePill type={p.type} />
                        <CategoryPill category={p.category} />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums align-top">
                    {formatNumber(p.proteinGrams)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums align-top">
                    {formatUSD(p.price)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-semibold align-top">
                    {formatPricePerGram(p.pricePerGramProtein)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-semibold align-top">
                    {formatUSD(p.pricePer20gProtein)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-[var(--color-muted)] align-top">
                    {formatNumber(p.calories)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-[var(--color-muted)] align-top">
                    {formatNumber(p.caloriesPerGramProtein, 1)}
                  </td>
                </tr>
              );
            })}
            {filteredSorted.length === 0 && (
              <tr>
                <td
                  colSpan={COLUMNS.length}
                  className="px-4 py-8 text-center text-[var(--color-muted)]"
                >
                  No products match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile sort control */}
      <div className="sm:hidden mb-3 flex items-center gap-2">
        <label
          htmlFor="mobile-sort"
          className="text-sm text-[var(--color-muted)]"
        >
          Sort by
        </label>
        <select
          id="mobile-sort"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="flex-1 px-3 py-2 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] text-[var(--color-foreground)] text-sm focus:outline-none focus:border-[var(--color-accent)]"
        >
          {COLUMNS.map((col) => (
            <option key={col.key} value={col.key}>
              {col.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
          className="px-3 py-2 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] text-sm"
          aria-label="Toggle sort direction"
        >
          {sortDir === "asc" ? "↑" : "↓"}
        </button>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {filteredSorted.map((p) => {
          const isBest = p.id === bestId;
          return (
            <div
              key={p.id}
              className={`rounded-xl border p-4 ${
                isBest
                  ? "border-[var(--color-accent)] bg-[var(--color-accent-dim)]"
                  : "border-[var(--color-border)] bg-[var(--color-card)]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-[var(--color-muted)] mt-0.5">
                    {p.variant}
                  </div>
                </div>
                {isBest && (
                  <span className="shrink-0 text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--color-accent)] text-white font-semibold">
                    Best
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <TypePill type={p.type} />
                <CategoryPill category={p.category} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <Stat
                  label="$/g protein"
                  value={formatPricePerGram(p.pricePerGramProtein)}
                  emphasize
                />
                <Stat
                  label="$/20g protein"
                  value={formatUSD(p.pricePer20gProtein)}
                  emphasize
                />
                <Stat label="Price" value={formatUSD(p.price)} />
                <Stat
                  label="Protein"
                  value={`${formatNumber(p.proteinGrams)} g`}
                />
                <Stat label="Calories" value={formatNumber(p.calories)} />
                <Stat
                  label="cal/g protein"
                  value={formatNumber(p.caloriesPerGramProtein, 1)}
                />
              </div>
            </div>
          );
        })}
        {filteredSorted.length === 0 && (
          <div className="text-center text-[var(--color-muted)] py-8">
            No products match your filters.
          </div>
        )}
      </div>
    </div>
  );
}

function setEquals<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

function TypePill({ type }: { type: ProteinType }) {
  return (
    <span
      className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${TYPE_STYLES[type]}`}
    >
      {PROTEIN_TYPE_LABELS[type]}
    </span>
  );
}

function CategoryPill({ category }: { category: ProteinCategory }) {
  return (
    <span
      className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${CATEGORY_STYLES[category]}`}
    >
      {PROTEIN_CATEGORY_LABELS[category]}
    </span>
  );
}

function Stat({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div>
      <div className="text-[var(--color-muted)] text-xs uppercase tracking-wider">
        {label}
      </div>
      <div
        className={`tabular-nums ${
          emphasize ? "font-semibold text-base" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}
