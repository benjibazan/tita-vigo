'use client';

import { useState, useEffect } from 'react';
import { StockFilter } from '@/components/products/StockFilter';
import { ProductGrid } from '@/components/products/ProductGrid';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

type FilterOption = 'all' | 'in-stock' | 'pre-order';

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    stock: number;
    isPreOrder?: boolean;
    image?: string;
}

export default function CatalogPage() {
    const [filter, setFilter] = useState<FilterOption>('all');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(`${API_URL}/products?limit=50`);
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
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        if (filter === 'all') return true;
        if (filter === 'in-stock') return product.stock > 0;
        if (filter === 'pre-order') return product.stock === 0;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white px-4 py-4 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-900 text-center">Catálogo</h1>
            </div>

            {/* Filters */}
            <StockFilter onFilterChange={setFilter} />

            {/* Products Grid */}
            <div className="px-4">
                {loading ? (
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-gray-200 rounded-2xl aspect-square animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <ProductGrid products={filteredProducts} />
                )}
            </div>

            {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No hay productos en esta categoría
                </div>
            )}
        </div>
    );
}
