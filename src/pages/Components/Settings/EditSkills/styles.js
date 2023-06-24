import { StyleSheet } from "react-native";

export const primaryColor = '#1A0751';
export const TerColor = '#290398';
export const secundaryColor = '#14AF6C';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between'
    }, 
    containerItems: {
        flex: 1,
        padding: 12
    }, 
    Title:{
        color: primaryColor,
        fontSize: 28,
        fontFamily: 'Poppins_700Bold',
        fontWeight: 'bold'
    },
    Text:{
        color: '#5A646B',
        fontFamily: 'Poppins_400Regular'
    },
    containerInput:{
        width: '100%',
        position: 'relative',
        gap: 12,
        marginTop: '10%', 
    },
    containerInputN:{
        width: '100%',
        position: 'relative',
        gap: 12,
        marginTop: '20%', 
        flex: 1
    },
    input:{
        width: '100%',
        height: 56, 
        borderWidth: 2, 
        borderColor: "#1C3F7C",  
        borderRadius: 32
    },
    icon:{
        position: 'absolute',
        top: 8,
        left: 12
    },
    textInput:{
        width: '100%',
        height: 56,
        paddingStart: 52,
        fontSize: 16,
        fontFamily: 'Poppins_400Regular'
    },
    Button:{
        borderWidth: 1,
        borderColor: '#fafafa',
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        backgroundColor: TerColor
    },
    TextButton:{
        fontFamily: 'Poppins_700Bold',
        color: '#fafafa'
    },
    iconEye:{
        position: 'absolute',
        top: 8,
        right: 16
    },
    ButtonSkills:{
        borderWidth: 1,
        borderColor: '#fafafa',
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        backgroundColor: TerColor,
        marginTop: '28%'
    },
    inputTextArea:{
        width: '100%',
        height: 156, 
        borderWidth: 2, 
        borderColor: "#1C3F7C",  
        borderRadius: 12
    },
    textInputArea:{
        width: '100%',
        height: 56,
        paddingStart: 12,
        fontSize: 16,
        fontFamily: 'Poppins_400Regular'
    },
    containerPicture:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        marginBottom: 12,
        marginTop: 12
    },
    imageSelect: {
        width: '100%',
        height: '80%',
        borderRadius: 500,
      },
      ImageP:{
         width: '100%',
          height: '100%',
          borderRadius: 12
      }
})