import firebase from "firebase/compat/app"
import "firebase/compat/auth"  
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyADlD6kB-Bgn1kmyp85k_a9ONABbXz0ga8",
    authDomain: "talent-trace-inter.firebaseapp.com",
    projectId: "talent-trace-inter",
    storageBucket: "talent-trace-inter.appspot.com",
    messagingSenderId: "796153284508",
    appId: "1:796153284508:web:532b4b917a05e8665fea59"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}
 

export {firebase};