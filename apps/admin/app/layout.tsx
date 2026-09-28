import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin CMS | Portfolio",
  description: "Portfolio content management",
  icons: {
    icon: "/icons8-goat-outline-16.png",
    shortcut: "/icons8-goat-outline-16.png",
    apple: "/icons8-goat-64.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
