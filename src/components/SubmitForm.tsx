"use client";

import { useState } from "react";
import type { ProteinCategory, ProteinType } from "@/lib/types";
import {
  PROTEIN_CATEGORY_LABELS,
  PROTEIN_TYPE_LABELS,
} from "@/lib/types";

const TYPE_OPTIONS: ProteinType[] = ["grocery", "convenience", "fast-food"];
const CATEGORY_OPTIONS: ProteinCategory[] = [
  "drink",
  "yogurt",
  "snack",
  "whey",
  "meal",
];

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

/**
 * Netlify Forms submits via a standard URL-encoded POST to "/".
 * The hidden form in public/__forms.html registers the form name at deploy.
 */
function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");
}

export default function SubmitForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot: if filled, silently succeed and drop.
    if (formData.get("bot-field")) {
      setState({ status: "success" });
      form.reset();
      return;
    }

    const payload: Record<string, string> = {
      "form-name": "submit-protein",
    };
    formData.forEach((value, key) => {
      payload[key] = String(value ?? "");
    });

    setState({ status: "submitting" });
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });
      if (!res.ok) {
        throw new Error(`Netlify returned ${res.status}`);
      }
      setState({ status: "success" });
      form.reset();
    } catch (err) {
      setState({
        status: "error",
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong submitting the form.",
      });
    }
  }

  return (
    <section className="mt-12 pt-8 border-t border-[var(--color-border)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-baseline gap-3 text-left w-full group"
        aria-expanded={open}
      >
        <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition">
          Submit a product for consideration
        </h2>
        <span className="text-sm text-[var(--color-muted)]">
          {open ? "hide" : "show"}
        </span>
      </button>
      <p className="mt-1 text-sm text-[var(--color-muted)] max-w-2xl">
        Know a protein product we&apos;re missing? Send it over. Review
        usually takes a day or two.
      </p>

      {open && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 lg:gap-8 items-start">
          {/* Criteria — shown alongside form so submitters self-filter */}
          <aside className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-4 text-sm">
            <h3 className="font-semibold text-[var(--color-foreground)] mb-2">
              What we add
            </h3>
            <ul className="space-y-1.5 text-[var(--color-muted)] list-disc list-inside marker:text-[var(--color-accent)]">
              <li>
                <span className="text-[var(--color-foreground)]">
                  US-available
                </span>{" "}
                at a major retailer or chain
              </li>
              <li>
                <span className="text-[var(--color-foreground)]">
                  Verifiable source
                </span>{" "}
                — link to nutrition + price
              </li>
              <li>
                <span className="text-[var(--color-foreground)]">
                  Protein-oriented
                </span>{" "}
                — marketed for protein, or genuinely protein-dense whole food
              </li>
              <li>
                <span className="text-[var(--color-foreground)]">
                  Not a duplicate
                </span>{" "}
                — check the list first
              </li>
            </ul>
            <h3 className="font-semibold text-[var(--color-foreground)] mt-4 mb-2">
              What we skip
            </h3>
            <ul className="space-y-1.5 text-[var(--color-muted)] list-disc list-inside marker:text-[#D62828]">
              <li>Canada / UK / EU-only SKUs</li>
              <li>Niche DTC-only brands</li>
              <li>Token protein (candy with 6g, etc.)</li>
            </ul>
          </aside>

          {/* Form */}
          <div>
            {state.status === "success" ? (
              <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 text-sm">
                <div className="font-semibold text-[var(--color-foreground)] mb-1">
                  Got it — thanks.
                </div>
                <p className="text-[var(--color-muted)]">
                  If it passes the criteria above, it&apos;ll show up in the
                  list within a day or two.
                </p>
                <button
                  type="button"
                  onClick={() => setState({ status: "idle" })}
                  className="mt-4 text-sm text-[var(--color-accent)] hover:underline"
                >
                  Submit another
                </button>
              </div>
            ) : (
              <form
                name="submit-protein"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <input type="hidden" name="form-name" value="submit-protein" />
                {/* Honeypot — visually hidden, bots fill it, humans don't */}
                <p className="hidden">
                  <label>
                    Don&apos;t fill this out:{" "}
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <Field
                  label="Product"
                  hint="Brand + flavor/size — e.g. Fairlife Core Power Vanilla 14oz"
                  className="sm:col-span-2"
                >
                  <input
                    name="product"
                    type="text"
                    required
                    maxLength={200}
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="Where to buy"
                  hint="Costco, 7-Eleven, Chick-fil-A, etc."
                >
                  <input
                    name="store"
                    type="text"
                    required
                    maxLength={100}
                    className={inputClass}
                  />
                </Field>

                <Field label="Source link" hint="URL to nutrition + price">
                  <input
                    name="source"
                    type="url"
                    required
                    placeholder="https://..."
                    className={inputClass}
                  />
                </Field>

                <Field label="Protein (g, total)">
                  <input
                    name="protein"
                    type="number"
                    required
                    min={0}
                    step="0.1"
                    className={inputClass}
                  />
                </Field>

                <Field label="Price (USD, total)">
                  <input
                    name="price"
                    type="number"
                    required
                    min={0}
                    step="0.01"
                    className={inputClass}
                  />
                </Field>

                <Field label="Calories (total)">
                  <input
                    name="calories"
                    type="number"
                    required
                    min={0}
                    step="1"
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="Servings per package"
                  hint="12-pack = 12, 1 lb raw meat ≈ 4, single item = 1"
                >
                  <input
                    name="servings"
                    type="number"
                    required
                    min={1}
                    step="1"
                    defaultValue={1}
                    className={inputClass}
                  />
                </Field>

                <Field label="Type" hint="optional — we'll assign if blank">
                  <select name="type" defaultValue="" className={inputClass}>
                    <option value="">—</option>
                    {TYPE_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {PROTEIN_TYPE_LABELS[t]}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Category" hint="optional">
                  <select
                    name="category"
                    defaultValue=""
                    className={inputClass}
                  >
                    <option value="">—</option>
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {PROTEIN_CATEGORY_LABELS[c]}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Your email"
                  hint="optional — only if you want a reply"
                  className="sm:col-span-2"
                >
                  <input
                    name="email"
                    type="email"
                    maxLength={200}
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="Notes"
                  hint="optional — anything we should know"
                  className="sm:col-span-2"
                >
                  <textarea
                    name="notes"
                    rows={3}
                    maxLength={1000}
                    className={`${inputClass} resize-y`}
                  />
                </Field>

                <div className="sm:col-span-2 flex items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={state.status === "submitting"}
                    className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state.status === "submitting"
                      ? "Submitting..."
                      : "Submit"}
                  </button>
                  {state.status === "error" && (
                    <span className="text-sm text-[#D62828]">
                      {state.message} — try again?
                    </span>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

const inputClass =
  "w-full px-3 py-2 rounded-md bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition text-sm";

function Field({
  label,
  hint,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="text-xs font-medium text-[var(--color-foreground)] uppercase tracking-wider">
        {label}
      </span>
      {children}
      {hint && (
        <span className="text-xs text-[var(--color-muted)]">{hint}</span>
      )}
    </label>
  );
}
