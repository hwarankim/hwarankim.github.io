import './globals.css';
import FolderTransition from '../components/FolderTransition';
import Reveal from '../components/Reveal';
import { site } from '../lib/site';

export const metadata = {
  title: { default: 'hwaran kim, Global Digital Strategist', template: '%s | hwaran kim' },
  description: site.intro,
};

export const viewport = { themeColor: '#F1EAE0', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500&display=swap"
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
