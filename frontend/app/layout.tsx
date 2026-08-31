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
    icon: "/mansha-logo.ico",
    apple: "/mansha-logo.ico",
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
