import { StyleSheet} from "react-native";
import { Platform } from 'react-native';


export const styles = StyleSheet.create({
    container:{
        marginTop: Platform.OS === 'android' ? 24 : 12,
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3'
    },
    cover:{
        width: 72,
        height: 72,
        borderRadius: 72
    },
    skeletonImage:{
        width: 72,
        height: 72,
        borderRadius: 72,
        backgroundColor: '#dadada',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerInfo:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Platform.OS === 'android' ? 0 : 12,
    },
    infoUser:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    shareUser:{
        flexDirection: 'row',
        gap: 12
    },
    NameUser:{
        fontFamily: 'Poppins_700Bold',
        fontSize: 16
    },
    CityUser:{
        fontFamily: 'Poppins_400Regular',
    },
    icons:{
        marginTop: 12,
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
})