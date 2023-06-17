import React, {useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native"; 

export default function Splash() {

    const navigation = useNavigation(); 

      async function retrieveId() {
        try {
          const storedId = await AsyncStorage.getItem('@talenttrace:idUser');
          if (storedId) {
            const parsedId = JSON.parse(storedId);
            navigation.navigate('TabRouter', { screen: 'Index', params: { dataUser: parsedId } });
          } else {
            console.log('Nenhum valor encontrado no AsyncStorage');
            navigation.navigate("Welcome")
          }
        } catch (error) {
          console.log('Erro ao resgatar o valor:', error);
        }
      }
      
      retrieveId()

    return (
        <SafeAreaView  style={styles.container}>
            <View>
                <Text style={styles.Ttile}>
                    TALENT TRACE
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#290398',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Ttile: {
        fontSize: 32,
        color: '#fafafa',
        fontFamily: 'Poppins_700Bold',
    }
})

