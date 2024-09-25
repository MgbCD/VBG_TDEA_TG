import { createContext, useState } from 'react';
import { useMsal } from '@azure/msal-react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance } = useMsal();
  const [user, setUser] = useState(null);

  const login = async () => {
    try {
      const loginResponse = await instance.loginPopup({
        scopes: ['openid', 'profile', 'User.Read'],
      });
      setUser(loginResponse.account);
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const logout = async () => {
    await instance.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;