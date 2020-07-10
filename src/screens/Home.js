/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, Button, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';
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

    <View style={styles.container}>

      <ImageBackground source={require('./assets/logo.png')} style={styles.image}>
        <Text style={styles.welcomeheader}>Welcome 🌻</Text>
        <Text style={styles.welcometext}>Your gateway to great shopping.</Text>
      </ImageBackground>



      {/* <Button
        title="Logout"
        onPress={handleLogout} /> */}
      {/* <Button
        title="Add an Item"
        onPress={() => navigation.navigate('AddItem')}
      /> */}

      {/* <Button
        title="List of Items"
        color="green"
        onPress={() => navigation.navigate('List')}
      />
      <Button
        title="Create a List"
        color="blue"
        onPress={() => navigation.navigate('AddList')}
      /> */}



      <View style={{ flex: 6 }, { flexDirection: 'row' }}>
        <View style={{ flex: 3, backgroundColor: '#d3d3d3', height: 170, opacity: 0.7 }} >
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('List')}
          >
            <Image
              source={require('./assets/viewlists.png')}
              style={styles.listimage}
            />
            <Text style={styles.menutext}>View My Lists</Text>

          </TouchableOpacity>
        </View>
        <View style={{ flex: 3, backgroundColor: '#bc8f8f', height: 170, opacity: 0.7 }} >
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddList')}
          >
            <Image
              source={require('./assets/addlists.png')}
              style={styles.listimage}
            />
            <Text style={styles.menutext}>Create New List</Text>

          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={{ flex: 3 }, { flexDirection: 'row' }}>
      </View> */}
    </View>

  );
};

export default Home;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    position: 'relative',
    // justifyContent: "center",

  }, container: {
    flex: 1,
    flexDirection: "column"
  },
  welcometext: {
    color: '#8b4513',
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
    position: 'absolute', // child
    bottom: 40, // position where you want
    left: 70,
  },
  menutext: {
    color: '#8b4513',
    fontSize: 20,
    textAlign: 'center',

  },
  welcomeheader: {
    color: '#8b4513',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 30,
  },
  listimage: {
    padding: 10,
    marginTop: 5,
    height: '80%',
    width: '80%',
    resizeMode: 'stretch',
    alignSelf: 'center',

  }
})

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
