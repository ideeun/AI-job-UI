import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Project Template - Create templates with AI",
  description:
    "Intelligent platform for creating and managing project templates using AI",
  keywords: "projects, templates, AI, automation, prompts",
  authors: [{ name: "Project Template Team" }],
  creator: "Project Template",
  publisher: "Project Template",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
