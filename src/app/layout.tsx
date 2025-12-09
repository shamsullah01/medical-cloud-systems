import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medical Cloud Systems - Healthcare Management Solutions",
  description: "Transform your healthcare operations with our comprehensive cloud-based platform. HIPAA-compliant EHR, appointment scheduling, insurance processing, and more.",
  keywords: ["Healthcare", "Medical", "Cloud Systems", "EHR", "HIPAA", "Patient Management", "Healthcare Technology"],
  authors: [{ name: "Medical Cloud Systems" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Medical Cloud Systems",
    description: "Comprehensive healthcare management solutions",
    siteName: "Medical Cloud Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Cloud Systems",
    description: "Comprehensive healthcare management solutions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
