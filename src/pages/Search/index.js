import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import firebase from '../../Configs/firebaseconfig.js';
import UsersList from '../Components/UsersList/index.js';
import { querryId } from '../../utils/storage.js';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myUser, setMyUser] = useState('');

  useLayoutEffect(() => {
    const fetchUserData = async () => {
      const idUser = await querryId();
      setMyUser(idUser);
    };

    fetchUserData()
      .catch(error => {
        console.log('Erro ao buscar os usuários:', error);
      });

    const fetchUsers = async () => {
      try {
        const snapshot = await firebase.firestore().collection('users').where('idUser', '!=', myUser).get();
        const fetchedUsers = snapshot.docs.map(doc => doc.data());
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.log('Erro ao buscar os usuários:', error);
        setLoading(false);
      }
    };
    fetchUsers();
      
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#14AF6C"/>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={users}
        keyExtractor={item => item.idUser}
        renderItem={({ item }) => <UsersList data={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Search;
