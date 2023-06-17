import { StyleSheet } from "react-native";
import { Platform } from "react-native";

 export const primaryColor = '#1A0751';
   export const style = StyleSheet.create({
    infoUser:{
        position: 'absolute',
        zIndex: 99,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        width: '99%'
    },
    idUser:{
        color: '#fff',
        fontFamily: 'Poppins_700Bold',
        marginBottom: 4,
        textShadowColor: 'rgba(0,0,0, 0.90)',
        textShadowOffset: {width: -1, height: 1.5},
        textShadowRadius: 8,
    },
    infoVideo:{
        color: '#fff',
        marginRight: 54,
        textShadowColor: 'rgba(0,0,0, 0.90)',
        textShadowOffset: {width: -1, height: 1.5},
        textShadowRadius: 8,
    },
    nameInfo:{
        flexDirection: 'row',
        gap: 8
    },
    datePost:{
        color: '#e3e3e3',
        fontFamily: 'Poppins_400Regular',
        textShadowColor: 'rgba(0,0,0, 0.90)',
        textShadowOffset: {width: -1, height: 1.5},
        textShadowRadius: 8,
    }

   })