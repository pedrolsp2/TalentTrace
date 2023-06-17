import React,{useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "../Configs/firebaseconfig"
import { Alert } from 'react-native'

export async function handleNewId(id) {
    try {    
      await AsyncStorage.setItem('@talenttrace:idUser', JSON.stringify(id));
      console.log('ID do usuário armazenado: ' + id);
      return id;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  export async function querryId(){
    try {
        const storedId = await AsyncStorage.getItem('@talenttrace:idUser');
        if (storedId !== null) {
          const userId = JSON.parse(storedId);
          return userId
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
  }

  export async function saveFavorites(idMyUser, idUserFavorite) {
    try {
      const userNew = await firebase.firestore().collection("favorites").add({
        idUser: idMyUser,
        idUserFavorite: idUserFavorite
      });
      Alert.alert("Sucesso!","Adicionado com sucesso")
      return userNew;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  export async function isFavorites(idUser, idUserFavorite){
    try {
        const snapshot = await firebase.firestore()
          .collection('favorites')
          .where('idUser', '==', idUser)
          .where('idUserFavorite', '==', idUserFavorite)
          .get();
    
        if (!snapshot.empty) {
          return true;
        }
        return false;
      } catch (error) {
        console.log('Error querying favorites:', error);
        return false;
      }
}

   export async function removeFavorites(idUser, idUserFavorite) {
    try {
      const favoritesRef = firebase.firestore().collection('favorites');
      const querySnapshot = await favoritesRef
        .where('idUser', '==', idUser)
        .where('idUserFavorite', '==', idUserFavorite)
        .get();
  
      querySnapshot.forEach((doc) => {
        favoritesRef.doc(doc.id).delete();
      });
        Alert.alert("Sucesso!","Exluido com sucesso")
    } catch (error) {
      console.error('Erro ao excluir o documento:', error);
    }
  }
