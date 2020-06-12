/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        authenticate();
    });

    const authenticate = () => {
        firebase.auth().onAuthStateChanged(user => {
            navigation.navigate(user ? 'Home' : 'SignUp');
            //navigation.navigate(user ? 'Signup' : 'Home');
        });
    };
    return (<View style={styles.container}><Text style={{ color: '#e93766', fontSize: 40 }}>Loading</Text><ActivityIndicator color="#e93766" size="large" /></View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingScreen;

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
