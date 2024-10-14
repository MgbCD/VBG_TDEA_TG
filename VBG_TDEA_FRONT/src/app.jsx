import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import msalInstance from './services/authConfig';
import { AuthProvider } from './contexts/authContext';
import Home from './pages/home/Home';
import LoginPage from './pages/Login/LoginPages';
import ProtectedRoute from './components/Security/ProtectedRoute';
import NavbarWithMsal from './components/Navbar/Navbar'; 
import Dashboard from './pages/Dashboard/dashboard'; 


const MainApp = () => {
  const location = useLocation(); 

  // Lista de rutas válidas
  const validRoutes = ['/home', '/dashboard'];

  return (
    <>
      {/* Renderizar la Navbar solo si la ruta es válida */}
      {validRoutes.includes(location.pathname) && <NavbarWithMsal />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Puedes agregar más rutas válidas aquí si es necesario */}
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <Router>
          <MainApp /> 
        </Router>
      </AuthProvider>
    </MsalProvider>
  );
};

export default App;
