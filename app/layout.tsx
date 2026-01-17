import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sapanca Luxury Bungalows | Premium Nature Retreat",
  description: "Experience luxury in nature with our exclusive bungalow collection in Sapanca. Pool, jacuzzi, and fireplace options available.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
