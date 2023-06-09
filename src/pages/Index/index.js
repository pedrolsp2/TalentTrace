import React, { useEffect, useState } from 'react';
import { View, Image, Text, SafeAreaView, ScrollView,TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import firebase from "../../Configs/firebaseconfig.js"
import { styles } from './styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { querryId } from '../../utils/storage.js';
import { Publications } from '../Components/Publications/index.js';
import { format, parse } from 'date-fns';

export default function Index() {
  const navigation = useNavigation();
  const [idUs, setIdUs] = useState(''); 
  const [dataUser, setDataUser] = useState({})
  const [age, setAge] = useState(null);

  const statusUser = () => {
    return !!dataUser;
  };

  const IndexHome = () => {
    const [userData, setUserData] = useState(null);

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
        }
      });

      setIdUs(dataUser)

      return () => unsubscribe();

    }, [dataUser]);

    if (!userData) {
      return null;
    }  

    function setting(){
      navigation.navigate("Settings", { data: {...userData,urlFoto:userData.foto,urlCover:userData.capa} })
    }

    const handleExit = () => {
      Alert.alert(
        'Desconectar',
        'Deseja realmente desconectar?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => {
              // Ação a ser executada ao pressionar o botão "Cancelar"
            }
          },
          {
            text: 'Desconectar',
            style: 'destructive',
            onPress: () => {
              AsyncStorage.removeItem('@talenttrace:idUser');
              navigation.navigate("Welcome")
            }
          }
        ]
      );
    }; 

    function getAge(age){
      const currentDate = new Date();
      const providedDate = parse(age, 'dd/MM/yyyy', new Date());  
      const diffInYears = Math.floor((currentDate - providedDate) / (365.25 * 24 * 60 * 60 * 1000));  
      setAge(diffInYears);
      return diffInYears;
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.coverContainer}>
            {userData.capa ? (
              <Image source={{ uri: userData.capa }} style={styles.cover} />
            ) : 
              <View style={styles.skeleton}></View>
            }
            {userData.foto ? (
              <Image source={{ uri: userData.foto }} style={styles.profile} />
            ) : 
            <View style={styles.skeletonImage}></View>
          }
            <TouchableOpacity style={styles.edit} onPress={setting} ><Ionicons name='create-outline' size={24} color="#1c3f7c"/></TouchableOpacity>
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
                    <Text style={styles.textIcon}> {getAge(userData.idade)} anos</Text>

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
              <Text style={styles.labelPubli}>
                Publicações
              </Text>
                <Publications data={userData.idUser}/>
            </View>
          </View>
          <TouchableOpacity onPress={handleExit} style={styles.exit}>
            <Text style={styles.exitText}>Desconectar</Text>
          </TouchableOpacity>
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

