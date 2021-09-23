import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD4Ar5jc50iKPVKdmLEYqHLlPTfhG7IVIE",
    authDomain: "otp-verification-76a84.firebaseapp.com",
    projectId: "otp-verification-76a84",
    storageBucket: "otp-verification-76a84.appspot.com",
    messagingSenderId: "81452578365",
    appId: "1:81452578365:web:36f7a33ecf33feb7a55c54"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase