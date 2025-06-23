
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { featuredProducts, newArrivals } from '@/data/mockData';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  // Combinar productos para simular una base de datos
  const allProducts = [...featuredProducts, ...newArrivals];
  
  // Encontrar el producto por ID
  const product = allProducts.find(p => p.id === parseInt(id || '0'));
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-serif mb-4">Producto no encontrado</h2>
          <p className="mb-6">El producto que buscas no está disponible.</p>
          <Link to="/catalogo">
            <Button variant="outline">Ver todos los productos</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Selecciona una talla",
        description: "Por favor, selecciona una talla antes de añadir al carrito",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Añadido al carrito",
      description: `${product.name} (${selectedSize}) x${quantity} añadido al carrito`,
    });
  };
  
  const formattedPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
      }).format(product.originalPrice)
    : null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Imagen del producto */}
          <div className="md:w-1/2">
            <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Detalles del producto */}
          <div className="md:w-1/2">
            <h1 className="font-serif text-3xl mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-medium text-terracota">{formattedPrice}</span>
              {formattedOriginalPrice && (
                <span className="text-lg text-gray-500 line-through">{formattedOriginalPrice}</span>
              )}
              {product.isSale && (
                <span className="bg-black text-white text-xs px-2 py-1 rounded">Oferta</span>
              )}
              {product.isNew && (
                <span className="bg-terracota text-white text-xs px-2 py-1 rounded">Nuevo</span>
              )}
            </div>
            
            <p className="text-muted-foreground mb-6">
              Pijama confeccionada con materiales premium para garantizar la máxima comodidad durante el descanso. 
              Diseño elegante y atemporal que combina estilo y funcionalidad.
            </p>
            
            {/* Selector de tallas */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Talla</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className={`min-w-[3rem] ${
                      selectedSize === size ? "bg-terracota hover:bg-terracota/90 border-terracota" : "border-gray-300"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Selector de cantidad */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Cantidad</h3>
              <div className="flex items-center border border-gray-300 rounded-md w-fit">
                <Button variant="ghost" size="icon" onClick={decreaseQuantity}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={increaseQuantity}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="flex gap-4 mb-8">
              <Button 
                onClick={handleAddToCart}
                className="flex-grow py-6 bg-terracota hover:bg-terracota/90"
              >
                <ShoppingCart className="mr-2 w-5 h-5" /> Añadir al carrito
              </Button>
              <Button variant="outline" className="border-terracota hover:bg-terracota/10" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Información adicional */}
            <div className="border-t border-gray-200 pt-6">
              <div className="mb-4">
                <h3 className="font-medium mb-2">Material</h3>
                <p className="text-sm text-muted-foreground">95% Algodón, 5% Elastano</p>
              </div>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Instrucciones de Cuidado</h3>
                <p className="text-sm text-muted-foreground">Lavado a máquina a 30°. No usar lejía. No secar en secadora.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Disponibilidad</h3>
                <p className="text-sm text-emerald-600">En stock - Envío en 24/48h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
