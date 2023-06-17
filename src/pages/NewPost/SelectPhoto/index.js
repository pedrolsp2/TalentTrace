import React,{useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, SafeAreaView, Text,StyleSheet, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getName } from '../../../utils/getFirebase';

export const primaryColor = '#1A0751';
export const TerColor = '#290398';
export const secundaryColor = '#14AF6C';

export  function SelectPhoto() {
    const [newData, setNewData] = useState(null);
    const navigation = useNavigation();
    const [myUser, setMyUser] = useState('')
    const [descrition, setDescrition] = useState('')

    const dismissKeyboard = () => {
        Keyboard.dismiss();
      };
  
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userData = await AsyncStorage.getItem('@talenttrace:post');
            setNewData(JSON.parse(userData));
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchUserData();
    
      }, []);
    
      useEffect(() => {
        const fetchUserName = async () => {
          if (newData && newData.id) {
            const idUser = await getName(newData.id);
            setMyUser(idUser);
          }
        };
    
        fetchUserName().catch((error) => {
          console.log('Erro ao buscar os usuários:', error);
        });
    
      }, [newData]);  

      const handleNewPost = async () => {
        const updatedData = { ...newData, nome: myUser, desc: descrition };
    
        try {
          await AsyncStorage.setItem('@talenttrace:post', JSON.stringify(updatedData));
          navigation.navigate('SucessPost')
        } catch (error) {
          console.log(error);
        }
    };


    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.containerInputN}>
              <View style={styles.input}>
                <View style={styles.placeholder}>
                  <TextInput
                    style={styles.textInputArea}
                    placeholder='Coloque uma descrição para seu post'
                    multiline={true}
                    numberOfLines={4}
                    value={descrition}
                    onChangeText={setDescrition}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.Button} onPress={handleNewPost}>
              <Text style={styles.TextButton}>Finalizar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
      );
    }
    
    export const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between'
      },
      containerInputN: {
        width: '100%',
        position: 'relative',
        gap: 12,
        marginTop: '20%',
        flex: 1
      },
      input: {
        width: '100%',
        height: 156,
        borderWidth: 2,
        borderColor: "#1C3F7C",
        borderRadius: 12
      },
      icon: {
        position: 'absolute',
        top: 8,
        left: 12
      },
      textInputArea: {
        width: '100%',
        height: 156,
        padding: 12,
        fontSize: 16,
        fontFamily: 'Poppins_400Regular'
      },
      Button: {
        borderWidth: 1,
        borderColor: '#fafafa',
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        backgroundColor: TerColor
      },
      TextButton: {
        fontFamily: 'Poppins_700Bold',
        color: '#fafafa'
      }
    });