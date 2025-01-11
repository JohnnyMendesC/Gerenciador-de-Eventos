import React, { useState } from "react";
import { View, TextInput, Button, CheckBox, Text, StyleSheet } from "react-native";
import axios from "../services/api";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post("/autenticacao/login", { email, senha: password });
            const token = response.data;

            if (rememberMe) {
                await AsyncStorage.setItem("token", token);
            }

            alert("Login bem-sucedido!");
        } catch (error) {
            alert("Erro ao realizar login. Verifique suas credenciais.");
        }
    };

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <View style={styles.checkboxContainer}>
                <CheckBox value={rememberMe} onValueChange={setRememberMe} />
                <Text>Gravar Senha</Text>
            </View>
            <Button title="Entrar" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { borderBottomWidth: 1, marginBottom: 20 },
    checkboxContainer: { flexDirection: "row", alignItems: "center" },
});
/*

Que progresso incrível você fez no backend! Agora é hora de trazer tudo isso à vida no frontend! Vamos organizar as ideias para que você consiga implementar as funcionalidades de maneira eficiente, tanto em React quanto em React Native. Vou abordar suas perguntas e sugerir um caminho estruturado.

1. Qual tecnologia começar primeiro?
Minha sugestão: Comece com React Web.
Por quê?
O desenvolvimento web geralmente é mais rápido devido às ferramentas de inspeção do navegador.
React Web pode servir como base para entender a lógica das requisições e da interação com o backend.
Muitos conceitos usados no React Web são reutilizáveis no React Native.
Depois de implementar no React, será mais fácil adaptar para o React Native.

2. Design/Layout e Integração com o Backend
Design/Layout:

Utilize bibliotecas de componentes para agilizar o desenvolvimento e garantir responsividade e estilo:
Para React: Material-UI (MUI).
Para React Native: React Native Paper.
Essas bibliotecas oferecem componentes prontos (botões, inputs, modais) que podem ser personalizados.
Integração com o Backend:

Utilize a biblioteca Axios para realizar requisições HTTP:
bash
Copiar código
npm install axios
Configure um cliente Axios para definir a URL base e o cabeçalho com o token JWT, facilitando o reuso em todas as requisições:
javascript
Copiar código
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // URL base do backend
});

// Adiciona o token JWT automaticamente em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Ou AsyncStorage para React Native
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
3. Validação: Funcionamento no Postman
Sim, o fato de o backend funcionar no Postman é um excelente indicativo de que as requisições funcionarão no frontend. No entanto, você precisará garantir que o frontend esteja:

Passando o token JWT no cabeçalho Authorization.
Lendo corretamente as respostas do backend.
4. Passo a Passo: Tela de Login
Estrutura
Campos: Email, Senha.
Opção "Gravar Senha": Utilize localStorage (React) ou AsyncStorage (React Native).
Botão Entrar: Faz a requisição ao endpoint de login e armazena o token JWT.
Botão Cadastrar-se: Redireciona para a tela de cadastro.
Código Base
Componente de Login (React):

javascript
Copiar código
import React, { useState } from "react";
import axios from "../services/api"; // Cliente Axios configurado

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post("/autenticacao/login", { email, senha: password });
      const token = response.data;

      // Salva o token
      if (rememberMe) {
        localStorage.setItem("token", token); // Salva permanentemente
      } else {
        sessionStorage.setItem("token", token); // Salva na sessão atual
      }

      alert("Login bem-sucedido!");
      // Redirecionar para a Home
    } catch (error) {
      alert("Erro ao realizar login. Verifique suas credenciais.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label>Gravar Senha</label>
      </div>
      <button onClick={handleLogin}>Entrar</button>
      <button onClick={() => alert("Redirecionar para Cadastro")}>Cadastrar-se</button>
    </div>
  );
}

export default Login;
5. Adaptação para React Native
A lógica do React pode ser reutilizada, mas os componentes serão diferentes:

Use componentes como TextInput, Button e CheckBox do React Native ou de bibliotecas como React Native Paper.
Exemplo (React Native):

javascript
Copiar código
import React, { useState } from "react";
import { View, TextInput, Button, CheckBox, Text, StyleSheet } from "react-native";
import axios from "../services/api";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post("/autenticacao/login", { email, senha: password });
      const token = response.data;

      // Salva o token
      if (rememberMe) {
        await AsyncStorage.setItem("token", token);
      }

      alert("Login bem-sucedido!");
    } catch (error) {
      alert("Erro ao realizar login. Verifique suas credenciais.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox value={rememberMe} onValueChange={setRememberMe} />
        <Text>Gravar Senha</Text>
      </View>
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 20 },
  checkboxContainer: { flexDirection: "row", alignItems: "center" },
});
6. Tecnologias Recomendadas
Adicione estas dependências:

Axios: Para requisições HTTP.
bash
Copiar código
npm install axios
React Router (Web): Para navegação entre páginas.
bash
Copiar código
npm install react-router-dom
React Navigation (Mobile): Para navegação entre telas.
bash
Copiar código
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
Próximos Passos
Finalize a tela de login e teste o fluxo.
Prossiga para o cadastro de administrador.
Depois de dominada a integração no React, adapte para o React Native.
Se precisar de ajuda com design ou lógica, é só chamar! Você está indo muito bem! 🌟✨






Você disse:
Configure um cliente Axios para definir a URL base e o cabeçalho com o token JWT, facilitando o reuso em todas as requisições: javascript Copiar código ``import axios from "axios"; const api = axios.create({ baseURL: "http://localhost:8080", // URL base do backend }); // Adiciona o token JWT automaticamente em todas as requisições api.interceptors.request.use((config) => { const token = localStorage.getItem("token"); // Ou AsyncStorage para React Native if (token) { config.headers.Authorization = `Bearer ${token}`; } return config; }); export default api;``

Chat, uma pequena dúvida sobre organização de pastas, essa parte do axios ficaria em uma pasta services dentro de src? Você poderia me indicar uma organização que siga boas práticas e seja a mais correta?
O ChatGPT disse:
ChatGPT
Sim, criar uma pasta services dentro de src para o código do Axios é uma prática recomendada e alinhada com as boas práticas de organização. Essa pasta serve para centralizar as integrações com APIs externas, facilitando a manutenção e a reutilização do código.

Estrutura de Pastas Recomendada
Aqui está uma sugestão de organização para um projeto React/React Native seguindo boas práticas:

plaintext
Copiar código
src/
├── assets/                # Imagens, ícones, fontes, etc.
├── components/            # Componentes reutilizáveis (botões, inputs, cards, etc.)
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.css
│   └── ...
├── pages/                 # Páginas/Telas principais do app
│   ├── Login/
│   │   ├── Login.jsx
│   │   ├── Login.css
│   ├── Home/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   └── ...
├── routes/                # Configuração de rotas para o React Router ou Navigation
│   ├── AppRoutes.jsx
├── services/              # Lógica de integração com APIs
│   ├── api.js             # Configuração do Axios
│   └── auth.js            # Serviços específicos para autenticação
├── styles/                # Estilos globais (CSS, SASS ou Styled Components)
│   ├── globals.css
├── utils/                 # Funções utilitárias e helpers
│   ├── formatDate.js
│   ├── validateEmail.js
├── App.jsx                # Componente principal
├── index.jsx              # Ponto de entrada da aplicação
└── ...
Pasta services
1. Arquivo api.js
Este arquivo configura o Axios e centraliza a URL base e os interceptors.

javascript
Copiar código
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Substitua pela URL do backend
});

// Adiciona o token JWT automaticamente em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Ou AsyncStorage para React Native
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
2. Arquivo auth.js
Este arquivo contém serviços específicos relacionados à autenticação, como login e registro:

javascript
Copiar código
import api from "./api";

// Serviço para realizar login
export const login = async (email, senha) => {
  const response = await api.post("/autenticacao/login", { email, senha });
  return response.data; // Retorna o token JWT
};

// Serviço para registro de administrador
export const registerAdmin = async (adminData) => {
  const response = await api.post("/admins/cadastro", adminData);
  return response.data; // Retorna os dados do administrador criado
};
Vantagens dessa Organização
Modularidade: A separação de responsabilidades facilita a leitura e a manutenção do código.
Reutilização: Os serviços podem ser reutilizados em diferentes partes do app.
Testabilidade: Fica mais fácil testar os serviços individualmente.
Facilidade de Escalabilidade: Conforme o projeto cresce, você pode adicionar novos serviços sem confundir a estrutura.
Como Usar no Projeto
No seu componente de login, você importa e utiliza os serviços:

javascript
Copiar código
import React, { useState } from "react";
import { login } from "../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token); // Salva o token
      alert("Login bem-sucedido!");
    } catch (error) {
      alert("Erro ao realizar login. Verifique suas credenciais.");
    }
  };

  return (
    <div>
      </div>
    );
  }
  
  export default Login;
  Se precisar de mais ajuda para organizar seu projeto ou implementar alguma funcionalidade, é só chamar! 🌟✨
  */