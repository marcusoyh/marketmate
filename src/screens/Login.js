/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import styles from './Style';

import firebase from 'firebase';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => navigation.navigate('Home'))
            .catch(error => setErrorMessage(error.message));
    };

    return (
        <View style={styles.container}>

            <Text style={{ color: '#e93766', fontSize: 40 }}>Login</Text>
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={(e) => setEmail(e)}
                value={email}
            />
            <TextInput
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Password"
                onChangeText={(e) => setPassword(e)}
                value={password}
            />
            <Button title="Login" color="#e93766" onPress={handleLogin} />
            <View>
                <Text>
                    {' '}
            Don't have an account?{' '}
                    <Text
                        onPress={() => navigation.navigate('Signup')}
                        style={{ color: '#e93766', fontSize: 18 }}>
                        {' '}
              Sign Up{' '}
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default Login;

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
