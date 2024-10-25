// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Define the default metadata for the layout
export const metadata: Metadata = {
  title: "Home of Party", // This can be a string or other types as per your requirement
  description: "Welcome to the best place to find the best parties and events.",
};

// Layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Ensure children is typed as ReactNode
}) {
  // Ensure title is a string
  const title = typeof metadata.title === 'string' ? metadata.title : "Default Title";

  return (
    <html lang="en">
      <head>
        <title>{title}</title> {/* Ensure title is a string */}
        <meta name="description" content={metadata.description || "Default description"} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}