import { useState, useEffect, useContext } from "react";
import api from "../../services/api";
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import AuthContext from "../../context/AuthContext";
import { HomeContainer, Title, EventosGrid } from './style';

function Home() {
  const [eventos, setEventos] = useState([]);
  const [eventoAtual, setEventoAtual] = useState({ eventoId: null, nome: '', data: '', localizacao: '', imagemUrl: '' });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const { token, logout } = useContext(AuthContext);

  useEffect(() => {
    const buscarEventos = async () => {
      const response = await api.get("/eventos/meus-eventos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEventos(response.data);
    };
    buscarEventos();
  }, [token]);

  const handleAdicionarEvento = async () => {
    const eventoAtualizado = {
      ...eventoAtual,
      data: new Date(eventoAtual.data).toISOString().split('T')[0], // Ajuste de data
    };
    const response = await api.post("/eventos", eventoAtualizado, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setEventos([...eventos, response.data]);
    setMostrarModal(false);
    setEventoAtual({ eventoId: null, nome: '', data: '', localizacao: '', imagemUrl: '' });
  };

  const handleEditarEvento = async () => {
    if (!eventoAtual.eventoId) {
      console.error("Evento ID está indefinido.");
      return;
    }
    const eventoAtualizado = {
      nome: eventoAtual.nome || undefined,
      data: eventoAtual.data ? new Date(eventoAtual.data).toISOString().split('T')[0] : undefined, // Ajuste de data
      localizacao: eventoAtual.localizacao || undefined,
      imagemUrl: eventoAtual.imagemUrl || undefined,
    };
    try {
      const response = await api.put(`/eventos/${eventoAtual.eventoId}`, eventoAtualizado, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEventos(eventos.map(evento => evento.eventoId === eventoAtual.eventoId ? response.data : evento));
      setMostrarModal(false);
      setEventoAtual({ eventoId: null, nome: '', data: '', localizacao: '', imagemUrl: '' });
      setModoEdicao(false);
    } catch (error) {
      console.error('Erro ao editar evento:', error);
    }
  };

  const handleExcluirEvento = async (id) => {
    await api.delete(`/eventos/deletar/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setEventos(eventos.filter(evento => evento.eventoId !== id));
  };

  const abrirModalEdicao = (evento) => {
    const dataAjustada = new Date(evento.data);
    dataAjustada.setDate(dataAjustada.getDate());
    setEventoAtual({ ...evento, data: dataAjustada.toISOString().split('T')[0] });
    setModoEdicao(true);
    setMostrarModal(true);
  };

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate() + 1 ).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <HomeContainer>
      <Title>Eventos</Title>
      <Button onClick={() => {
        setEventoAtual({ eventoId: null, nome: '', data: '', localizacao: '', imagemUrl: '' });
        setModoEdicao(false);
        setMostrarModal(true);
      }}>Adicionar Evento</Button>
      <Button onClick={handleLogout}>Sair</Button>
      <EventosGrid>
        {eventos.map(evento => (
          <Card key={evento.eventoId} sx={{ width: 300, height: 400 }}>
            <img src={evento.imagemUrl} alt={evento.nome} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <CardContent>
              <Typography level="h2" fontSize="lg" mb={1}>
                {evento.nome}
              </Typography>
              <Typography>{formatDateForDisplay(evento.data)}</Typography>
              <Typography>{evento.localizacao}</Typography>
              <Button onClick={() => abrirModalEdicao(evento)}>Editar</Button>
              <Button onClick={() => handleExcluirEvento(evento.eventoId)}>Excluir</Button>
            </CardContent>
          </Card>
        ))}
      </EventosGrid>
      <Modal open={mostrarModal} onClose={() => setMostrarModal(false)}>
        <ModalDialog>
          <h2>{modoEdicao ? 'Editar Evento' : 'Adicionar Evento'}</h2>
          <Input
            type="text"
            placeholder="Nome do Evento"
            value={eventoAtual.nome || ''}
            onChange={(e) => setEventoAtual({ ...eventoAtual, nome: e.target.value })}
            required
          />
          <Input
            type="date"
            value={eventoAtual.data || ''}
            onChange={(e) => setEventoAtual({ ...eventoAtual, data: e.target.value })}
            required
          />
          <Input
            type="text"
            placeholder="Localização"
            value={eventoAtual.localizacao || ''}
            onChange={(e) => setEventoAtual({ ...eventoAtual, localizacao: e.target.value })}
            required
          />
          <Input
            type="text"
            placeholder="Url da Imagem"
            value={eventoAtual.imagemUrl || ''}
            onChange={(e) => setEventoAtual({ ...eventoAtual, imagemUrl: e.target.value })}
            required
          />
          <Button onClick={modoEdicao ? handleEditarEvento : handleAdicionarEvento}>
            {modoEdicao ? 'Salvar Alterações' : 'Salvar'}
          </Button>
          <Button onClick={() => setMostrarModal(false)}>Cancelar</Button>
        </ModalDialog>
      </Modal>
    </HomeContainer>
  );
}
export default Home;
