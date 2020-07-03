import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, CheckBox, Alert, Button, TouchableHighlight, TextInput } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

import { db } from '../config';
import firebase from 'firebase';


export default class List extends Component {
  state = {
    items: [],
    checked: false,
    additems: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    listname: '',
    date: '',
    search: '',
    text: '',
    edititem:false,
    editindex:0,

  };

  updateSearch = (search) => {
    this.setState({ search });
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
        { text: 'Yes', onPress: () => this.deleteItem(item, list, deletelist) },
        { text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel' },
      ],
      {
        cancelable: true
      }
    );
  }

  deleteItem(item, list, deletelist) {
    const uid = firebase.auth().currentUser.uid;

    let itemsRef = db.ref('/' + uid + '/lists');
    const childkey = [];
    itemsRef.on('value', snapshot => {
      snapshot.forEach((child) => {
        childkey.push(child.key);
      })
    });


    // console.log('/' + uid + '/lists' + '/' + childkey[list] + '/items/' + item);
    db.ref('/' + uid + '/lists' + '/' + childkey[list] + '/items/' + item).remove();
    var newArray = this.state.items[list].items.filter(value => Object.keys(value).length !== 0);

    db.ref('/' + uid + '/lists' + '/' + childkey[list]).set({
      items: newArray,
      name: this.state.listname,
      date: this.state.date

    });
    console.log("item is removed");


  }

  onChangeCheck() {
    this.setState({ checked: !this.state.checked })
  }

  inputValueUpdate(val, prop, index) {
    const newItems = this.state.additems;
    newItems.map((item, index) => {
      console.log("newitems" + item.name);
    });
    //add new item to array 
    // newItems[index][prop] = val;
    this.state.additems[index][prop] = val;
  }

  inputValueUpdateList(val) {
    // this.setState({listname:val});
    this.state.listname = val;  
  }

  editListName=(num, items)=>{
    const uid = firebase.auth().currentUser.uid;
    let itemsRef = db.ref('/' + uid + '/lists');
    const childkey = [];
    itemsRef.on('value', snapshot => {
      snapshot.forEach((child) => {
        childkey.push(child.key);
      })
    });
    console.log('listname' + this.state.listname);
    db.ref('/' + uid + '/lists' + '/' + childkey[num]).set({
      items: items,
      name: this.state.listname,
      date: this.state.date

    });
    console.log("list is updated")
    this.setState({listname:''});
    Alert.alert('List name is updated!');
  }


  addItem = (list) => {


    const newItems = this.state.additems;
    newItems.push({});
    this.state.additems.map((item, index) => {
      console.log("additems" + item.name);
    });


    const uid = firebase.auth().currentUser.uid;
    let itemsRef = db.ref('/' + uid + '/lists');
    const childkey = [];
    itemsRef.on('value', snapshot => {
      snapshot.forEach((child) => {
        childkey.push(child.key);
      })
    });

    db.ref('/' + uid + '/lists' + '/' + childkey[list]).set({
      items: this.state.additems,
      name: this.state.listname,
      date: this.state.date

    });
    Alert.alert('Item added');
    this.setState(this.state.additems);
    this.setState(this.state.items);

  }

  editItem = (list) => {
    const newItems = this.state.additems;
    newItems.push({});
    this.state.additems.map((item, index) => {
      console.log("additems" + item.name);
    });


    const uid = firebase.auth().currentUser.uid;
    let itemsRef = db.ref('/' + uid + '/lists');
    const childkey = [];
    itemsRef.on('value', snapshot => {
      snapshot.forEach((child) => {
        childkey.push(child.key);
      })
    });

    db.ref('/' + uid + '/lists' + '/' + childkey[list]).set({
      items: this.state.additems,
      name: this.state.listname,
      date: this.state.date

    });
    Alert.alert('Item Edited Successfully');
    this.setState(this.state.additems);
    this.setState(this.state.items);
    this.setState({ editindex: 0 })
    this.setState({ edititem: false })
  }

  onButtonPress = (index) => {
    console.log("onpress"+this.state.edititem);
    if(this.state.edititem == false){
      this.state.edititem=true;
      this.setState({ editindex: index })
    
    }else{
      this.state.edititem=false;
      this.setState({ editindex: index })
    }
  }
 
  
  listM = () => {

    return this.state.items.map((item, num) => {
      if (num == this.props.navigation.state.params.number && item.items) {
        console.log("start"+this.state.edititem);
        this.state.listname = item.name;
        this.state.date = item.date;
        const itemList = item.items.length;
        //index for item to add in the array 
        console.log(itemList + " number to add next");
        const indexItem = itemList;
        const deletelist = item.items;
        return (

          <View style={{ margin: 10 }}>

            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.textdate}>{item.date}</Text>


            <Collapse>
              <CollapseHeader>
                <Text style={styles.additemstyle}>Add Item</Text>
              </CollapseHeader>
              <CollapseBody>
                <TextInput style={styles.detailInput} placeholder="Name" onChangeText={(val) => this.inputValueUpdate(val, 'name', indexItem)} />
                <TextInput style={styles.detailInput} placeholder="Price" onChangeText={(val) => this.inputValueUpdate(val, 'price', indexItem)} />
                <TextInput style={styles.detailInput} placeholder="Quantity" onChangeText={(val) => this.inputValueUpdate(val, 'quantity', indexItem)} />
                <TextInput style={styles.detailInput} placeholder="Notes" onChangeText={(val) => this.inputValueUpdate(val, 'notes', indexItem)} />
                <View style={styles.submitButton}>
                  <Button
                    title='Submit'
                    onPress={() => this.addItem(num)}
                    color="#e9967a"
                  />
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text style={styles.additemstyle}>Edit List Name </Text>
              </CollapseHeader>
              <CollapseBody>
                <TextInput style={styles.detailInput} placeholder={item.name} onChangeText={(val) => this.inputValueUpdateList(val)} />
                              <View style={styles.submitButton}>
                  <Button
                    title='Submit'
                    onPress={() => this.editListName(num, deletelist)}
                    color="#e9967a"
                  />
                </View>
              </CollapseBody>
            </Collapse>

            <Text style={styles.itemheader}  >{"Items :"}</Text>
            {item.items.map((info, index) => {

              // console.log(this.state.additems);
              console.log("numbering" + index + "edititem" + this.state.edititem)
              this.state.additems[index]['name'] = info.name;
              this.state.additems[index]['quantity'] = info.quantity;
              this.state.additems[index]['price'] = info.price;
              this.state.additems[index]['notes'] = info.notes;

              // console.log(this.state.additems[index]['name'] + "additem list");
              if(this.state.edititem == true && this.state.editindex==index){
                console.log("appear1");
                
              return (
                
                <View >

                  <Collapse>
                    <CollapseHeader style={styles.collapseHeader}>
                      <View style={{ flexDirection: "row" }} >
                        <View style={{ marginRight: 20 }}>
                          <CheckBox
                            checked={this.state.checked}
                            onPress={() => this.onChangeCheck()} />
                        </View>
                        <View style={{ marginLeft: 20 }, { marginRight: 20 }}>
                          <Text style={styles.headercollapse}  >{index + 1 + ": "}{info.name}</Text>
                        </View>

                        <View style={styles.deleteButton}>

                          <Button
                            title='Delete'

                            onPress={() => this.openTwoButtonAlert(index, num, deletelist)}
                            color="#bc8f8f"
                          />
                        </View>
                        <View style={styles.deleteButton}>

                          <Button
                            title='Edit'

                            onPress={() => this.onButtonPress(index)}
                            color="#bc8f8f"
                          />
                          </View>
                        
                      </View>
                  
                    </CollapseHeader>

                    <CollapseBody>
                      <View style={{ flexDirection: "row" }} >
                        <View>
                          <Text style={styles.detailHeader}  >{"Name: "}</Text>
                        </View>
                        <View>
                          {/* <Text style={styles.detailInput}  >{info.name}</Text> */}
                          <TextInput style={styles.detailInput} placeholder={info.name} onChangeText={(val) => this.inputValueUpdate(val, 'name', index)} />
                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }} >
                        <View>
                          <Text style={styles.detailHeader}  >{"Quantity: "}</Text>
                        </View>
                        <View>
                          {/* <Text style={styles.detailInput}  >{info.quantity}</Text> */}
                          <TextInput style={styles.detailInput} placeholder={info.quantity} onChangeText={(val) => this.inputValueUpdate(val, 'quantity', index)} />
                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }} >
                        <View>
                          <Text style={styles.detailHeader}  >{"Price: "}</Text>
                        </View>
                        <View>
                          {/* <Text style={styles.detailInput}  >{info.price}</Text> */}
                          <TextInput style={styles.detailInput} placeholder={info.price} onChangeText={(val) => this.inputValueUpdate(val, 'price', index)} />

                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }} >
                        <View>
                          <Text style={styles.detailHeader}  >{"Notes: "}</Text>
                        </View>
                        <View>
                          {/* <Text style={styles.detailInput}  >{info.notes}</Text> */}
                          <TextInput style={styles.detailInput} placeholder={info.notes} onChangeText={(val) => this.inputValueUpdate(val, 'notes', index)} />
                        </View>
                      </View>

                      <View style={styles.submitButton}>
                  <Button
                    title='Edit Item'
                    onPress={() => this.editItem(num)}
                    color="#e9967a"
                  />
                </View>

                    </CollapseBody>
                  </Collapse>
                </View>
              );
            }else {
              console.log("appear2");
              return (
                
                <View >

                  <Collapse>
                    <CollapseHeader style={styles.collapseHeader}>
                      <View style={{ flexDirection: "row" }} >
                        <View style={{ marginRight: 20 }}>
                          <CheckBox
                            checked={this.state.checked}
                            onPress={() => this.onChangeCheck()} />
                        </View>
                        <View style={{ marginLeft: 20 }, { marginRight: 20 }}>
                          <Text style={styles.headercollapse}  >{index + 1 + ": "}{info.name}</Text>
                        </View>

                        <View style={styles.deleteButton}>

                          <Button
                            title='Delete'

                            onPress={() => this.openTwoButtonAlert(index, num, deletelist)}
                            color="#bc8f8f"
                          />
                        </View>
                        <View style={styles.deleteButton}>

                          <Button
                            title='Edit'

                            onPress={() => this.onButtonPress(index)}
                            color="#bc8f8f"
                          />
                          </View>
                        
                      </View>
                  
                    </CollapseHeader>

                    <CollapseBody>
                      <View style={{ flexDirection: "row" }} >
                        <View>
                          <Text style={styles.detailHeader}  >{"Name: "}</Text>
                        </View>
                        <View>
                          <Text style={styles.detailInput}  >{info.name}</Text>
                          {/* <TextInput style={styles.detailInput} placeholder={info.name} onChangeText={(val) => this.inputValueUpdate(val, 'name', index)} /> */}
                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }} >
                        <View>
                          <Text style={styles.detailHeader}  >{"Quantity: "}</Text>
                        </View>
                        <View>
                          <Text style={styles.detailInput}  >{info.quantity}</Text>
                          {/* <TextInput style={styles.detailInput} placeholder={info.quantity} onChangeText={(val) => this.inputValueUpdate(val, 'quantity', index)} /> */}
                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }} >
                        <View>
                          <Text style={styles.detailHeader}  >{"Price: "}</Text>
                        </View>
                        <View>
                          <Text style={styles.detailInput}  >{info.price}</Text>
                          {/* <TextInput style={styles.detailInput} placeholder={info.price} onChangeText={(val) => this.inputValueUpdate(val, 'price', index)} /> */}

                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }} >
                        <View>
                          <Text style={styles.detailHeader}  >{"Notes: "}</Text>
                        </View>
                        <View>
                          <Text style={styles.detailInput}  >{info.notes}</Text>
                          {/* <TextInput style={styles.detailInput} placeholder={info.notes} onChangeText={(val) => this.inputValueUpdate(val, 'notes', indexItem)} /> */}
                        </View>
                      </View>


                    </CollapseBody>
                  </Collapse>
                </View>
              );
              }
            })}
          </View>

        )
      } else if (num == this.props.navigation.state.params.number && !item.items) {
        const indexItem = 0;
        this.state.listname = item.name;
        this.state.date = item.date;
        return (
          <View style={{ margin: 10 }}>

            <Text style={styles.text}>{"There are no items"}</Text>

            <Text style={styles.additemstyle}>Add Item</Text>

            <TextInput style={styles.detailInput} placeholder="Name" onChangeText={(val) => this.inputValueUpdate(val, 'name', indexItem)} />
            <TextInput style={styles.detailInput} placeholder="Price" onChangeText={(val) => this.inputValueUpdate(val, 'price', indexItem)} />
            <TextInput style={styles.detailInput} placeholder="Quantity" onChangeText={(val) => this.inputValueUpdate(val, 'quantity', indexItem)} />
            <TextInput style={styles.detailInput} placeholder="Notes" onChangeText={(val) => this.inputValueUpdate(val, 'notes', indexItem)} />
            <View style={styles.submitButton}>
              <Button
                title='Submit'
                onPress={() => this.addItem(num)}
                color="#e9967a"
              />
            </View>
          </View>
        );
      }


    });


  };




  render() {

    return <ScrollView>

      <View style={styles.container}>{this.listM()}</View></ScrollView>;
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 3,
    // backgroundColor: '#d9f9b1',
    // alignItems: 'center',
  }, collapseHeader: {
    width: '100%',
    padding: 5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#fff0f5',

  },
  text: {
    color: '#a52a2a',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textdate: {
    color: '#a52a2a',
    fontSize: 20,
    textAlign: 'center',

  },
  itemheader: {
    marginTop: 10,
    marginLeft: 10,
    color: '#a52a2a',
    fontSize: 26,

  },
  additemstyle: {
    marginTop: 10,
    color: '#bc8f8f',
    fontSize: 26,
    textAlign: 'center',
  },
  detailInput: {
    // height: 30,
    padding: 5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#bc8f8f',
    borderRadius: 6,
    color: 'black',
    width: 230,
    alignSelf: 'center',
  },
  detailHeader: {
    padding: 5,
    marginTop: 10,
    marginLeft: 5,

    fontSize: 18,
    borderWidth: 2,
    borderColor: '#fff0f5',
    borderRadius: 6,
    color: 'black',
    width: 90,
    alignSelf: 'center',
  },
  headercollapse: {
    fontSize: 22,
    color: '#cd5c5c',
  }, addItemButtonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
    backgroundColor: '#fff0f5',
  },
  submitButton: {
    marginTop: 10,
    width: 150,
    alignSelf: 'center',
  },
  deleteButton: {
    marginRight:20,
    width: 80,
    alignSelf: 'center',
  },
})
