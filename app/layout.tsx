import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Boot } from "@/src/components/layout/Boot";
import { a11y } from "@/src/content/microcopy";
import { profile } from "@/src/content/profile";
import { personSchema, seo } from "@/src/content/seo";
import "./globals.css";

/**
 * Three voices, and only three.
 *
 * Inter carries structure — headings, navigation, interface. Its optical-size axis
 * lets a 100px headline tighten without hand-tracking every size.
 * Newsreader carries narrative — ledes, overviews, pull quotes. It is what makes the
 * page read as editorial rather than as a dashboard.
 * IBM Plex Mono carries data — eyebrows, dates, metrics, status. Precise, engineered,
 * and not a code-editor pastiche.
 *
 * All three are self-hosted, latin-subset variable files served from this origin:
 * 168 KB total, no third-party request on the critical path, and no dependency on a
 * font CDN being reachable at build time or at runtime.
 */
const inter = localFont({
  src: [{ path: "./fonts/Inter-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

const newsreader = localFont({
  src: [{ path: "./fonts/Newsreader-latin.woff2", weight: "200 800", style: "normal" }],
  variable: "--font-newsreader",
  display: "swap",
  fallback: ["ui-serif", "Georgia", "Times New Roman", "serif"],
});

const plexMono = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexMono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: seo.title, template: seo.titleTemplate },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: seo.siteName,
    title: seo.ogTitle,
    description: seo.ogDescription,
    url: profile.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.ogTitle,
    description: seo.twitterDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
  colorScheme: "light dark",
};

/**
 * Applies a stored theme choice before the first paint, so an explicit preference
 * never flashes the other theme. Absent a stored choice this does nothing at all and
 * the `prefers-color-scheme` rule in the stylesheet decides — which is why the OS
 * default also works with JavaScript disabled.
 */
const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /*
      suppressHydrationWarning on <html> because the theme script above sets
      data-theme before React hydrates, and on <body> because extensions (password
      managers, anti-trackers) inject their own attributes there — `bis_register`,
      `bis_skin_checked` and similar — before React sees the document.

      It only silences attribute and text mismatches on these two elements. Any real
      mismatch inside a component still reports normally.
    */
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${newsreader.variable} ${plexMono.variable} antialiased`}
      >
        <Boot />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-mono focus:text-mono focus:uppercase focus:tracking-[0.14em] focus:text-paper"
        >
          {a11y.skipLink}
        </a>

        {children}

        <script
          type="application/ld+json"
          // Static, author-controlled object. No user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
