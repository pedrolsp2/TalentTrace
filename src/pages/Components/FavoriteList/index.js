import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView,ActivityIndicator} from "react-native";
import { styles } from './styles';
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign, EvilIcons } from '@expo/vector-icons';
import { firebase as fb } from '../../../Configs/firebasestorageconfig.js'
import { removeFavorites, querryId } from '../../../utils/storage';

export function FavoriteList({ data }) {
    const [photoProfile, setPhotoProfile] = useState(null);
    const [myUser, setMyUser] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const storage = fb.storage();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            const idUser = await querryId();
            setMyUser(idUser);
        };

        const getImageUrl = async (userData) => {
            try {
                const profileRef = storage.ref().child('profile' + '/' + userData.foto);
                const profileUrl = await profileRef.getDownloadURL();
                setPhotoProfile(profileUrl);
                setIsLoading(false);
            } catch (error) {
                console.log('Erro ao consultar a imagem:', error);
                setIsLoading(false);
            }
        };

        fetchUserData()
            .catch(error => {
                console.log('Erro ao buscar os usuários:', error);
            });
        getImageUrl(data);
    }, [data]);

    function handleTrash(id, idUs) {
        removeFavorites(id, idUs);
    }

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#14AF6C"/>
            </SafeAreaView>
          );
    }

    if (!data) {
        return(        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum favorito encontrado.</Text>
          </View>
          )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerInfo}>
                <View style={styles.infoUser}>
                    <TouchableOpacity onPress={() => navigation.navigate("UserProfile", { data: data.idUser })}>
                        {photoProfile ? (
                            <Image
                                source={{ uri: photoProfile }}
                                style={styles.cover}
                            />
                        ) :
                            <View style={styles.skeletonImage}>
                                <AntDesign name='user' size={32} color='#e3e3e3' />
                            </View>
                        }
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.NameUser}>{data.nome}</Text>
                        <Text style={styles.CityUser}>{data.idade} anos de {data.cidade}</Text>
                    </View>
                </View>
                <View style={styles.shareUser}>
                    <TouchableOpacity onPress={() => handleTrash(myUser, data.idUser)}>
                        <EvilIcons
                            name='trash'
                            size={32}
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
                            name='location-outline'
                            size={24}
                            color="#1C3F7C"
                            style={styles.iconSkills}
                        />
                        <Text style={styles.textIcon}> {data.cidade}</Text>

                    </Text>

                    <Text style={styles.icon}>
                        <Ionicons
                            name='body-outline'
                            size={24}
                            color="#1C3F7C"
                            style={styles.iconSkills}
                        />
                        <Text style={styles.textIcon}> {data.altura}</Text>

                    </Text>

                    <Text style={styles.icon}>
                        <Ionicons
                            name='flag-outline'
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
                            name='person-outline'
                            size={24}
                            color="#1C3F7C"
                            style={styles.iconSkills}
                        />
                        <Text style={styles.textIcon}> {data.idade} anos</Text>

                    </Text>

                    <Text style={styles.icon}>
                        <Ionicons
                            name='barbell-outline'
                            size={24}
                            color="#1C3F7C"
                            style={styles.iconSkills}
                        />
                        <Text style={styles.textIcon}>  {data.peso}kg</Text>

                    </Text>

                    <Text style={styles.icon}>
                        <Ionicons
                            name='walk-outline'
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
}
