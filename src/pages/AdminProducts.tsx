
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Package, Eye } from 'lucide-react';
import { featuredProducts, newArrivals } from '@/data/mockData';

// Simular productos con información de inventario
const productsWithInventory = [...featuredProducts, ...newArrivals].map(product => ({
  ...product,
  sku: `ALU-${product.id.toString().padStart(4, '0')}`,
  category: product.id % 2 === 0 ? 'Mujer' : 'Hombre',
  stock: {
    total: Math.floor(Math.random() * 100) + 10,
    bySize: {
      XS: Math.floor(Math.random() * 10) + 1,
      S: Math.floor(Math.random() * 15) + 2,
      M: Math.floor(Math.random() * 20) + 3,
      L: Math.floor(Math.random() * 15) + 2,
      XL: Math.floor(Math.random() * 10) + 1,
    }
  },
  colors: ['Rosa', 'Azul', 'Blanco', 'Negro'].slice(0, Math.floor(Math.random() * 3) + 1),
  status: Math.random() > 0.8 ? 'Agotado' : Math.random() > 0.6 ? 'Bajo Stock' : 'Disponible'
}));

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products] = useState(productsWithInventory);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disponible':
        return <Badge className="bg-green-100 text-green-800">Disponible</Badge>;
      case 'Bajo Stock':
        return <Badge className="bg-yellow-100 text-yellow-800">Bajo Stock</Badge>;
      case 'Agotado':
        return <Badge className="bg-red-100 text-red-800">Agotado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-3xl mb-2">Gestión de Productos</h1>
            <p className="text-muted-foreground">Administra el catálogo de pijamas</p>
          </div>
          <Link to="/admin/productos/nuevo">
            <Button className="bg-terracota hover:bg-terracota/90">
              <Plus className="mr-2 w-4 h-4" />
              Nuevo Producto
            </Button>
          </Link>
        </div>

        {/* Filtros y búsqueda */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  className="pl-10"
                  placeholder="Buscar productos por nombre o SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Filtrar por Categoría</Button>
                <Button variant="outline">Filtrar por Estado</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de productos */}
        <Card>
          <CardHeader>
            <CardTitle>Productos ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Producto</th>
                    <th className="text-left py-3 px-2">SKU</th>
                    <th className="text-left py-3 px-2">Categoría</th>
                    <th className="text-left py-3 px-2">Precio</th>
                    <th className="text-left py-3 px-2">Stock Total</th>
                    <th className="text-left py-3 px-2">Estado</th>
                    <th className="text-left py-3 px-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.colors.join(', ')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2 font-mono text-sm">{product.sku}</td>
                      <td className="py-4 px-2">{product.category}</td>
                      <td className="py-4 px-2 font-medium">{formatPrice(product.price)}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-1">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span>{product.stock.total}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">{getStatusBadge(product.status)}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-2">
                          <Link to={`/producto/${product.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link to={`/admin/productos/editar/${product.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminProducts;
