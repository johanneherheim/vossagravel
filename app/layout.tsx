import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getFooter, getFooters } from "@/sanity/sanity-utils";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Roboto({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vossagravel",
  description: "🚴 Sykkelritt på Voss, arrangert av Vossevangen CK",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footers = await getFooters();
  const footerData = await Promise.all(
    footers.map(async (footer) => ({
      _id: footer._id,
      slug: footer.slug,
      title: footer.title,
      content: (await getFooter(footer.slug)).content,
    })),
  );
  return (
    <html
      lang="nn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="Vossagravel" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="description"
          content="🚴 Sykkelritt på Voss, arrangert av Vossevangen CK"
        />
        <meta
          name="keywords"
          content="cycling, Voss, Vossevangen CK, sykkelritt, race, sykkel, ritt, vossagravel, gravel"
        />
        <meta name="author" content="Vossevangen CK" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚴</text></svg>"
        />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fcfcfc" />
        <link rel="apple-touch-icon" href="/img/icon.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/img/icon.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/img/icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/img/icon.png" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className,
        )}
      >
        <Header />
        {children}
        <Footer footers={footerData} />
      </body>
    </html>
  );
}
