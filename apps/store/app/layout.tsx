import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Tita Vigo | Joyas Elegantes',
    description: 'Joyas elegantes al alcance de todos. Anillos, collares, aretes y pulseras de plata.',
    keywords: 'joyas, plata, anillos, collares, aretes, pulseras, Perú',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className={inter.className}>
                <CartProvider>
                    <Header />
                    <main className="min-h-screen pb-16 md:pb-0">{children}</main>
                    <Footer />
                    <BottomNavigation />
                </CartProvider>
            </body>
        </html>
    );
}
