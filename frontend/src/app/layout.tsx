import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ReduxProvider } from "@/redux/Provider";
import RazorpayScriptProvider from "@/components/RazorpayScriptProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Updated metadata with all favicon formats
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
  metadataBase: new URL("https://zenvioweb.in/"),

  openGraph: {
    title: "ZenVio | Project Management App",
    description:
      "Manage your projects, clients, and payments all in one place with ZenVio.",
    url: "https://zenvioweb.in",
    siteName: "ZenVio",
    images: [
      {
        url: "/preview.png",
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

  // ✅ Complete multi-format icon setup
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
      { rel: "mask-icon", url: "/favicon.svg", color: "#000000" },
    ],
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <Navbar />
          <RazorpayScriptProvider />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
