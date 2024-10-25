// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Cambiamos la declaración del componente para usar React.FC
const RootLayout: React.FC<{ children: React.ReactNode; metadata?: Metadata }> = ({
  children,
  metadata,
}) => {
  const defaultMetadata: Metadata = {
    title: "Home of Party",
    description: "Welcome to the best place to find the best parties and events.",
  };

  const finalMetadata = metadata || defaultMetadata;

  return (
    <html lang="en">
      <head>
        <title>{String(finalMetadata.title) ?? "Default Title"}</title>
        <meta name="description" content={finalMetadata.description ?? "Default Description"} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout; // Asegúrate de que la exportación sea correcta

