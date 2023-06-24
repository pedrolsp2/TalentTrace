import React, { useState, } from 'react';
import { View, ScrollView, Text,  SafeAreaView, TouchableOpacity, TextInput  } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from './styles.js';
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../../../../Configs/firebasestorageconfig';
import Toast from 'react-native-toast-message';

export default function Skills() {

    const route = useRoute();
    const navigation = useNavigation();

  const data = route.params?.data;
  const [city, setCity] = useState(data.cidade);
  const [age, setAge] = useState(data.idade);
  const [height, setHeight] = useState(data.altura);
  const [weight, setWeight] = useState(data.peso);
  const [position, setPostion] = useState(data.posicao);
  const [leg, setLeg] = useState(data.perna);

  const handleChangeHeight = (text) => {
    const numericText = text.replace(/[^0-9.]/g, '');
    if (numericText === '') {
      setHeight('');
      return;
    }
    const limitedText = numericText.slice(0, 4);
    const formattedText = formatHeight(limitedText);
    setHeight(formattedText);
  };
  
  const formatHeight = (text) => {
    const digits = text.replace(/\D/g, '');
    const formatted = digits.replace(/(\d{1})(\d{0,2})/, '$1.$2');
    return formatted;
  };

  const handleAlterarDados = async () => {
    const firestore = firebase.firestore();
    firestore
      .collection('users')
      .where('idUser', '==', data.idUser)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const updatedData = {};

          if (city !== data.city) {
            updatedData.city = city;
          }

          if (age !== data.idade) {
            updatedData.idade = age;
          }

          if (height !== data.altura) {
            updatedData.altura = altura;
          }

          if (weight !== data.peso) {
            updatedData.peso = peso;
          }

          if (position !== data.posicao) {
            updatedData.posicao = posicao;
          }

          if (leg !== data.perna) {
            updatedData.perna = perna;
          }

          if (Object.keys(updatedData).length === 0) {
            Toast.show({
              type: 'info',
              text1: 'Nenhuma alteração realizada',
            });
            return;
          }

          firestore
            .collection('users')
            .doc(doc.id)
            .update(updatedData)
            .then(() => {
              Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Dados alterados com sucesso!',
              });
              navigation.navigate('TabRouter', { screen: 'Index' });
            })
            .catch((error) => {
              console.log(error);
              Toast.show({
                type: 'error',
                text1: 'Erro ao alterar dados',
                text2: 'Tente novamente mais tarde.',
              });
            });
        });
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Erro ao buscar dados',
        });
      });
  };
  
  return (
    <SafeAreaView style={styles.container}> 
      <ScrollView style={styles.containerItems}>
        <View style={styles.info}>
          <View style={styles.containerInput}>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='location-outline' size={32} color="#1C3F7C" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Sua cidade'
                  value={city}
                  onChangeText={setCity}
                />
              </View>
            </View>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='person-outline' size={32} color="#1C3F7C" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Sua idade'
                  value={age}
                  onChangeText={setAge}
                  maxLength={3}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='body-outline' size={32} color="#1C3F7C" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Sua altura'
                  value={height}
                  onChangeText={handleChangeHeight}
                  maxLength={4}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='barbell-outline' size={32} color="#1C3F7C" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Seu peso'
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='flag-outline' size={32} color="#1C3F7C" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Sua posição'
                  value={position}
                  onChangeText={setPostion}
                />
              </View>
            </View>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='walk-outline' size={32} color="#1C3F7C" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Sua perna mestra'
                  value={leg}
                  onChangeText={setLeg}
                />
              </View>
            </View>
          </View>
        </View>
          <TouchableOpacity style={styles.ButtonSkills} onPress={handleAlterarDados}> 
             <Text style={styles.TextButton}>Avançar</Text>
          </TouchableOpacity>
      </ScrollView> 
    </SafeAreaView>
  );
}
