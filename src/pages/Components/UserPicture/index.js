import React,{useEffect, useState} from "react";
import { View, Image } from "react-native";
import { StyleSheet } from "react-native";
import { querryId } from '../../../utils/storage.js';
import { firebase } from '../../../Configs/firebasestorageconfig.js'

import {Ionicons} from "@expo/vector-icons"

export function UserPicture(){
    const [dataUser, setDataUser] = useState({});
    const [data, setData] = useState([])

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
            setData(data[0]);
          }
        });
  
        return () => unsubscribe();
  
      }, [dataUser]);

    return(
        <View stlye={styles.container}>
            {data.foto ? (
              <Image source={{ uri: data.foto }} style={styles.profile} />
            ) : 
            <View style={styles.skeletonImage}>
                <Ionicons name="person" size={20} color="#fafafa"/>
            </View>
            }
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      profile: {
        width: 32,
        height: 32,
        borderRadius: 32,
      },
      skeletonImage: {
        width: 32,
        height: 32,
        backgroundColor: "#e3e3e3",
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
      },
})