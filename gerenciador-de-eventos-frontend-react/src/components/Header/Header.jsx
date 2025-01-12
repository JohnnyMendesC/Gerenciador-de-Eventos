import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import api from "../../services/api";
import { HeaderContainer, Logo, UserInfo, LogoutButton, Div1, Div3, LeftSpan, RightSpan } from './style';
import logomarca from '../../assets/IdealizeTitulo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = await api.get('/admins/token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAdminName(response.data.nome);
      } catch (error) {
        console.error('Erro ao buscar nome do administrador:', error);
      }
    };

    if (token) {
      fetchAdminName();
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    toast.success('Logout realizado com sucesso!');
    navigate('/');
  };

  return (
    <HeaderContainer>
      <LeftSpan>
        {token ? `Boas vindas, ${adminName}` : "Boas vindas"}
      </LeftSpan>
      <RightSpan>
        Idealize e Gerencie todos os seus Eventos.
      </RightSpan>
      <Div1>
        <Logo src={logomarca} alt="Logo" />
      </Div1>
      <Div3>
        {token && (
          <UserInfo>
            <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
          </UserInfo>
        )}
      </Div3>
      <ToastContainer />
    </HeaderContainer>
  );
}

export default Header;
