import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ReduxProvider } from "@/redux/Provider";
import RazorpayScriptProvider from "@/components/RazorpayScriptProvider"; // ✅

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "ZenVio | Project Management App",
  description:
    "ZenVio helps businesses and teams manage projects, clients, and payments efficiently.",
  keywords: [
    "project management app",
    "task tracking",
    "client management",
    "team management",
    "ZenVio",
  ],
  metadataBase: new URL("https://yourdomain.com"), // replace with real domain
  openGraph: {
    title: "ZenVio | Project Management App",
    description:
      "Manage your projects, clients, and payments all in one place with ZenVio.",
    url: "https://yourdomain.com",
    siteName: "ZenVio",
    images: [
      {
        url: "/preview.png", // store in public/
        width: 1200,
        height: 630,
        alt: "ZenVio Project Management App",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZenVio | Project Management App",
    description:
      "ZenVio helps businesses and teams manage projects, clients, and payments efficiently.",
    images: ["/preview.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};


// ✅ Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Navbar />
          <RazorpayScriptProvider /> {/* ✅ Script injected client-side */}
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
