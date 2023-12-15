import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: true,
  display: "swap",
});

const calFont = localFont({
  src: "../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal",
  preload: true,
  display: "swap",
});

export const metadata: Metadata = {
  title: "Calcom",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body
          className={cn(
            "bg-subtle antialiased dark:bg-darkgray-50",
            interFont.className,
            interFont.variable,
            calFont.variable
          )}
        >
          {children}
        </body>
      </html>
    </>
  );
}
