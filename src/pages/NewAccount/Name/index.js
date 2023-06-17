import React, { useState } from 'react';
import { View, Image, Text, Button, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { primaryColor, secundaryColor, TerColor, styles } from '../styles.js';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function Name() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;      
    return emailRegex.test(email);
  }

  const removeNumbers = (str) => {
    return str.replace(/\d+/g, '');
  }

  const handleNomeChange = (value) => {
    const nomeWithoutNumbers = removeNumbers(value);
    setNome(nomeWithoutNumbers);
  }

  async function handleNewName() {
    if (email && !isEmailValid(email) || !email || !nome) {
      Toast.show({
        type: "error",
        text1: "Erro ao cadastar",
        text2: "Seu e-mail ou nome não é valido."
      })
    }
    else{
      try{
        const id = uuid.v4();
        const newData = {
          id,
          nome,
          email,
        }

      await AsyncStorage.setItem("@talenttrace:dataUsers",JSON.stringify(newData));
      }catch(error){
        console.log(error)
        
        Toast.show({
          type: "error",
          text1: "Erro ao cadastar",
          text2: "Parece que encontramos um erro ao cadastrar, tente novamente depois."
        })
      }
      navigation.navigate("PasswordUser")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.info}>
          <TouchableOpacity onPress={() => navigation.navigate('LetsGo')}>
            <Ionicons
              name='chevron-back-outline'
              size={52}
              color={TerColor}
            />
          </TouchableOpacity>
          <Text style={styles.Title}>Primeiro, vamos saber o seu nome!</Text>
          <Text style={styles.Text}>Informe também um e-mail para o cadastro.</Text>
          <View style={styles.containerInput}>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='person-outline' size={32} color="#1C3F7C" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Informe seu e-mail'
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='person-circle-outline' size={32} color="#1C3F7C" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Digite seu nome'
                  value={nome}
                  onChangeText={handleNomeChange}
                />
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.Button} onPress={handleNewName}>
          <Text style={styles.TextButton}>Avançar</Text>
        </TouchableOpacity> 
      </View>
    </SafeAreaView>
  );
}