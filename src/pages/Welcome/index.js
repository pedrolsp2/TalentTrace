import React, { useEffect, useState } from 'react';
import { View, Image, Text, Button, SafeAreaView, ScrollView, Platform, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const Welcome = () => {
  const navigation = useNavigation();

  const data = [
    {
      url: require('../../../assets/Vector-Soccer.png'),
      title: 'Seus talentos',
      caption: 'Se você é um jovem apaixonado pelo futebol e está ansioso para mostrar seus talentos para o mundo, temos a solução perfeita para você. Nosso aplicativo inovador é projetado exclusivamente para ajudar jovens jogadores a exibirem suas habilidades e se destacarem no campo.',
    },
    {
      url: require('../../../assets/Vector-User.png'),
      title: 'Descubra mais',
      caption: 'Mas isso não é tudo. Para tornar a experiência ainda mais emocionante, oferecemos desafios regulares e competições exclusivas dentro do aplicativo. Você pode medir suas habilidades contra outros jogadores, receber feedback valioso e até mesmo chamar a atenção de olheiros e treinadores em busca de novos talentos.',
    },
    {
      url: require('../../../assets/Vector-Cellphone.png'),
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: '#1A0751', alignItems: 'center', justifyContent: 'center', paddingTop: Platform.OS === 'android' ? '20%' : '12%' }}>
            <TouchableOpacity onPress={handlePrevious} style={{ position: 'absolute', left: 16 }}>
              <Ionicons name='chevron-back-outline' size={40} color="#fff" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              {data.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: Dimensions.get('window').width / data.length,
                    height: 2,
                    backgroundColor: currentIndex >= index ? '#6035DB' : '#fafafa',
                  }}
                />
              ))}
            </View>
          </View>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
            <View
              style={{
                width: Dimensions.get('window').width * 0.9,
                height: Dimensions.get('window').width * 0.9,
                backgroundColor: '#fafafa',
                borderRadius: 12,
                elevation: 4,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4.70244,
                },
                shadowRadius: 4.70244,
                shadowOpacity: 0.19,
              }}
            >
              <Image source={url} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
            </View>
          </View>

          <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
            <Text style={{ fontSize: 32, textAlign: 'center', marginBottom: 16, fontFamily: 'Poppins_700Bold' }} numberOfLines={caption === 'Encontre os futuros craques' ? 1 : 2}>
              {title}
            </Text>
            <Text style={{ fontSize: 15, fontFamily: 'Poppins_400Regular', color: '#3E3E3E' }}>{caption}</Text>

            <TouchableOpacity
              style={{ borderWidth: 1, borderColor: '#000', height: 52, alignItems: 'center', justifyContent: 'center', borderRadius: 32, marginTop: 20 }}
              onPress={handleNext}
            >
              <Text style={{ fontFamily: 'Poppins_700Bold' }}>{currentIndex >= 2 ? 'Avançar' : 'Próximo'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
