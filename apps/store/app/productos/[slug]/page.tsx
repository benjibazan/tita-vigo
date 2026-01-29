'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, Heart, ShoppingCart, MessageCircle, Check } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    stock: number;
    description?: string;
    isPreOrder: boolean;
    category?: { name: string; slug: string };
    images?: { url: string }[];
}

export default function ProductDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { addItem, items } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);

    const isInCart = product ? items.some((i) => i.id === product.id) : false;

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`${API_URL}/products/slug/${slug}`);
                if (!res.ok) throw new Error('Not found');
                const data = await res.json();
                setProduct(data.data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [slug]);

    const handleAddToCart = () => {
        if (!product) return;
        addItem({
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: Number(product.price),
            image: product.images?.[0]?.url,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
                <h1 className="text-xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
                <Link href="/productos" className="text-primary hover:underline">
                    Ver todos los productos
                </Link>
            </div>
        );
    }

    const isInStock = product.stock > 0;
    const formattedPrice = `S/. ${Number(product.price).toFixed(2)}`;

    const whatsappMessage = encodeURIComponent(
        `Hola! Me interesa el producto: ${product.name} - ${formattedPrice}\n\nEnlace: https://titavigo.pe/productos/${slug}`
    );

    return (
        <div className="pb-24 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                <Link
                    href="/productos"
                    className="inline-flex items-center text-gray-600 hover:text-primary"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Volver</span>
                </Link>
                <div className="flex items-center gap-4">
                    <button className="p-2">
                        <Heart className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-[#f5ebe0] p-6">
                <div className="max-w-md mx-auto">
                    <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-sm">
                        <img
                            src={product.images?.[0]?.url || 'https://via.placeholder.com/600x600/f5f5f5/333?text=Producto'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {product.images && product.images.length > 1 && (
                        <div className="flex justify-center gap-2 mt-4">
                            {product.images.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-gray-800' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Product Info */}
            <div className="px-4 py-6 max-w-2xl mx-auto bg-white -mt-4 rounded-t-3xl relative z-10">
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

                <div className="mt-3 flex items-center gap-3">
                    <span className="text-2xl font-bold text-primary">{formattedPrice}</span>
                    {isInStock ? (
                        <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                            En Stock
                        </span>
                    ) : (
                        <span className="bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full font-medium">
                            A Pedido
                        </span>
                    )}
                </div>

                <p className="mt-4 text-gray-600 leading-relaxed">
                    {product.description || 'Elegante joya de plata peruana. Hecho a mano con los más altos estándares de calidad.'}
                </p>

                {product.category && (
                    <div className="mt-4 text-sm text-gray-500">
                        Categoría:{' '}
                        <Link
                            href={`/productos?category=${product.category.slug}`}
                            className="text-primary hover:underline"
                        >
                            {product.category.name}
                        </Link>
                    </div>
                )}
            </div>

            {/* Sticky CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
                <div className="flex gap-3 max-w-2xl mx-auto">
                    <button
                        onClick={handleAddToCart}
                        disabled={isInCart || added}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-semibold transition-colors ${isInCart || added
                                ? 'bg-green-500 text-white'
                                : 'bg-primary text-white hover:bg-primary-dark'
                            }`}
                    >
                        {added || isInCart ? (
                            <>
                                <Check className="w-5 h-5" />
                                En el carrito
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="w-5 h-5" />
                                Agregar al carrito
                            </>
                        )}
                    </button>
                    <a
                        href={`https://wa.me/51999999999?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                        aria-label="WhatsApp"
                    >
                        <MessageCircle className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </div>
    );
}
