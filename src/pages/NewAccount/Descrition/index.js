import React, { useState, useEffect } from 'react';
import { View, Image, Text, Button, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { primaryColor, secundaryColor, TerColor, styles } from '../styles.js';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';   


export default function Descrition() {
  const [newData, setNewData] = useState(null);
  const [about, setAbout] = useState('');
  const [bio, setBio] = useState('');  
  const navigation = useNavigation();  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('@talenttrace:dataUsers');
        setNewData(JSON.parse(userData));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const handleAddDiscrition = async () => {
    const updatedData = { ...newData,
       passou: bio,
       sobre: about,
      };
    try {
      await AsyncStorage.setItem('@talenttrace:dataUsers', JSON.stringify(updatedData));
     navigation.navigate("PictureUser") 
    } catch (error) {
      console.log(error);
    }  
  }; 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.info}>
          <TouchableOpacity onPress={()=>navigation.navigate('SkillsUser')}> 
            <Ionicons
              name='chevron-back-outline'
              size={52}
              color={TerColor}
            />
          </TouchableOpacity>
          <Text style={styles.Title}>Diga um pouco mais sobre você!</Text>
          <Text style={styles.Text}>Está quase acabando....</Text>
          <View style={styles.containerInput}>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <TextInput
                  style={styles.textInput}
                  placeholder='Diga por onde você passou? Caso não há experiencias, sem problemas!'
                  value={bio}
                  onChangeText={setBio}
                />
              </View>
            </View>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <TextInput
                  style={styles.textInput}
                  placeholder='Fale sobre você!'
                  value={about}
                  onChangeText={setAbout}
                />
              </View>
            </View>
          </View>
        </View>
          <TouchableOpacity style={styles.Button} onPress={handleAddDiscrition}> 
             <Text style={styles.TextButton}>Avançar</Text>
          </TouchableOpacity> 
      </View>
    </SafeAreaView>
  );
}
