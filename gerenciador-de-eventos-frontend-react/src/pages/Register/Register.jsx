import { useState } from "react";
import { registerAdmin, validatePassword } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validateEmail";
import { RegisterContainer, Title, Form, Label, Input, Button } from './style';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error('Email inválido.');
      return;
    }
    if (!validatePassword(senha, confirmarSenha)) {
      toast.error('As senhas não coincidem.');
      return;
    }
    try {
      await registerAdmin({ nome, email, senha });
      toast.success('Cadastro realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Register error:', error);
      toast.error('Erro ao realizar cadastro. Tente novamente.');
    }
  };

  return (
    <RegisterContainer>
      <Title>Cadastro</Title>
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
        <Button type="button" onClick={() => navigate('/')}>Voltar</Button>
      </Form>
      <ToastContainer />
    </RegisterContainer>
  );
}

export default Register;
