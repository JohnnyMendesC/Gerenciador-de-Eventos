import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: "http://192.168.0.108:8080", // Substitua pelo IP da sua máquina host
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Requisição Axios configurada:', config);
  return config;
}, (error) => {
  console.error('Erro ao configurar requisição Axios:', error);
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  console.log('Resposta da API:', response);
  return response;
}, (error) => {
  console.error('Erro na resposta da API:', error);
  return Promise.reject(error);
});

export default api;
