import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login/Login';
import CadastroScreen from '../screens/Cadastro/Cadastro';
import HomeScreen from '../screens/Home/Home';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}