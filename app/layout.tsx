// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Define the props type for the layout
interface RootLayoutProps {
  children: React.ReactNode;
  metadata?: Metadata; // metadata can be optional
}

export default function RootLayout({ children, metadata }: RootLayoutProps) {
  const defaultMetadata: Metadata = {
    title: "Home of Party",
    description: "Welcome to the best place to find the best parties and events.",
  };

  const finalMetadata = metadata || defaultMetadata;

  // Ensure title is a string
  const title = typeof finalMetadata.title === 'string' ? finalMetadata.title : "Default Title";

  return (
    <html lang="en">
      <head>
        <title>{title}</title> {/* Ensure title is a string */}
        <meta name="description" content={finalMetadata.description || "Default description"} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}