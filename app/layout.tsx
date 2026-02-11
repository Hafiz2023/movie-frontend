import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Movie App - Stream Your Favorites",
  description: "Watch the latest movies and TV shows in premium quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <ToastContainer theme="dark" position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
