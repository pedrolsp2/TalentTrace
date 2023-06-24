import React, { useState } from 'react';
import { View, Image, Text, Button, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { firebase } from '../../../../Configs/firebasestorageconfig';
import Toast from 'react-native-toast-message';

export default function EditPassword() {
  const route = useRoute();
  const navigation = useNavigation();
  const data = route.params?.data;
  const [nome, setNome] = useState(data.nome);
  const [email, setEmail] = useState(data.email);
  const [hidePass, setHidePass] = useState(true);
  const [password, setPassword] = useState('');
  const [newData, setNewData] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (value) => {
    setPassword(value);
    setShowNewPassword(value.length >= 6);
  };

  const handleNewPasswordChange = (value) => {
    setNewData(value);
    setShowConfirmPassword(value.length >= 6);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  const handleAlterar = () => {
    const firestore = firebase.firestore();
    firestore
      .collection('users')
      .where('idUser', '==', data.idUser)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const updatedData = {};

          if (email !== data.email) {
            updatedData.email = email;
          }

          if (nome !== data.nome) {
            updatedData.nome = nome;
          }

          if (password !== '' && newData !== null && confirmPassword !== '' && newData === confirmPassword) {
            updatedData.senha = newData;
          }

          if (Object.keys(updatedData).length === 0) {
            Toast.show({
              type: 'info',
              text1: 'Nenhuma alteração realizada',
            });
            return;
          }

          firestore
            .collection('users')
            .doc(doc.id)
            .update(updatedData)
            .then(() => {
              Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Dados alterados com sucesso!',
              });
              navigation.navigate('TabRouter', { screen: 'Index' });
            })
            .catch((error) => {
              console.log(error);
              Toast.show({
                type: 'error',
                text1: 'Erro ao alterar dados',
                text2: 'Tente novamente mais tarde.',
              });
            });
        });
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Erro ao buscar dados',
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.containerInput}>
          <View style={styles.input}>
            <View style={styles.placeholder}>
              <Ionicons name='person-outline' size={32} color='#1C3F7C' style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder='Informe seu e-mail'
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          <View style={styles.input}>
            <View style={styles.placeholder}>
              <Ionicons name='person-circle-outline' size={32} color='#1C3F7C' style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder='Digite seu nome'
                value={nome}
                onChangeText={setNome}
              />
            </View>
          </View>
          <View style={styles.input}>
            <View style={styles.placeholder}>
              <Ionicons name='lock-closed-outline' size={32} color='#1C3F7C' style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder='Senha atual'
                secureTextEntry={hidePass}
                value={password}
                onChangeText={handlePasswordChange}
              />
              <Ionicons
                name={hidePass ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color='#1C3F7C'
                style={styles.eyeIcon}
                onPress={() => setHidePass(!hidePass)}
              />
            </View>
          </View>
          {showNewPassword && (
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='key-outline' size={32} color='#1C3F7C' style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Nova senha'
                  secureTextEntry={true}
                  value={newData}
                  onChangeText={handleNewPasswordChange}
                />
              </View>
            </View>
          )}
          {showConfirmPassword && (
            <View style={styles.input}>
              <View style={styles.placeholder}>
                <Ionicons name='key-outline' size={32} color='#1C3F7C' style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder='Confirmar nova senha'
                  secureTextEntry={true}
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleAlterar}>
        <Text style={styles.buttonText}>Alterar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 12,
  },
  containerInput: {
    width: '100%',
    position: 'relative',
    gap: 12,
    marginTop: '10%',
  },
  containerInputN: {
    width: '100%',
    position: 'relative',
    gap: 12,
    marginTop: '20%',
    flex: 1,
  },
  input: {
    width: '100%',
    height: 56,
    borderWidth: 2,
    borderColor: '#1C3F7C',
    borderRadius: 32,
  },
  icon: {
    position: 'absolute',
    top: 8,
    left: 12,
  },
  textInput: {
    width: '100%',
    height: 56,
    paddingStart: 52,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  eyeIcon: {
    position: 'absolute',
    top: 8,
    right: 12,
  },
  button: {
    backgroundColor: '#14AF6C',
    borderRadius: 32,
    paddingVertical: 12,
    marginBottom: 12,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
});
