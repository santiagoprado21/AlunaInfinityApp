
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, User, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-cream/90 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif text-terracota">
            Dulce Sueño
          </Link>

          {/* Desktop Navigation */}
          <div className={cn("hidden md:flex items-center space-x-6")}>
            <Link to="/catalogo" className="text-sm font-medium hover:text-terracota transition-colors">
              Catálogo
            </Link>
            <Link to="/nuevos" className="text-sm font-medium hover:text-terracota transition-colors">
              Nuevos
            </Link>
            <Link to="/ofertas" className="text-sm font-medium hover:text-terracota transition-colors">
              Ofertas
            </Link>
            <Link to="/colecciones" className="text-sm font-medium hover:text-terracota transition-colors">
              Colecciones
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:text-terracota">
              <Search className="w-5 h-5" />
            </Button>
            <Link to="/carrito">
              <Button variant="ghost" size="icon" className="hover:text-terracota relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-terracota text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="hover:text-terracota hidden md:flex">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-cream absolute w-full animate-fade-in py-4 shadow-md">
          <div className="flex flex-col space-y-4 px-6">
            <Link to="/catalogo" className="text-sm font-medium py-2 border-b border-terracota/20" onClick={toggleMenu}>
              Catálogo
            </Link>
            <Link to="/nuevos" className="text-sm font-medium py-2 border-b border-terracota/20" onClick={toggleMenu}>
              Nuevos
            </Link>
            <Link to="/ofertas" className="text-sm font-medium py-2 border-b border-terracota/20" onClick={toggleMenu}>
              Ofertas
            </Link>
            <Link to="/colecciones" className="text-sm font-medium py-2 border-b border-terracota/20" onClick={toggleMenu}>
              Colecciones
            </Link>
            <Link to="/cuenta" className="text-sm font-medium py-2 border-b border-terracota/20" onClick={toggleMenu}>
              Mi Cuenta
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
