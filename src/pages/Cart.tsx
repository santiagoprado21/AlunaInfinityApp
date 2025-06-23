
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { featuredProducts } from '@/data/mockData';

// Simular items del carrito
const cartItems = [
  {
    id: 1,
    productId: 1,
    name: featuredProducts[0].name,
    price: featuredProducts[0].price,
    image: featuredProducts[0].image,
    quantity: 1,
    size: 'M',
  },
  {
    id: 2,
    productId: 3,
    name: featuredProducts[2].name,
    price: featuredProducts[2].price,
    originalPrice: featuredProducts[2].originalPrice,
    image: featuredProducts[2].image,
    quantity: 2,
    size: 'L',
  },
];

const Cart = () => {
  const [items, setItems] = useState(cartItems);
  const [couponCode, setCouponCode] = useState('');
  const { toast } = useToast();

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Artículo eliminado",
      description: "El producto ha sido eliminado del carrito",
    });
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Error",
        description: "Por favor, introduce un código de cupón",
        variant: "destructive",
      });
      return;
    }
    
    // Simular validación de cupón
    setTimeout(() => {
      if (couponCode.toLowerCase() === 'descuento10') {
        toast({
          title: "Cupón aplicado",
          description: "Se ha aplicado un 10% de descuento",
        });
      } else {
        toast({
          title: "Cupón inválido",
          description: "El código introducido no es válido",
          variant: "destructive",
        });
      }
    }, 500);
  };

  // Calcular totales
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const discount = couponCode.toLowerCase() === 'descuento10' ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl text-center mb-8">Tu Carrito</h1>

        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lista de productos */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-medium text-lg mb-4">Productos</h2>
                
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row py-4 border-b border-gray-100 last:border-0">
                    {/* Imagen del producto */}
                    <div className="sm:w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 mb-3 sm:mb-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Información del producto */}
                    <div className="flex-grow px-4">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-1">Talla: {item.size}</p>
                          <div className="flex items-center">
                            <span className="font-medium text-terracota">{formatPrice(item.price)}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                {formatPrice(item.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-2 sm:mt-0">
                          {/* Control de cantidad */}
                          <div className="flex items-center border border-gray-200 rounded-md mr-4">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-gray-500 hover:text-terracota"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-500 hover:text-terracota"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          
                          {/* Botón eliminar */}
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 flex justify-between">
                  <Link to="/catalogo">
                    <Button variant="link" className="text-terracota pl-0">
                      Continuar comprando
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Resumen de compra */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-medium text-lg mb-4">Resumen</h2>
                
                {/* Cupón de descuento */}
                <div className="flex items-center gap-2 mb-6">
                  <Input
                    placeholder="Código de descuento"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow"
                  />
                  <Button 
                    onClick={applyCoupon}
                    className="whitespace-nowrap bg-terracota hover:bg-terracota/90"
                  >
                    Aplicar
                  </Button>
                </div>
                
                <Separator className="my-4" />
                
                {/* Detalles de precio */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gastos de envío</span>
                    {shipping === 0 ? (
                      <span className="text-emerald-600">Gratis</span>
                    ) : (
                      <span>{formatPrice(shipping)}</span>
                    )}
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Descuento</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-medium text-lg mb-6">
                  <span>Total</span>
                  <span className="text-terracota">{formatPrice(total)}</span>
                </div>
                
                <Link to="/checkout">
                  <Button className="w-full bg-terracota hover:bg-terracota/90 py-6">
                    Finalizar Compra
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </Link>
                
                <p className="text-xs text-center mt-4 text-muted-foreground">
                  Los impuestos se calcularán en el proceso de pago
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingBag className="mx-auto mb-4 text-terracota" size={64} strokeWidth={1} />
            <h2 className="font-serif text-2xl mb-2">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-6">¿No sabes por dónde empezar? Explora nuestras colecciones</p>
            <Link to="/catalogo">
              <Button className="bg-terracota hover:bg-terracota/90">
                Ver catálogo
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
