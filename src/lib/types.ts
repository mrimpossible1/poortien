export type ProteinType = "grocery" | "fast-food" | "convenience";

export const PROTEIN_TYPE_LABELS: Record<ProteinType, string> = {
  grocery: "Grocery",
  "fast-food": "Fast food",
  convenience: "Convenience",
};

export type ProteinCategory =
  | "drink"
  | "yogurt"
  | "snack"
  | "whey"
  | "meal";

export const PROTEIN_CATEGORY_LABELS: Record<ProteinCategory, string> = {
  drink: "Drink",
  yogurt: "Yogurt",
  snack: "Snack",
  whey: "Whey",
  meal: "Meal",
};

export type Protein = {
  id: string;
  /** Main product / brand / family, e.g. "Oikos Pro" */
  name: string;
  /** Flavor, size, pack info, e.g. "Vanilla · 4-pack · 5.3oz cups" */
  variant: string;
  type: ProteinType;
  category: ProteinCategory;
  proteinGrams: number;
  price: number;
  calories: number;
};

export type ProteinWithDerived = Protein & {
  pricePerGramProtein: number;
  pricePer20gProtein: number;
  caloriesPerGramProtein: number;
};

export type SortKey =
  | "name"
  | "proteinGrams"
  | "price"
  | "calories"
  | "pricePerGramProtein"
  | "pricePer20gProtein"
  | "caloriesPerGramProtein";

export type SortDir = "asc" | "desc";
