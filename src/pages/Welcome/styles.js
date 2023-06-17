import { StyleSheet } from "react-native";
 export const primaryColor = '#1A0751';
   export const styles = StyleSheet.create({
        container:{
            flex: 1,
        },
        containerArrow:{
            backgroundColor: primaryColor,
            alignItems: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        },
        containerPercentual:{
            width: '100%',
            height: '30%',
            backgroundColor: primaryColor,
            borderBottomLeftRadius: 72,
            borderBottomRightRadius: 72,
            padding: 12,
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            alignItems: 'center'
        },
        Progress:{
            marginTop: 5,
            width: '80%',
            justifyContent: "space-evenly",
            alignItems: 'center',
            flexDirection: 'row',
        },
        ProgressStauts:{
            width: "30%",
            height: 2,
            backgroundColor: '#fafafa'
        },
        ProgressStautsActive:{
            backgroundColor: "#6035DB"
        },
        containerImage:{
            width: '100%',
            backgroundColor: '#fafafa',
            height: '115%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            position: 'absolute',
            bottom: '-30%',
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4.70244,
            },
            shadowRadius: 4.70244,
            shadowOpacity: 0.19,            
        },
          image: {
            width: '100%',
            height: '100%',
          },
          containerInfo:{
            marginTop: '25%',
            padding: 12,
            paddingBottom: 32,
            paddingTop: 24,
            flex: 1,
            justifyContent: 'space-between'
          },
          Title:{
            fontSize: 32,
            textAlign: 'center',
            marginBottom: 12,
            fontFamily: 'Poppins_700Bold'
          },
          Text:{
            fontSize: 15,
            fontFamily: 'Poppins_400Regular',
            color: '#3E3E3E'
          },
          Button:{
                borderWidth: 1,
                borderColor: '#000',
                height: 52,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 32,
          },
          TextButton:{
            fontFamily: 'Poppins_700Bold'
          }
    })