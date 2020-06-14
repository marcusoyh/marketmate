/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ItemComponent from '../components/ItemComponent';
import { db } from '../config';
import firebase from 'firebase';

const PersonalList = () => {

  //let itemsRef = db.ref('/items');

  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  });

  const getItems = () => {
    const uid = firebase.auth().currentUser.uid;
    let itemsRef = db.ref('/' + uid + '/items');
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      setItems(Object.values(data));
      //this.setState({ items });
    });
  };

  return (
    <View style={styles.container}>
      {items.length > 0 ? (
        <ItemComponent items={items} />
      ) : (
        <Text>No items</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
  }
});

export default PersonalList;