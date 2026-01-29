'use client';

import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    stock: number;
    isPreOrder?: boolean;
    image?: string;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem, items } = useCart();
    const isInStock = product.stock > 0;
    const formattedPrice = `S/. ${product.price.toFixed(2)}`;
    const isInCart = items.some((i) => i.id === product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.image,
        });
    };

    return (
        <div className="group block bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image */}
            <Link href={`/productos/${product.slug}`}>
                <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden m-2">
                    <img
                        src={product.image || 'https://via.placeholder.com/400x400/f5f5f5/333?text=Producto'}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Favorite Button */}
                    <button
                        className="absolute top-2 right-2 p-1.5 transition-transform hover:scale-110"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // TODO: Add to favorites
                        }}
                        aria-label="Agregar a favoritos"
                    >
                        <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
                    </button>

                    {/* Stock Badge */}
                    {!isInStock && (
                        <span className="absolute top-2 left-2 bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                            A Pedido
                        </span>
                    )}
                </div>
            </Link>

            {/* Info */}
            <div className="p-3 pt-1">
                <Link href={`/productos/${product.slug}`}>
                    <h3 className="text-sm font-medium text-gray-800 leading-tight hover:text-primary">
                        {product.name}
                    </h3>
                </Link>
                <div className="mt-2 flex items-center justify-between">
                    <p className="text-base font-bold text-primary">
                        {formattedPrice}
                    </p>
                    <button
                        onClick={handleAddToCart}
                        className={`p-2 rounded-full transition-colors ${isInCart
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-primary hover:text-white'
                            }`}
                        aria-label="Agregar al carrito"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
