import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false); // Detenemos el estado de carga una vez que sabemos si el usuario está o no autenticado
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Mostrar algo mientras el estado de autenticación se resuelve
  }

  return user ? element : <Navigate to="/login" />;
};
export default ProtectedRoute; 
