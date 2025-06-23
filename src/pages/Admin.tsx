
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Users, BarChart3, Settings, Plus } from 'lucide-react';

const Admin = () => {
  const stats = [
    { title: 'Total Productos', value: '156', icon: Package, change: '+12%' },
    { title: 'Pedidos Pendientes', value: '23', icon: ShoppingCart, change: '+5%' },
    { title: 'Clientes Activos', value: '1,234', icon: Users, change: '+18%' },
    { title: 'Ventas del Mes', value: '€12,450', icon: BarChart3, change: '+23%' },
  ];

  const quickActions = [
    { title: 'Agregar Producto', href: '/admin/productos/nuevo', icon: Plus, color: 'bg-terracota' },
    { title: 'Ver Pedidos', href: '/admin/pedidos', icon: ShoppingCart, color: 'bg-blue-500' },
    { title: 'Gestionar Inventario', href: '/admin/inventario', icon: Package, color: 'bg-green-500' },
    { title: 'Reportes', href: '/admin/reportes', icon: BarChart3, color: 'bg-purple-500' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif text-3xl mb-2">Panel Administrativo</h1>
            <p className="text-muted-foreground">Gestiona tu tienda Aluna Infinity</p>
          </div>
          <Button className="bg-terracota hover:bg-terracota/90">
            <Settings className="mr-2 w-4 h-4" />
            Configuración
          </Button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 font-medium">{stat.change} vs mes anterior</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Acciones Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* Actividad Reciente */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>Últimos movimientos en tu tienda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Nuevo pedido #1234 recibido</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Hace 5 min</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Producto "Pijama Satén Rosa" editado</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Hace 15 min</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Stock bajo en "Camisón Algodón" - Talla M</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Hace 1 hora</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
