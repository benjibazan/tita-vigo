import Link from 'next/link';
import { ShoppingBag, Menu } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">Tita Vigo</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/productos" className="text-gray-600 hover:text-primary transition-colors">
                        Catálogo
                    </Link>
                    <Link href="/productos?category=anillos" className="text-gray-600 hover:text-primary transition-colors">
                        Anillos
                    </Link>
                    <Link href="/productos?category=collares" className="text-gray-600 hover:text-primary transition-colors">
                        Collares
                    </Link>
                    <Link href="/productos?category=aretes" className="text-gray-600 hover:text-primary transition-colors">
                        Aretes
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2" aria-label="Menu">
                    <Menu className="w-6 h-6 text-gray-600" />
                </button>
            </div>
        </header>
    );
}
