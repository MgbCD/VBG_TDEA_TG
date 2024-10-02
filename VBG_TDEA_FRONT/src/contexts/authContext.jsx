import { createContext, useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import axios from 'axios';  // Importa axios para realizar solicitudes al backend

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance } = useMsal();
  const [user, setUser] = useState(null);

  // Manejar el login del usuario
  const login = async () => {
    try {
      const loginResponse = await instance.loginPopup({
        scopes: ['openid', 'profile', 'User.Read'],
      });
      console.log("Login Response:", loginResponse);
      const userData = {
        email: loginResponse.account.username,
        username: loginResponse.account.name,
        roleId: loginResponse.account.username.endsWith('@correo.tdea.edu.co') ? 'student' : 'profesor',
        program: loginResponse.account.username.endsWith('@correo.tdea.edu.co') ? 'Nombre del Programa' : null,
      };

      // Guardar los datos del usuario en el backend
      await axios.post('http://localhost:3000/api/user/saveUser', userData);

      setUser(loginResponse.account);
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  // Manejar el logout del usuario
  const logout = async () => {
    await instance.logout();
    setUser(null);
  };

  // Monitorear el estado de autenticación al montar el componente
  useEffect(() => {
    const account = instance.getAllAccounts();
    if (account.length > 0) {
      setUser(account[0]);
    }
  }, [instance]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
