import type { Metadata } from 'next';
import './globals.css';
import AppProvider from '@/components/providers/AppProvider';

export const metadata: Metadata = {
  title: 'FoodBridge – Bridging the Gap Between Surplus Food and Hunger',
  description:
    'A social-impact food donation platform connecting surplus food donors, recipients and community volunteers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#F8FAF7] text-[#24332B] antialiased selection:bg-[#E9F5ED] selection:text-[#176B45]">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
