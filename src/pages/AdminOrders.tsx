
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Filter, Eye, Package, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const orders = [
    {
      id: '#ALU-2024-001',
      customer: 'María García',
      email: 'maria.garcia@email.com',
      date: '2024-01-15',
      status: 'Pendiente',
      total: 89.90,
      items: 2,
      shippingAddress: 'Madrid, España',
    },
    {
      id: '#ALU-2024-002',
      customer: 'Ana López',
      email: 'ana.lopez@email.com',
      date: '2024-01-14',
      status: 'Enviado',
      total: 159.80,
      items: 3,
      shippingAddress: 'Barcelona, España',
    },
    {
      id: '#ALU-2024-003',
      customer: 'Carmen Ruiz',
      email: 'carmen.ruiz@email.com',
      date: '2024-01-13',
      status: 'Entregado',
      total: 75.50,
      items: 1,
      shippingAddress: 'Valencia, España',
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Enviado': 'bg-blue-100 text-blue-800',
      'Entregado': 'bg-green-100 text-green-800',
      'Cancelado': 'bg-red-100 text-red-800',
    };
    
    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
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
        <div className="flex items-center mb-8">
          <Link to="/admin">
            <Button variant="outline" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="font-serif text-3xl mb-2">Gestión de Pedidos</h1>
            <p className="text-muted-foreground">Administra todos los pedidos de la tienda</p>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  className="pl-10"
                  placeholder="Buscar por número de pedido o cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar por Estado
                </Button>
                <Button variant="outline">Filtrar por Fecha</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de pedidos */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos ({orders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Pedido</th>
                    <th className="text-left py-3 px-2">Cliente</th>
                    <th className="text-left py-3 px-2">Fecha</th>
                    <th className="text-left py-3 px-2">Estado</th>
                    <th className="text-left py-3 px-2">Total</th>
                    <th className="text-left py-3 px-2">Dirección</th>
                    <th className="text-left py-3 px-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-2">
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-gray-500">{order.items} artículos</div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div>
                          <div className="font-medium">{order.customer}</div>
                          <div className="text-sm text-gray-500">{order.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        {new Date(order.date).toLocaleDateString('es-ES')}
                      </td>
                      <td className="py-4 px-2">{getStatusBadge(order.status)}</td>
                      <td className="py-4 px-2 font-medium">{formatPrice(order.total)}</td>
                      <td className="py-4 px-2 text-sm">{order.shippingAddress}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Package className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Truck className="w-4 h-4" />
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

export default AdminOrders;
