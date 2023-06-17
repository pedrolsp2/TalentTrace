import { StyleSheet } from "react-native";
 export const primaryColor = '#290398';
 export const secundaryColor = '#14AF6C';
   export const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    containerPercentual:{
        width: '100%',
        height: '40%',
        backgroundColor: '#1A0751',
        borderBottomLeftRadius: 202,
        borderBottomRightRadius: 202,
        padding: 12,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerText:{
        height: '60%',
        padding: 12,
        paddingTop: '15%',
        justifyContent: 'space-between'
    },
    Title:{
        fontSize: 32,
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center'
    },
    Text:{
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
        marginTop: 12,
        color: '#3E3E3E'
    },
    Button:{
          borderWidth: 1,
          borderColor: '#fafafa',
          height: 52,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 32,
          marginBottom: 12
    },
    TextButton:{
      fontFamily: 'Poppins_700Bold',
      color: '#fafafa'
    },
    Login:{
        backgroundColor: primaryColor
    },
    ButtonNewAccount:{
        backgroundColor: secundaryColor
    }

   })