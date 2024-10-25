// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Definición de la interfaz para las propiedades
interface RootLayoutProps {
  children: React.ReactNode;
  metadata?: Metadata; // metadata puede ser opcional
}

export default function RootLayout({ children, metadata }: RootLayoutProps) {
  const defaultMetadata: Metadata = {
    title: "Home of Party",
    description: "Welcome to the best place to find the best parties and events.",
  };

  const finalMetadata = metadata || defaultMetadata;

  return (
    <html lang="en">
      <head>
        <title dangerouslySetInnerHTML={{ __html: finalMetadata.title || "Default Title" }}></title>
        <meta name="description" content={finalMetadata.description || ""} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
