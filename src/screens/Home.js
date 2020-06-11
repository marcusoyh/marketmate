/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase';
import styles from './Style';

const Home = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState();
  const [email, setEmail] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = firebase.auth().currentUser;
    console.log(user.email);
    setCurrentUser(user);
    setEmail(user.email);
    console.log(user);
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Text style={{ fontSize: 20 }}>
        Hi
        <Text style={{ color: '#e93766', fontSize: 20 }}>
          {email}!
        </Text>
      </Text>
      <Button
        title="Add an Item"
        onPress={() => navigation.navigate('AddItem')}
      />
      <Button
        title="List of Items"
        color="green"
        onPress={() => navigation.navigate('List')}
      />
    </View>
  );
};

export default Home;

// export default class Home extends Component {
//   render() {
//     return (
//       <View>
//         <Text>Home Screen</Text>
//         <Button
//           title="Add an Item"
//           onPress={() => this.props.navigation.navigate('AddItem')}
//         />
//         <Button
//           title="List of Items"
//           color="green"
//           onPress={() => this.props.navigation.navigate('List')}
//         />
//       </View>
//     );
//   }
// }
