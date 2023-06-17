import React, { useEffect, useState } from 'react';
import { View, Image, Text, Button, SafeAreaView, ScrollView, PixelRatio, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native"; 
import { Ionicons } from '@expo/vector-icons';
import {styles} from './styles';
import Vector1 from '../../../assets/Vector-Soccer.png';
import Vector2 from '../../../assets/Vector-User.png';
import Vector3 from '../../../assets/Vector-Cellphone.png'; 

export default function Welcome() { 
    const navigation = useNavigation(); 

    const data = [
        {
          url: Vector1,
          title: 'Mostre seus talentos',
          caption: 'Se você é um jovem apaixonado pelo futebol e está ansioso para mostrar seus talentos para o mundo, temos a solução perfeita para você. Nosso aplicativo inovador é projetado exclusivamente para ajudar jovens jogadores a exibirem suas habilidades e se destacarem no campo.',
        },
        {
            url: Vector2,
          title: 'Descubra mais',
          caption: 'Mas isso não é tudo. Para tornar a experiência ainda mais emocionante, oferecemos desafios regulares e competições exclusivas dentro do aplicativo. Você pode medir suas habilidades contra outros jogadores, receber feedback valioso e até mesmo chamar a atenção de olheiros e treinadores em busca de novos talentos.',
        },
        {
            url: Vector3,
          title: 'Encontre os futuros craques',
          caption: 'Além disso, nossa plataforma permite que você entre em contato diretamente com os jogadores e seus representantes. Comunique-se facilmente através de mensagens instantâneas e agende sessões de avaliação, testes ou até mesmo convites para treinamentos em clubes.',
        },
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
      const { url, title, caption } = data[currentIndex];
    
      const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
        if (currentIndex >= 2) {
          navigation.navigate('LetsGo');
          } 
      };
    
      const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
      };
          
      return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.containerArrow,{ fontFamily: 'Poppins_400Regular'}]}>
                <TouchableOpacity onPress={handlePrevious}>
                    <Ionicons
                    name='chevron-back-outline'
                    size={40}
                    color="#fff"
                    style={{marginRight: '90%'}}/>
                </TouchableOpacity>
                <View style={styles.Progress}>
                    <View style={[styles.ProgressStauts, currentIndex >= 0 && styles.ProgressStautsActive]}></View>
                    <View style={[styles.ProgressStauts, currentIndex >= 1 && styles.ProgressStautsActive]}></View>
                    <View style={[styles.ProgressStauts, currentIndex >= 2 && styles.ProgressStautsActive]}></View>
                    </View>

            </View>
            <View style={styles.containerPercentual}>
                <View style={styles.containerImage}>
                <Image source={url} width={PixelRatio.getPixelSizeForLayoutSize(100)} height={PixelRatio.getPixelSizeForLayoutSize(100)} resizeMode="cover" />
                </View>
            </View>
        <View style={styles.containerInfo}>
            <View>
                <Text style={styles.Title}>{title}</Text>
                <Text style={styles.Text}>{caption}</Text>
            </View>
            <TouchableOpacity style={styles.Button} onPress={handleNext}>
                <Text style={styles.TextButton}>
                    {
                     currentIndex >= 2 ? 'Avançar' : 'Próximo'
                    }
                </Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
      );
    };