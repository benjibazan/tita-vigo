'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Package, Tag, ShoppingCart } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    category?: { name: string };
    images?: { url: string }[];
}

export default function DashboardPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalProducts: 0,
        inStock: 0,
        ordersToday: 0,
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${API_URL}/products?limit=50`);
                const data = await res.json();
                const prods = data.data || [];

                setProducts(prods.slice(0, 5)); // Recent 5
                setStats({
                    totalProducts: data.meta?.total || prods.length,
                    inStock: prods.filter((p: Product) => p.stock > 0).length,
                    ordersToday: 0, // No orders module yet
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar activeItem="dashboard" />

            <main className="ml-64 flex-1 p-8">
                <div className="max-w-6xl">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-500">Jewelry e-commerce</p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-pink-100 rounded-lg">
                                    <Package className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Productos</p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {loading ? '...' : stats.totalProducts}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <Tag className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">En Stock</p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {loading ? '...' : stats.inStock}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Pedidos Hoy</p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {loading ? '...' : stats.ordersToday}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Products Table */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-900">Recent Products</h2>
                        </div>
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                            Cargando...
                                        </td>
                                    </tr>
                                ) : products.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                            No hay productos
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={product.images?.[0]?.url || 'https://via.placeholder.com/40'}
                                                        alt=""
                                                        className="w-10 h-10 rounded-lg object-cover"
                                                    />
                                                    <span className="text-sm text-gray-900">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {product.category?.name || 'Jewelry'}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                S/. {Number(product.price).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 0
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {product.stock > 0 ? 'En Stock' : 'A Pedido'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
