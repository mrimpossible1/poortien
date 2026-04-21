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
  caloriesPer20gProtein: number;
};

export type SortKey =
  | "name"
  | "proteinGrams"
  | "price"
  | "calories"
  | "pricePerGramProtein"
  | "pricePer20gProtein"
  | "caloriesPerGramProtein"
  | "caloriesPer20gProtein";

export type SortDir = "asc" | "desc";

/**
 * Protein efficiency thresholds (calories per 1g protein).
 * Fitness-oriented: lower = you can hit a protein target without blowing your calorie budget.
 *
 *  ≤ 7   : Lean — elite (whey, chicken breast, white fish, plain Greek yogurt)
 *  ≤ 10  : Balanced — still fine on a cut (most shakes, lean bars, cottage cheese)
 *  ≤ 15  : Heavy — full meals, calorie-dense (ground beef, whole eggs, most fast food)
 *  > 15  : Calorie bomb — getting protein here wastes your calorie budget
 */
export const LEAN_CAL_PER_G = 7;
export const BALANCED_CAL_PER_G = 10;
export const HEAVY_CAL_PER_G = 15;

/** Default cutoff used by the "Lean protein" preset (cal per 1g protein). */
export const LEAN_PRESET_MAX_CAL_PER_G = 8;
