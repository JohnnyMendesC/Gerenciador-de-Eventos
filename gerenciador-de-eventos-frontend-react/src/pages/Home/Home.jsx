import { useState, useEffect, useContext } from "react";
import api from "../../services/api";
import Input from '@mui/joy/Input';
import CardContent from '@mui/joy/CardContent';
import Pagination from '@mui/material/Pagination';
import AuthContext from "../../context/AuthContext";
import { HomeContainer, Title, EventosGrid, EventoCard, EventoImage, StyledModal, StyledModalDialog, StyledButton, Div, AddEventButton, Section, EventoNome, EventoInfo, EventoActions, EditButton, DeleteButton } from './style';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [eventos, setEventos] = useState([]);
  const [eventoAtual, setEventoAtual] = useState({ eventoId: null, nome: '', data: '', localizacao: '', imagemUrl: '' });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const eventosPorPagina = 3;
  const { token } = useContext(AuthContext);

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
      data: new Date(eventoAtual.data).toISOString().split('T')[0],
    };
    const response = await api.post("/eventos", eventoAtualizado, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setEventos([...eventos, response.data]);
    setMostrarModal(false);
    setEventoAtual({ eventoId: null, nome: '', data: '', localizacao: '', imagemUrl: '' });
    toast.success('Evento adicionado com sucesso!');
  };

  const handleEditarEvento = async () => {
    if (!eventoAtual.eventoId) {
      console.error("Evento ID está indefinido.");
      return;
    }
    const eventoAtualizado = {
      nome: eventoAtual.nome || undefined,
      data: eventoAtual.data ? new Date(eventoAtual.data).toISOString().split('T')[0] : undefined,
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
      toast.success('Evento editado com sucesso!');
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
    toast.success('Evento excluído com sucesso!');
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

  const handleChangePagina = (event, value) => {
    setPaginaAtual(value);
  };

  const eventosExibidos = eventos.slice((paginaAtual - 1) * eventosPorPagina, paginaAtual * eventosPorPagina);

  return (
    <HomeContainer>
      <AddEventButton onClick={() => {
        setEventoAtual({ eventoId: null, nome: '', data: '', localizacao: '', imagemUrl: '' });
        setModoEdicao(false);
        setMostrarModal(true);
      }}>
        Adicionar Evento
      </AddEventButton>
      <Section>
        <Div>
          <Title>Eventos</Title>
        </Div>
        <EventosGrid>
          {eventosExibidos.map(evento => (
            <EventoCard key={evento.eventoId}>
              <EventoImage src={evento.imagemUrl} alt={evento.nome} />
              <CardContent>
                <EventoNome level="h2" fontSize="lg" mb={1}>
                  {evento.nome}
                </EventoNome>
                <EventoInfo>
                  {evento.localizacao}, {formatDateForDisplay(evento.data)}.
                </EventoInfo>
                <EventoActions>
                  <EditButton onClick={() => abrirModalEdicao(evento)}>Editar</EditButton>
                  <DeleteButton onClick={() => handleExcluirEvento(evento.eventoId)}>Excluir</DeleteButton>
                </EventoActions>
              </CardContent>
            </EventoCard>
          ))}
        </EventosGrid>
        <Pagination
          count={Math.ceil(eventos.length / eventosPorPagina)}
          page={paginaAtual}
          onChange={handleChangePagina}
          variant="outlined"
          shape="rounded"
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
        />
      </Section>
      <StyledModal open={mostrarModal} onClose={() => setMostrarModal(false)}>
        <StyledModalDialog>
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
          <StyledButton onClick={modoEdicao ? handleEditarEvento : handleAdicionarEvento}>
            {modoEdicao ? 'Salvar Alterações' : 'Salvar'}
          </StyledButton>
          <StyledButton onClick={() => setMostrarModal(false)}>Cancelar</StyledButton>
        </StyledModalDialog>
      </StyledModal>
      <ToastContainer />
    </HomeContainer>
  );
}

export default Home;
