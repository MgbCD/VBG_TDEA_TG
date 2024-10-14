import axios from 'axios';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';

const useAxios = () => {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(async (config) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      try {
        const tokenResponse = await instance.acquireTokenSilent({
          scopes: ["openid", "profile"],
          account: account
        });
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
        navigate('/login');
        localStorage.removeItem('token');
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
