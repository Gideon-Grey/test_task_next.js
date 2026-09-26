import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Posts — тестовое задание",
  description: "Next.js App Router + Server Actions + Zod demo",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
