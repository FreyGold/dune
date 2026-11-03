import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import { Providers } from "@/app/providers";
import { defaultLocale, getDirection, isLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" });

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cortex — Your Academic Second Brain",
  description:
    "AI-powered notes, semantic search, and shared academic resources for university students. Think smarter, study better.",
  keywords: [
    "notes",
    "AI",
    "academic",
    "university",
    "knowledge base",
    "semantic search",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localeFromRequest = await getLocale();
  const locale = isLocale(localeFromRequest)
    ? localeFromRequest
    : defaultLocale;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={cn(
        inter.variable,
        geist.variable,
        geistMono.variable,
        geistHeading.variable,
        "dark",
      )}
      style={{ fontFamily: "var(--font-sans)" }}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="bg-background">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (!theme) theme = 'dark'; // Default to dark

                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else if (theme === 'system') {
                    if (supportDarkMode) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  }

                  var appTheme = localStorage.getItem('app-theme') || 'midnight';
                  document.documentElement.setAttribute('data-theme', appTheme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers><div role="status" style={{ position: "fixed", bottom: 0, right: 0, zIndex: 999, maxWidth: "32rem", padding: "0.5rem 0.75rem", background: "#142d43", color: "white", fontSize: "0.75rem" }}>Public shared demo. Notes expire after one hour. The sample note is read-only. Do not add private data. AI, collaboration, and daily tools are unavailable.</div>{children}</Providers>
        </NextIntlClientProvider>

      </body>
    </html>
  );
}
