import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/organisms/Cart/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js + TypeScript",
  description: "Next.js + TypeScript + Tailwind CSS + Jest + ESLint + Prettier",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>      
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
