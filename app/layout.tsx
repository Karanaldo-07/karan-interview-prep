import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karan Bhise | AI & Data Science",
  description: "Portfolio, resume and interview preparation hub for Karan Bhise.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
