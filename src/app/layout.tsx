import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "AI RPA - Создание шаблонов с помощью искусственного интеллекта",
  description: "AI RPA",
  keywords:
    "ai rpa, проекты, шаблоны, искусственный интеллект, автоматизация, промпты",
  authors: [{ name: "AI RPA Team" }],
  creator: "AI RPA",
  publisher: "AI RPA",
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
