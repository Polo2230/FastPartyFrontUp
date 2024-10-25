import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
// Layout component
export function RootLayout({
  children,
}: {
  children: React.ReactNode; // Ensure children is typed as ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}