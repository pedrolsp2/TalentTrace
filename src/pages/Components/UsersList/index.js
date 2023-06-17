import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, Share, Linking } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { firebase as fb } from '../../../Configs/firebasestorageconfig.js';

const UsersList = ({ data }) => {
  const [photoProfile, setPhotoProfile] = useState(null);
  const storage = fb.storage();
  const navigation = useNavigation();

  useEffect(() => {
    getImageUrl(data);
  }, []);

  const getImageUrl = async (userData) => {
    try {
      const profileRef = storage.ref().child(`profile/${userData.foto}`);
      const profileUrl = await profileRef.getDownloadURL();
      setPhotoProfile(profileUrl);
    } catch (error) {
      console.log('Erro ao consultar a imagem:', error);
    }
  };

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
    const phoneNumber = '5534996547587';
    const message = encodeURIComponent('Olá! Vim pelo TalentTrace! Vamos jogar?!');
    const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${message}&type=phone_number&app_absent=0`;

    Linking.openURL(url)
      .catch(error => console.log(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerInfo}>
        <View style={styles.infoUser}>
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { data: data.idUser })}>
            {photoProfile ? (
              <Image
                source={{ uri: photoProfile }}
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
            <Text style={styles.CityUser}>{data.idade} anos de {data.cidade}</Text>
          </View>
        </View>
        <View style={styles.shareUser}>
          <TouchableOpacity onPress={onShare}>
            <Ionicons
              name="logo-whatsapp"
              size={24}
              color="#1C3F7C"
              style={styles.iconSkills}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShareWP}>
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
            <Text style={styles.textIcon}> {data.idade} anos</Text>
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
