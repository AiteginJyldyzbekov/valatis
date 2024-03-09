import axios, { AxiosError, AxiosRequestConfig } from "axios";
import md5 from "md5"

const PASSWORD = 'Valantis';

// Функция для формирования авторизационной строки
const generateAuthString = (): string => {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, ''); 
    const authString = md5(`${PASSWORD}_${timestamp}`);
    return authString;
};

export const sendRequest = async (config: AxiosRequestConfig) => {
    const authString = generateAuthString();
    config.headers = {
      ...config.headers,
      'X-Auth': authString,
    };
  
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        console.log('Authentication error: Unauthorized');
      } else {
        console.error('Request error:', axiosError.message);
      }
      throw error;
    }
  };