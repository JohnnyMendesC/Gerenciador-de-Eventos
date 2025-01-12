import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../services/auth';

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
      <Text>Email do Administrador</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <Text>Senha</Text>
      <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry />
      <Button title="Gravar Senha" onPress={() => setRememberMe(!rememberMe)} />
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Cadastrar-se" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});