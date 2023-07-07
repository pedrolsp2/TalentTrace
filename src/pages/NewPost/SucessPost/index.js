import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Vector from '../../../../assets/Vector-Sucess.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../../Configs/firebaseconfig.js';
import { firebase as fb } from '../../../Configs/firebasestorageconfig.js';

export default function SucessPost() {
  const navigation = useNavigation();
  const storageP = fb.storage();
  const db = firebase.firestore();
  const [newData, setNewData] = useState(null);
  const [photoProfile, setPhotoProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postUrl, setPostUrl] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const formattedDate = currentDate.toLocaleString('pt-BR', options);
    setDate(formattedDate);
    console.log(formattedDate)

    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('@talenttrace:post');
        const parsedUserData = JSON.parse(userData);
        setNewData(parsedUserData);
        getPost(parsedUserData.foto);
        getFotoByUserId(parsedUserData.id)
          .then(foto => {
            if (foto) {
              console.log('Foto encontrada:', foto);
            } else {
              console.log('Nenhuma foto encontrada para o userId fornecido.');
            }
          })
          .catch(error => {
            console.error('Erro ao buscar foto:', error);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  async function getFotoByUserId(userId) {
    try {
      const snapshot = await firebase.firestore().collection('users').where('idUser', '==', userId).get();
      
      if (snapshot.empty) {
        console.log('Nenhum documento encontrado com o idUser fornecido.');
        return null;
      }
      
      // Aqui você pode acessar o campo 'foto' do primeiro documento retornado
      const data = snapshot.docs[0].data();
      const foto = data.foto;
      setPhotoProfile(foto)
      
      return foto;
    } catch (error) {
      console.error('Erro ao buscar dados do Firebase:', error);
      return null;
    }
  }

  const handleNewPost = async () => {
    try {
      const userNew = await firebase.firestore().collection('post').add({
        nome: newData.nome,
        foto: postUrl,
        descricao: newData.desc,
        user: photoProfile,
        idUser: newData.id,
        dataPost: date
      });
      AsyncStorage.removeItem('@talenttrace:post');
      navigation.navigate('TabRouter', { screen: 'ForYou' });
    } catch (error) {
      console.log('Erro ao criar novo post:', error);
    }
  };

  const getPost = async (post) => {
    try {
      const postRef = storageP.ref().child('post/' + post);
      const postUrl = await postRef.getDownloadURL();
      setPostUrl(postUrl);
      console.log('post url', postUrl);
    } catch (error) {
      console.log('Erro ao obter a URL do post:', error);
    }
  };

  if (!newData || loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color="#fafafa" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Vector} style={{ marginTop: '-10%', width: '90%', height: 400 }} resizeMode="contain" />
      <View style={styles.Welcome}>
        <View style={styles.Texts}>
          <Text style={styles.h1}>Show de bola!</Text>
          <Text style={styles.h2}>Post criado com sucesso.</Text>
        </View>
        <TouchableOpacity style={styles.Button} onPress={handleNewPost}>
          <Text style={styles.TextButton}>Ver Post's</Text>
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
    alignItems: 'center',
  },
  Welcome: {
    width: '100%',
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
    marginTop: '-10%',
  },
  Button: {
    borderWidth: 1,
    borderColor: '#fafafa',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    width: '100%',
    marginBottom: '8%',
  },
  TextButton: {
    fontFamily: 'Poppins_700Bold',
    color: '#fafafa',
  },
  h1: {
    color: '#fafafa',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    fontSize: 40,
  },
  h2: {
    color: '#fafafa',
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    fontSize: 24,
  },
});
