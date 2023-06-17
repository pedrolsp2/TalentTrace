import React, { useEffect, useState } from "react";
import { querryId } from '../utils/storage';
import { firebase } from '../Configs/firebasestorageconfig';

export async function getFirebasePhoto() {
  const storage = firebase.storage();
  const [photoProfile, setPhotoProfile] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const idUser = await querryId();
        console.log(idUser)
        const snapshot = await firebase.firestore().collection('users').where('idUser', '==', idUser).get();
        
        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data();
          const profileRef = storage.ref().child('profile' + '/' + userData.foto);
          const profileUrl = await profileRef.getDownloadURL();
          setPhotoProfile(profileUrl);
        }
      } catch (error) {
        console.log('Erro ao buscar a foto do Firebase:', error);
      }
    };
    
    fetchData();
  }, []);

  return photoProfile;
}

export async function getName(idUser){
  try {
    const snapshot = await firebase.firestore().collection("users")
      .where("idUser", "==", idUser)
      .get();

    if (!snapshot.empty) {
      const primeiroDocumento = snapshot.docs[0].data();
      const nome = primeiroDocumento.nome;
      
      return nome;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getPost(idUser){
  try {
    const snapshot = await firebase.firestore().collection("post")
      .where("idUser", "==", idUser)
      .get();

    if (!snapshot.empty) {
      const primeiroDocumento = snapshot.docs[0].data();
      
      return primeiroDocumento;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
