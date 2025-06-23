
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular envío
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "¡Gracias por suscribirte!",
        description: "Recibirás nuestras novedades en tu correo.",
      });
      setEmail('');
    }, 1000);
  };

  return (
    <section className="bg-terracota/10 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-3xl mb-4">Únete a nuestro newsletter</h2>
          <p className="mb-6 text-muted-foreground">
            Suscríbete para recibir las últimas novedades, ofertas exclusivas y consejos de bienestar para mejorar tu descanso.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow"
            />
            <Button 
              type="submit" 
              className="bg-terracota hover:bg-terracota/90 text-white" 
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : 'Suscribirse'}
            </Button>
          </form>
          <p className="text-xs mt-3 text-muted-foreground">
            Al suscribirte, aceptas nuestra política de privacidad y términos de uso.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
