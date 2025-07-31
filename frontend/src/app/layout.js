import { Geist, Geistexport default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackendWakeup />
        {children}
        <Analytics />
      </body>
    </html>
  )
} "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import BackendWakeup from "../components/BackendWakeup";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HiiNen - Your AI Co-Founder for Startup Success",
  description: "Transform your startup ideas into reality with AI-powered guidance, mentorship, and funding opportunities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
