/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, ImageBackground, Alert } from 'react-native';
// import styles from './Style';
import firebase from 'firebase';

const Reset = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // const handleSignUp = () => {
    //     firebase
    //         .auth()
    //         .createUserWithEmailAndPassword(email, password)
    //         .then((userCredentials) => {
    //             userCredentials.user.updateProfile({
    //                 displayName: name,
    //             })
    //                 .then(() => navigation.navigate('Home'));
    //         })
    //         .catch(error => setErrorMessage(error.message));
    // };

    const handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                userCredentials.user.updateProfile({
                    displayName: name,
                }).then(() => {
                    userCredentials.user.sendEmailVerification();
                }).then(() => {
                    Alert.alert('Signup complete, please check your email to verify your account');
                    navigation.navigate('Login');
                })
            })
            .catch(error => setErrorMessage(error.message));
    };

    const handleReset = () => {
        console.log("HANDLING RESET");
        var auth = firebase.auth();
        var emailaddress = {email};

        auth.sendPasswordResetEmail(email).then(function() {
            //Email sent
            //ADD AN ALERT HERE and maybe redirection to login page?
            Alert.alert('Please check your email for the password reset link');
            navigation.navigate('Login');
        }).catch(function(error) {
            //Error happened
            Alert.alert('Error occured');
        });
    };

    return (

        <ImageBackground source={require('./assets/background3.png')} style={styles.background}>

            <View style={styles.container}>

                <Image source={require('./assets/logocircle.png')} style={styles.image}>
                    {/* <Text style={styles.welcometext}>Your gateway to great shopping.</Text> */}
                </Image>

                <Text style={{ color: '#8b4513', fontSize: 28, position: 'absolute', top: 270, alignSelf: 'center' }}>Recover your Password🌸</Text>
                <Text style={{ color: 'red', fontSize: 15, position: 'absolute', top: 20, left: 15, alignSelf: 'center' }}>{errorMessage}</Text><TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInputpw}
                    onChange={e => setEmail(e.nativeEvent.text)}
                    value={email}
                />
                <View style={{ top: 450, position: 'absolute', alignSelf: 'center' }}>
                    <Button title="Next" color="#8b4513" style={{ color: '#8b4513', fontSize: 20 }} onPress={handleReset} />
                </View>
            </View>
        </ImageBackground>
    );
};

export default Reset;

const styles = StyleSheet.create({
    image: {
        // flex: 1,
        resizeMode: "center",
        position: 'absolute',
        top: 0,
        width: "60%",
        height: "60%",
        alignSelf: 'center',

    }, container: {
        flex: 1,
        flexDirection: "column"
    }, background: {
        flex: 1,
        resizeMode: "cover",
        position: 'relative',
        // opacity: .8,

    },
    textInputemail: {
        color: '#8b4513',
        fontSize: 20,
        marginTop: 20,
        position: 'absolute', // child
        top: 300, // position where you want
        left: 50,
        borderBottomColor: '#a0522d',
        borderBottomWidth: 1,
        width: 300,
    },
    textInputpw: {
        color: '#8b4513',
        fontSize: 20,
        marginTop: 20,
        position: 'absolute', // child
        top: 360, // position where you want
        left: 50,
        borderBottomColor: '#a0522d',
        borderBottomWidth: 1,
        width: 300,
        // borderWidth: 2,
        // borderColor: '#d2b48c',
        // borderRadius: 4,
        // width: '80%',
    },
    textInputdn: {
        color: '#8b4513',
        fontSize: 20,
        marginTop: 20,
        position: 'absolute', // child
        top: 420, // position where you want
        left: 50,
        borderBottomColor: '#a0522d',
        borderBottomWidth: 1,
        width: 300,
        // borderWidth: 2,
        // borderColor: '#d2b48c',
        // borderRadius: 4,
        // width: '80%',
    },
    loginbutton: {
        top: 400,
        position: 'absolute',
    },
})
