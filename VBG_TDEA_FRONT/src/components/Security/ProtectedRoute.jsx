import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = ({ element, requiredRole }) => {
  const { user, userRol } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false); // Detenemos el estado de carga una vez que sabemos si el usuario está o no autenticado
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Mostrar algo mientras el estado de autenticación se resuelve
  }

  // Si el usuario no está autenticado, redirige a login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el rol del usuario no coincide con el requerido, redirige a home
  if (requiredRole && userRol !== requiredRole) {
    return <Navigate to="/home" />;
  }

  return element;
};

export default ProtectedRoute;
