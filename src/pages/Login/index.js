import React, {useState} from 'react';
import { View, Image, Text, PixelRatio, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native"; 
import { AntDesign, Ionicons } from '@expo/vector-icons';
import {primaryColor, styles} from './styles';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../Configs/firebase-config';
import {handleNewId} from '../../utils/storage'

export default function Login() { 
    
    const navigation = useNavigation();
    const [hidePass, setHidePass] = useState(true);
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [error, setError] = useState('');
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleSingIn = () =>{
        signInWithEmailAndPassword(auth,user, password)
        .then((userCredential) => {
            const userOn = userCredential.user;
            handleNewId(userOn.uid)
            navigation.navigate('TabRouter', { screen: 'Index'});
          })
          .catch(error => {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email') {
                setError('Usuário ou senha incorretos.');
                setPassword('');
                setUser('');
            }
          });
    }


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