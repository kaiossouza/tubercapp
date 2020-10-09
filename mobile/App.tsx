import 'react-native-gesture-handler';

import React from 'react';
import {StyleSheet} from 'react-native';
import { Button, DefaultTheme, Provider as PaperProvider, Text } from 'react-native-paper';
import { useFonts, Roboto_400Regular, Roboto_100Thin, Roboto_500Medium, Roboto_300Light } from '@expo-google-fonts/roboto';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/index';

import {AuthProvider} from './src/contexts/auth';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#82B1B6',
    text: '#82B1B6',
    fonts: {
      regular: 'Roboto_400Regular',
      medium: 'Roboto_500Medium',
      light: 'Roboto_300Light',
      thin: 'Roboto_100Thin'
    }
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_500Medium
  });

  if (!fontsLoaded) {
    return (<View>
      <Text>Carregando</Text>
    </View>);
  }

  return (
    <PaperProvider theme={theme}>      
        <NavigationContainer>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </NavigationContainer>      
    </PaperProvider>
  );
}



