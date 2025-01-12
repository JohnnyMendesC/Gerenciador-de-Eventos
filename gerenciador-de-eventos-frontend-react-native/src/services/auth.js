import api from "./api";

export const login = async (email, senha) => {
  try {
    console.log('Enviando requisição de login para a API com:', { email, senha });
    const response = await api.post("/autenticacao/login", { email, senha });
    console.log('Resposta da API de login:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição de login:', error);
    throw error;
  }
};

export const registerAdmin = async (adminData) => {
  try {
    console.log('Enviando requisição de cadastro para a API com:', adminData);
    const response = await api.post("/admins/cadastro", adminData);
    console.log('Resposta da API de cadastro:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição de cadastro:', error);
    throw error;
  }
};
