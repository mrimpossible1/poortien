# poortien

A simple, sortable database of protein products ranked by **price per gram of protein**.

Static Next.js site, deployed to Netlify. The "database" is a hardcoded TypeScript file - no Supabase, no API, no backend.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Static export (`output: "export"`) → deploys to any static host (Netlify)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Outputs static files to `out/` which Netlify serves.

## Adding / updating a product

The entire product list lives in **one file**: [`src/data/proteins.ts`](src/data/proteins.ts).

Each entry has these real fields (the rest are derived):

| Field          | What to enter                                                  |
| -------------- | -------------------------------------------------------------- |
| `id`           | Unique slug (e.g. `"oikos-pro-vanilla-4pk"`)                   |
| `name`         | Main product / brand / family — displayed as the row title (e.g. `"Oikos Pro"`) |
| `variant`      | Flavor, size, pack info — displayed as the subtitle (e.g. `"Vanilla · 4-pack · 5.3oz cups"`) |
| `type`         | **Where** you buy it: `"grocery"`, `"convenience"`, `"fast-food"` |
| `category`     | **What** it is: `"drink"`, `"yogurt"`, `"snack"`, `"whey"`, `"meal"` |
| `proteinGrams` | **Total** grams of protein in the whole package/item           |
| `price`        | **Total** USD price of the whole package/item                  |
| `calories`     | **Total** calories in the whole package/item                   |

`$/g protein`, `$/20g protein`, `cal/g protein`, and `cal/20g protein` are calculated automatically.

### The two costs of protein

Every gram of protein has two costs: **dollars** and **calories**. Both show up as `/20g` columns because most people think in ~20g chunks (one shake, one chicken breast, one yogurt cup).

Why both matter: if you're trying to hit 150g protein on a 2,000 cal cut, you literally cannot afford to spend more than ~13 calories per gram of protein — otherwise you blow your calorie budget just hitting your protein target.

`cal/20g protein` is color-coded:

| cal/g protein | cal/20g protein | Tier          | What it looks like                                                  |
| ------------- | --------------- | ------------- | ------------------------------------------------------------------- |
| ≤ 7           | ≤ 140           | **Lean** (green)     | Whey, chicken breast, tuna, plain Greek yogurt, ready-to-drink shakes |
| 7 – 10        | 140 – 200       | Balanced (muted)     | Cottage cheese, Oikos Triple Zero, Quest puffs, most bars           |
| 10 – 15       | 200 – 300       | Heavy (orange)       | Whole eggs, ground beef, Chipotle bowls, most fast-food "no bun"    |
| > 15          | > 300           | **Cal bomb** (red)   | Subway Italian Trio, McDonald's Triple, Wendy's Baconator           |

There's also a **Lean protein** quick-filter preset that hides anything over 8 cal/g protein.

### Splitting `name` vs `variant`

Keep `name` short and canonical so multiple variants of the same product group together visually. Put everything flavor/size/pack-related in `variant`, separated by middle-dots `·`:

```ts
{ name: "Chipotle High Protein Cup",          variant: "Adobo Chicken" }
{ name: "Chipotle High Protein Cup",          variant: "Steak" }
{ name: "Oikos Pro",                          variant: "Vanilla · 4-pack · 5.3oz cups" }
{ name: "Oikos Pro 23g Drink",                variant: "Single · 7oz bottle" }
{ name: "Jocko Mölk Whey Protein Powder",     variant: "Chocolate · 2.3 lb tub" }
```

### `type` cheat sheet (where you buy it)

- `grocery` — multi-pack / bulk from a grocery store or Costco (e.g. 12-pack shakes, 5 lb whey tub)
- `convenience` — single-serve / on-the-go (e.g. one Fairlife bottle from 7-Eleven, single Chomps stick)
- `fast-food` — restaurant / drive-thru item (e.g. Chipotle bowl, Wendy's burger, Subway Protein Pocket)

### `category` cheat sheet (what it is)

- `drink` — ready-to-drink shakes, protein milks (Fairlife, Premier, Oikos Pro drinks, Jocko Mölk shakes)
- `yogurt` — Greek yogurt cups or tubs (Oikos Pro, Triple Zero, Chobani Fit)
- `snack` — bars, puffs, jerky, cottage cheese, tuna pouches, hard-boiled eggs
- `whey` — powdered whey / isolate / blend tubs & bags (ON, Kirkland, Jocko Mölk powder, Promix)
- `meal` — full-meal protein: rotisserie chicken, dozen raw eggs, any fast-food item

### Tip

For multi-serving packages, use `servings × perServing`:

```ts
{
  id: "on-gold-standard-whey-vanilla-5lb",
  name: "Optimum Nutrition Gold Standard Whey",
  variant: "Vanilla · 5 lb tub",
  type: "grocery",
  category: "whey",
  proteinGrams: 1680,  // 70 servings × 24g
  price: 79.99,
  calories: 8400,      // 70 × 120
},
```

Commit, push, Netlify rebuilds.

## File layout

```
src/
  app/
    layout.tsx      # shell + metadata
    page.tsx        # homepage, renders the table
    globals.css     # Tailwind v4 theme
  components/
    ProteinTable.tsx # sortable table + mobile cards
  data/
    proteins.ts      # the "database" - edit this to add products
  lib/
    types.ts         # Protein type
    calc.ts          # derived fields + formatters
```
