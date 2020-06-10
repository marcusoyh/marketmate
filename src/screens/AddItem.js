/* eslint-disable prettier/prettier */
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  AlertIOS,
  Alert,
} from 'react-native';

import { db } from '../config';

const AddItem = () => {

  const [name,setName] = useState('');

  const addItem = item => {
    db.ref('/items').push({
      name:item,
    });
  };

  const submit = () => {
    //addItem(name);
    console.log('*****');
    console.log(name);
    db.ref('/items').push({
      name:name,
    });
    Alert.alert('Item saved successfully');
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Add Item</Text>
      <TextInput style={styles.itemInput} onChange={e => setName(e.nativeEvent.text)} />
      <TouchableHighlight
        style={styles.button}
        underlayColor="white"
        onPress={submit}
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6565fc',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
  },
  itemInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

export default AddItem;
