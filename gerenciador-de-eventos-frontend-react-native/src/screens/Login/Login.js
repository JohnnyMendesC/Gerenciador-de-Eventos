import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../services/auth';
import { Switch } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleLogin = async () => {
    try {
      console.log('Tentando fazer login com:', { email, senha });
      const data = await login(email, senha);
      console.log('Resposta da API:', data);
      if (data) {
        if (rememberMe) {
          await AsyncStorage.setItem('adminEmail', email);
          await AsyncStorage.setItem('adminPassword', senha);
        }
        await AsyncStorage.setItem('token', data);
        navigation.navigate('Home');
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputText}>Email do Administrador</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text style={styles.inputText}>Senha</Text>
      <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Gravar Senha</Text>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
          trackColor={{ false: '#767577', true: '#ab8742' }}
          thumbColor={rememberMe ? '#A7B48C' : '#9f6273'}
        />
      </View>
      <TouchableOpacity style={styles.button} title="Entrar" onPress={handleLogin}>
      <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} title="Cadastrar-se" onPress={() => navigation.navigate('Cadastro')}>
      <Text style={styles.buttonText}>Cadastrar-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3e7d1',
  },
  input: {
    backgroundColor: '#FFFFFF',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    fontFamily: 'Comfortaa_700Bold',
  },
  inputText: {
    fontSize: 36,
    color: '#ab8742',
    fontFamily: 'AlexBrush_400Regular',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#4B4B4B',
    fontFamily: 'Comfortaa_400Regular',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    color: '#ab8742',
    fontFamily: 'AlexBrush_400Regular',
  },
  button: {
    backgroundColor: '#A7B48C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Amita_700Bold',
  },
});