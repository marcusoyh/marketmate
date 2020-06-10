/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
        <Text>Home Screen</Text>
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
