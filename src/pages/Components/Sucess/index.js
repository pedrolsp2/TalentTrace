import React from 'react';
import {View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Text} from 'react-native';
import Vector from '../../../../assets/Vector-Sucess.png'

export  function Sucess({msg, nBtn, ftc}) {
    
    return (
        <SafeAreaView style={styles.container}>
            <Image source={Vector}  style={{marginTop: '-10%', width: '90%', height: 400}} resizeMode="contain" />     
            <View style={styles.Welcome}>
                <View style={styles.Texts}>
                    <Text style={styles.h1}>Show de bola!</Text>
                    <Text style={styles.h2}>{msg}</Text>
                </View>
            <TouchableOpacity style={styles.Button} onPress={ftc}>
                <Text style={styles.TextButton}>{nBtn}</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
} 

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#1A0751',
        alignItems: 'center'
    },
    Welcome:{
        width: '100%',
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
        marginTop: '-10%'
    },
    Button:{
        borderWidth: 1,
        borderColor: '#fafafa',
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        width: '100%',
        marginBottom: "8%"
    },
    TextButton:{
        fontFamily: 'Poppins_700Bold',
        color: '#fafafa'
    },
    h1:{
        color: '#fafafa',
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center',
        fontSize: 40
    },
    h2:{
        color: '#fafafa',
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center',
        fontSize: 24
    }
})