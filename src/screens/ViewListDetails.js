import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, CheckBox, Alert, Button, TouchableHighlight, TextInput } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

import { db } from '../config';
import firebase from 'firebase';


export default class List extends Component {
  state = {
    items: [],
    checked: false,
    additems: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
    listname:'',
    date:'',
 
  };

  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;
    let itemsRef = db.ref('/' + uid + '/lists');
    itemsRef.on('value', snapshot => {
      snapshot.forEach((child) => { console.log("childkey" + child.key); })
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }

  openTwoButtonAlert = (item, list, deletelist) => {
    Alert.alert(
      'Delete Item',
      'Are you sure?',
      [
        { text: 'Yes', onPress: () => this.deleteItem(item, list,deletelist) },
        { text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel' },
      ],
      {
        cancelable: true
      }
    );
  }

  deleteItem(item, list,deletelist) {
    const uid = firebase.auth().currentUser.uid;

    let itemsRef = db.ref('/' + uid + '/lists');
    const childkey = [];
    itemsRef.on('value', snapshot => {
      snapshot.forEach((child) => {
        childkey.push(child.key);
      })
    });
   

    console.log('/' + uid + '/lists' + '/' + childkey[list] + '/items/' + item);
    db.ref('/' + uid + '/lists' + '/' + childkey[list] + '/items/' + item).remove();
    deletelist .splice(item);
    console.log("item is removed");
  }

  onChangeCheck() {
    this.setState({ checked: !this.state.checked })
  }

  inputValueUpdate (val, prop, index){ 
    const newItems = this.state.additems;
    newItems.map((item, index) => {
      console.log("newitems" + item.name);
  });   
  //add new item to array 
    // newItems[index][prop] = val;
    this.state.additems[index][prop]=val;
  }
  

     addItem=(list)=> {

      
      const newItems = this.state.additems;
      newItems.push({});
      this.state.additems.map((item, index) => {
        console.log("additems" + item.name);
    }); 
      
     
      const uid = firebase.auth().currentUser.uid;
      let itemsRef = db.ref('/' + uid + '/lists');
      const childkey = [];
  itemsRef.on('value', snapshot => {
    snapshot.forEach((child) =>{ childkey.push(child.key);
    })
  });

      db.ref('/' + uid + '/lists' + '/' + childkey[list]  ).set({
       items: this.state.additems,
       name:this.state.listname,
       date:this.state.date

      });
      Alert.alert('Item added');
      this.setState(this.state.additems);
    }


  listM = () => {

 
    return this.state.items.map((item, num) => {
      if (num == this.props.navigation.state.params.number && item.items) {
        this.state.listname= item.name;
        this.state.date=item.date;
       const itemList= item.items.length;
      //index for item to add in the array 
       console.log(itemList + "itemList");
      const indexItem = itemList;
      const deletelist= item.items;
        return (

          <View style={{ margin: 10 }}>

            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.date}</Text>

            
            <Collapse>
              <CollapseHeader>
                <Text>Add Item</Text>
              </CollapseHeader>
              <CollapseBody>
                <TextInput style={styles.itemNameInput} placeholder="Name" onChangeText={(val) => this.inputValueUpdate(val, 'name',indexItem)}/>
                <TextInput style={styles.detailInput} placeholder="Price" onChangeText={(val) => this.inputValueUpdate(val, 'price',indexItem)} />
                <TextInput style={styles.detailInput} placeholder="Quantity" onChangeText={(val) => this.inputValueUpdate(val, 'quantity',indexItem)}  />
                <TextInput style={styles.detailInput} placeholder="Notes" onChangeText={(val) => this.inputValueUpdate(val, 'notes',indexItem)}  />
              </CollapseBody>
            </Collapse>
            <Button
              title='Add Item'

              onPress={() => this.addItem(num)}
              color="#E37399"
            />

            {item.items.map((info, index) => {

              console.log(this.state.additems);
              this.state.additems[index]['name']= info.name;
              this.state.additems[index]['quantity']= info.quantity;
              this.state.additems[index]['price']= info.price;
              this.state.additems[index]['notes']= info.notes;

              console.log( this.state.additems[index]['name'] + "additem list");
           
              return (
                <View>

                  <Collapse>
                    <CollapseHeader>
                      <Text style={styles.headercollapse}  >{"Item: "}{info.name}</Text>

                      <CheckBox
                        checked={this.state.checked}
                        onPress={() => this.onChangeCheck()} />
                      <Button
                        title='Delete'

                        onPress={() => this.openTwoButtonAlert(index, num,deletelist)}
                        color="#E37399"
                      />
                    </CollapseHeader>

                    <CollapseBody>
                      <Text style={styles.detailInput}  >{"Quantity: "}{info.quantity}</Text>
                      <Text style={styles.detailInput}  >{"Price: "}{info.price}</Text>
                      <Text style={styles.detailInput}  >{"Notes: "}{info.notes}</Text>

                    </CollapseBody>
                  </Collapse>
                </View>
              );
            })}
          </View>

        )
      } else if (num == this.props.navigation.state.params.number && !item.items) {
       const indexItem=0;
       this.state.listname= item.name;
       this.state.date=item.date;
        return (
          <View style={{ margin: 10 }}>

            <Text style={styles.text}>{"There are no items"}</Text>


            <Collapse>
              <CollapseHeader>
                <Text>Add Item</Text>
              </CollapseHeader>
              <CollapseBody>
                <TextInput style={styles.itemNameInput} placeholder="Name" onChangeText={(val) => this.inputValueUpdate(val, 'name',indexItem)}/>
                <TextInput style={styles.detailInput} placeholder="Price" onChangeText={(val) => this.inputValueUpdate(val, 'price',indexItem)} />
                <TextInput style={styles.detailInput} placeholder="Quantity" onChangeText={(val) => this.inputValueUpdate(val, 'quantity',indexItem)}  />
                <TextInput style={styles.detailInput} placeholder="Notes" onChangeText={(val) => this.inputValueUpdate(val, 'notes',indexItem)}  />
              </CollapseBody>
            </Collapse>
            <Button
              title='Add Item'

              onPress={() => this.addItem(num)}
              color="#E37399"
            />
          </View>
        );
      }


    });


  };




  render() {
    return <ScrollView><View style={styles.container}>{this.listM()}</View></ScrollView>;
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: '#d9f9b1',
    alignItems: 'center',
  },
  text: {
    color: '#4f603c',
    fontSize: 20,
  },
  detailInput: {
    height: 40,
    padding: 2,
    marginLeft: 15,
    marginRight: 5,
    fontSize: 13,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'blue',
  },
  headercollapse: {
    height: 40,
    padding: 2,
    marginLeft: 15,
    marginRight: 5,
    fontSize: 18,
    color: 'red',
  }, addItemButtonText: {
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
})
