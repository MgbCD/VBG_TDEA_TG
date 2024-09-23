import { useState, useEffect, createContext, useContext } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import msalInstance from '../services/authConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = async () => {
    try {
      const loginResponse = await msalInstance.loginRedirect();
      const tokenResponse = await msalInstance.acquireTokenSilent({
        scopes: ['openid', 'profile', 'User.Read'],
      });
      setAccessToken(tokenResponse.accessToken);
      setUser(loginResponse.account);
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const logout = async () => {
    await msalInstance.logout();
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
