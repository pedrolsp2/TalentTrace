import React, { useEffect, useState } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView,TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import firebase from "../../Configs/firebaseconfig.js"
import { styles } from './styles.js';
import { firebase as fb } from '../../Configs/firebasestorageconfig.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { querryId } from '../../utils/storage.js';
import { Publications } from '../Components/Publications/index.js';

export default function Index() {
  const route = useRoute();
  const navigation = useNavigation();
  const storage = fb.storage();
  const db = firebase.firestore();
  const [idUs, setIdUs] = useState(''); 
  const [dataUser, setDataUser] = useState({})
  const [documents, setDocuments] = useState([]);


  const statusUser = () => {
    return !!dataUser;
  };

  const IndexHome = () => {
    const [userData, setUserData] = useState(null);
    const [photoProfile, setPhotoProfile] = useState(null);
    const [photoCover, setPhotoCover] = useState(null);

    useEffect(() => {
      const fetchUserData = async () => {
        const idUser = await querryId();
        return idUser
      };
  
      fetchUserData()
      .then(users => {
        setDataUser(users)
        })
        .catch(error => {
        console.log('Erro ao buscar os usuários:', error);
        });
      AsyncStorage.removeItem('@talenttrace:dataUsers');
      const unsubscribe = firebase.firestore().collection('users').onSnapshot((snapshot) => {
        const data = snapshot.docs
          .map((doc) => {
            const docData = doc.data();
            const id = doc.id;

            if (docData.idUser === dataUser) {
              return { ...docData, id };
            } else {
              return null;
            }
          })
          .filter((item) => item !== null);

        if (data.length > 0) {
          setUserData(data[0]);
          getImageUrl(data[0]);
        }
      });

        db.collection('post')
        .where('idUser', '==', idUs)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data()); 
          });
        })
        .catch((error) => {
          console.log('Erro ao obter os documentos:', error);
        });

      setIdUs(dataUser)

      const getImageUrl = async (userData) => {
        try {

          const coverRef = storage.ref().child('cover' + '/' + userData.capa);
          const profileRef = storage.ref().child('profile' + '/' + userData.foto);
          const coverUrl = await coverRef.getDownloadURL();
          const profileUrl = await profileRef.getDownloadURL();

          setPhotoCover(coverUrl)
          setPhotoProfile(profileUrl)

        } catch (error) {
          //console.log('Erro ao consultar a imagem:', error);
          return null;
        }
      };

      return () => unsubscribe();

    }, [dataUser]);

    if (!userData) {
      return null;
    }  

    function reload(){
      AsyncStorage.removeItem('@talenttrace:idUser');
      navigation.navigate("Login")
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.coverContainer}>
            {photoCover ? (
              <Image source={{ uri: photoCover }} style={styles.cover} />
            ) : 
              <View style={styles.skeleton}></View>
            }
            {photoProfile ? (
              <Image source={{ uri: photoProfile }} style={styles.profile} />
            ) : 
            <View style={styles.skeletonImage}></View>
          }
            <TouchableOpacity style={styles.edit} onPress={reload} ><Ionicons name='create-outline' size={24} color="#1c3f7c"/></TouchableOpacity>
          </View>
          <View style={styles.containerContnet}>
            <Text style={styles.Nome}>
              {userData.nome}
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
                    <Text style={styles.textIcon}> {userData.cidade}</Text>

                    </Text>

                  <Text style={styles.icon}>
                    <Ionicons
                      name='body-outline'
                      size={24}
                      color="#1C3F7C"
                      style={styles.iconSkills}
                    />
                    <Text style={styles.textIcon}> {userData.altura}</Text>

                    </Text>

                  <Text style={styles.icon}>
                    <Ionicons
                      name='flag-outline'
                      size={24}
                      color="#1C3F7C"
                      style={styles.iconSkills}
                    />
                    <Text style={styles.textIcon}> {userData.posicao}</Text>

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
                    <Text style={styles.textIcon}> {userData.idade} anos</Text>

                    </Text>

                  <Text style={styles.icon}>
                    <Ionicons
                      name='barbell-outline'
                      size={24}
                      color="#1C3F7C"
                      style={styles.iconSkills}
                    />
                    <Text style={styles.textIcon}>  {userData.peso}kg</Text>

                    </Text>

                  <Text style={styles.icon}>
                    <Ionicons
                      name='walk-outline'
                      size={24}
                      color="#1C3F7C" 
                      style={styles.iconSkills}
                    />
                    <Text style={styles.textIcon}> {userData.perna}</Text>

                    </Text>
                    
                </View>
              </View>
              <Text style={styles.label}>
                Por onde passei
              </Text>
              <Text style={styles.textP}>
                {userData.passou}
              </Text>
              <Text style={styles.label}>
                Sobre mim
              </Text>
              <Text style={styles.textP}>
                {userData.sobre}
              </Text>
              <Text style={styles.label}>
                Publicações
              </Text>
                <Publications/>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  const UserOff = () => {
    return (
      <SafeAreaView>
        <Text>Faça o login</Text>
      </SafeAreaView>
    )
  }

  return (
    <IndexHome />
  )
}

