import React, {useState} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth'
import firebase from 'firebase'

export default function LoginScreen({navigation}){
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }
    const onLoginPress = () =>{
        if(email === 'a' && password=== 'a')
            navigation.navigate("Home")
        else{
            alert('wrong email or password')
        }
    }

    signInWithGoogleAsync = async () =>{
        try {
          const result = await Google.logInAsync({
            // androidClientId: YOUR_CLIENT_ID_HERE,
            
            iosClientId: '274538332239-94nutea4trjbc31rsosvb0s68tb7p4nb.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }
    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }
    onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                //googleUser.getAuthResponse().id_token
                googleUser.idToken,
                googleUser.accessToken
                );
      
            // Sign in with credential from the Google user.
            firebase
                .auth()
                .signInWithCredential(credential)
                .then(function(){
                    console.log('user signed in')
                })
                .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        });
      }

    return(
        <View style = {styles.container} >
            <KeyboardAwareScrollView 
                style = {{flex: 1, width: '100%'}}
                keyboardShouldPersistTaps = "always"
            >
                {/* <Image 
                    style = {styles.logo}
                    source = {require('../../../assets/firebase.png')}
                /> */}
                <TextInput 
                    style = {styles.input}
                    placeholder = "E-mail"
                    placeholderTextColor = "#aaaaaa"
                    onChangeText= {(text)=>setEmail(text)}
                    value = {email}
                    underlineColorAndroid = "transparent"
                    autoCapitalize = 'none'
                />
                <TextInput 
                    style = {styles.input}
                    placeholder = "Password"
                    secureTextEntry
                    placeholderTextColor = "#aaaaaa"
                    onChangeText= {(text)=>setPassword(text)}
                    value = {password}
                    underlineColorAndroid = "transparent"
                    autoCapitalize = 'none'
                />
                <TouchableOpacity 
                    style = {styles.button}
                    onPress = {()=>onLoginPress()}
                >
                    <Text style = {styles.buttonTitle}>Log in</Text>
                </TouchableOpacity>
                <View style ={styles.footerView}>
                    <Text style = {styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                    <Text style = {[styles.footerText],{ paddingTop: 5 , fontWeight: '700', fontSize: 20, color: '#534bae' }} >Or you can sign in with: </Text>
                </View>
                
                <View style = {styles.buttonAuth} >
                    <TouchableOpacity onPress={()=>signInWithGoogleAsync()} >
                        <Image source = {require('../../../assets/google.png')}  style = {{width: 50, height: 50}} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image source = {require('../../../assets/facebook.png')}  style = {{width: 50, height: 50}} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image source = {require('../../../assets/twitter.png')}  style = {{width: 50, height: 50}} />
                    </TouchableOpacity>
                    <TouchableOpacity  >
                        <Image source = {require('../../../assets/github.png')}  style = {{width: 50, height: 50}} />
                    </TouchableOpacity>
                </View>
                
            </KeyboardAwareScrollView>
        </View>
    )
}