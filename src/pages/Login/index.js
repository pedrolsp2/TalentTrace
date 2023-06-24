import React, {useState} from 'react';
import { View, Image, Text, PixelRatio, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native"; 
import { Ionicons } from '@expo/vector-icons';
import { styles} from './styles';
import {handleNewId} from '../../utils/storage'
import {firebase} from '../../Configs/firebasestorageconfig'
import Toast from 'react-native-toast-message';

export default function Login() { 
    
    const navigation = useNavigation();
    const [hidePass, setHidePass] = useState(true);
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [error, setError] = useState('');

    const handleSingIn = async () => {
        try {
          const snapshot = await firebase
            .firestore()
            .collection("users")
            .where("email", "==", user)
            .where("senha", "==", password)
            .get();
      
          const usuarios = [];
      
          snapshot.forEach((doc) => {
            usuarios.push(doc.data());
            handleNewId(doc.data().idUser);
            navigation.navigate('TabRouter', { screen: 'Index' });
          });
      
          if (usuarios.length === 0) {
            Toast.show({
              type: "error",
              text1: "Erro ao fazer login",
              text2: "Seu e-mail ou senha não esta invalido."
            })
            setPassword('');
            setUser('');
          }
      
          return usuarios;
        } catch (error) {
          setError('Ocorreu um erro ao buscar usuários.');
          setPassword('');
          setUser('');
          console.log("Erro ao buscar usuários:", error);
          return [];
        }
      };   

    return(
        <SafeAreaView style={styles.container}>
            <Image source={require('../../../assets/imgLogin.png')} style={{width: '30%',height: '30%', marginTop: '-15%'}} resizeMode="contain" />
            <View style={styles.containerLogin}>
                <View style={styles.containerInput}>
                    <Text style={styles.Title}>Bem vindo de volta!</Text>
                    <View style={styles.input}>
                        <View style={styles.placeholder}>
                            <Ionicons name='person-outline' size={32} color="#1C3F7C" style={styles.icon}/>
                            <TextInput
                            style={styles.textInput}
                            placeholder='Usuário'
                            value={user}
                            onChangeText={setUser}
                            />
                        </View>
                    </View>
                    <View style={styles.input}>
                        <View style={styles.placeholder}>
                            <Ionicons name='key-outline' size={32} color="#1C3F7C" style={styles.icon}/>
                            <TextInput
                            style={styles.textInput}
                            placeholder='Senha'
                            secureTextEntry={hidePass}
                            value={password}
                            onChangeText={setPassword}
                            />
                            {hidePass ?
                                <TouchableOpacity style={styles.iconEye}>
                                    <Ionicons
                                    name='eye-outline'
                                    size={32}
                                    color="#1C3F7C"
                                    onPress={() => setHidePass(!hidePass)}/>
                                </TouchableOpacity>

                                :

                                <TouchableOpacity style={styles.iconEye}>
                                    <Ionicons
                                    name='eye-off-outline'
                                    size={32}
                                    color="#1C3F7C"
                                    onPress={() => setHidePass(!hidePass)}/>
                                </TouchableOpacity>
                            }
                        </View>
                        <Text style={styles.error}>{error}</Text>
                    </View>
                </View>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity style={[styles.Button, styles.logar]} onPress={handleSingIn}>
                            <Text style={styles.TextButton}>Entrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.Button, styles.account]} onPress={()=>navigation.navigate('NameUser')}>
                            <Text style={styles.TextButton}>Criar Conta</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        </SafeAreaView>
    )
}