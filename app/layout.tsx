import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navber from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Get Me a Protein – Support Your Favorite Creators ",
  description: "Support your favorite creators by buying them a “protein”. A fun and easy way to send tips, appreciation, and help them keep creating.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessionWrapper>
        <Navber />
        <div className=" min-h-[91vh] relative z-10 max-h-fit w-screen bg-slate-950">
          {children}
          </div>
        <Footer />
        </SessionWrapper>
        </body>
    </html>
  );
}
