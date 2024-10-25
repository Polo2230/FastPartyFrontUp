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

  // Asegurarse de que title y description sean siempre cadenas
  const title = finalMetadata.title ?? "Default Title";
  const description = finalMetadata.description ?? "Default description";

  return (
    <html lang="en">
      <head>
        <title>{typeof title === 'string' ? title : 'Default Title'}</title>
        <meta name="description" content={typeof description === 'string' ? description : 'Default description'} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
