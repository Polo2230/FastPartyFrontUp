// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  metadata,
}: {
  children: React.ReactNode;
  metadata?: Metadata;
}) {
  const defaultMetadata: Metadata = {
    title: "Home of Party",
    description: "Welcome to the best place to find the best parties and events.",
  };

  const finalMetadata = metadata || defaultMetadata;

  return (
    <html lang="en">
      <head>
        <title>{finalMetadata.title?.toString()}</title>
        <meta name="description" content={finalMetadata.description ?? ""} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}