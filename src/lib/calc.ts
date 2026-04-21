import type { Protein, ProteinWithDerived } from "./types";

export function withDerived(p: Protein): ProteinWithDerived {
  const pricePerGramProtein = p.proteinGrams > 0 ? p.price / p.proteinGrams : 0;
  const pricePer20gProtein = pricePerGramProtein * 20;
  const caloriesPerGramProtein = p.proteinGrams > 0 ? p.calories / p.proteinGrams : 0;
  const caloriesPer20gProtein = caloriesPerGramProtein * 20;
  // Per-serving is display-only. Fall back to 1 so we never divide by zero.
  const servings = p.servings > 0 ? p.servings : 1;
  const proteinPerServing = p.proteinGrams / servings;
  const pricePerServing = p.price / servings;
  const caloriesPerServing = p.calories / servings;
  return {
    ...p,
    pricePerGramProtein,
    pricePer20gProtein,
    caloriesPerGramProtein,
    caloriesPer20gProtein,
    proteinPerServing,
    pricePerServing,
    caloriesPerServing,
  };
}

export function formatUSD(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPricePerGram(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}

export function formatNumber(n: number, digits = 0): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
