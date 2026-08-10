import React from 'react';
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
        <JsonLdSchema />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-[#0F172A] antialiased selection:bg-[#2563EB]/20 selection:text-[#2563EB]">
        <AuthProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
