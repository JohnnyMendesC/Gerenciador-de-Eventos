import { useState, useContext, useEffect } from "react";
import { login as loginService } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { LoginContainer, Title, Form, Label, Input, Button, Div, Label2 } from './style';
import Switch from '@mui/material/Switch';

function Login() {
  const [email, setEmail] = useState(localStorage.getItem('lastEmail') || '');
  const [senha, setSenha] = useState('');
  const [lembrarSenha, setLembrarSenha] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const lastRememberMe = localStorage.getItem('lastRememberMe') === 'true';
    setLembrarSenha(lastRememberMe);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginService(email, senha);
      login(token, lembrarSenha);
      localStorage.setItem('lastEmail', email);
      localStorage.setItem('lastRememberMe', lembrarSenha);
      alert('Login realizado com sucesso!');
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      alert('Erro ao realizar login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Form onSubmit={handleLogin}>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Label htmlFor="senha">Senha</Label>
        <Input
          id="senha"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <Div>
          <Switch
            id="lembrarSenha"
            checked={lembrarSenha}
            onChange={(e) => setLembrarSenha(e.target.checked)}
            color="warning"
          />
          <Label2 htmlFor="lembrarSenha">Manter Conectado</Label2>
        </Div>
        <Button type="submit">Entrar</Button>
        <Button type="button" onClick={() => navigate('/register')}>Cadastrar-se</Button>
      </Form>
    </LoginContainer>
  );
}

export default Login;