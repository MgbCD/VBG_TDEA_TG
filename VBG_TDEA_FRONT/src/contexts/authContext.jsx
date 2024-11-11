import { createContext, useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import useAxios from '../services/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance } = useMsal();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

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

      const response = await axiosInstance.get(`/api/user/getRole?email=${loginResponse.account.username}`);
      const userResponse = await axiosInstance.get(`/api/user/getUser?email=${loginResponse.account.username}`);
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

  function deleteCookies() {
    const cookies = document.cookie.split(";");

    cookies.forEach(cookie => {
      const cookieName = cookie.split("=")[0].trim();
      if (cookieName.includes("login.microsoftonline.com") ||
        cookieName.includes(".microsoftonline.com") ||
        cookieName.includes("msal")) {
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login";
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/home";
      }
    });
  }

  const logout = async () => {
    try {
      localStorage.clear();

      deleteCookies();

      instance.logoutRedirect().catch(error => {
        console.error("Error cerrando sesión con logoutRedirect:", error);
      });
    } catch (error) {
      console.error("Error en logout:", error);
    }

    navigate("/login");
  };

  useEffect(() => {
    const account = instance.getAllAccounts();
    if (account.length > 0) {
      setUser(account[0]);
    }
  }, [instance]);

  return (
    <AuthContext.Provider value={{ user, userRole, userId, setUser, login, logout, setUserRole, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
