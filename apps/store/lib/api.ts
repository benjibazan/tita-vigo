const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    slug: string;
    stock: number;
    isPreOrder: boolean;
    category: {
        id: string;
        name: string;
        slug: string;
    };
    images: {
        id: string;
        url: string;
        order: number;
    }[];
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export async function getProducts(params?: {
    page?: number;
    limit?: number;
    categoryId?: string;
    search?: string;
}): Promise<PaginatedResponse<Product>> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.categoryId) searchParams.set('categoryId', params.categoryId);
    if (params?.search) searchParams.set('search', params.search);

    const res = await fetch(`${API_URL}/products?${searchParams.toString()}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error('Failed to fetch products');

    return res.json();
}

export async function getProductBySlug(slug: string): Promise<{ data: Product }> {
    const res = await fetch(`${API_URL}/products/slug/${slug}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error('Product not found');

    return res.json();
}

export async function getCategories(): Promise<{ data: Category[] }> {
    const res = await fetch(`${API_URL}/categories`, {
        next: { revalidate: 300 },
    });

    if (!res.ok) throw new Error('Failed to fetch categories');

    return res.json();
}
