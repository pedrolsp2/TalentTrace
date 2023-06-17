import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Text } from 'react-native';
import firebase from "../../Configs/firebaseconfig.js"
import { FavoriteList } from '../Components/FavoriteList/index.js';
import { querryId } from '../../utils/storage.js';

const Favorites = () => {
  const [datas, setDatas] = useState([]);
  const [myUser, setMyUser] = useState('');

  useEffect(() => {
    const fetchFavoritesByUserId = async (userId) => {
      const favoritesRef = firebase.firestore().collection('favorites');
      const querySnapshot = await favoritesRef.where('idUser', '==', userId).get();

      const idUserFavorites = [];
      querySnapshot.forEach((doc) => {
        const favorite = doc.data();
        idUserFavorites.push(favorite.idUserFavorite);
      });
      const data = [];

      for (const userId of idUserFavorites) {
        const usersRef = firebase.firestore().collection('users');
        const userSnapshot = await usersRef.where('idUser', '==', userId).get();

        userSnapshot.forEach((doc) => {
          const userData = doc.data();
          data.push(userData);
        });
      }
      setDatas(data);
    }

    const fetchUserData = async () => {
      const idUser = await querryId();
      setMyUser(idUser);
      fetchFavoritesByUserId(idUser);
    };

    fetchUserData()
      .catch(error => {
        console.log('Erro ao buscar os usuários:', error);
      });
  }, [datas]);

  return (
    <SafeAreaView>
      {datas.length > 0 ? (
        <FlatList
          data={datas}
          keyExtractor={(item) => String(item.idUser)}
          renderItem={({ item }) => <FavoriteList data={item} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum favorito encontrado.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Favorites;
