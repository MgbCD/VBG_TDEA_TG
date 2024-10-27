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
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import useNormalizedPath from './hooks/useNormalizedPath';
import Historic from './pages/Historic/Historic'; 


const MainApp = () => {
  const normalizedPath = useNormalizedPath();

  const validRoutes = ['/home', '/dashboard', '/historic'];

  return (
    <>
      {validRoutes.includes(normalizedPath) && <NavbarWithMsal />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/historic" element={<ProtectedRoute element={<Historic />} />} /> 
   
      </Routes>
      <ToastContainer /> 
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
