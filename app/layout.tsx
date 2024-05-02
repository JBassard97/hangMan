import type { Metadata } from "next";
import "./globals.scss";
import Header from "./Components/Header/Header";

// Meta Data for the whole application
export const metadata: Metadata = {
  title: "Next.js Hangman",
  description: "Hangman Revamped with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
