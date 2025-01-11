import api from "./api";

// Serviço para realizar login do Administrador:
export const login = async (email, senha) => {
  const response = await api.post("/autenticacao/login", { email, senha });
  return response.data; // Retorna o token JWT que será utilizado nas requisições
};

// Serviço para registro de administrador:
export const registerAdmin = async (adminData) => {
  const response = await api.post("/admins/cadastro", adminData);
  return response.data; // Retorna os dados do administrador criado
};

// Validação de senha:
export const validatePassword = (password, confirmPassword) => {
  return password === confirmPassword;
};
