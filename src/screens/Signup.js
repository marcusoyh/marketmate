/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import styles from './Style';
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
        <View style={styles.container}>
            <Text style={{ color: '#e93766', fontSize: 40 }}>Sign Up</Text>
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
            <TextInput
                placeholder="Display Name"
                autoCapitalize="none"
                style={styles.textInput}
                onChange={e => setName(e.nativeEvent.text)}
                value={name}
            /><TextInput
                placeholder="Email"
                autoCapitalize="none"
                style={styles.textInput}
                onChange={e => setEmail(e.nativeEvent.text)}
                value={email}
            />
            <TextInput
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
                style={styles.textInput}
                onChange={e => setPassword(e.nativeEvent.text)}
                value={password}
            />
            <Button title="Sign Up" color="#e93766" onPress={handleSignUp} />
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
            </View>
        </View>
    );
};

export default Signup;

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
