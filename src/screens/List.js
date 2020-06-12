/* eslint-disable prettier/prettier */
// import React, { Component, useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import ItemComponent from '../components/ItemComponent';
// import { db } from '../config';

// const List = () => {

//   let itemsRef = db.ref('/items');

//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     getItems();
//   });

//   const getItems = () => {
//     itemsRef.on('value', snapshot => {
//       let data = snapshot.val();
//       setItems(Object.values(data));
//       //this.setState({ items });
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {items.length > 0 ? (
//         <ItemComponent items={items} />
//       ) : (
//         <Text>No items</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ebebeb',
//   }
// });

// export default List;
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ItemComponent from '../components/ItemComponent';

import { db } from '../config';

let itemsRef = db.ref('/items');

export default class List extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.items.length > 0 ? (
          <ItemComponent items={this.state.items} />
        ) : (
          <Text>No items</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  }
});