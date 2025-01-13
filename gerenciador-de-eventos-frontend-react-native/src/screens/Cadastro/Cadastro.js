import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerAdmin } from '../../services/auth'; // Certifique-se de importar a função registerAdmin

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: Yup.string().required('Senha é obrigatória'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha'), null], 'Senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),
});

export default function CadastroScreen({ navigation }) {
  const handleCadastro = async (values) => {
    try {
      console.log('Tentando cadastrar com:', values);
      const adminData = {
        nome: values.name,
        email: values.email,
        senha: values.senha,
      };
      const data = await registerAdmin(adminData);
      console.log('Resposta da API de cadastro:', data);
      alert('Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao realizar cadastro:', error);
      alert('Erro ao realizar cadastro');
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', senha: '', confirmarSenha: '' }}
      validationSchema={validationSchema}
      onSubmit={handleCadastro}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text>Nome do Administrador</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <Text>Senha</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('senha')}
            onBlur={handleBlur('senha')}
            value={values.senha}
            secureTextEntry
          />
          {touched.senha && errors.senha && <Text style={styles.error}>{errors.senha}</Text>}
          <Text>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('confirmarSenha')}
            onBlur={handleBlur('confirmarSenha')}
            value={values.confirmarSenha}
            secureTextEntry
          />
          {touched.confirmarSenha && errors.confirmarSenha && <Text style={styles.error}>{errors.confirmarSenha}</Text>}
          <TouchableOpacity style={styles.button} title="Cadastrar" onPress={handleSubmit}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3e7d1',
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontFamily: 'Comfortaa_400Regular',
  },
  error: {
    color: 'red',
    fontFamily: 'Comfortaa_400Regular',
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