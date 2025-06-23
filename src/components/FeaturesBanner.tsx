
import React from 'react';
import { Truck, Shield, Repeat, Clock } from 'lucide-react';

const features = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: 'Envío Gratuito',
    description: 'En pedidos superiores a 50€',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Pago Seguro',
    description: 'Transacciones 100% protegidas',
  },
  {
    icon: <Repeat className="w-6 h-6" />,
    title: 'Devoluciones Fáciles',
    description: '30 días para devoluciones',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Soporte 24/7',
    description: 'Atención al cliente siempre disponible',
  },
];

const FeaturesBanner = () => {
  return (
    <section className="py-10 border-y border-terracota/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="text-terracota mb-3">{feature.icon}</div>
              <h3 className="text-sm font-medium mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBanner;
