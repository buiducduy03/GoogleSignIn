import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCWehukAYKTXCqRFA9Pk8R8AKbjkrpL-f4",
  authDomain: "fir-reactnative-cf0e3.firebaseapp.com",
  databaseURL: "https://fir-reactnative-cf0e3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-reactnative-cf0e3",
  storageBucket: "fir-reactnative-cf0e3.appspot.com",
  messagingSenderId: "274538332239",
  appId: "1:274538332239:web:4b46de71a55e41c7be6a3a",
  measurementId: "G-3RTEE6DWQ4"
};

firebase.initalizeApp(firebaseConfig)

export {firebase}