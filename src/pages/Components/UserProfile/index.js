import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import firebase from "../../../Configs/firebaseconfig.js"
import { styles } from './styles.js';
import { firebase as fb } from '../../../Configs/firebasestorageconfig.js';
import { querryId, saveFavorites, isFavorites, removeFavorites } from '../../../utils/storage';

export default function UserProfile() {
  const route = useRoute();
  const navigation = useNavigation();
  const [idUs, setIdUs] = useState('');
  const dataUser = route.params?.data;
  const [userData, setUserData] = useState(null);
  const [myUser, setMyUser] = useState('');
  const [photoProfile, setPhotoProfile] = useState(null);
  const [photoCover, setPhotoCover] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const fetchUserData = async () => {
      const idUser = await querryId();
      setMyUser(idUser);
    };

    fetchUserData()
      .catch(error => {
        console.log('Erro ao buscar os usuários:', error);
      });

    const getStatusFavorites = async () => {
      const userFavorite = await isFavorites(myUser, dataUser);
      setFavorite(userFavorite);
    };

    navigation.setOptions({
      title: 'Detalhes do atleta',
      headerRight: () => (
        <Pressable onPress={handleFavorite}>
          {favorite ? (
            <Entypo name="heart" size={28} color={'#ff4141'} />
          ) : (
            <Entypo name="heart-outlined" size={28} color={'#ff4141'} />
          )}
        </Pressable>
      )
    });

    const unsubscribe = firebase.firestore().collection('users').onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data();
        const id = doc.id;
        if (docData.idUser === dataUser) {
          setIdUs(docData.idUser);
          return { ...docData, id };
        } else {
          return null;
        }
      }).filter((item) => item !== null);

      if (data.length > 0) {
        setUserData(data[0]);
        getImageUrl(data[0]);
      }
      setLoading(false); // Indicar que o carregamento foi concluído
    });

    return () => unsubscribe();
  }, [navigation, dataUser, myUser, favorite]);

  useEffect(() => {
    const getStatusFavorites = async () => {
      const userFavorite = await isFavorites(myUser, dataUser);
      setFavorite(userFavorite);
      console.log("status", userFavorite);
    };

    getStatusFavorites();
  }, [myUser, dataUser]);

  const getImageUrl = async (userData) => {
    try {
      const coverRef = fb.storage().ref().child('cover/' + userData.capa);
      const profileRef = fb.storage().ref().child('profile/' + userData.foto);
      const coverUrl = await coverRef.getDownloadURL();
      const profileUrl = await profileRef.getDownloadURL();
      setPhotoCover(coverUrl);
      setPhotoProfile(profileUrl);
    } catch (error) {
      console.log('Erro ao consultar a imagem:', error);
    }
  };

  const handleFavorite = async () => {
    if (favorite) {
      await removeFavorites(myUser, dataUser);
      setFavorite(false);
    } else {
      await saveFavorites(myUser, dataUser);
      setFavorite(true);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.coverContainer}>
          {photoCover ? (
            <Image source={{ uri: photoCover }} style={styles.cover} />
          ) : (
            <View style={styles.skeleton}></View>
          )}
          {photoProfile ? (
            <Image source={{ uri: photoProfile }} style={styles.profile} />
          ) : (
            <View style={styles.skeletonImage}></View>
          )}
        </View>
        <View style={styles.containerContnet}>
          <Text style={styles.Nome}>
            {userData && userData.nome}
          </Text>

          <View style={styles.containerInfoPlayer}>
            <Text style={styles.label}>
              Perfil do jogador
            </Text>
            <View style={styles.icons}>
              <View style={styles.iconsRow}>
                <Text style={styles.icon}>
                  <Ionicons
                    name='location-outline'
                    size={24}
                    color="#1C3F7C"
                    style={styles.iconSkills}
                  />
                  <Text style={styles.textIcon}> {userData && userData.cidade}</Text>
                </Text>

                <Text style={styles.icon}>
                  <Ionicons
                    name='body-outline'
                    size={24}
                    color="#1C3F7C"
                    style={styles.iconSkills}
                  />
                  <Text style={styles.textIcon}>{userData && userData.altura}</Text>
                </Text>

                <Text style={styles.icon}>
                  <Ionicons
                    name='flag-outline'
                    size={24}
                    color="#1C3F7C"
                    style={styles.iconSkills}
                  />
                  <Text style={styles.textIcon}>{userData && userData.posicao}</Text>
                </Text>
              </View>

              <View style={styles.iconsRow}>
                <Text style={styles.icon}>
                  <Ionicons
                    name='person-outline'
                    size={24}
                    color="#1C3F7C"
                    style={styles.iconSkills}
                  />
                  <Text style={styles.textIcon}>{userData && userData.idade} anos</Text>
                </Text>

                <Text style={styles.icon}>
                  <Ionicons
                    name='barbell-outline'
                    size={24}
                    color="#1C3F7C"
                    style={styles.iconSkills}
                  />
                  <Text style={styles.textIcon}>{userData && userData.peso} kg</Text>
                </Text>

                <Text style={styles.icon}>
                  <Ionicons
                    name='walk-outline'
                    size={24}
                    color="#1C3F7C"
                    style={styles.iconSkills}
                  />
                  <Text style={styles.textIcon}>{userData && userData.perna}</Text>
                </Text>
              </View>
            </View>
            <Text style={styles.label}>Por onde passei</Text>
            <Text style={styles.textP}>{userData && userData.passou}</Text>
            <Text style={styles.label}>Sobre mim</Text>
            <Text style={styles.textP}>{userData && userData.sobre}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
