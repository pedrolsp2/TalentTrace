import React, { useState } from 'react';
import { Text, View, SafeAreaView, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../../Configs/firebasestorageconfig.js'
import Toast from 'react-native-toast-message';

export default function Settings() {
  const route = useRoute();
  const navigation = useNavigation();
  const [newPicture, setNewPicture] = useState(false);
  const [image, setImage] = useState(null);
  const [newCover, setNewCover] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const { data } = route.params;

  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    });

    if (!result.cancelled) {
      const source = { uri: result.uri };
      if (type === 'photo') {
        setImage(source);
        setNewPicture(true);
      } else if (type === 'cover') {
        setCoverImage(source);
        setNewCover(true);
      }
    }
  };

  const handleConfirmChanges = async () => {
    // Verifica se há uma nova imagem para urlFoto e atualiza no Firestore
    if (newPicture) {
      try {
        const response = await fetch(image.uri);
        const blob = await response.blob();
  
        // Obtém a referência do arquivo no armazenamento
        const storageRef = firebase.storage().ref().child(`profile/${data.foto}`);
  
        // Faz o upload do novo blob para substituir o arquivo existente
        await storageRef.put(blob);
        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Imagem de perfil atualizada com sucesso!"
        })
      } catch (error) {
        console.log('Erro ao atualizar imagem de perfil no armazenamento:', error);
      }
    }
  
    // Verifica se há uma nova imagem para urlCover e atualiza no Firestore
    if (newCover) {
      try {
        const response = await fetch(coverImage.uri);
        const blob = await response.blob();
  
        // Obtém a referência do arquivo no armazenamento
        const storageRef = firebase.storage().ref().child(`cover/${data.capa}`);
  
        // Faz o upload do novo blob para substituir o arquivo existente
        await storageRef.put(blob);
        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Imagem de capa atualizada com sucesso!"
        })
      } catch (error) {
        console.log('Erro ao atualizar imagem de capa no armazenamento:', error);
      }
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={[styles.Title, styles.h1]}>Para editar, basta clicar em cima!</Text>
          <View style={styles.containerImages}>
            <Text style={styles.Title}>Editar fotos</Text>
            <TouchableOpacity onPress={() => pickImage('photo')} style={styles.photo}>
              {newPicture ? (
                <Image source={{ uri: image.uri }} style={styles.pphoto} />
              ) : (
                <Image source={{ uri: data.urlFoto }} style={styles.pphoto} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pickImage('cover')}>
              {newCover ? (
                <Image source={{ uri: coverImage.uri }} style={styles.cover} />
              ) : (
                <Image source={{ uri: data.urlCover }} style={styles.cover} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.Button} onPress={handleConfirmChanges}>
            <Text style={styles.TextButton}>Confirmar Alterações</Text>
          </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => {
              navigation.navigate('Routes', { screen: 'EditPassword', params: { data: data } });
            }}
          >
            <Text style={styles.smallButtonText}>Editar Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => {

            }}
          >
            <Text style={styles.smallButtonText}>Editar Skills</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 12,
  },
  Title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#404040',
  },
  h1: {
    color: '#1A0751',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 12
  },
  containerImages: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  cover: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  photo: {
    zIndex: 999,
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  pphoto: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#fafafa',
    borderRadius: 12,
  },
  Button: {
    alignSelf: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#fafafa',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    backgroundColor: '#14AF6C',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  smallButton: {
    width: '48%',
    height: 52,
    borderWidth: 1,
    borderColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    backgroundColor: '#1A0751',
  },
  smallButtonText: {
    fontFamily: 'Poppins_700Bold',
    color: '#fafafa',
  },
  TextButton: {
    fontFamily: 'Poppins_700Bold',
    color: '#fafafa',
  },
});
