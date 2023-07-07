import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Platform, SafeAreaView, TouchableOpacity, TextInput, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { primaryColor, secundaryColor, TerColor, styles } from '../styles.js';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function Skills() {
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [position, setPostion] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [leg, setLeg] = useState('');
  const [newData, setNewData] = useState(null);
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

  const handleChangeHeight = (text) => {
    const numericText = text.replace(/[^0-9.]/g, '');
    if (numericText === '') {
      setHeight('');
      return;
    }
    const limitedText = numericText.slice(0, 4);
    const formattedText = formatHeight(limitedText);
    setHeight(formattedText);
  };
  const formatHeight = (text) => {
    const digits = text.replace(/\D/g, '');
    const formatted = digits.replace(/(\d{1})(\d{0,2})/, '$1.$2');
    return formatted;
  };

  const handleAddSkills = async () => {
    if (!city || !age || !height || !weight || !position || !leg) {
      Toast.show({
        type: "error",
        text1: "Erro ao cadastrar",
        text2: "Preencha todos os campos."
      })
    }
    else {
      const updatedData = {
        ...newData,
        cidade: city,
        idade: age,
        altura: height,
        peso: weight,
        posicao: position,
        perna: leg,
      };

      try {
        await AsyncStorage.setItem('@talenttrace:dataUsers', JSON.stringify(updatedData));
      } catch (error) {
        console.log(error);
      }
      navigation.navigate("DescritionUser")
    }
  };

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === 'android') {
        toggleDatepicker();
        setAge(formatDate(currentDate));
      }
    } else {
      toggleDatepicker();
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const iosDate = () => {
    toggleDatepicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerItems}>
        <View style={styles.info}>
          <TouchableOpacity onPress={() => navigation.navigate('PasswordUser')}>
            <Ionicons
              name='chevron-back-outline'
              size={52}
              color={TerColor}
            />
          </TouchableOpacity>
          <Text style={styles.Title}>Fale um pouco sobre suas habilidades</Text>
          <Text style={styles.Text}>Seja verdadeiro! Não minta sobre você e suas habilidades.</Text>
          <View style={styles.containerInput}>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='location-outline' size={32} color="#1C3F7C" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Sua cidade'
                  value={city}
                  onChangeText={setCity}
                />
              </View>
            </View>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='body-outline' size={32} color="#1C3F7C" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Sua altura'
                  value={height}
                  onChangeText={handleChangeHeight}
                  maxLength={4}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='barbell-outline' size={32} color="#1C3F7C" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Seu peso'
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='flag-outline' size={32} color="#1C3F7C" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Sua posição'
                  value={position}
                  onChangeText={setPostion}
                />
              </View>
            </View>
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='walk-outline' size={32} color="#1C3F7C" style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Sua perna mestra'
                  value={leg}
                  onChangeText={setLeg}
                />
              </View>

              <View style={styles.input}>
                <AntDesign name='calendar' size={32} color="#1C3F7C" style={styles.icon} />
                {Platform.OS === 'ios' ? (
                  <View>
                  <TextInput
                    style={[styles.textInput, { color: '#131313' }]}
                    placeholder='Ex: 27/12/2001'
                    value={age}
                    onChangeText={setAge}
                    placeholderTextColor='#11182744'
                  />
                  </View>
                ) : (
                  <>
                    {showPicker && (
                      <DateTimePicker
                        mode='date'
                        display='spinner'
                        value={date}
                        onChange={onChange}
                        style={styles.datePicker}
                      />
                    )}

                    {showPicker && Platform.OS === 'ios' && (
                      <View style={styles.pickerButtonsContainer}>
                        <TouchableOpacity
                          style={[styles.pickerButton, { backgroundColor: '#11182711' }]}
                          onPress={iosDate}
                        >
                          <Text style={styles.pickerButtonText}>Confirmar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.pickerButton, { backgroundColor: '#11182711' }]}
                          onPress={toggleDatepicker}
                        >
                          <Text style={styles.pickerButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {!showPicker && (
                      <Pressable onPress={toggleDatepicker}>
                        <TextInput
                          style={[styles.textInput, { color: '#131313' }]}
                          placeholder='Ex: 27/12/2001'
                          value={age}
                          onChangeText={setAge}
                          placeholderTextColor='#11182744'
                          editable={false}
                        />
                      </Pressable>
                    )}
                  </>
                )}
              </View>

            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.ButtonSkills} onPress={handleAddSkills}>
          <Text style={styles.TextButton}>Avançar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
