import React from 'react';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import msalInstance from './services/authConfig';
import { AuthProvider } from './contexts/authContext';
import Home from './pages/home/Home';
import ProtectedRoute from './components/Security/ProtectedRoute';
import { useNavigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPages';


const App = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        </Router>
      </AuthProvider>
    </MsalProvider>
  );
};

export default App;