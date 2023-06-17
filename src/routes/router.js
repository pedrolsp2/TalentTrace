import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";

import Splash from '../pages/Components/Splash'
import Welcome from '../pages/Welcome'
import LetsGo from '../pages/LetsGo'
import Login from "../pages/Login";
import NameUser from '../pages/NewAccount/Name'
import PasswordUser from '../pages/NewAccount/Password'
import SkillsUser from '../pages/NewAccount/Skills'
import DescritionUser from '../pages/NewAccount/Descrition'
import PictureUser from '../pages/NewAccount/Picture'
import CoverUser from '../pages/NewAccount/Cover'
import InfoUser from '../pages/NewAccount/Info'
import NewAccount from "../pages/NewAccount";
import UserProfile from '../pages/Components/UserProfile'
import SucessPost from "../pages/NewPost/SucessPost";
import { SelectPhoto } from "../pages/NewPost/SelectPhoto";

const Stack = createNativeStackNavigator();

export default function Routes() {
    const navigation = useNavigation(); 
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LetsGo"
        component={LetsGo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NameUser"
        component={NameUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordUser"
        component={PasswordUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SkillsUser"
        component={SkillsUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DescritionUser"
        component={DescritionUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PictureUser"
        component={PictureUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoverUser"
        component={CoverUser}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen
        name="InfoUser"
        component={InfoUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewAccount"
        component={NewAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={() => ({
          title: "Perfil do usuário",
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => navigation.navigate('TabRouter', { screen: 'Search' })}
              tintColor="#1c3f7c"
            />
          ),
        })}
      />
      <Stack.Screen
        name="SelectPhoto"
        component={SelectPhoto}
        options={() => ({
          title: "Novo Post",
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => navigation.navigate('TabRouter', { screen: 'ForYou' })}
              tintColor="#1c3f7c"
            />
          ),
        })}
      />
      <Stack.Screen
        name="SucessPost"
        component={SucessPost}
        options={() => ({
          title: "Novo Post",
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => navigation.navigate('TabRouter', { screen: 'ForYou' })}
              tintColor="#1c3f7c"
            />
          ),
        })}
      />
    </Stack.Navigator>
  )
}
