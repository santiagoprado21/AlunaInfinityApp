
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Category {
  id: number;
  name: string;
  image: string;
  url: string;
}

interface CategorySectionProps {
  categories: Category[];
  className?: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories, className }) => {
  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl mb-8 text-center">Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.url}
              className="relative group overflow-hidden rounded-lg"
            >
              <div className="aspect-square">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-serif text-xl md:text-2xl px-4 py-2 bg-black/30 rounded">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
