'use client';

import { useState } from 'react';

type FilterOption = 'all' | 'in-stock' | 'pre-order';

interface StockFilterProps {
    onFilterChange?: (filter: FilterOption) => void;
}

export function StockFilter({ onFilterChange }: StockFilterProps) {
    const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

    const handleFilter = (filter: FilterOption) => {
        setActiveFilter(filter);
        onFilterChange?.(filter);
    };

    const filters: { value: FilterOption; label: string }[] = [
        { value: 'all', label: 'Todos' },
        { value: 'in-stock', label: 'En Stock' },
        { value: 'pre-order', label: 'A Pedido' },
    ];

    return (
        <div className="flex items-center justify-center gap-2 py-4">
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => handleFilter(filter.value)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter.value
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
                        }`}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
}
