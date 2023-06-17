import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator, SafeAreaView, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { querryId } from '../../utils/storage.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase as fb } from '../../Configs/firebasestorageconfig.js'
import { SelectPhoto } from './SelectPhoto/index.js';

const TerColor = '#290398';
const secundaryColor = '#14AF6C';

export default function NewPost() {

  const [idUser, setIdUser] = useState(null);
  const [picutreName, setPictureName] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();

  useEffect(()=>{
    const fetchUserData = async () => {
      const idUser = await querryId();
      return idUser
    };

    fetchUserData()
    .then(users => {
        setIdUser(users)
      })
      .catch(error => {
         console.log('Erro ao buscar os usuários:', error);
      });
  })
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
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
    const storageRef = fb.storage().ref();
    const postRef = storageRef.child('post/' + filename);
    await postRef.put(blob);

    setUploading(false)
    setImage(null)

    try{
      const newData = {
        id: idUser,
        foto: filename
      }
    await AsyncStorage.setItem("@talenttrace:post",JSON.stringify(newData));
    }catch(error){
      console.log(error)
    }
        navigation.navigate('SelectPhoto')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.containerPicture}>
          {image && <Image source={{ uri: image.uri }} style={styles.ImageP}></Image>}
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('SelectPhoto')}><Text>as</Text></TouchableOpacity>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between'
    }, 
    info: {
        alignItems: 'center',
        marginBottom: 12,
    },
    containerPicture:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        marginBottom: 12,
        marginTop: 12
    },
    ImageP:{
         width: '100%',
          height: '100%',
          borderRadius: 12
    },
    Button:{
        borderWidth: 1,
        borderColor: '#fafafa',
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        backgroundColor: TerColor
    },
    TextButton:{
        fontFamily: 'Poppins_700Bold',
        color: '#fafafa'
    },
});
