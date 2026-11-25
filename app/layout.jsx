import './globals.css';
import FolderTransition from '../components/FolderTransition';
import Reveal from '../components/Reveal';
import { site } from '../lib/site';

// The tab icon and link-preview picture are app/icon.png, app/apple-icon.png and
// app/opengraph-image.png; Next.js adds their tags. metadataBase makes the preview URL absolute.
export const metadata = {
  metadataBase: new URL('https://hwarankim.github.io'),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.summary,
  openGraph: { type: 'website', siteName: site.name, description: site.summary, url: './' },
  twitter: { card: 'summary_large_image' },
};

export const viewport = { themeColor: '#F9F6F1', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    // The inline script below adds `js` to <html> before hydration, on purpose.
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Prata&family=Work+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Entrance styles only apply once script runs, so nothing stays hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <Reveal />
        <FolderTransition />
      </body>
    </html>
  );
}
