'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { ChevronLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface Category {
    id: string;
    name: string;
}

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        stock: '0',
        isPreOrder: false,
        imageUrls: [''],
    });

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch(`${API_URL}/categories`);
                const data = await res.json();
                setCategories(data.data || []);
            } catch (e) {
                console.error('Error fetching categories:', e);
            }
        }
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const payload = {
                name: form.name,
                description: form.description,
                price: parseFloat(form.price),
                categoryId: form.categoryId,
                stock: parseInt(form.stock),
                isPreOrder: form.isPreOrder,
                imageUrls: form.imageUrls.filter(url => url.trim()),
            };

            const res = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Error al crear producto');
            }

            router.push('/products');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear producto');
        } finally {
            setLoading(false);
        }
    };

    const addImageUrl = () => {
        setForm(f => ({ ...f, imageUrls: [...f.imageUrls, ''] }));
    };

    const updateImageUrl = (index: number, value: string) => {
        setForm(f => ({
            ...f,
            imageUrls: f.imageUrls.map((url, i) => i === index ? value : url),
        }));
    };

    const removeImageUrl = (index: number) => {
        setForm(f => ({
            ...f,
            imageUrls: f.imageUrls.filter((_, i) => i !== index),
        }));
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar activeItem="products" />

            <main className="ml-64 flex-1 p-8">
                <div className="max-w-2xl">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href="/products"
                            className="inline-flex items-center text-gray-500 hover:text-primary mb-4"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Volver a productos
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Nuevo Producto</h1>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                        {error && (
                            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre *
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Descripción
                            </label>
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Precio (S/.) *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={form.price}
                                    onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={form.stock}
                                    onChange={(e) => setForm(f => ({ ...f, stock: e.target.value }))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Categoría *
                            </label>
                            <select
                                value={form.categoryId}
                                onChange={(e) => setForm(f => ({ ...f, categoryId: e.target.value }))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            >
                                <option value="">Seleccionar categoría</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isPreOrder"
                                checked={form.isPreOrder}
                                onChange={(e) => setForm(f => ({ ...f, isPreOrder: e.target.checked }))}
                                className="w-4 h-4 text-primary rounded focus:ring-primary"
                            />
                            <label htmlFor="isPreOrder" className="text-sm text-gray-700">
                                Disponible solo a pedido
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                URLs de Imágenes
                            </label>
                            {form.imageUrls.map((url, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        type="url"
                                        value={url}
                                        onChange={(e) => updateImageUrl(index, e.target.value)}
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    {form.imageUrls.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeImageUrl(index)}
                                            className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addImageUrl}
                                className="text-sm text-primary hover:underline"
                            >
                                + Agregar otra imagen
                            </button>
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t">
                            <Link
                                href="/products"
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Save className="w-5 h-5" />
                                )}
                                Guardar Producto
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
