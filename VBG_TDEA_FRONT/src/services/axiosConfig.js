import axios from 'axios';
import { useMsal } from '@azure/msal-react';

const useAxios = () => {
  const { instance, accounts } = useMsal();

  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(async (config) => {
    if (accounts.length > 0) {
      const account = accounts[0];

      const tokenResponse = await instance.acquireTokenSilent({
        scopes: ["openid", "profile"],
        account: account
      });

      const idToken = tokenResponse.idToken;

      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  return axiosInstance;
};

export default useAxios;
