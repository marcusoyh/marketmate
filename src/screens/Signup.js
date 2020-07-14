/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, ImageBackground } from 'react-native';
// import styles from './Style';
import firebase from 'firebase';

const Signup = ({ navigation }) => {

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
                }).then(() => navigation.navigate('Home'));
            })
            .catch(error => setErrorMessage(error.message));
    };

    return (

        <ImageBackground source={require('./assets/background3.png')} style={styles.background}>

            <View style={styles.container}>

                <Image source={require('./assets/logocircle.png')} style={styles.image}>
                    {/* <Text style={styles.welcometext}>Your gateway to great shopping.</Text> */}
                </Image>

                <Text style={{ color: '#8b4513', fontSize: 28, position: 'absolute', top: 270, alignSelf: 'center' }}>Sign Up 🌸</Text>
                <Text style={{ color: 'red', fontSize: 15, position: 'absolute', top: 20, left: 15, alignSelf: 'center' }}>{errorMessage}</Text>
                <TextInput
                    placeholder="Display Name"
                    autoCapitalize="none"
                    style={styles.textInputemail}
                    onChange={e => setName(e.nativeEvent.text)}
                    value={name}
                /><TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInputpw}
                    onChange={e => setEmail(e.nativeEvent.text)}
                    value={email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInputdn}
                    onChange={e => setPassword(e.nativeEvent.text)}
                    value={password}
                />
                {/* <Button title="Sign Up" color="#e93766" onPress={handleSignUp} />
                <View>
                    <Text>
                        {' '}
            Already have an account?{' '}
                        <Text
                            onPress={() => navigation.navigate('Login')}
                            style={{ color: '#e93766', fontSize: 18 }}>
                            {' '}
              Login{' '}
                        </Text>
                    </Text>
                </View> */}
                <View style={{ top: 520, position: 'absolute', alignSelf: 'center' }}>
                    <Button title="Sign Up" color="#8b4513" style={{ color: '#8b4513', fontSize: 20 }} onPress={handleSignUp} />
                    <Text>
                        {' '}
            Already have an account?{' '}
                        <Text
                            onPress={() => navigation.navigate('Login')}
                            style={{ color: '#8b4513', fontSize: 18 }}>
                            {' '}
              Sign Up{' '}
                        </Text>
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
};

export default Signup;

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

// {errorMessage && (
//     <Text style={{ color: 'red' }}>{errorMessage}</Text>
// )}

// export default class signUp extends React.Component {
//     state = { email: '', password: '', errorMessage: null };
//     handleSignUp = () => {
//         // TODO: For Firebase authentication
//         console.log('handleSignUp');
//     };

//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={{ color: '#e93766', fontSize: 40 }}>Sign Up</Text>
//                 {this.state.errorMessage && (
//                     <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
//                 )}
//                 <TextInput
//                     placeholder="Email"
//                     autoCapitalize="none"
//                     style={styles.textInput}
//                     onChangeText={(email) => this.setState({ email })}
//                     value={this.state.email}
//                 />
//                 <TextInput
//                     secureTextEntry
//                     placeholder="Password"
//                     autoCapitalize="none"
//                     style={styles.textInput}
//                     onChangeText={(password) => this.setState({ password })}
//                     value={this.state.password}
//                 />
//                 <Button title="Sign Up" color="#e93766" onPress={this.handleSignUp} />
//                 <View>
//                     <Text>
//                         {' '}
//             Already have an account?{' '}
//                         <Text
//                             onPress={() => this.props.navigation.navigate('Login')}
//                             style={{ color: '#e93766', fontSize: 18 }}>
//                             {' '}
//               Login{' '}
//                         </Text>
//                     </Text>
//                 </View>
//             </View>
//         );
//     }
// }
