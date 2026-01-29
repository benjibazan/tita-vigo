import Link from 'next/link';

interface Category {
    id: string;
    name: string;
    slug: string;
    image?: string;
}

interface CategoryCirclesProps {
    categories: Category[];
}

export function CategoryCircles({ categories }: CategoryCirclesProps) {
    return (
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/productos?category=${category.slug}`}
                    className="flex flex-col items-center gap-2 min-w-[80px]"
                >
                    <div className="w-20 h-20 rounded-full border-2 border-primary p-1 hover:scale-105 transition-transform">
                        <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                            {category.image ? (
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-2xl">💍</span>
                            )}
                        </div>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{category.name}</span>
                </Link>
            ))}
        </div>
    );
}
