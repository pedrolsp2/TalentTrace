import React,{useState} from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserPicture } from '../pages/Components/UserPicture';
import Index from '../pages/Index';
import ForYou from '../pages/ForYou';
import NewPost from '../pages/NewPost';
import Favorites from '../pages/Favorites';
import Search from '../pages/Search';

const Tab = createBottomTabNavigator();

const TabRouter = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === 'NewPost',
        headerTitle: 'Nova Publicação',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#fafafa',
        },
        headerTintColor: '#1A0751',
        headerLeft: () => {
          if (route.name === 'NewPost') {
            return (
              <TouchableOpacity
                style={{ marginLeft: 12 }}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#1A0751" />
              </TouchableOpacity>
            );
          }
          return null;
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#14AF6C',
        tabBarStyle: {
          backgroundColor: '#fafafa',
          borderTopWidth: 1,
          borderColor: '#fafafa',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'NewPost') {
            return (
              <View
                style={{
                  width: size + 16,
                  height: size + 16,
                  borderRadius: (size + 16) / 2,
                  backgroundColor: '#14AF6C',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <AntDesign name="pluscircleo" size={size} color="#FFF" />
              </View>
            );
          } else if (route.name === 'ForYou') {
            return <AntDesign name="videocamera" size={size} color={color} />;
          } else if (route.name === 'Index') {
            return <UserPicture/>;
          } else if (route.name === 'Favorites') {
            return <AntDesign name="hearto" size={size} color={color} />;
          } else if (route.name === 'Search') {
            return <AntDesign name="search1" size={size} color={color} />;
          }

          return null;
        },
      })}
    >
      <Tab.Screen name="ForYou" component={ForYou} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="NewPost" component={NewPost} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Index" component={Index} />
    </Tab.Navigator>
  );
};

export default TabRouter;
