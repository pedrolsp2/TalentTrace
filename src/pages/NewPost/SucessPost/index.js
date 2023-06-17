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
        console.log('newDatas:', parsedUserData);

        db.collection('users')
          .where('idUser', '==', parsedUserData.id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              const foto = data.foto;
              getUserPic(foto);
            });
          })
          .catch((error) => {
            console.log('Erro ao buscar documento:', error);
          });

        getPost(parsedUserData.foto);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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

  const getUserPic = async (user) => {
    try {
      const userRef = storageP.ref().child('profile/' + user);
      const userUrl = await userRef.getDownloadURL();
      setPhotoProfile(userUrl);
      console.log('user url', userUrl);
    } catch (error) {
      console.log('Erro ao obter a URL do usuário:', error);
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
