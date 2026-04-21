import ProteinTable from "@/components/ProteinTable";
import SubmitForm from "@/components/SubmitForm";
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
            cheapest protein per gram · US only
          </span>
        </div>
        <p className="mt-3 text-[var(--color-muted)] max-w-2xl text-sm sm:text-base">
          Find the cheapest protein per gram across US grocery, convenience,
          and fast-food options. The two numbers that actually matter for
          hitting a protein target on a budget:{" "}
          <strong className="text-[var(--color-foreground)]">$/20g protein</strong>{" "}
          (dollar cost) and{" "}
          <strong className="text-[var(--color-foreground)]">cal/20g protein</strong>{" "}
          (calorie cost). Green = lean, orange = heavy, red = calorie bomb.
        </p>
      </header>

      <ProteinTable items={items} />

      <SubmitForm />

      <footer className="mt-16 pt-8 border-t border-[var(--color-border)] text-sm text-[var(--color-muted)]">
        <p>
          US products and pricing only. Prices and macros change — double-check
          at the store. To add a product, edit{" "}
          <code className="px-1.5 py-0.5 rounded bg-[var(--color-card-hover)] text-[var(--color-foreground)] border border-[var(--color-border)]">
            src/data/proteins.ts
          </code>
          .
        </p>
      </footer>
    </div>
  );
}
