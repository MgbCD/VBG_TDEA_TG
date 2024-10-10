import axios from 'axios';
import { useMsal } from '@azure/msal-react';

const useAxios = () => {
  const { instance, accounts } = useMsal();

  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(async (config) => {
    if (accounts.length > 0) {
      const account = accounts[0];

      const tokenResponse = await instance.acquireTokenSilent({
        scopes: ["User.Read"],
        account: account
      });

      const accessToken = tokenResponse.accessToken;

      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  return axiosInstance;
};

export default useAxios;
