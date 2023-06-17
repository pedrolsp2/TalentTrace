import { StyleSheet } from "react-native";

export const primaryColor = '#1A0751';
export const TerColor = '#290398';
export const secundaryColor = '#14AF6C';

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'space-between', 
    }, 
    coverContainer:{
        position: 'relative'
    },
    cover: {
        width: "100%",
        height: 250,
        borderBottomRightRadius: 46,
        borderBottomLeftRadius: 46,
    },
    profile:{
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#fafafa',
        position: 'absolute',
        bottom: 8,
        left: 8
    },
    edit:{
        position: 'absolute',
        bottom: 8,
        right: 18,
        backgroundColor: '#fff',
        width: 35,
        height: 35,
        borderRadius: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4.70244,
        },
        shadowRadius: 4.70244,
        shadowOpacity: 0.19, 
    },
    containerContnet:{
        padding: 12,
        paddingTop: 12
    },
    Nome:{
        color: primaryColor,
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
    },
    containerInfoPlayer:{
        paddingTop: 12,
        paddingStart: 8,
        fontSize: 12,
        color: '#3A3A3A',
        fontFamily: 'Poppins_700Bold',
    },
    icons:{
        width: '100%',
        flexDirection: 'column',
    },
    iconsRow:{
        width: '100%',
        padding: 4,
        gap: 4,
        flexDirection: 'row', 
    },
    icon:{ 
        display: 'flex',
        flexDirection: 'row',
        width: '33%',
        height: '100%',
        padding: 4
    },
    iconSkills:{
        marginRight: 8,
    },
    textIcon:{ 
        fontFamily: 'Poppins_400Regular',
        paddingLeft: 125
    },
    label:{
        fontFamily: 'Poppins_400Regular', 
        fontSize:12,
        paddingTop: 32,
        color: '#3A3A3A'
    },
    textP:{
        fontFamily: 'Poppins_400Regular', 
        fontSize:16,
        paddingBottom: 16,
    },
    skeleton:{
        width: "100%",
        height: 250, 
        borderBottomRightRadius: 46,
        borderBottomLeftRadius: 46,
        backgroundColor: '#e3e3e3'
    },
    skeletonImage:{
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#fafafa',
        position: 'absolute',
        bottom: 8,
        left: 8
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      },
      fullScreenImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      },

})