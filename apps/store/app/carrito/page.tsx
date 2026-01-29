'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();

    const whatsappMessage = encodeURIComponent(
        `¡Hola! Me gustaría hacer un pedido:\n\n${items
            .map((item) => `• ${item.name} x${item.quantity} - S/. ${(item.price * item.quantity).toFixed(2)}`)
            .join('\n')}\n\n📦 Total: S/. ${totalPrice.toFixed(2)}`
    );

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 pb-20">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <h1 className="text-xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h1>
                <p className="text-gray-500 mb-6 text-center">
                    Explora nuestra colección y agrega joyas a tu carrito
                </p>
                <Link
                    href="/productos"
                    className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
                >
                    Ver productos
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* Header */}
            <div className="bg-white px-4 py-4 border-b border-gray-100 sticky top-0 z-30">
                <h1 className="text-xl font-bold text-gray-900 text-center">Mi Carrito</h1>
            </div>

            {/* Items */}
            <div className="px-4 py-4 space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm">
                        {/* Image */}
                        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                                src={item.image || 'https://via.placeholder.com/80'}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <Link href={`/productos/${item.slug}`} className="font-medium text-gray-900 hover:text-primary line-clamp-2">
                                {item.name}
                            </Link>
                            <p className="text-primary font-bold mt-1">
                                S/. {item.price.toFixed(2)}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-2 text-gray-400 hover:text-red-500"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Clear Cart */}
            <div className="px-4">
                <button
                    onClick={clearCart}
                    className="text-sm text-gray-500 hover:text-red-500"
                >
                    Vaciar carrito
                </button>
            </div>

            {/* Summary & CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Total ({items.length} productos)</span>
                    <span className="text-2xl font-bold text-primary">S/. {totalPrice.toFixed(2)}</span>
                </div>
                <a
                    href={`https://wa.me/51999999999?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-colors"
                >
                    <MessageCircle className="w-5 h-5" />
                    Pedir por WhatsApp
                </a>
            </div>
        </div>
    );
}
