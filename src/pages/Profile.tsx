
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { User, MapPin, CreditCard, Package, Eye, Edit } from 'lucide-react';

const Profile = () => {
  const { toast } = useToast();
  const [personalData, setPersonalData] = useState({
    firstName: 'María',
    lastName: 'García',
    email: 'maria.garcia@email.com',
    phone: '+34 612 345 678',
    birthDate: '1990-05-15',
  });

  const [addresses] = useState([
    {
      id: 1,
      type: 'Principal',
      name: 'María García',
      address: 'Calle Mayor 123, 4º B',
      city: 'Madrid',
      postalCode: '28001',
      country: 'España',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Trabajo',
      name: 'María García',
      address: 'Av. Castellana 456',
      city: 'Madrid',
      postalCode: '28046',
      country: 'España',
      isDefault: false,
    },
  ]);

  const [orders] = useState([
    {
      id: '#ALU-2024-001',
      date: '2024-01-15',
      status: 'Entregado',
      total: 89.90,
      items: 2,
    },
    {
      id: '#ALU-2024-002',
      date: '2024-01-10',
      status: 'En camino',
      total: 159.80,
      items: 3,
    },
    {
      id: '#ALU-2024-003',
      date: '2024-01-05',
      status: 'Procesando',
      total: 75.50,
      items: 1,
    },
  ]);

  const handlePersonalDataSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Perfil actualizado",
      description: "Tus datos personales han sido actualizados correctamente.",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      'Entregado': 'bg-green-100 text-green-800',
      'En camino': 'bg-blue-100 text-blue-800',
      'Procesando': 'bg-yellow-100 text-yellow-800',
      'Cancelado': 'bg-red-100 text-red-800',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-3xl mb-2">Mi Perfil</h1>
            <p className="text-muted-foreground">Gestiona tu información personal y pedidos</p>
          </div>

          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Direcciones
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Pagos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>
                    Actualiza tu información personal y datos de contacto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePersonalDataSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          value={personalData.firstName}
                          onChange={(e) => setPersonalData(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Apellidos</Label>
                        <Input
                          id="lastName"
                          value={personalData.lastName}
                          onChange={(e) => setPersonalData(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalData.email}
                        onChange={(e) => setPersonalData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          value={personalData.phone}
                          onChange={(e) => setPersonalData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={personalData.birthDate}
                          onChange={(e) => setPersonalData(prev => ({ ...prev, birthDate: e.target.value }))}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="bg-terracota hover:bg-terracota/90">
                      Guardar Cambios
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Mis Direcciones</h3>
                  <Button className="bg-terracota hover:bg-terracota/90">
                    Agregar Dirección
                  </Button>
                </div>

                <div className="grid gap-4">
                  {addresses.map((address) => (
                    <Card key={address.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{address.type}</h4>
                              {address.isDefault && (
                                <span className="bg-terracota text-white text-xs px-2 py-1 rounded">
                                  Principal
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{address.name}</p>
                            <p className="text-sm text-muted-foreground">{address.address}</p>
                            <p className="text-sm text-muted-foreground">
                              {address.city}, {address.postalCode}, {address.country}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Pedidos</CardTitle>
                  <CardDescription>
                    Revisa el estado de tus pedidos y compras anteriores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm">{order.items} artículo{order.items > 1 ? 's' : ''}</p>
                            <p className="font-medium">{formatPrice(order.total)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(order.status)}
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalles
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Métodos de Pago</CardTitle>
                  <CardDescription>
                    Gestiona tus tarjetas y métodos de pago guardados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">VISA</span>
                          </div>
                          <div>
                            <p className="font-medium">**** **** **** 4242</p>
                            <p className="text-sm text-muted-foreground">Expira 12/26</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            Principal
                          </span>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      + Agregar Método de Pago
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
