import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import Toast from 'react-native-toast-message';
import AuthContext from '../../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState('');
  const [currentEvent, setCurrentEvent] = useState({ idEvento: null, nome: '', data: '', localizacao: '', imagemUrl: '' });
  const [isEditing, setIsEditing] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/eventos/meus-eventos');
      if (!response.data || response.data.length === 0) {
        setEvents([]); // Para limpar a lista de eventos antes de atualizar ela
        setEmptyMessage('Adicione seu primeiro evento. Idealize, Gerencie e Realize todos os seus eventos!');
      } else {
        setEvents(response.data);
        setEmptyMessage(null);
      }
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      if (error.response && error.response.status === 403) {
        Toast.show({ type: 'error', text1: 'Acesso não autorizado. Faça login novamente.' });
        logout();
        navigation.navigate('Login');
      }
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };
  
  const validateEventData = () => {
    const { nome, data, localizacao, imagemUrl } = currentEvent;
  
    if (!nome || nome.trim() === "") {
      Toast.show({ type: "error", text1: "O nome do evento é obrigatório!" });
      return false;
    }
    if (!data) {
      Toast.show({ type: "error", text1: "A data do evento é obrigatória!" });
      return false;
    }
    if (!localizacao || localizacao.trim() === "") {
      Toast.show({ type: "error", text1: "A localização do evento é obrigatória!" });
      return false;
    }
    return true;
  };

  const handleAddEvent = async () => {
    if (!validateEventData()) return console.log('Dados do evento inválidos:', currentEvent);
    try {
      const response = await api.post('/eventos', currentEvent);
      setEvents([...events, response.data]);
      setModalVisible(false);
      Toast.show({ type: 'success', text1: 'Evento adicionado com sucesso!' });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleEditEvent = async () => {
    try {
      await api.put(`/eventos/${currentEvent.eventoId}`, currentEvent);
      Toast.show({ text1: 'Evento editado com sucesso!' });
      setModalVisible(false);
      setIsEditing(false);
      fetchEvents();
    } catch (error) {
      console.error('Erro ao editar evento:', error);
      Toast.show({ text1: 'Erro ao editar o evento.' });
    }
  };

  // Ao selecionar um evento para editar
  const handleEventSelect = (event) => {
    setCurrentEvent({ ...event }); // Garante que o evento selecionado seja carregado no modal
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleDeleteEvent = async (id) => {
    try {
      await api.delete(`/eventos/deletar/${id}`);
      Toast.show({ text1: 'Evento deletado com sucesso!' });
      fetchEvents();
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
      Toast.show({ text1: 'Erro ao deletar o evento.' });
    }
  };

  const openModal = (event = { idEvento: null, nome: '', data: '', localizacao: '', imagemUrl: '' }) => {
    console.log('Abrindo modal para evento:', event);
    setCurrentEvent(event);
    setIsEditing(!!event.idEvento);
    setModalVisible(true);
  };

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Meus Eventos</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {events.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>{emptyMessage}</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.eventoId.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: item.imagemUrl }}
                style={styles.eventImage}
                resizeMode="contain"
              />
              <Text style={styles.eventTitle}>{item.nome}</Text>
              <Text style={styles.eventDetails}>{item.localizacao || "Localização não especificada"}, {formatDate(item.data) || "Data não especificada"}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleEventSelect(item)} style={styles.editButton}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteEvent(item.eventoId)} style={styles.deleteButton}>
                  <Ionicons name="trash" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      <TouchableOpacity onPress={() => openModal()} style={styles.floatingButton}>
        <Text style={styles.buttonText}>Novo Evento </Text>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Nome do Evento"
            value={currentEvent.nome}
            onChangeText={(text) => setCurrentEvent({ ...currentEvent, nome: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Data"
            value={currentEvent.data}
            onChangeText={(text) => setCurrentEvent({ ...currentEvent, data: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Localização"
            value={currentEvent.localizacao}
            onChangeText={(text) => setCurrentEvent({ ...currentEvent, localizacao: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="URL da Imagem"
            value={currentEvent.imagemUrl}
            onChangeText={(text) => setCurrentEvent({ ...currentEvent, imagemUrl: text })}
            style={styles.input}
          />
          <TouchableOpacity onPress={isEditing ? handleEditEvent : handleAddEvent} style={styles.saveButton}>
            <Text style={styles.buttonText}>{isEditing ? 'Salvar Alterações' : 'Salvar'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f3e7d1',
  },
  header: { 
    backgroundColor: '#ab8742', 
    paddingVertical: 15, 
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15,
  },
  headerText: { 
    fontSize: 40, 
    color: '#FFFFFF',
    fontFamily: 'AlexBrush_400Regular',
  },
  logoutButton: { 
    backgroundColor: '#9f6273', 
    padding: 8, 
    borderRadius: 5,
  },
  card: { 
    backgroundColor: '#fff', 
    marginHorizontal: 15, 
    marginVertical: 10, 
    padding: 15, 
    borderRadius: 8, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    objectFit: 'cover',
  },
  eventDetails: {
    fontSize: 16,
    color: '#4B4B4B',
    marginVertical: 5,
    fontFamily: 'Comfortaa_400Regular',
  },
  eventTitle: { 
    backgroundColor: '#f3e7d1',
    borderRadius: 20,
    textAlign: 'center',
    padding: 5,
    fontSize: 20, 
    color: '#ab8742',
    fontFamily: 'Comfortaa_700Bold',
  },
  eventDate: { fontSize: 14, color: '#4B4B4B', marginVertical: 5 },
  eventLocation: { fontSize: 14, color: '#4B4B4B', marginVertical: 5 },
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10,
  },
  editButton: { 
    backgroundColor: '#A7B48C', 
    padding: 8, 
    borderRadius: 5,
  },
  deleteButton: { 
    backgroundColor: '#9f6273', 
    padding: 8, 
    borderRadius: 5,
  },
  buttonText: { 
    color: '#FFFFFF',
    fontSize: 16, 
    fontFamily: 'Comfortaa_400Regular', 
  },
  floatingButton: { 
    backgroundColor: '#ab8742', 
    width: 160, 
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center', 

    flexDirection: 'row',
    position: 'absolute', 
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -80 }],
  },
  modalContainer: { 
    flex: 1, 
    backgroundColor: '#f3e7d1',
    justifyContent: 'center', 
    padding: 20,
  },
  input: { 
    backgroundColor: '#fff',
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginVertical: 5, 
    borderRadius: 5,
    fontFamily: 'Comfortaa_700Bold',
   },
  saveButton: { 
    backgroundColor: '#A7B48C', 
    padding: 15, 
    borderRadius: 5, 
    alignItems: 'center', 
    marginVertical: 5,
  },
  cancelButton: { 
    backgroundColor: '#9f6273', 
    padding: 15, 
    borderRadius: 5, 
    alignItems: 'center', 
    marginVertical: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#999',
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'Comfortaa_400Regular',
  },
});