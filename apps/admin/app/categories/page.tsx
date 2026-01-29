'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Plus, Pencil, Trash2, Loader2, Check, X } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface Category {
    id: string;
    name: string;
    slug: string;
    _count?: { products: number };
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<string | null>(null);
    const [editName, setEditName] = useState('');
    const [newName, setNewName] = useState('');
    const [creating, setCreating] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_URL}/categories`);
            const data = await res.json();
            setCategories(data.data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreate = async () => {
        if (!newName.trim()) return;
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: newName }),
            });
            if (res.ok) {
                setNewName('');
                setCreating(false);
                fetchCategories();
            } else {
                alert('Error al crear categoría');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleUpdate = async (id: string) => {
        if (!editName.trim()) return;
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/categories/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: editName }),
            });
            if (res.ok) {
                setEditing(null);
                fetchCategories();
            } else {
                alert('Error al actualizar categoría');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro? Los productos de esta categoría quedarán sin categoría.')) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/categories/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                fetchCategories();
            } else {
                alert('Error al eliminar categoría');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const startEdit = (cat: Category) => {
        setEditing(cat.id);
        setEditName(cat.name);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar activeItem="categories" />

            <main className="ml-64 flex-1 p-8">
                <div className="max-w-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
                        {!creating && (
                            <button
                                onClick={() => setCreating(true)}
                                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Nueva Categoría
                            </button>
                        )}
                    </div>

                    {/* Create Form */}
                    {creating && (
                        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex gap-2">
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Nombre de la categoría"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                autoFocus
                            />
                            <button
                                onClick={handleCreate}
                                disabled={saving}
                                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                            </button>
                            <button
                                onClick={() => { setCreating(false); setNewName(''); }}
                                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Categories List */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500">
                                <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                            </div>
                        ) : categories.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                No hay categorías
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {categories.map((cat) => (
                                    <li key={cat.id} className="flex items-center p-4 hover:bg-gray-50">
                                        {editing === cat.id ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={() => handleUpdate(cat.id)}
                                                    disabled={saving}
                                                    className="ml-2 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                                                >
                                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => setEditing(null)}
                                                    className="ml-1 p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span className="flex-1 text-gray-900 font-medium">{cat.name}</span>
                                                <span className="text-sm text-gray-400 mr-4">
                                                    {cat._count?.products || 0} productos
                                                </span>
                                                <button
                                                    onClick={() => startEdit(cat)}
                                                    className="p-2 text-gray-400 hover:text-primary rounded-lg hover:bg-gray-100"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(cat.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
