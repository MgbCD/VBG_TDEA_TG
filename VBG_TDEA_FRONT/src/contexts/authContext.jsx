import { createContext, useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance } = useMsal();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setUserRole(storedUser.roleId || null);
      setUserId(storedUser.userId || null);
    }
  }, []);

  const login = async () => {
  try {
    const loginResponse = await instance.loginPopup({
      scopes: ['openid', 'profile', 'User.Read'],
    });

    const email = loginResponse.account.username;
    if (!email) {
      console.error("Email no disponible en la respuesta del login.");
      return;
    }

    const response = await axios.get(`http://localhost:3000/api/user/getRole?email=${loginResponse.account.username}`);
    const userResponse = await axios.get(`http://localhost:3000/api/user/getUser?email=${loginResponse.account.username}`);
    const role = response.data.roleId;
    const user = userResponse.data._id;

    if (!role) {
      console.error("Rol no encontrado en la respuesta de la API.");
      return;
    }

    const userData = {
      email: loginResponse.account.username,
      username: loginResponse.account.name,
      roleId: role,
      program: null,
      userId: user
    };

    localStorage.setItem('user', JSON.stringify(userData));

    setUser(userData);
    setUserRole(role);
    setUserId(user);
  } catch (error) {
    console.error('Login Error:', error);
  }
};

  const logout = async () => {
    await instance.logout();
    setUser(null);
    setUserRole(null);
    setUserId(null);
  };

  useEffect(() => {
    const account = instance.getAllAccounts();
    if (account.length > 0) {
      setUser(account[0]);
    }
  }, [instance]);

  return (
    <AuthContext.Provider value={{ user, userRole, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
