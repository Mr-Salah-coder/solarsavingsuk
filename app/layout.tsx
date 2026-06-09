import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SolarSavingsUK - Free Solar Panel Savings Calculator",
  description: "Calculate how much you could save with solar panels. Get free quotes from trusted UK installers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
