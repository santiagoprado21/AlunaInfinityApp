
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular procesamiento del pago
    setTimeout(() => {
      toast({
        title: "¡Pedido realizado con éxito!",
        description: "Recibirás un correo con los detalles de tu compra.",
      });
      setIsSubmitting(false);
      // Aquí redirigirías a la página de confirmación de pedido
    }, 2000);
  };

  // Datos del carrito para el resumen
  const cartSubtotal = 129.70;
  const shipping = 0;
  const total = cartSubtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl text-center mb-8">Finalizar Compra</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Formulario de checkout */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit}>
              {/* Información de contacto */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="font-medium text-lg mb-4">Información de contacto</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                </div>
              </div>

              {/* Dirección de envío */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="font-medium text-lg mb-4">Dirección de envío</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apellidos</Label>
                    <Input id="lastName" required />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Input id="address" required />
                  </div>
                  <div>
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" required />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Código postal</Label>
                    <Input id="postalCode" required />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="notes">Notas de entrega (opcional)</Label>
                    <Textarea id="notes" placeholder="Instrucciones especiales para la entrega..." />
                  </div>
                </div>
              </div>

              {/* Método de pago */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="font-medium text-lg mb-4">Método de pago</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center">
                      Tarjeta de crédito/débito
                      <div className="flex items-center ml-2">
                        <div className="w-8 h-5 bg-blue-600 rounded mr-1"></div>
                        <div className="w-8 h-5 bg-red-500 rounded mr-1"></div>
                        <div className="w-8 h-5 bg-gray-800 rounded"></div>
                      </div>
                    </Label>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="border border-gray-200 rounded-md p-4 mb-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="cardNumber">Número de tarjeta</Label>
                          <Input id="cardNumber" placeholder="0000 0000 0000 0000" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Fecha de expiración</Label>
                            <Input id="expiryDate" placeholder="MM/AA" required />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" required />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="nameOnCard">Nombre en la tarjeta</Label>
                          <Input id="nameOnCard" required />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bizum" id="bizum" />
                    <Label htmlFor="bizum">Bizum</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="mt-8 flex justify-between">
                <Link to="/carrito">
                  <Button variant="outline" type="button">
                    Volver al carrito
                  </Button>
                </Link>
                <Button 
                  className="bg-terracota hover:bg-terracota/90" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Procesando..." : "Realizar pedido"}
                </Button>
              </div>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="font-medium text-lg mb-4">Resumen del pedido</h2>
              
              <div className="space-y-4">
                {/* Lista de productos (simplificada) */}
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden mr-3">
                      <img
                        src="https://images.unsplash.com/photo-1630263301548-228db9c1368f?q=80&w=2578&auto=format&fit=crop"
                        alt="Producto"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm">Pijama de Seda Lencero</p>
                      <p className="text-xs text-muted-foreground">Talla: M</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(89.90)}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden mr-3">
                      <img
                        src="https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?q=80&w=2486&auto=format&fit=crop"
                        alt="Producto"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm">Camisón Largo Estampado</p>
                      <p className="text-xs text-muted-foreground">Talla: L x2</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(39.80)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              {/* Detalles de precio */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="text-emerald-600">Gratis</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-medium text-lg mb-2">
                <span>Total</span>
                <span className="text-terracota">{formatPrice(total)}</span>
              </div>
              
              <p className="text-xs text-muted-foreground">
                IVA incluido. Los gastos de envío se calculan en función de tu ubicación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
