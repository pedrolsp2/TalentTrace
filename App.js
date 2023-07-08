import React, { useEffect,useState } from 'react';
import { StatusBar, Platform, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Routes from './src/routes/router';
import TabRouter from './src/routes/tabRouter';
import { useFonts, Poppins_400Regular, Poppins_600Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo'; 

const Stack = createStackNavigator();

export default function App() { 

  const [isConnected, setIsConnected] = useState(true);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600Medium,
    Poppins_700Bold
  })

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const barStyle = Platform.OS === 'android' ? 'light-content' : 'dark-content';


  return (
    <>
      {isConnected ? (
    <NavigationContainer>
      <StatusBar translucent={true} backgroundColor="rgba(0, 0, 0, 0.31)" barStyle={barStyle} />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Routes" component={Routes} />
            <Stack.Screen name="TabRouter" component={TabRouter} />
          </Stack.Navigator>
          <Toast />
    </NavigationContainer>
      ) : (
        <View style={{flex: 1,flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8, backgroundColor: '#1A0751'}}>
          <Image source={require('./assets/404.png')} style={{width: '100%',height: '100%'}} resizeMode="contain" />
        </View>
        )}
    </>
  );
}
