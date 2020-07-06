/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase';

const Home = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState();
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState();
  const [verifiedMessage, setVerifiedMessage] = useState();

  useEffect(() => {
    getUser();
  });

  // useLayoutEffect(() => {
  //   getUser();
  // },[]);

  const getUser = async () => {
    const user = firebase.auth().currentUser;
    //setCurrentUser(user);
    setCurrentUser(firebase.auth().currentUser);
    setEmail(user.email);
    setDisplayName(user.displayName);
    setVerifiedMessage(user.isEmailVerified);
    try {
      if (user.isEmailVerified) {
        setVerifiedMessage('Verified');
      } else {
        setVerifiedMessage('Unverified');
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    navigation.navigate('Signup');
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Text>{verifiedMessage}</Text>
      <Text style={{ fontSize: 20 }}>
        Hi
        <Text style={{ color: '#e93766', fontSize: 20 }}>
          {displayName}!
        </Text>
      </Text>
      <Button
        title="Logout"
        onPress={handleLogout} />
      <Button
        title="Add an Item"
        onPress={() => navigation.navigate('AddItem')}
      />
      <Button
        title="List of Items"
        color="green"
        onPress={() => navigation.navigate('List')}
      />
      <Button
        title="Create a List"
        color="blue"
        onPress={() => navigation.navigate('AddList')}
      />
      <Button
        title="Category Management"
        color="blue"
        onPress={() => navigation.navigate('ViewCategories')}
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
