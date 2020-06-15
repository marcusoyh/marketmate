/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native';

import { db } from '../config';
import firebase from 'firebase';

const AddList = () => {
    const [name, setName] = useState('');
    const [items, setItems] = useState([]);

    const submit = () => {
        const user = firebase.auth().currentUser;
        db.ref('/' + user.uid + '/' + '/lists').push({
            items: items,
            name: name,
        });
        Alert.alert('List saved successfully');
    };

    const handleChange = (e, index) => {
        console.log('INDEX:');
        console.log(index);
        console.log(e.nativeEvent.text);
        const newItems = items;
        newItems[index] = e.nativeEvent.text;
        setItems(newItems);
    };

    const addItem = () => {
        setItems((i) => i.concat(' '));
        console.log(items);
    };

    return (
        <View style={styles.main}>
            <Text style={styles.title}>List Name</Text>
            <TextInput
                style={styles.itemInput}
                onChange={(e) => setName(e.nativeEvent.text)}
            />
            <Text style={styles.subtitle}>Items</Text>
            {items.map((item, index) => {
                return (
                        <TextInput style={styles.itemInput} onChange={(e) => handleChange(e, index)} />
                );
            })}

            <TouchableHighlight
                style={styles.button}
                underlayColor="white"
                onPress={addItem}>
                <Text style={styles.buttonText}>Add Item</Text>
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.button}
                underlayColor="green"
                onPress={submit}>
                <Text style={styles.buttonText}>Create</Text>
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
    subtitle: {
        marginBottom: 20,
        fontSize: 20,
        textAlign: 'left',
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

export default AddList;
