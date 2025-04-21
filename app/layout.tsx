import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme-provider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from 'nextjs-toploader';
import { TanstackProvider } from "@/components/providers/Tanstack";
import SiteAnalytics from "@/components/providers/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.ROOTURL || 'https://reapoll.com'),
  title: {
    default: `${process.env.BRANDNAME} - Create & Participate in Polls, Earn Crypto Rewards`,
    template: `%s | ${process.env.BRANDNAME}`
  },
  description: 'Create free polls or vote on trending topics to earn redeemable massive rewards.',
  keywords: ['online polls', 'earn crypto voting', 'survey platform', 'poll rewards'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: `${process.env.BRANDNAME}`,
    images: `${process.env.ROOTURL}/og-image.jpg`
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@codemonga'
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SiteAnalytics />
        <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          <TanstackProvider>
            {children}
            <SchemaScript />
          </TanstackProvider>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

// Schema.org for Organization (global)
function SchemaScript() {
  return (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": `${process.env.BRANDNAME}`,
        "url": process.env.NEXT_PUBLIC_SITE_URL,
        "description": "Online polling platform with rewards",
        "founder": "codemonga",
        "foundingDate": "2025",
        "sameAs": [
          "https://twitter.com/reapoll",
          "https://linkedin.com/company/reapoll"
        ]
      })}
    </script>
  )
}
