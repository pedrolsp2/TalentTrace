import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, Dimensions, View, Pressable, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { style } from "./style";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const { height: hScreen } = Dimensions.get('screen');

export function FeedList({ data, currentItem }) {
  const [datePost, setDatePost] = useState(data?.dataPost);
  const [date, setDate] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const currentDate = new Date();
    const postDateParts = data?.dataPost.split(' ');
    const dateParts = postDateParts[0].split('/');
    const timeParts = postDateParts[1].split(':');

    const postDate = new Date(
      parseInt(dateParts[2]), 
      parseInt(dateParts[1]) - 1, 
      parseInt(dateParts[0]), 
      parseInt(timeParts[0]), 
      parseInt(timeParts[1]) 
    ); 

    if (isMoreThanOneDayAgo(postDate, currentDate)) {
      setDatePost(data?.dataPost.slice(0,5));
    } else {
        const formattedDate = formatDistanceToNow(postDate, { locale: ptBR });
      setDatePost(formattedDate);
    }
  }, []);

  const isMoreThanOneDayAgo = (postDate, currentDate) => {
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    return currentDate - postDate > oneDayInMillis;
  };

  return (
    <SafeAreaView>
      <Pressable style={[style.infoUser, {
        bottom: Platform.OS === 'android' ? 30 : 60,
      }]} onPress={() => navigation.navigate('UserProfile', { data: data.idUser })}>
      <Image source={{ uri: data?.user }}
        style={{ width: Platform.OS === 'android' ? 50 : 65, height: Platform.OS === 'android' ? 50 : 65, borderRadius: Platform.OS === 'android' ? 50 : 65, borderWidth: 2, borderColor: '#fafafa' }}
        resizeMode="cover"
      />
        <View style={style.TextInfos}>
            <View style={style.nameInfo}>
                <Text style={style.idUser}>
                    {data?.nome}
                </Text>
                <Text style={style.datePost}>
                    {datePost}
                </Text>
            </View>
            <Text numberOfLines={2} style={style.infoVideo}>
            {data?.descricao}
            </Text>
        </View>
      </Pressable>
      <Image source={{ uri: data?.foto }}
        style={{ width: '100%', height: hScreen-100 }}
        resizeMode="cover"
      ></Image>
    </SafeAreaView>
  );
}
