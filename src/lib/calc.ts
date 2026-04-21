import type { Protein, ProteinWithDerived } from "./types";

export function withDerived(p: Protein): ProteinWithDerived {
  const pricePerGramProtein = p.proteinGrams > 0 ? p.price / p.proteinGrams : 0;
  const pricePer20gProtein = pricePerGramProtein * 20;
  const caloriesPerGramProtein = p.proteinGrams > 0 ? p.calories / p.proteinGrams : 0;
  return {
    ...p,
    pricePerGramProtein,
    pricePer20gProtein,
    caloriesPerGramProtein,
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
