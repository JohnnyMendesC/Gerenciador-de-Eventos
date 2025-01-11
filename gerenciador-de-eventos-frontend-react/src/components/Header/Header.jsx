import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import api from "../../services/api";
import { HeaderContainer, Logo, UserInfo, LogoutButton, Span, Div1, Div3 } from './style';
import logomarca from '../../assets/IdealizeTitulo.svg';

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
    navigate('/');
  };

  return (
    <HeaderContainer>
      <Div1>
        <Logo src={logomarca} alt="Logo" />
      </Div1>
      {/* <Div2>
        <Icone src={logo} alt="Logo" />
      </Div2> */}
      <Div3>
        {token && (
          <UserInfo>
            <Span>Boas vindas, {adminName}</Span>
            <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
          </UserInfo>
        )}
      </Div3>
    </HeaderContainer>
  );
}

export default Header;
