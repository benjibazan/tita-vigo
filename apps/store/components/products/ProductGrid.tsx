import { ProductCard } from './ProductCard';

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    stock: number;
    isPreOrder?: boolean;
    image?: string;
}

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
