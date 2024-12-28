import './global.css';

import type { Metadata, Viewport } from 'next';
import {
  Fira_Code as FiraCode,
  Plus_Jakarta_Sans as PlusJakartaSans,
} from 'next/font/google';
import localFont from 'next/font/local';

import Analytics from '@/components/analytics';
import GuestbookWidget from '@/components/guestbook-widget';
import AppProvider from '@/components/providers/app-provider';
import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import { Toaster } from '@/components/ui/toaster';
import { DEFAULT_METADATA, seo } from '@/lib/meta';
import { cn } from '@/lib/utils';

export const metadata: Metadata = seo({
  ...DEFAULT_METADATA,
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
  manifest: '/site.webmanifest',
});

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  width: 'device-width',
};

const fontCal = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-cal',
});

const fontSans = PlusJakartaSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = FiraCode({
  subsets: ['latin'],
  variable: '--font-mono',
});

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={cn(fontSans.variable, fontMono.variable, fontCal.variable)}
    >
      <AppProvider>
        <div id="__app" className={cn('flex min-h-screen flex-col')}>
          <Header />
          <main>{children}</main>
          <GuestbookWidget />
          <Footer />
        </div>
        <Analytics />
        <Toaster />
      </AppProvider>
    </body>
  </html>
);

export default RootLayout;
