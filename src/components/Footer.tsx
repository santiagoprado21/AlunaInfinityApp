
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-terracota/10 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-serif text-terracota mb-4 inline-block">
              Dulce Sueño
            </Link>
            <p className="text-sm mb-4">
              Diseños exclusivos para un descanso perfecto. Nuestras pijamas combinan estilo y confort para tus noches.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-terracota hover:text-terracota/80">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-terracota hover:text-terracota/80">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-terracota hover:text-terracota/80">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-serif font-medium text-lg mb-4">Compra</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalogo" className="text-sm hover:text-terracota">Catálogo</Link>
              </li>
              <li>
                <Link to="/nuevos" className="text-sm hover:text-terracota">Nuevos Productos</Link>
              </li>
              <li>
                <Link to="/ofertas" className="text-sm hover:text-terracota">Ofertas</Link>
              </li>
              <li>
                <Link to="/colecciones" className="text-sm hover:text-terracota">Colecciones</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="font-serif font-medium text-lg mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/nosotros" className="text-sm hover:text-terracota">Sobre nosotros</Link>
              </li>
              <li>
                <Link to="/contacto" className="text-sm hover:text-terracota">Contacto</Link>
              </li>
              <li>
                <Link to="/responsabilidad" className="text-sm hover:text-terracota">Responsabilidad</Link>
              </li>
              <li>
                <Link to="/afiliados" className="text-sm hover:text-terracota">Programa de afiliados</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="font-serif font-medium text-lg mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/envios" className="text-sm hover:text-terracota">Envíos y devoluciones</Link>
              </li>
              <li>
                <Link to="/ayuda" className="text-sm hover:text-terracota">Centro de ayuda</Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes" className="text-sm hover:text-terracota">Preguntas frecuentes</Link>
              </li>
              <li>
                <Link to="/privacidad" className="text-sm hover:text-terracota">Privacidad y términos</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-terracota/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-center md:text-left mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Dulce Sueño. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacidad" className="text-xs hover:text-terracota">Política de Privacidad</Link>
              <Link to="/terminos" className="text-xs hover:text-terracota">Términos y Condiciones</Link>
              <Link to="/cookies" className="text-xs hover:text-terracota">Política de Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
