
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1515816052601-210d5501d471?q=80&w=2574&auto=format&fit=crop"
          alt="Mujer vistiendo pijama elegante"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl text-white">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-4 leading-tight animate-entrance" style={{ animationDelay: '200ms' }}>
            Descubre el lujo <br />del descanso perfecto
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-entrance" style={{ animationDelay: '400ms' }}>
            Pijamas diseñadas para envolverte en comodidad y elegancia toda la noche.
          </p>
          <div className="flex gap-4 animate-entrance" style={{ animationDelay: '600ms' }}>
            <Button size="lg" className="bg-terracota hover:bg-terracota/90 text-white border-none">
              Comprar ahora
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/10">
              Ver colecciones
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white animate-entrance" style={{ animationDelay: '800ms' }}>
        <span className="text-sm mb-2">Descubre más</span>
        <ArrowRight className="w-5 h-5 rotate-90" />
      </div>
    </div>
  );
};

export default Hero;
