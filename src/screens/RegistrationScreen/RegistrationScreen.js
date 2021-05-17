import { NavigationContainer } from '@react-navigation/native'
import React, {useState} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons';

export default function RegistrationScreen({navigation}){
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress =  () => {
        navigation.navigate('Login')
    }
    const onRegisterPress = () =>{

    }

    return(
        <View style = {styles.container} >
            <KeyboardAwareScrollView 
                style = {{flex: 1, width: '100%'}}
                keyboardShouldPersistTaps='always'>
                <Image 
                    style = {styles.logo} 
                    source = {require('../../../assets/icon.png')} />
                <TextInput
                    style ={styles.input}
                    placeholderTextColor = "#aaaaaa"
                    placeholder = "Full Name"
                    onChangeText = {(text)=>setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize = 'none'
                />
                <TextInput
                    style ={styles.input}
                    placeholderTextColor = "#aaaaaa"
                    placeholder = "Email"
                    onChangeText = {(text)=>setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize = 'none'
                />
                <TextInput
                    style ={styles.input}
                    secureTextEntry
                    placeholderTextColor = "#aaaaaa"
                    placeholder = "Password"
                    onChangeText = {(text)=>setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize = 'none'
                />
                <TextInput
                    style ={styles.input}
                    secureTextEntry
                    placeholderTextColor = "#aaaaaa"
                    placeholder = "Confirm Password"
                    onChangeText = {(text)=>setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize = 'none'
                />
                <TouchableOpacity 
                    style={styles.button}
                    onPress={()=>onRegisterPress()} >
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style = {styles.footerView} >
                    <Text style={styles.footerText}>Already have an account? <Text onPress ={onFooterLinkPress} style = {styles.footerLink}  >Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}