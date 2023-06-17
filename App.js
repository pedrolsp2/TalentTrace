import React from 'react';
import { StatusBar,Platform } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from './src/routes/router';
import TabRouter from './src/routes/tabRouter';
import { useFonts, Poppins_400Regular, Poppins_600Medium, Poppins_700Bold} from '@expo-google-fonts/poppins'; 
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

export default function App() { 
  const [fontsLoaded ] = useFonts({
    Poppins_400Regular, 
    Poppins_600Medium,
    Poppins_700Bold
  }) 

  const barStyle = Platform.OS === 'android' ? 'light-content' : 'dark-content';


  return (
    <NavigationContainer>
      <StatusBar translucent={true} backgroundColor="rgba(0, 0, 0, 0.31)" barStyle={barStyle} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Routes" component={Routes} />
        <Stack.Screen name="TabRouter" component={TabRouter} />
      </Stack.Navigator>
      <Toast/>
    </NavigationContainer>
  );
}
