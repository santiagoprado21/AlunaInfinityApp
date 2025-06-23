
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';

interface AuthButtonsProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    email: string;
  };
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ 
  isAuthenticated = false, 
  user 
}) => {
  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-2">
        <Link to="/perfil">
          <Button variant="ghost" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="hidden md:inline">{user.name}</span>
          </Button>
        </Link>
        <Button variant="ghost" className="flex items-center space-x-2">
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Salir</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Link to="/login">
        <Button variant="ghost">Iniciar Sesión</Button>
      </Link>
      <Link to="/registro">
        <Button className="bg-terracota hover:bg-terracota/90">Registro</Button>
      </Link>
    </div>
  );
};

export default AuthButtons;
