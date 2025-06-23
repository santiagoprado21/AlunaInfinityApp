
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Search, AlertTriangle, Package, Edit, Save, Plus, Minus, Download, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface InventoryItem {
  id: number;
  sku: string;
  name: string;
  totalStock: number;
  lowStockThreshold: number;
  sizes: {
    [key: string]: { stock: number; reserved: number };
  };
  colors: {
    [key: string]: number;
  };
  category: string;
  cost: number;
  price: number;
}

const AdminInventory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 1,
      sku: 'ALU-0001',
      name: 'Pijama de Seda Lencero',
      totalStock: 45,
      lowStockThreshold: 10,
      category: 'Mujer',
      cost: 35.00,
      price: 89.90,
      sizes: {
        XS: { stock: 5, reserved: 1 },
        S: { stock: 12, reserved: 2 },
        M: { stock: 15, reserved: 3 },
        L: { stock: 10, reserved: 1 },
        XL: { stock: 3, reserved: 0 },
      },
      colors: {
        'Rosa': 20,
        'Azul': 15,
        'Blanco': 10,
      }
    },
    {
      id: 2,
      sku: 'ALU-0002',
      name: 'Camisón Largo Estampado',
      totalStock: 8,
      lowStockThreshold: 10,
      category: 'Mujer',
      cost: 20.00,
      price: 49.90,
      sizes: {
        XS: { stock: 1, reserved: 0 },
        S: { stock: 2, reserved: 1 },
        M: { stock: 3, reserved: 2 },
        L: { stock: 2, reserved: 0 },
        XL: { stock: 0, reserved: 0 },
      },
      colors: {
        'Floral': 5,
        'Rayas': 3,
      }
    },
    {
      id: 3,
      sku: 'ALU-0003',
      name: 'Conjunto Algodón Orgánico',
      totalStock: 32,
      lowStockThreshold: 15,
      category: 'Unisex',
      cost: 25.00,
      price: 59.90,
      sizes: {
        XS: { stock: 4, reserved: 0 },
        S: { stock: 8, reserved: 1 },
        M: { stock: 12, reserved: 2 },
        L: { stock: 6, reserved: 1 },
        XL: { stock: 2, reserved: 0 },
      },
      colors: {
        'Blanco': 15,
        'Gris': 10,
        'Azul': 7,
      }
    },
  ]);

  const getStockStatus = (current: number, threshold: number) => {
    if (current === 0) {
      return { badge: <Badge className="bg-red-100 text-red-800">Agotado</Badge>, status: 'out-of-stock' };
    } else if (current <= threshold) {
      return { badge: <Badge className="bg-yellow-100 text-yellow-800">Bajo Stock</Badge>, status: 'low-stock' };
    } else {
      return { badge: <Badge className="bg-green-100 text-green-800">En Stock</Badge>, status: 'in-stock' };
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const statusInfo = getStockStatus(item.totalStock, item.lowStockThreshold);
    const matchesStatus = filterStatus === 'all' || statusInfo.status === filterStatus;
    
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const updateStock = (itemId: number, size: string, newStock: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        const updatedSizes = { ...item.sizes, [size]: { ...item.sizes[size], stock: Math.max(0, newStock) } };
        const newTotal = Object.values(updatedSizes).reduce((sum, s) => sum + s.stock, 0);
        return { ...item, sizes: updatedSizes, totalStock: newTotal };
      }
      return item;
    }));
    
    toast({
      title: "Stock actualizado",
      description: `Stock de talla ${size} actualizado correctamente`,
    });
  };

  const updateThreshold = (itemId: number, newThreshold: number) => {
    setInventory(prev => prev.map(item => 
      item.id === itemId ? { ...item, lowStockThreshold: Math.max(1, newThreshold) } : item
    ));
    
    toast({
      title: "Umbral actualizado",
      description: "Umbral de stock bajo actualizado correctamente",
    });
  };

  const getLowStockCount = () => {
    return inventory.filter(item => item.totalStock <= item.lowStockThreshold).length;
  };

  const getOutOfStockCount = () => {
    return inventory.filter(item => item.totalStock === 0).length;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link to="/admin">
            <Button variant="outline" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div className="flex-grow">
            <h1 className="font-serif text-3xl mb-2">Control de Inventario</h1>
            <p className="text-muted-foreground">Gestiona el stock de todos los productos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </Button>
          </div>
        </div>

        {/* Resumen de alertas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                <div>
                  <div className="text-yellow-800 font-medium">{getLowStockCount()} productos con bajo stock</div>
                  <div className="text-sm text-yellow-600">Requieren reabastecimiento</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Package className="w-5 h-5 text-red-600 mr-2" />
                <div>
                  <div className="text-red-800 font-medium">{getOutOfStockCount()} productos agotados</div>
                  <div className="text-sm text-red-600">Sin stock disponible</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Package className="w-5 h-5 text-green-600 mr-2" />
                <div>
                  <div className="text-green-800 font-medium">{inventory.length} productos totales</div>
                  <div className="text-sm text-green-600">En el catálogo</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros y búsqueda */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  className="pl-10"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado del stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="in-stock">En Stock</SelectItem>
                  <SelectItem value="low-stock">Bajo Stock</SelectItem>
                  <SelectItem value="out-of-stock">Agotado</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="Mujer">Mujer</SelectItem>
                  <SelectItem value="Hombre">Hombre</SelectItem>
                  <SelectItem value="Unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="bg-terracota hover:bg-terracota/90">
                Aplicar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de inventario */}
        <div className="space-y-6">
          {filteredInventory.map((item) => {
            const statusInfo = getStockStatus(item.totalStock, item.lowStockThreshold);
            
            return (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        {item.name}
                        {statusInfo.badge}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        SKU: {item.sku} | Categoría: {item.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">Stock Total: {item.totalStock}</div>
                        <div className="text-sm text-muted-foreground">
                          Umbral: {item.lowStockThreshold}
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setEditingItem(item)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Editar Stock - {item.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Umbral de Stock Bajo</Label>
                              <Input
                                type="number"
                                value={item.lowStockThreshold}
                                onChange={(e) => updateThreshold(item.id, parseInt(e.target.value) || 1)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label>Stock por Talla</Label>
                              <div className="grid grid-cols-2 gap-4 mt-2">
                                {Object.entries(item.sizes).map(([size, data]) => (
                                  <div key={size} className="flex items-center space-x-2">
                                    <Label className="w-8">{size}:</Label>
                                    <div className="flex items-center border rounded">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => updateStock(item.id, size, data.stock - 1)}
                                      >
                                        <Minus className="w-3 h-3" />
                                      </Button>
                                      <span className="w-12 text-center text-sm">{data.stock}</span>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => updateStock(item.id, size, data.stock + 1)}
                                      >
                                        <Plus className="w-3 h-3" />
                                      </Button>
                                    </div>
                                    {data.reserved > 0 && (
                                      <span className="text-xs text-yellow-600">({data.reserved} reservado)</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Stock por talla */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Package className="w-4 h-4 mr-2" />
                        Stock por Talla
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(item.sizes).map(([size, data]) => (
                          <div key={size} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="font-medium">Talla {size}</span>
                            <div className="text-sm">
                              <span className={`font-medium ${data.stock === 0 ? 'text-red-600' : data.stock <= 3 ? 'text-yellow-600' : 'text-green-600'}`}>
                                {data.stock}
                              </span>
                              {data.reserved > 0 && (
                                <span className="text-yellow-600 ml-2">
                                  ({data.reserved} reservado)
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stock por color */}
                    <div>
                      <h4 className="font-medium mb-3">Stock por Color</h4>
                      <div className="space-y-2">
                        {Object.entries(item.colors).map(([color, stock]) => (
                          <div key={color} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="font-medium">{color}</span>
                            <span className={`font-medium ${stock === 0 ? 'text-red-600' : stock <= 5 ? 'text-yellow-600' : 'text-green-600'}`}>
                              {stock}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Información financiera */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Costo:</span>
                        <div className="font-medium">€{item.cost.toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Precio:</span>
                        <div className="font-medium">€{item.price.toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Margen:</span>
                        <div className="font-medium text-green-600">
                          {((item.price - item.cost) / item.price * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Valor Stock:</span>
                        <div className="font-medium">€{(item.totalStock * item.cost).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Acciones rápidas */}
                  <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="text-green-600">
                      <Plus className="w-4 h-4 mr-1" />
                      Reabastecer
                    </Button>
                    <Button variant="outline" size="sm" className="text-blue-600">
                      <Edit className="w-4 h-4 mr-1" />
                      Ajustar Stock
                    </Button>
                    <Button variant="outline" size="sm" className="text-purple-600">
                      <Package className="w-4 h-4 mr-1" />
                      Historial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredInventory.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No se encontraron productos</h3>
              <p className="text-muted-foreground">Ajusta los filtros para ver más resultados</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default AdminInventory;
