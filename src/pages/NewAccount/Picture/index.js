import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator, SafeAreaView, TouchableOpacity, Platform, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { primaryColor, secundaryColor, TerColor, styles } from '../styles.js';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase as fb } from '../../../Configs/firebasestorageconfig.js'

export default function Picture() {

  const [newData, setNewData] = useState(null);
  const [picutreName, setPictureName] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    });

    const source = { uri: result.uri }
    setImage(source)
  }

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri)
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1)
    setPictureName(filename)
     var ref = fb.storage().ref().child('profile/' + filename).put(blob)
     try{
         await ref;
     }catch(e){
         console.log(e)
     }
     setUploading(false)
     setImage(null)

     const updatedData = {
       ...newData,
       foto: filename
     };
     try {
       await AsyncStorage.setItem('@talenttrace:dataUsers', JSON.stringify(updatedData));
       navigation.navigate("CoverUser")
     } catch (error) {
       console.log(error);
     }
     setUploading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.info}>
          <TouchableOpacity onPress={() => navigation.navigate('DescritionUser')}>
            <Ionicons
              name='chevron-back-outline'
              size={52}
              color={TerColor}
            />
          </TouchableOpacity>
          <Text style={styles.Title}>Para finalizar</Text>
          <Text style={styles.Text}>Escolha um foto bonita para seu perfil</Text>
        </View>
        <View style={styles.containerPicture}>
          {image && <Image source={{ uri: image.uri }} style={styles.ImageP}></Image>}
        </View>
        <TouchableOpacity style={[styles.Button,{marginBottom: 4, backgroundColor: secundaryColor}]} onPress={pickImage}>
          <Text style={styles.TextButton}>Selecionar</Text>
        </TouchableOpacity>
        {
          image && (
            <TouchableOpacity style={styles.Button} onPress={uploadImage} disabled={uploading}>
              <Text style={styles.TextButton}>
                {uploading ? <ActivityIndicator size="large" color={secundaryColor} /> : 'Avançar'}
              </Text>
            </TouchableOpacity>
          )
        }
      </View>
    </SafeAreaView>
  );
}

