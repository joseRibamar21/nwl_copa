import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NativeBaseProvider, Center, Text } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { THEME } from './src/style/theme';

export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular, Roboto_500Medium, Roboto_700Bold})

  if(fontsLoaded){
    return ()
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <Center flex={1} bgColor="gray.900" >
      
      <Text color="white" fontSize={24}>Open up App.js to start working on your aprp!</Text>
      <StatusBar style="auto" />
    
      </Center>
    </NativeBaseProvider>
  );
}
