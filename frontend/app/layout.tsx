import type { Metadata } from "next";
import { Suspense } from "react";
import "remixicon/fonts/remixicon.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "./globals.css";
import ComingSoonPopup from "./component/Home/ComingSoonPopup";

export const metadata: Metadata = {
  title: "Mansha Group Real Estate Developer In Faridabad",
  description: "Want to Work with Trusted Real Estate Developer?",
  keywords: "test",
  alternates: {
    canonical: "https://www.manshagroup.in/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh font-sans" suppressHydrationWarning>
        <Suspense fallback={null}>
          <ComingSoonPopup />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
