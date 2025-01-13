import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { useFonts } from 'expo-font';
import { AlexBrush_400Regular } from '@expo-google-fonts/alex-brush';
import { Amita_400Regular, Amita_700Bold } from '@expo-google-fonts/amita';
import { Comfortaa_400Regular, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';

export default function App() {  
  const [initialRoute, setInitialRoute] = useState('Login');
  const [isReady, setIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    AlexBrush_400Regular,
    Amita_400Regular,
    Amita_700Bold,
    Comfortaa_400Regular,
    Comfortaa_700Bold,
  });

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setInitialRoute('Home');
      }
      await SplashScreen.hideAsync();
      await new Promise(resolve => setTimeout(resolve, 6000));
      setIsReady(true);
    };
    prepare();
  }, []);

  useEffect(() => {
    console.log('Initial Route:', initialRoute);
  }, [initialRoute]);

  if (!isReady || !fontsLoaded) {
    return (
      <View style={styles.splashContainer}>
        <Video
          source={require('./assets/splash.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay
          isLooping 
          style={styles.splashVideo}
        />
      </View>
    );
  }

  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        <AppNavigator initialRoute={initialRoute} />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  splashVideo: {
    width: '80%',
    height: '80%',
  },
});
