import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TUBE Video App - Watch Premium Videos",
  description: "Watch the latest videos in premium quality.",
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
          <main className="flex-grow w-full">
            {children}
          </main>
          <Footer />
          <ToastContainer theme="dark" position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
