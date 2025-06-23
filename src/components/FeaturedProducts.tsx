
import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from './ProductGrid';
import { Button } from '@/components/ui/button';
import type { Product } from './ProductGrid';
import { cn } from '@/lib/utils';

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  className?: string;
  buttonLabel?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title,
  subtitle,
  products,
  viewAllLink,
  className,
  buttonLabel = "Ver todos",
}) => {
  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl mb-2">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>

        <ProductGrid products={products} />

        {viewAllLink && (
          <div className="flex justify-center mt-10">
            <Link to={viewAllLink}>
              <Button variant="outline" className="border-terracota text-terracota hover:bg-terracota hover:text-white">
                {buttonLabel}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
