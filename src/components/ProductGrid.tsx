
import React from 'react';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

// Tipo para los productos
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductGridProps {
  products: Product[];
  className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, className }) => {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6", className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          image={product.image}
          isNew={product.isNew}
          isSale={product.isSale}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
