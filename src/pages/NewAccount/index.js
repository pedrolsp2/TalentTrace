import React, { useState, useEffect } from 'react';
import {View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Text, Alert} from 'react-native';
import Vector from '../../../assets/Vector-Sucess.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../Configs/firebase-config.js';
import firebase from "../../Configs/firebaseconfig.js"

export default function NewAccount() {

    const [newData, setNewData] = useState(null);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const navigation = useNavigation(); 

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userData = await AsyncStorage.getItem('@talenttrace:dataUsers');
          setNewData(JSON.parse(userData));
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserData();
    }, []);   

  let users = [];
  async function convertData() {
    try {
      const data = await AsyncStorage.getItem('@talenttrace:dataUsers');
      if (data) {
        try {
          const parsedData = JSON.parse(data);
          users = parsedData;
          console.log(users) 
        } catch (parseError) {
          console.log('Error parsing data:', parseError);
        }
      } else {
        console.log('No data found in AsyncStorage');
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  }

  convertData()


  const handleNewUser = async (id) => {
    const userNew = await firebase.firestore().collection("users").add({
      idUser: id,
      altura: users.altura,
      cidade: users.cidade,
      email: users.email,
      nome: users.nome,
      passou: users.passou,
      perna: users.perna,
      peso: users.peso,
      posicao: users.posicao,
      senha: users.senha,
      sobre: users.sobre,
      foto: users.foto, 
      capa: users.capa,
      contato: users.contato      
    }) 
  }

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, users.email, users.senha)
      .then((userCredential) => {
        console.log('user new');
        const userOn = userCredential.user;
        console.log(userOn.uid.toString());
        handleNewUser(userOn.uid)
        navigation.navigate("Login")
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert("Email já esta sendo usado")
          navigation.navigate("NameUser")
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert("Email invalido")
          navigation.navigate("NameUser")
        } else if (error.code === 'auth/invalid-password') {
          Alert.alert("Senha invalidade")
          navigation.navigate("NameUser")
        }
      });
  }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={Vector}  style={{marginTop: '-10%', width: '90%', height: 400}} resizeMode="contain" />     
            <View style={styles.Welcome}>
                <View style={styles.Texts}>
                    <Text style={styles.h1}>Show de bola!</Text>
                    <Text style={styles.h2}>Bem vindo ao time.</Text>
                </View>
            <TouchableOpacity style={styles.Button} onPress={handleCreateAccount}>
                <Text style={styles.TextButton}>Confirmar Login</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
} 

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#1A0751',
        alignItems: 'center'
    },
    Welcome:{
        width: '100%',
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
        marginTop: '-10%'
    },
    Button:{
        borderWidth: 1,
        borderColor: '#fafafa',
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        width: '100%',
        marginBottom: "8%"
    },
    TextButton:{
        fontFamily: 'Poppins_700Bold',
        color: '#fafafa'
    },
    h1:{
        color: '#fafafa',
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center',
        fontSize: 40
    },
    h2:{
        color: '#fafafa',
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center',
        fontSize: 24
    }
})