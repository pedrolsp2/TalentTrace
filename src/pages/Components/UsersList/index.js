import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, Share, Linking } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { format, parse } from 'date-fns';

const UsersList = ({ data }) => {
  const [photoProfile, setPhotoProfile] = useState(null);
  const [cell, setCell] = useState(data?.contato);
  const [age, setAge] = useState('')
  const navigation = useNavigation();

  useEffect(() => {
    if (data && data.idade) {
      const age = calculateAge(data.idade);
      setAge(age);
    }
  }, [data]);

  function calculateAge(dateString) {
    const currentDate = new Date();
    const providedDate = parse(dateString, 'dd/MM/yyyy', new Date());
    const diffInYears = Math.floor((currentDate - providedDate) / (365.25 * 24 * 60 * 60 * 1000));
    return diffInYears;
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Veja essa jovem promessa que encontrei no Talent Trace!',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onShareWP = async () => {
    const phoneNumber = cell.replace(/[()\s-]/g, '');
    const formattedPhoneNumber = phoneNumber ? `55${phoneNumber}` : '';
    const message = encodeURIComponent('Olá! Vim pelo TalentTrace! Vamos jogar?!');
    const url = `https://api.whatsapp.com/send/?phone=${formattedPhoneNumber}&text=${message}&type=phone_number&app_absent=0`;
    Linking.openURL(url)
      .catch(error => console.log(error));
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerInfo}>
        <View style={styles.infoUser}>
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { data: data.idUser })}>
            {data.foto ? (
              <Image
                source={{ uri: data?.foto }}
                style={styles.cover}
              />
            ) : (
              <View style={styles.skeletonImage}>
                <AntDesign name="user" size={32} color="#e3e3e3" />
              </View>
            )}
          </TouchableOpacity>
          <View>
            <Text style={styles.NameUser}>{data.nome}</Text>
            <Text style={styles.CityUser}>{age} anos de {data.cidade}</Text>
          </View>
        </View>
        <View style={styles.shareUser}>
          <TouchableOpacity onPress={onShareWP}>
            <Ionicons
              name="logo-whatsapp"
              size={24}
              color="#1C3F7C"
              style={styles.iconSkills}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare}>
            <Ionicons
              name="share-social-outline"
              size={24}
              color="#1C3F7C"
              style={styles.iconSkills}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.icons}>
        <View style={styles.iconsRow}>
          <Text style={styles.icon}>
            <Ionicons
              name="location-outline"
              size={24}
              color="#1C3F7C"
              style={styles.iconSkills}
            />
            <Text style={styles.textIcon}> {data.cidade}</Text>
          </Text>

          <Text style={styles.icon}>
            <Ionicons
              name="body-outline"
              size={24}
              color="#1C3F7C"
              style={styles.iconSkills}
            />
            <Text style={styles.textIcon}> {data.altura}</Text>
          </Text>

          <Text style={styles.icon}>
            <Ionicons
              name="flag-outline"
              size={24}
              color="#1C3F7C"
              style={styles.iconSkills}
            />
            <Text style={styles.textIcon}> {data.posicao}</Text>
          </Text>
        </View>

        <View style={styles.iconsRow}>
          <Text style={styles.icon}>
            <Ionicons
              name="person-outline"
              size={24}
              color="#1C3F7C"
              style={styles.iconSkills}
            />
            <Text style={styles.textIcon}> {age} anos</Text>
          </Text>

          <Text style={styles.icon}>
            <Ionicons
              name="barbell-outline"
              size={24}
              color="#1C3F7C"
              style={styles.iconSkills}
            />
            <Text style={styles.textIcon}> {data.peso}kg</Text>
          </Text>

          <Text style={styles.icon}>
            <Ionicons
              name="walk-outline"
              size={24}
              color="#1C3F7C"
              style={styles.iconSkills}
            />
            <Text style={styles.textIcon}> {data.perna}</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UsersList;
