import axios from 'axios';
import msalInstance from './authConfig';  // Importa la instancia de msal
import { useNavigate } from 'react-router-dom';
import Config from '../utils/Config';

const useAxios = () => {
  const navigate = useNavigate();
  const baseURL = Config.REACT_APP_API_BASE_URL;

  const axiosInstance = axios.create({
    baseURL: baseURL,
  });

  axiosInstance.interceptors.request.use(async (config) => {
    // Usamos la instancia de msal ya inicializada
    const accounts = msalInstance.getAllAccounts();  // Obtener las cuentas desde msalInstance
    if (accounts.length > 0) {
      const account = accounts[0];
      try {
        let tokenResponse;
        try {
          // Intentamos obtener el token de forma silenciosa
          tokenResponse = await msalInstance.acquireTokenSilent({
            scopes: ["openid", "profile"],  // Ajusta los scopes según sea necesario
            account: account,
          });
        } catch (error) {
          // Si acquireTokenSilent falla, intenta obtener el token con un popup
          tokenResponse = await msalInstance.acquireTokenPopup({
            scopes: ["openid", "profile"],  // Ajusta los scopes según sea necesario
          });
        }

        const idToken = tokenResponse.idToken;
        config.headers.Authorization = `Bearer ${idToken}`;
      } catch (error) {
        console.error("Error acquiring token silently:", error);
      }
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
