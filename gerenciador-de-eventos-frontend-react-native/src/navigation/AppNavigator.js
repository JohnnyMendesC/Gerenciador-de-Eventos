import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login/Login';
import CadastroScreen from '../screens/Cadastro/Cadastro';
import HomeScreen from '../screens/Home/Home';
import { Image } from 'react-native';

const Stack = createStackNavigator();
function LogoTitle() {
  return (
    <Image
      style={{ width: 300, height: 100, marginBottom: 10 }}
      source={require('../../assets/IdealizeD.png')}
      resizeMode="contain"
    />
  );
}
export default function AppNavigator({ initialRoute }) {
  console.log('AppNavigator initialRoute:', initialRoute);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ 
            headerStyle: { backgroundColor: '#ab8742' },
            headerTitleStyle: { color: '#FFFFFF', fontFamily: 'AlexBrush_400Regular', fontSize: 48 },
          }} 
        />
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{ 
            headerStyle: { backgroundColor: '#ab8742' },
            headerTitleStyle: { color: '#FFFFFF', fontFamily: 'AlexBrush_400Regular', fontSize: 48 },
          }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            headerStyle: { backgroundColor: '#A7B48C' },
            headerTitle: () => <LogoTitle />,
            headerTitleAlign: 'center',
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}