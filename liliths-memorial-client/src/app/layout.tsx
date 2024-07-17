import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Liliths Memorial",
  description: "A place to remember.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
