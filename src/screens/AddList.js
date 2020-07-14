/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Alert,
    ScrollView,
    ImageBackground,
} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import DatePicker from 'react-native-datepicker';
import { db } from '../config';
import firebase from 'firebase';

//COMPONENTS
import InputItem from '../components/InputItem';

const AddList = () => {
    const [name, setName] = useState('');
    const [items, setItems] = useState([{}]);
    const [itemNames, setItemNames] = useState([]);
    const [date, setDate] = useState();

    const submit = () => {
        const user = firebase.auth().currentUser;
        db.ref('/' + user.uid + '/' + '/lists').push({
            items: items,
            //items: texts,
            name: name,
            date: date,
        });
        Alert.alert('List saved successfully');
    };

    const handleChangeName = (e, index) => {
        console.log('INDEX:');
        console.log(index);
        console.log(e.nativeEvent.text);
        const newItems = items;
        newItems[index]["name"] = e.nativeEvent.text;
        newItems[index]["check"] = false;
        //newItems[index] = { 'name': e.nativeEvent.text };
        //newItems[index][0]= e.nativeEvent.text;
        setItems(newItems);
        setItemNames((i) => i.concat(e.nativeEvent.text));

    };

    const handleChangePrice = (e, index) => {
        console.log('INDEX:');
        console.log(index);
        console.log(e.nativeEvent.text);
        const newItems = items;
        newItems[index]["price"] = e.nativeEvent.text;
        //newItems[index][1] = e.nativeEvent.text;
        setItems(newItems);
    };

    const handleChangeQuantity = (e, index) => {
        console.log('INDEX:');
        console.log(index);
        console.log(e.nativeEvent.text);
        const newItems = items;
        newItems[index]["quantity"] = e.nativeEvent.text;
        //newItems[index][1] = e.nativeEvent.text;
        setItems(newItems);
    };

    const handleChangeNotes = (e, index) => {
        console.log('INDEX:');
        console.log(index);
        console.log(e.nativeEvent.text);
        const newItems = items;
        newItems[index]["notes"] = e.nativeEvent.text;
        //newItems[index][1] = e.nativeEvent.text;
        setItems(newItems);
    };

    const addItem = () => {
        const newItems = items;
        newItems.push({});
        setItems(newItems);
        //setItems((i) => i.concat(''));
        console.log(items);
        items.map((item, index) => {
            console.log(item);
        });
    };

    return (
        <ImageBackground source={require('./assets/background3.png')} style={styles.background}>
            <ScrollView>
                <View style={styles.main}>
                    <Text style={styles.title}>List Name 🌹</Text>
                    <TextInput
                        style={styles.listNameInput}
                        placeholder="List Name"
                        onChange={(e) => setName(e.nativeEvent.text)}
                    />

                    <DatePicker
                        style={{ width: 200, marginTop: 20, color: '#8b4513' }}
                        date={date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2020-06-01"
                        maxDate="2021-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                marginLeft: 46,
                                borderColor: '#8b4513',
                                color: '#8b4513'
                            },
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(d) => setDate(d)}
                    />
                    {items.map((item, index) => {
                        return (
                            <View>
                                <Collapse>
                                    <CollapseHeader>
                                        <Text style={styles.itemheader}>Add Item {index + 1}  ▼</Text>
                                    </CollapseHeader>
                                    <CollapseBody>
                                        <TextInput style={styles.detailInput} placeholder="Name" onChange={(e) => handleChangeName(e, index)} />
                                        <TextInput style={styles.detailInput} placeholder="Price" onChange={(e) => handleChangePrice(e, index)} />
                                        <TextInput style={styles.detailInput} placeholder="Quantity" onChange={(e) => handleChangeQuantity(e, index)} />
                                        <TextInput style={styles.detailInput} placeholder="Notes" onChange={(e) => handleChangeNotes(e, index)} />

                                        <TouchableHighlight
                                            color="#8b4513"
                                            style={styles.button}
                                            underlayColor="#8b4513"
                                            onPress={addItem}>
                                            <Text style={styles.addItemButtonText}>Add Item</Text>
                                        </TouchableHighlight>
                                    </CollapseBody>
                                </Collapse>
                                {/* <TextInput style={styles.itemInput} onChange={(e) => handleChangeName(e, index)} />
                    <TextInput style={styles.itemInput} onChange={(e) => handleChangePrice(e, index)} />
                     */}
                            </View>
                        );
                    })}


                    <TouchableHighlight
                        style={styles.createbutton}
                        underlayColor="white"
                        onPress={submit}>
                        <Text style={styles.createListButtonText}>Create</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#8b4513',

    },
    subtitle: {
        marginBottom: 20,
        fontSize: 20,
        textAlign: 'left',
    },
    listNameInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: '#8b4513',
        borderRadius: 8,
        color: '#8b4513',
    },
    itemNameInput: {
        height: 40,
        padding: 2,
        marginLeft: 15,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: '#8b4513',
        borderRadius: 8,
        color: '#8b4513',
    },
    itemheader: {
        height: 40,
        padding: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        fontSize: 25,
        color: '#8b4513',
    },
    detailInput: {
        height: 40,
        padding: 2,
        marginLeft: 15,
        marginRight: 5,
        marginTop: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: '#8b4513',
        borderRadius: 8,
        color: '#8b4513',
    },
    createListButtonText: {
        fontSize: 18,
        color: '#8b4513',
        alignSelf: 'center',
    },
    addItemButtonText: {
        fontSize: 18,
        color: '#8b4513',
        alignSelf: 'center',
    },
    button: {
        height: 40,
        width: 120,
        flexDirection: 'row',
        backgroundColor: "#d2b48c",
        borderColor: '#d2b48c',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    createbutton: {
        height: 40,

        flexDirection: 'row',
        backgroundColor: "#d2b48c",
        borderColor: '#d2b48c',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',

    },
    background: {
        flex: 1,
        resizeMode: "cover",
        position: 'relative',
        // opacity: .8,

    },
});

export default AddList;
