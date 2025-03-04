import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider
} from '@clerk/nextjs'


import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KERC Admin Dashboard",
  description: "Admin dashboard for KERC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
            <div className="flex min-h-screen">
              <main className="flex-1">{children}</main>
            </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
