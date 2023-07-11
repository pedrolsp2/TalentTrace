import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from "../../../Configs/firebaseconfig.js";
import {firebase as fb} from "../../../Configs/firebasestorageconfig.js";
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function Publications({ data }) {
  const db = firebase.firestore();
  const [userPost, setUserPost] = useState([]);
  const [datePost, setDatePost] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    db.collection('post')
      .where('idUser', '==', data)
      .get()
      .then((querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          posts.push(doc.data());
        });
        setUserPost(posts);
      })
      .catch((error) => {
        console.log('Erro ao obter os documentos:', error);
      });
  }, [data]);

  useEffect(() => {
    const currentDate = new Date();
    if (userPost.length > 0) {
      const postDateParts = userPost[0].dataPost.split(' ');
      const dateParts = postDateParts[0].split('/');
      const timeParts = postDateParts[1].split(':');

      const postDate = new Date(
        parseInt(dateParts[2]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[0]),
        parseInt(timeParts[0]),
        parseInt(timeParts[1])
      );

      if (isMoreThanOneDayAgo(postDate, currentDate)) {
        setDatePost(postDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
      } else {
        const formattedDate = formatDistanceToNow(postDate, { locale: ptBR });
        setDatePost(formattedDate);
      }
    }
  }, [userPost]);

  const isMoreThanOneDayAgo = (postDate, currentDate) => {
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    const diffInMillis = currentDate.getTime() - postDate.getTime();

    return diffInMillis > oneDayInMillis;
  }; 

  const handleDeletePhoto = async (photo) => {
    try {
      // Find the document in 'post' collection based on fotoName field
      const querySnapshot = await db.collection('post').where('fotoName', '==', photo.fotoName).get();
  
      // Delete the document and photo if found
      querySnapshot.forEach(async (doc) => {
        // Delete document from the 'post' collection
        await doc.ref.delete();
  
        // Delete photo from storage
        await fb.ref(`/post/${photo.fotoName}`).delete();
      });
  
      // Remove the deleted photo from the userPost state
      setUserPost((prevUserPost) => prevUserPost.filter((item) => item.fotoName !== photo.fotoName));
  
      // Reset selected photo and delete confirmation state
      setSelectedPhoto(null);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.log('Error deleting photo:', error);
    }
  };
  
  
  
  return (
    <>
      {data ? (
        <View>
          {userPost.map((item, index) => (
            <View key={index} style={styles.container}>
              <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => {
                  setShowDeleteConfirmation(!showDeleteConfirmation);
                  setSelectedPhoto(item);
                }}
              >
                <Ionicons name="ellipsis-horizontal-outline" size={24} color="#ffffff" style={styles.icon} />
              </TouchableOpacity>
              <Image source={{ uri: item.foto }} style={styles.cover} />
              <View style={styles.infoView}>
                <Text style={styles.textTitle}>{item.descricao}</Text>
                <Text style={[styles.textTitle, styles.local]}>{datePost}</Text>
              </View>
            </View>
          ))}
          {selectedPhoto && showDeleteConfirmation && (
            <View style={styles.deleteConfirmation}>
              <TouchableOpacity onPress={() => handleDeletePhoto(selectedPhoto)}>
                <Text>Deletar post</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <Text style={styles.textP}>
          Sem Publicações
        </Text>
      )}
    </>
  ); 
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    height: 400,
    position: 'relative',
    borderRadius: 12,
  },
  cover: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  infoView: {
    width: '100%',
    position: "absolute",
    bottom: 10,
    backgroundColor: 'rgba(0,0,0, 0.30)',
    padding: 4,
    height: 70,
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12
  },
  textTitle: {
    color: '#fafafa',
    fontFamily: 'Poppins_400Regular',
    textShadowColor: 'rgba(0,0,0, 0.90)',
    textShadowOffset: { width: -1, height: 1.5 },
    textShadowRadius: 8,
  },
  local: {
    color: '#dadada',
    fontSize: 12
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  icon:{
    textShadowColor: 'rgba(0,0,0, 0.90)',
    textShadowOffset: { width: -1, height: 1.5 },
    textShadowRadius: 8,
    right: 15,
    top: 10,
  },
  deleteConfirmation: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    zIndex: 1,
  },
  textP: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    paddingBottom: 16,
  },
});
