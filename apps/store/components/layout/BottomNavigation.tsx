'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navItems = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/buscar', label: 'Buscar', icon: Search },
    { href: '/carrito', label: 'Carrito', icon: ShoppingCart },
    { href: '/perfil', label: 'Perfil', icon: User },
];

export function BottomNavigation() {
    const pathname = usePathname();
    const { totalItems } = useCart();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    const isCart = item.href === '/carrito';

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-1 px-4 py-2 relative ${isActive ? 'text-primary' : 'text-gray-500'
                                }`}
                        >
                            <div className="relative">
                                <Icon className="w-6 h-6" />
                                {isCart && totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                        {totalItems > 9 ? '9+' : totalItems}
                                    </span>
                                )}
                            </div>
                            <span className="text-xs">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
