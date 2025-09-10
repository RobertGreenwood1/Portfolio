import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeScript from "./components/ThemeScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rob's Portfolio",
  description: "I design and build digital products — from marketing sites to web apps.",
  keywords: ["portfolio", "web development", "design", "digital products"],
  authors: [{ name: "Rob" }],
  openGraph: {
    title: "Rob's Portfolio",
    description: "I design and build digital products — from marketing sites to web apps.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rob's Portfolio",
    description: "I design and build digital products — from marketing sites to web apps.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
