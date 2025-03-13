import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RevX AI Assistant | Powered by Spu",
  description: "Your intelligent voice assistant for RevX digital consulting services",
  keywords: "RevX, digital consulting, voice assistant, AI, hospitality industry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/regenerator-runtime@0.13.9/runtime.js" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
