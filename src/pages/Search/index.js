import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, FlatList, SafeAreaView, ActivityIndicator, TextInput, TouchableOpacity, Text } from 'react-native';
import firebase from '../../Configs/firebaseconfig.js';
import UsersList from '../Components/UsersList/index.js';
import { querryId } from '../../utils/storage.js';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myUser, setMyUser] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [showFilter, setShowFilter] = useState(true);

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
        let query = firebase.firestore().collection('users');

        if (searchName !== '') {
          query = query.where('nome', '>=', searchName).where('nome', '<=', searchName + '\uf8ff');
        }

        if (searchCity !== '') {
          query = query.where('cidade', '>=', searchCity).where('cidade', '<=', searchCity + '\uf8ff');
        }

        const snapshot = await query.get();
        const fetchedUsers = snapshot.docs.map(doc => doc.data());
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.log('Erro ao buscar os usuários:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [searchName, searchCity]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#14AF6C" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop: '10%' }}>
      {showFilter && (
        <View style={{ padding: 10, backgroundColor: '#F5F5F5' }}>
          <TextInput
            style={{ backgroundColor: '#FFF', padding: 10, marginBottom: 10 }}
            placeholder="Filtrar por nome"
            value={searchName}
            onChangeText={text => setSearchName(text)}
          />
          <TextInput
            style={{ backgroundColor: '#FFF', padding: 10 }}
            placeholder="Filtrar por cidade"
            value={searchCity}
            onChangeText={text => setSearchCity(text)}
          />
        </View>
      )}
      <TouchableOpacity onPress={toggleFilter} style={{ padding: 10 }}>
        <Text>{showFilter ? 'Ocultar filtros' : 'Mostrar filtros'}</Text>
      </TouchableOpacity>
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
