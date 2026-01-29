'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { ProductGrid } from '@/components/products/ProductGrid';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    stock: number;
    isPreOrder?: boolean;
    image?: string;
}

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setSearched(true);

        try {
            const res = await fetch(`${API_URL}/products?search=${encodeURIComponent(query)}&limit=20`);
            const data = await res.json();
            const mapped = (data.data || []).map((p: any) => ({
                id: p.id,
                name: p.name,
                slug: p.slug,
                price: Number(p.price),
                stock: p.stock,
                isPreOrder: p.isPreOrder,
                image: p.images?.[0]?.url,
            }));
            setProducts(mapped);
        } catch (error) {
            console.error('Error searching:', error);
        } finally {
            setLoading(false);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setProducts([]);
        setSearched(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Search Header */}
            <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3">
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar joyas..."
                        className="w-full pl-10 pr-10 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                        autoFocus
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </form>
            </div>

            {/* Content */}
            <div className="px-4 py-6">
                {!searched ? (
                    <div className="text-center py-12">
                        <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                            Busca anillos, collares, aretes y más
                        </p>
                    </div>
                ) : loading ? (
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-gray-200 rounded-2xl aspect-square animate-pulse" />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-2">
                            No encontramos productos para "{query}"
                        </p>
                        <p className="text-sm text-gray-400">
                            Intenta con otro término de búsqueda
                        </p>
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-gray-500 mb-4">
                            {products.length} resultado{products.length !== 1 ? 's' : ''} para "{query}"
                        </p>
                        <ProductGrid products={products} />
                    </>
                )}
            </div>
        </div>
    );
}
