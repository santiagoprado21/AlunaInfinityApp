
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="font-serif text-6xl mb-4 text-terracota">404</h1>
          <h2 className="text-2xl font-medium mb-4">Página no encontrada</h2>
          <p className="text-muted-foreground mb-8">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          <Link to="/">
            <Button className="bg-terracota hover:bg-terracota/90">
              Volver a la página principal
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
