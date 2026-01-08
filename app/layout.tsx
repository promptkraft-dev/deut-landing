import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEUT | Visual Control",
  description: "Don't type. Snap it in.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
