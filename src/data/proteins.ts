import type { Protein } from "@/lib/types";

/**
 * The "database": edit this file to add or update products, then commit + push.
 * Netlify rebuilds automatically.
 *
 * Fields:
 *  - name: product name (include brand + flavor + size for clarity)
 *  - type: where you buy it — "grocery" | "fast-food" | "convenience"
 *  - category: what it is — "drink" | "yogurt" | "snack" | "whey" | "meal"
 *  - proteinGrams: TOTAL grams of protein in the package/item
 *  - price: TOTAL USD price of the package/item
 *  - calories: TOTAL calories in the package/item
 *
 * $/g protein, $/20g protein, and cal/g protein are calculated automatically.
 */
export const proteins: Protein[] = [
  // ============================================================
  // GROCERY - multi-pack / bulk purchases
  // ============================================================

  // Yogurt cups (multi-pack)
  {
    id: "oikos-pro-vanilla-4pk",
    name: "Oikos Pro Vanilla (4-pack, 5.3oz cups)",
    type: "grocery",
    category: "yogurt",
    proteinGrams: 80, // 4 x 20g
    price: 5.99,
    calories: 560, // 4 x 140
  },
  {
    id: "oikos-triple-zero-vanilla-4pk",
    name: "Oikos Triple Zero Vanilla (4-pack, 5.3oz cups)",
    type: "grocery",
    category: "yogurt",
    proteinGrams: 60, // 4 x 15g
    price: 4.99,
    calories: 480, // 4 x 120
  },
  {
    id: "chobani-fit-vanilla-4pk",
    name: "Chobani Fit Greek Yogurt Vanilla (4-pack, 5.3oz)",
    type: "grocery",
    category: "yogurt",
    proteinGrams: 56, // 4 x 14g
    price: 4.99,
    calories: 480, // 4 x 120
  },
  {
    id: "oikos-triple-zero-plain-32oz-tub",
    name: "Oikos Triple Zero Plain Greek Yogurt (32oz tub)",
    type: "grocery",
    category: "yogurt",
    proteinGrams: 90, // 5 servings x 18g
    price: 6.99,
    calories: 500, // 5 x 100
  },

  // Drinkable yogurt / shakes (multi-pack)
  {
    id: "oikos-pro-drink-23g-8pk",
    name: "Oikos Pro 23g Drink, Strawberry Banana (8-pack, 7oz bottles)",
    type: "grocery",
    category: "drink",
    proteinGrams: 184, // 8 x 23g
    price: 15.99, // ~$2.00/bottle in 8pk
    calories: 1120, // 8 x 140
  },
  {
    id: "oikos-protein-shake-30g-4pk",
    name: "Oikos Protein Shake 30g, Vanilla (4-pack, 12oz bottles)",
    type: "grocery",
    category: "drink",
    proteinGrams: 120, // 4 x 30g
    price: 10.99,
    calories: 680, // 4 x 170
  },
  {
    id: "fairlife-core-power-26g-12pk",
    name: "Fairlife Core Power 26g Vanilla (12-pack, 14oz bottles)",
    type: "grocery",
    category: "drink",
    proteinGrams: 312, // 12 x 26g
    price: 36.99,
    calories: 2160, // 12 x 180
  },
  {
    id: "fairlife-core-power-elite-42g-12pk",
    name: "Fairlife Core Power Elite 42g Vanilla (12-pack, 14oz bottles)",
    type: "grocery",
    category: "drink",
    proteinGrams: 504, // 12 x 42g
    price: 64.8,
    calories: 2760, // 12 x 230
  },
  {
    id: "fairlife-nutrition-plan-30g-18pk-costco",
    name: "Fairlife Nutrition Plan 30g Chocolate, Costco (18-pack, 11.5oz bottles)",
    type: "grocery",
    category: "drink",
    proteinGrams: 540, // 18 x 30g
    price: 27.99, // typical Costco price
    calories: 2700, // 18 x 150
  },
  {
    id: "premier-protein-shake-chocolate-12pk",
    name: "Premier Protein Shake Chocolate (12-pack, 11oz bottles)",
    type: "grocery",
    category: "drink",
    proteinGrams: 360, // 12 x 30g
    price: 24.99,
    calories: 1800, // 12 x 150
  },
  {
    id: "jocko-molk-shake-chocolate-12pk",
    name: "Jocko Mölk Protein Shake, Chocolate (12-pack, 12oz bottles)",
    type: "grocery",
    category: "drink",
    proteinGrams: 360, // 12 x 30g
    price: 44.99,
    calories: 2160, // 12 x 180
  },

  // Whey powder (tubs)
  {
    id: "on-gold-standard-whey-vanilla-5lb",
    name: "Optimum Nutrition Gold Standard Whey, Vanilla (5 lb tub)",
    type: "grocery",
    category: "whey",
    proteinGrams: 1680, // 70 servings x 24g
    price: 79.99,
    calories: 8400, // 70 x 120
  },
  {
    id: "costco-kirkland-whey-vanilla-6lb",
    name: "Kirkland Signature Whey Protein, Vanilla, Costco (6 lb tub)",
    type: "grocery",
    category: "whey",
    proteinGrams: 2400, // 100 servings x 24g
    price: 59.99,
    calories: 12000, // 100 x 120
  },
  {
    id: "jocko-molk-whey-chocolate-2-3lb",
    name: "Jocko Mölk Whey Protein Powder, Chocolate (2.3 lb tub)",
    type: "grocery",
    category: "whey",
    proteinGrams: 660, // 30 servings x 22g
    price: 42.99,
    calories: 3300, // 30 x 110
  },
  {
    id: "promix-whey-isolate-2-5lb",
    name: "Promix Whey Isolate, Dutch Chocolate (2.5 lb bag)",
    type: "grocery",
    category: "whey",
    proteinGrams: 780, // 26 servings x 30g
    price: 68.0,
    calories: 4160, // 26 x 160
  },
  {
    id: "teras-whey-simply-pure-12oz",
    name: "Tera's Whey Simply Pure, Dark Chocolate (12 oz bag, grass-fed)",
    type: "grocery",
    category: "whey",
    proteinGrams: 240, // 12 servings x 20g
    price: 22.99,
    calories: 1320, // 12 x 110
  },

  // Bars, puffs, meat sticks (multi-pack)
  {
    id: "quest-protein-bar-choc-chip-cookie-12pk",
    name: "Quest Protein Bar, Choc Chip Cookie Dough (12-pack)",
    type: "grocery",
    category: "snack",
    proteinGrams: 252, // 12 x 21g
    price: 24.99,
    calories: 2280, // 12 x 190
  },
  {
    id: "chomps-original-beef-10pk",
    name: "Chomps Original Beef (10-pack, 1.15oz sticks)",
    type: "grocery",
    category: "snack",
    proteinGrams: 100, // 10 x 10g
    price: 25.6,
    calories: 1000, // 10 x 100
  },
  {
    id: "chomps-original-beef-24pk",
    name: "Chomps Original Beef (24-pack, 1.15oz sticks)",
    type: "grocery",
    category: "snack",
    proteinGrams: 240, // 24 x 10g
    price: 54.96, // 24 x $2.29
    calories: 2400, // 24 x 100
  },
  {
    id: "barebells-protein-bar-12pk",
    name: "Barebells Protein Bar, Variety Pack (12-pack, 55g bars)",
    type: "grocery",
    category: "snack",
    proteinGrams: 240, // 12 x 20g
    price: 30.99,
    calories: 2400, // 12 x 200
  },
  {
    id: "quest-protein-puffs-10pk",
    name: "Quest Protein Puffs, Cheddar (10-pack, 1oz bags)",
    type: "grocery",
    category: "snack",
    proteinGrams: 170, // 10 x 17g
    price: 22.99,
    calories: 1300, // 10 x 130
  },
  {
    id: "sams-hardboiled-eggs-24ct",
    name: "Snack Attack Cage Free Hard Boiled Eggs, Sam's Club (24 eggs = 12 x 2-packs)",
    type: "grocery",
    category: "snack",
    proteinGrams: 132, // 12 packs x 11g per 2 eggs
    price: 12.98,
    calories: 1440, // 12 x 120
  },
  {
    id: "starkist-tuna-pouch-4pk",
    name: "StarKist Light Tuna in Water, pouch (4-pack, 2.6oz each)",
    type: "grocery",
    category: "snack",
    proteinGrams: 68, // 4 x 17g
    price: 4.69,
    calories: 280, // 4 x 70
  },
  {
    id: "good-culture-cottage-cheese-16oz",
    name: "Good Culture 2% Cottage Cheese (16oz tub)",
    type: "grocery",
    category: "snack",
    proteinGrams: 56, // 4 servings x 14g
    price: 4.49,
    calories: 320, // 4 x 80
  },

  // Meal-style groceries
  {
    id: "costco-rotisserie-chicken",
    name: "Costco Kirkland Rotisserie Chicken, whole (~3 lb cooked)",
    type: "grocery",
    category: "meal",
    proteinGrams: 166,
    price: 4.99,
    calories: 1037,
  },
  {
    id: "dozen-large-eggs-grocery",
    name: "Large eggs (1 dozen, raw - cook at home)",
    type: "grocery",
    category: "meal",
    proteinGrams: 72, // 12 x 6g
    price: 4.49,
    calories: 840, // 12 x 70
  },

  // ============================================================
  // CONVENIENCE - single-serve / on-the-go
  // ============================================================

  {
    id: "oikos-pro-drink-23g-single",
    name: "Oikos Pro 23g Drink, single 7oz bottle",
    type: "convenience",
    category: "drink",
    proteinGrams: 23,
    price: 2.0,
    calories: 140,
  },
  {
    id: "oikos-protein-shake-30g-single",
    name: "Oikos Protein Shake 30g, single 12oz bottle",
    type: "convenience",
    category: "drink",
    proteinGrams: 30,
    price: 3.49,
    calories: 170,
  },
  {
    id: "fairlife-core-power-26g-single",
    name: "Fairlife Core Power 26g Vanilla, single 14oz bottle",
    type: "convenience",
    category: "drink",
    proteinGrams: 26,
    price: 3.88,
    calories: 180,
  },
  {
    id: "fairlife-core-power-elite-42g-single",
    name: "Fairlife Core Power Elite 42g Vanilla, single 14oz bottle",
    type: "convenience",
    category: "drink",
    proteinGrams: 42,
    price: 5.28,
    calories: 230,
  },
  {
    id: "premier-protein-shake-single",
    name: "Premier Protein Shake Chocolate, single 11oz bottle",
    type: "convenience",
    category: "drink",
    proteinGrams: 30,
    price: 3.49,
    calories: 150,
  },
  {
    id: "jocko-molk-shake-chocolate-single",
    name: "Jocko Mölk Protein Shake, Chocolate, single 12oz bottle",
    type: "convenience",
    category: "drink",
    proteinGrams: 30,
    price: 3.99,
    calories: 180,
  },
  {
    id: "chomps-original-beef-single",
    name: "Chomps Original Beef, single 1.15oz stick",
    type: "convenience",
    category: "snack",
    proteinGrams: 10,
    price: 2.56, // single-stick pricing
    calories: 100,
  },
  {
    id: "quest-protein-bar-single",
    name: "Quest Protein Bar, Choc Chip Cookie Dough, single bar",
    type: "convenience",
    category: "snack",
    proteinGrams: 21,
    price: 2.99,
    calories: 190,
  },
  {
    id: "barebells-protein-bar-single",
    name: "Barebells Protein Bar, single (55g)",
    type: "convenience",
    category: "snack",
    proteinGrams: 20,
    price: 3.49,
    calories: 200,
  },
  {
    id: "quest-protein-puffs-single",
    name: "Quest Protein Puffs, Cheddar, single 1oz bag",
    type: "convenience",
    category: "snack",
    proteinGrams: 17,
    price: 3.5,
    calories: 130,
  },
  {
    id: "hardboiled-eggs-711-2pk",
    name: "7-Eleven Cage Free Hard Boiled Eggs, 2-pack",
    type: "convenience",
    category: "snack",
    proteinGrams: 11,
    price: 3.49,
    calories: 120,
  },
  {
    id: "hardboiled-eggs-wawa-2pk",
    name: "Wawa Hard Boiled Eggs, 2-pack (3oz)",
    type: "convenience",
    category: "snack",
    proteinGrams: 12,
    price: 1.49,
    calories: 140,
  },
  {
    id: "starkist-tuna-pouch-single",
    name: "StarKist Light Tuna in Water, single 2.6oz pouch",
    type: "convenience",
    category: "snack",
    proteinGrams: 17,
    price: 1.79,
    calories: 70,
  },

  // ============================================================
  // FAST FOOD - single serving / restaurant items
  // ============================================================

  {
    id: "innout-flying-dutchman",
    name: "In-N-Out Flying Dutchman (secret menu, 2 patties + 2 cheese, no bun)",
    type: "fast-food",
    category: "meal",
    proteinGrams: 30,
    price: 6.0,
    calories: 380,
  },
  {
    id: "wendys-daves-double-no-bun",
    name: "Wendy's Dave's Double, no bun (order manually)",
    type: "fast-food",
    category: "meal",
    proteinGrams: 44,
    price: 7.99,
    calories: 630,
  },
  {
    id: "chipotle-high-protein-cup-chicken",
    name: "Chipotle High Protein Cup - Adobo Chicken",
    type: "fast-food",
    category: "meal",
    proteinGrams: 32,
    price: 4.55,
    calories: 180,
  },
  {
    id: "chipotle-high-protein-cup-steak",
    name: "Chipotle High Protein Cup - Steak",
    type: "fast-food",
    category: "meal",
    proteinGrams: 21,
    price: 6.3,
    calories: 150,
  },
  {
    id: "chipotle-double-high-protein-bowl",
    name: "Chipotle Double High Protein Bowl",
    type: "fast-food",
    category: "meal",
    proteinGrams: 81,
    price: 15.9,
    calories: 760,
  },
  {
    id: "chipotle-double-high-protein-burrito",
    name: "Chipotle Double High Protein Burrito",
    type: "fast-food",
    category: "meal",
    proteinGrams: 79,
    price: 15.9,
    calories: 840,
  },
  {
    id: "chipotle-high-protein-high-fiber-bowl",
    name: "Chipotle High Protein-High Fiber Bowl",
    type: "fast-food",
    category: "meal",
    proteinGrams: 46,
    price: 11.35,
    calories: 545,
  },
  {
    id: "chipotle-high-protein-low-calorie-bowl",
    name: "Chipotle High Protein-Low Calorie Bowl",
    type: "fast-food",
    category: "meal",
    proteinGrams: 35,
    price: 14.3,
    calories: 460,
  },
  {
    id: "chipotle-high-protein-taco",
    name: "Chipotle High Protein Taco (Adobo Chicken)",
    type: "fast-food",
    category: "meal",
    proteinGrams: 15,
    price: 3.8,
    calories: 190,
  },
  {
    id: "subway-protein-pocket-baja-chicken",
    name: "Subway Protein Pocket - Baja Chicken",
    type: "fast-food",
    category: "meal",
    proteinGrams: 24,
    price: 3.99,
    calories: 330,
  },
  {
    id: "subway-protein-pocket-peppercorn-ranch",
    name: "Subway Protein Pocket - Peppercorn Ranch Chicken",
    type: "fast-food",
    category: "meal",
    proteinGrams: 24,
    price: 3.99,
    calories: 330,
  },
  {
    id: "subway-protein-pocket-turkey-ham",
    name: "Subway Protein Pocket - Turkey & Ham",
    type: "fast-food",
    category: "meal",
    proteinGrams: 21,
    price: 3.99,
    calories: 320,
  },
  {
    id: "subway-protein-pocket-italian-trio",
    name: "Subway Protein Pocket - Italian Trio",
    type: "fast-food",
    category: "meal",
    proteinGrams: 22,
    price: 3.99,
    calories: 480,
  },
];
