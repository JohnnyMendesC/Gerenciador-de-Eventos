import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para ícones

export default function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  const eventos = [
    { id: '1', titulo: 'Evento de Teste', data: '12/01/2025, 14:00' },
    { id: '2', titulo: 'Conferência de Design', data: '15/01/2025, 10:00' },
  ];

  const handleAddEvent = () => {
    // Implement add event logic here
  };

  const handleEditEvent = (id) => {
    // Implement edit event logic here
  };

  const handleDeleteEvent = (id) => {
    // Implement delete event logic here
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Meus Eventos</Text>
      </View>

      {/* Lista de Eventos */}
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.eventTitle}>{item.titulo}</Text>
            <Text style={styles.eventDate}>{item.data}</Text>
            <Text style={styles.eventDate}>{item.location}</Text>
            <View style={styles.actions}>
              
              <TouchableOpacity 
              onPress={() => handleEditEvent(item.id)} 
              style={styles.editButton}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={() => handleDeleteEvent(item.id)}
              style={styles.deleteButton}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Botão Flutuante */}
      <TouchableOpacity 
      onPress={handleAddEvent}
      style={styles.floatingButton}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  header: {
    backgroundColor: '#ab8742',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerText: { fontSize: 18, color: '#FFFFFF', fontWeight: 'bold' },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventTitle: { fontSize: 16, color: '#ab8742', fontWeight: 'bold' },
  eventDate: { fontSize: 14, color: '#4B4B4B', marginVertical: 5 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  editButton: { backgroundColor: '#9f6273', padding: 8, borderRadius: 5 },
  deleteButton: { backgroundColor: '#FF5C5C', padding: 8, borderRadius: 5 },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold' },
  floatingButton: {
    backgroundColor: '#A7B48C',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

