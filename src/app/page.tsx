import ProteinTable from "@/components/ProteinTable";
import { proteins } from "@/data/proteins";
import { withDerived } from "@/lib/calc";

export default function Home() {
  const items = proteins.map(withDerived);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <header className="mb-8 sm:mb-12">
        <div className="flex items-baseline gap-3">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            poortien
          </h1>
          <span className="text-sm sm:text-base text-[var(--color-muted)]">
            best price per gram of protein
          </span>
        </div>
        <p className="mt-3 text-[var(--color-muted)] max-w-2xl text-sm sm:text-base">
          A simple, sortable list of protein products. Compare total price,
          grams of protein, total calories, and the one number that matters
          most: <strong className="text-[var(--color-foreground)]">$/g protein</strong>.
        </p>
      </header>

      <ProteinTable items={items} />

      <footer className="mt-16 pt-8 border-t border-[var(--color-border)] text-sm text-[var(--color-muted)]">
        <p>
          Prices and macros change. Double-check at the store. To add a
          product, edit <code className="px-1.5 py-0.5 rounded bg-[var(--color-card-hover)] text-[var(--color-foreground)] border border-[var(--color-border)]">src/data/proteins.ts</code>.
        </p>
      </footer>
    </div>
  );
}
