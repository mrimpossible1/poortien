import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "poortien - best price per gram of protein",
    template: "%s | poortien",
  },
  description:
    "A simple, filterable database of protein products ranked by price per gram of protein. Find the cheapest whey, yogurt, bars, and shakes.",
  keywords: [
    "price per gram of protein",
    "cheapest protein",
    "protein value",
    "whey protein",
    "protein yogurt",
    "protein bar",
    "protein shake",
  ],
  openGraph: {
    title: "poortien - best price per gram of protein",
    description:
      "A simple, filterable database of protein products ranked by price per gram of protein.",
    type: "website",
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
