import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import QueryClientWrapper from "@/context/queryClientProvider";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const arial = localFont({
  src: "../public/fonts/Arial.ttf",
  variable: "--font-arial",
});

export const metadata: Metadata = {
  title: "Evolve Tutoring | Learn and Grow",
  description:
    "Evolve Tutoring is an online learning platform where students can find and hire expert tutors for personalized, one-on-one classes. Learn at your own pace with flexible scheduling and interactive sessions designed to help you grow and succeed.",
  keywords: [
    "Evolve Tutoring",
    "online tutoring",
    "hire tutor",
    "find teacher",
    "virtual classes",
    "online learning platform",
    "private tutor",
    "student teacher platform",
    "LMS",
    "e-learning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${arial.variable}`}>
      <body className={`$ ${inter.className} antialiased`}>
        <QueryClientWrapper>
          <TooltipProvider>
            <AuthProvider>{children}</AuthProvider>
          </TooltipProvider>
          <Toaster richColors />
        </QueryClientWrapper>
      </body>
    </html>
  );
}
