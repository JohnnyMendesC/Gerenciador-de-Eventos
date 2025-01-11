import { useState } from "react";
import { registerAdmin, validatePassword } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validateEmail";
import { RegisterContainer, Title, Form, Label, Input, Button } from './style';

function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert('Email inválido.');
      return;
    }
    if (!validatePassword(senha, confirmarSenha)) {
      alert('As senhas não coincidem.');
      return;
    }
    try {
      await registerAdmin({ nome, email, senha });
      alert('Cadastro realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Register error:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <RegisterContainer>
      <Title>Cadastro de Administrador</Title>
      <Form onSubmit={handleRegister}>
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
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
        <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
        <Input
          id="confirmarSenha"
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />
        <Button type="submit">Cadastrar</Button>
      </Form>
    </RegisterContainer>
  );
}

export default Register;