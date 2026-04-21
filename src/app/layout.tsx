import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://poortien.netlify.app";
const SITE_TITLE = "Cheapest protein per gram — compare US prices | poortien";
const SITE_DESCRIPTION =
  "Compare US protein products by cost per gram. Find the cheapest whey, shakes, Greek yogurt, bars, jerky, and fast-food protein — sorted by price and calorie efficiency.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | poortien",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "cheapest protein per gram",
    "price per gram of protein",
    "cost per gram of protein",
    "cheapest protein source",
    "best value protein",
    "protein per dollar",
    "cheapest whey protein",
    "cheapest fast food protein",
    "protein price comparison",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "poortien",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
