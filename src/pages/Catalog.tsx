
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ProductGrid, { Product } from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronUp, Search, SlidersHorizontal } from 'lucide-react';
import { featuredProducts, newArrivals } from '@/data/mockData';

// Combinar todos los productos
const allProducts = [...featuredProducts, ...newArrivals];

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 120]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('featured');

  // Opciones de categorías
  const categories = ['Mujer', 'Hombre', 'Batas', 'Conjuntos', 'Satén', 'Algodón'];

  useEffect(() => {
    // Filtrar productos basado en los filtros seleccionados
    let filteredProducts = allProducts;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por rango de precio
    filteredProducts = filteredProducts.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filtrar por categorías (en un escenario real, los productos tendrían una propiedad category)
    if (selectedCategories.length > 0) {
      // Aquí simularemos la filtración, asumiendo que productos con ID par son mujeres e impares hombres
      filteredProducts = filteredProducts.filter(product => {
        const isMujer = product.id % 2 === 0;
        
        if (selectedCategories.includes('Mujer') && isMujer) return true;
        if (selectedCategories.includes('Hombre') && !isMujer) return true;
        
        // Más filtros simulados
        if (selectedCategories.includes('Batas') && product.name.includes('Bata')) return true;
        if (selectedCategories.includes('Conjuntos') && product.name.includes('Conjunto')) return true;
        if (selectedCategories.includes('Satén') && product.name.includes('Satén')) return true;
        if (selectedCategories.includes('Algodón') && product.name.includes('Algodón')) return true;
        
        return selectedCategories.length === 0;
      });
    }

    // Ordenar productos
    switch (sortOption) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // featured - no cambiar el orden por defecto
        break;
    }

    setProducts(filteredProducts);
  }, [searchTerm, priceRange, selectedCategories, sortOption]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl text-center mb-8">Catálogo de Pijamas</h1>

        {/* Barra de búsqueda y filtros móviles */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={toggleFilters}
            variant="outline" 
            className="md:hidden flex items-center gap-2"
          >
            <SlidersHorizontal size={16} />
            Filtros
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
          <div className="relative min-w-[200px]">
            <select
              className="w-full h-10 pl-3 pr-8 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-1 focus:ring-terracota"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Destacados</option>
              <option value="price-low">Precio: Menor a Mayor</option>
              <option value="price-high">Precio: Mayor a Menor</option>
              <option value="newest">Lo más nuevo</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Panel de filtros - visible en escritorio, toggle en móvil */}
          <div className={`md:w-1/4 lg:w-1/5 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-cream p-4 rounded-lg shadow-sm">
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categorías</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-sm">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-3">Precio</h3>
                <Slider
                  value={priceRange}
                  min={0}
                  max={120}
                  step={5}
                  onValueChange={setPriceRange}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm">
                  <span>{priceRange[0]}€</span>
                  <span>{priceRange[1]}€</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium mb-3">Filtros</h3>
                <div className="flex items-center">
                  <Checkbox id="filter-new" />
                  <label htmlFor="filter-new" className="ml-2 text-sm">Nuevos</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="filter-sale" />
                  <label htmlFor="filter-sale" className="ml-2 text-sm">En oferta</label>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de productos */}
          <div className="flex-grow">
            {products.length > 0 ? (
              <>
                <ProductGrid products={products} />
                <div className="mt-8 text-center">
                  <p className="text-muted-foreground mb-4">Mostrando {products.length} productos</p>
                  <Button variant="outline" className="border-terracota text-terracota">
                    Cargar más
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-lg mb-4">No se encontraron productos que coincidan con los filtros.</p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setPriceRange([0, 120]);
                    setSelectedCategories([]);
                    setSortOption('featured');
                  }}
                  className="bg-terracota hover:bg-terracota/90"
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
