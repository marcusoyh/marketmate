import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Collapsible from 'react-native-collapsible';

const InputItem = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [date, setDate] = useState();
    const [notes, setNotes] = useState();

    const [collapsed, setCollapsed] = useState(true);
    return (
        <Collapsible collapsed = {collapsed} align = "center">
            <View>
                <Text style={styles.title}>Name</Text>
                <TextInput style={styles.itemInput} onChange={e => setName(e.nativeEvent.text)} />
                <Text style={styles.title}>Price</Text>
                <TextInput style={styles.itemInput} onChange={e => setPrice(e.nativeEvent.text)} />
                <Text style={styles.title}>Quantity</Text>
                <TextInput style={styles.itemInput} onChange={e => setQuantity(e.nativeEvent.text)} />

                <DatePicker
                    style={{ width: 200 }}
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
                            marginLeft: 36,
                        },
                    }}
                    onDateChange={(d) => setDate(d)}
                />

                <Text style={styles.title}>Notes</Text>
                <TextInput style={styles.itemInput} textContentType onChange={e => setNotes(e.nativeEvent.text)} />
            </View>
        </Collapsible>
    )
}

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

export default InputItem;