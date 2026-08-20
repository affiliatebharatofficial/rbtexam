import React from 'react';
import Script from 'next/script';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';
import { LanguageProvider } from '@/context/language-context';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { JsonLdSchema } from '@/components/seo/json-ld';
import { constructMetadata } from '@/utils/seo';

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Google Site Verification & Bing Webmaster */}
        <meta name="google-site-verification" content="uGt2RdUpAmlBKrTFijBDppyoohE_PxVJIzD5LJHRTv8" />
        <meta name="msvalidate.01" content="2A730A2FAF8DA672C0BDBCC548BEB4FA" />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8X65DLEGPL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-8X65DLEGPL');
          `}
        </Script>

        <JsonLdSchema />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563EB" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="flex flex-col min-h-dvh bg-slate-50 text-[#0F172A] antialiased selection:bg-[#2563EB]/20 selection:text-[#2563EB]">
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1 w-full flex flex-col">{children}</main>
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
