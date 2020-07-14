/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ImageBackground, Image, TouchableOpacity } from 'react-native';
// import styles from './Style';

import firebase from 'firebase';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                setErrorMessage('');
                navigation.navigate('Home')
            })
            .catch(error => setErrorMessage(error.message));
    };

    return (


        <ImageBackground source={require('./assets/background3.png')} style={styles.background}>
            <Image source={require('./assets/logocircle.png')} style={styles.image}>
                {/* <Text style={styles.welcometext}>Your gateway to great shopping.</Text> */}
            </Image>

            <View style={styles.container}>
                <Text style={{ color: '#8b4513', fontSize: 28, position: 'absolute', top: 270, alignSelf: 'center' }}>Login 🌸</Text>
                <Text style={{ color: 'red', fontSize: 15, position: 'absolute', top: 20, left: 15, alignSelf: 'center' }}>{errorMessage}</Text>
                <TextInput
                    style={styles.textInputemail}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={(e) => setEmail(e)}
                    value={email}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInputpw}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={(e) => setPassword(e)}
                    value={password}
                />
                <View style={{ top: 480, position: 'absolute', alignSelf: 'center' }}>
                    <Button title="Login" color="#8b4513" style={{ color: '#8b4513', fontSize: 20 }} onPress={handleLogin} />
                    <Text>
                        {' '}
            Don't have an account?{' '}
                        <Text
                            onPress={() => navigation.navigate('Signup')}
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

export default Login;

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
        top: 320, // position where you want
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
        top: 380, // position where you want
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

// export default class Login extends React.Component {
//     state = { email: '', password: '', errorMessage: null };
//     handleLogin = () => {
//         // TODO: Firebase stuff...
//         console.log('handleLogin');
//     };
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={{ color: '#e93766', fontSize: 40 }}>Login</Text>
//                 {this.state.errorMessage && (
//                     <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
//                 )}
//                 <TextInput
//                     style={styles.textInput}
//                     autoCapitalize="none"
//                     placeholder="Email"
//                     onChangeText={(email) => this.setState({ email })}
//                     value={this.state.email}
//                 />
//                 <TextInput
//                     secureTextEntry
//                     style={styles.textInput}
//                     autoCapitalize="none"
//                     placeholder="Password"
//                     onChangeText={(password) => this.setState({ password })}
//                     value={this.state.password}
//                 />
//                 <Button title="Login" color="#e93766" onPress={this.handleLogin} />
//                 <View>
//                     <Text>
//                         {' '}
//             Don't have an account?{' '}
//                         <Text
//                             onPress={() => this.props.navigation.navigate('SignUp')}
//                             style={{ color: '#e93766', fontSize: 18 }}>
//                             {' '}
//               Sign Up{' '}
//                         </Text>
//                     </Text>
//                 </View>
//             </View>
//         );
//     }
// }
