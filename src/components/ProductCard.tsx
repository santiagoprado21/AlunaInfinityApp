
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  isNew = false,
  isSale = false,
  className,
}) => {
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Aquí iría la lógica para añadir al carrito
    toast({
      title: "Añadido al carrito",
      description: `${name} se ha añadido a tu carrito`,
    });
  };

  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);

  const formattedOriginalPrice = originalPrice
    ? new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
      }).format(originalPrice)
    : null;

  return (
    <Link to={`/producto/${id}`} className={cn("group block animate-entrance", className)}>
      <div className="relative overflow-hidden rounded-md mb-3">
        {/* Imagen del producto */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Etiquetas */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <span className="bg-terracota text-white text-xs px-2 py-1 rounded">
              Nuevo
            </span>
          )}
          {isSale && (
            <span className="bg-black text-white text-xs px-2 py-1 rounded">
              Oferta
            </span>
          )}
        </div>

        {/* Botón de añadir al carrito */}
        <Button
          onClick={handleAddToCart}
          variant="secondary"
          className="absolute bottom-2 right-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 p-2 bg-terracota text-white hover:bg-terracota/90"
          size="icon"
        >
          <ShoppingCart size={16} />
        </Button>
      </div>

      {/* Información del producto */}
      <h3 className="text-sm font-medium mb-1 truncate">{name}</h3>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-terracota">{formattedPrice}</span>
        {formattedOriginalPrice && (
          <span className="text-xs text-gray-500 line-through">{formattedOriginalPrice}</span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
