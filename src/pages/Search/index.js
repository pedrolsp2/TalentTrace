import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';
import firebase from '../../Configs/firebaseconfig.js';
import UsersList from '../Components/UsersList/index.js';
import { querryId } from '../../utils/storage.js';
import { AntDesign } from '@expo/vector-icons';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [flatUsers, setFlatUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lengthUser, setLengthUser] = useState(0);
  const [myUser, setMyUser] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedCities, setSelectedCities] = useState([]);
  const [showFilter, setShowFilter] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const idUser = await querryId();
      setMyUser(idUser);
    };

    fetchUserData().catch((error) => {
      console.log('Erro ao buscar os usuários:', error);
    });

    const fetchUsers = async () => {
      try {
        let query = firebase.firestore().collection('users');

        if (searchName !== '') {
          query = query.where('nome', '>=', searchName).where('nome', '<=', searchName + '\uf8ff');
        }

        if (selectedCities.length > 0) {
          query = query.where('cidade', 'in', selectedCities);
        }

        const snapshot = await query.get();
        const fetchedUsers = snapshot.docs.map((doc) => doc.data());
        setUsers(fetchedUsers);
        setLengthUser(fetchedUsers.length);
        setLoading(false);
      } catch (error) {
        console.log('Erro ao buscar os usuários:', error);
        setLoading(false);
      }
    };

    fetchUsers();

    const fetchCities = async () => {
      try {
        const querySnapshot = await firebase.firestore().collection('users').get();
        const cities = new Set();

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.cidade) {
            cities.add(data.cidade);
          }
        });

        const uniqueCities = Array.from(cities);
        setData(uniqueCities);
      } catch (error) {
        console.log('Erro ao buscar as cidades:', error);
      }
    };

    fetchCities();
  }, [searchName, selectedCities]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#14AF6C" />
      </SafeAreaView>
    );
  }

  function handleSearch() {
    setFlatUsers(users);
    setShowFilter(!showFilter);
  }

  function handleSite(city) {
    if (selectedCities.includes(city)) {
      setSelectedCities((prevSelectedCities) => prevSelectedCities.filter((selectedCity) => selectedCity !== city));
    } else {
      setSelectedCities((prevSelectedCities) => [...prevSelectedCities, city]);
    }
  }

  return (
    <SafeAreaView style={[styles.container, { marginBottom: !showFilter ? '10%' : 0 }]}>
      {showFilter && (
        <View style={styles.filterContainer}>
          <Text style={styles.h1}>Pesquisar</Text>
          <Text style={styles.title}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Filtrar por nome"
            value={searchName}
            onChangeText={(text) => setSearchName(text)}
          />

          <Text style={styles.title}>Cidade</Text>
          <View style={styles.citys}>
            {data.map((item, index) => (
              <View  key={index}>
                {!selectedCities.includes(item) ? (
              <View style={styles.containerCity}>
                  <TouchableOpacity onPress={() => handleSite(item)}>
                    <Text style={styles.text}>{item}</Text>
                  </TouchableOpacity>
              </View>
                ) : (
                  <View style={styles.containerActive}>
                    <TouchableOpacity onPress={() => handleSite(item)}>
                      <Text style={styles.textActive}>{item}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity onPress={handleSearch} style={styles.filterButton}>
        <View style={styles.filterButtonContainer}>
          <AntDesign name="filter" size={32} color={showFilter ? "#14AF6C" : "#dadada"} />
          <Text style={styles.filterButtonText}>{showFilter ? "Ocultar filtros" : "Mostrar filtros"}</Text>
        </View>
      </TouchableOpacity>

      {showFilter && (
        <TouchableOpacity style={[styles.Button, styles.logar]} onPress={handleSearch}>
          <Text style={styles.TextButton}>Ver resultados ({lengthUser})</Text>
        </TouchableOpacity>
      )}

      {!showFilter ? (
        <View style={styles.flatListContainer}>
          <FlatList
            data={flatUsers}
            keyExtractor={(item) => item.idUser}
            renderItem={({ item }) => <UsersList data={item} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:'10%',
    padding: 12,
    justifyContent: 'space-between',
  },
  h1: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 32,
    color: '#1A0751'
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    marginLeft: 12,
    marginTop: 12
  },
  filterContainer: {
    flex: 1,
    padding: 10,
  },
  input: {
    width: '100%',
    height: 56,
    borderWidth: 2,
    borderColor: "#1C3F7C",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
    width: '100%',
  },
  filterButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    marginLeft: 5,
    fontFamily: 'Poppins_700Bold',
  },
  Button: {
    borderWidth: 1,
    borderColor: '#fafafa',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    marginTop: 12
  },
  TextButton: {
    fontFamily: 'Poppins_700Bold',
    color: '#fafafa',
  },
  logar: {
    backgroundColor: '#14AF6C',
  },
  flatListContainer: {
    backfaceVisibility: 'hidden',
  },
  citys: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  containerCity: {
    padding: 8,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#1A0751',
    borderRadius: 12,
    margin: 4,
  },
  textActive: {
    color: '#fafafa',
    fontFamily: 'Poppins_400Regular',
  },
  text: {
    fontFamily: 'Poppins_400Regular',
  },
  containerActive: {
    backgroundColor: '#290398',
    padding: 8,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#1A0751',
    borderRadius: 12,
    margin: 4,
  },
});

export default Search;
