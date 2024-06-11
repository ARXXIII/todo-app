import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "TODO App",
  description: "Тестовое задание Frontend junior в Mindbox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${nunito.className} flex flex-col justify-between p-3 lg:px-24 lg:py-12 min-h-screen bg-neutral-100`}>
        <Header />
        <main className="my-12 tracking-wide">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
