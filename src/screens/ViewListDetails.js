import React, { Component } from 'react';
import { ScrollView, Image, View, Text, StyleSheet, CheckBox, Alert, Button, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

import { db } from '../config';
import firebase from 'firebase';


export default class List extends Component {
  state = {
    items: [],
    checked: false,
    additems: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    // tempCheckValues:[],
    listname: '',
    date: '',
    search: '',
    text: '',
    edititem: false,
    editindex: 0,

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

  onChangeCheck(num, index, itemslist) {
    console.log("before" + this.state.checked);
    if (this.state.checked == true) {
      this.state.checked = false;
      this.setState({ checked: false });
      console.log("after 1" + this.state.checked);
    } else {
      this.state.checked = true;
      this.setState({ checked: true });
      console.log("after 2" + this.state.checked);
    }


    itemslist[index]['check'] = this.state.checked;
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
      items: itemslist,
      name: this.state.listname,
      date: this.state.date

    });
    this.setState({ checked: false });
  }

  getTextStyle(checked) {
    if (checked) {
      return {
        fontSize: 22,
        color: 'black',
        textDecorationLine: 'line-through',
      }
    } else {
      return {
        fontSize: 22,
        color: 'black',
      }
    }
  }
  inputValueUpdate(val, prop, index) {
    const newItems = this.state.additems;
    newItems.map((item, index) => {
      console.log("newitems" + item.name);
    });
    //add new item to array 
    // newItems[index][prop] = val;
    this.state.additems[index][prop] = val;
    this.state.additems[index]['check'] = false;
  }

  inputValueUpdateList(val) {
    // this.setState({listname:val});
    this.state.listname = val;
  }

  editListName = (num, items) => {
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
    this.setState({ listname: '' });
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
      date: this.state.date,


    });
    Alert.alert('Item Edited Successfully');
    this.setState(this.state.additems);
    this.setState(this.state.items);
    this.setState({ editindex: 0 })
    this.setState({ edititem: false })
  }

  onButtonPress = (index) => {
    console.log("onpress" + this.state.edititem);
    if (this.state.edititem == false) {
      this.state.edititem = true;
      this.setState({ editindex: index })

    } else {
      this.state.edititem = false;
      this.setState({ editindex: index })
    }
  }


  listM = () => {

    return this.state.items.map((item, num) => {
      if (num == this.props.navigation.state.params.number && item.items) {
        console.log("start" + this.state.edititem);
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
                <Text style={styles.additemstyle}>Add Item ▼</Text>
              </CollapseHeader>
              <CollapseBody>
                <TextInput style={styles.detailInput} placeholder="Name" onChangeText={(val) => this.inputValueUpdate(val, 'name', indexItem)} />
                <TextInput style={styles.detailInput} placeholder="Price" onChangeText={(val) => this.inputValueUpdate(val, 'price', indexItem)} />
                <TextInput style={styles.detailInput} placeholder="Quantity" onChangeText={(val) => this.inputValueUpdate(val, 'quantity', indexItem)} />
                <TextInput style={styles.detailInput} placeholder="Notes" onChangeText={(val) => this.inputValueUpdate(val, 'notes', indexItem)} />
                <View style={styles.submitButton}>
                  <Button
                    title='Add'
                    onPress={() => this.addItem(num)}
                    color="#bc8f8f"
                  />
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text style={styles.additemstyle}>Edit List Name ▼</Text>
              </CollapseHeader>
              <CollapseBody>
                <TextInput style={styles.detailInput} placeholder={item.name} onChangeText={(val) => this.inputValueUpdateList(val)} />
                <View style={styles.submitButton}>
                  <Button
                    title='Submit'
                    onPress={() => this.editListName(num, deletelist)}
                    color="#bc8f8f"
                  />
                </View>
              </CollapseBody>
            </Collapse>

            <Text style={styles.itemheader}  >{'🍂 '}{"Items :"}</Text>
            {item.items.map((info, index) => {
              this.state.checked = info.check;
              console.log("checked" + this.state.checked);
              console.log("numbering" + index + "edititem" + this.state.edititem)
              this.state.additems[index]['name'] = info.name;
              this.state.additems[index]['quantity'] = info.quantity;
              this.state.additems[index]['price'] = info.price;
              this.state.additems[index]['notes'] = info.notes;
              this.state.additems[index]['check'] = info.check;
              // console.log(this.state.additems[index]['name'] + "additem list");
              if (this.state.edititem == true && this.state.editindex == index) {
                console.log("appear1");

                return (

                  <View >

                    <Collapse>
                      <CollapseHeader style={styles.collapseHeader}>
                        <View style={{ flexDirection: "row", flex: 6 }} >
                          <View style={{ marginRight: 20 }, { flex: 1 }}>
                            <CheckBox
                              // check={this.state.checked[index]}
                              // onPress={() => this.onChangeCheck(index)} />
                              tintColors={{ true: '#8b4513', false: '#8b4513' }}
                              value={this.state.checked}
                              onValueChange={() => this.onChangeCheck(num, index, deletelist)} />
                          </View>
                          <View style={{ marginLeft: 20 }, { marginRight: 20 }, { flex: 4 }}>
                            <Text style={styles.headercollapse}  >{index + 1 + ": "}{info.name}{' ▼'}</Text>
                          </View>
                          <View style={{ flex: 0.5 }}>

                            {/* <Button
title='Edit'

onPress={() => this.onButtonPress(index)}
color="#bc8f8f"
/> */}
                            <TouchableOpacity activeOpacity={0.5} onPress={() => this.onButtonPress(index)}
                            >
                              <Image
                                source={require('./assets/editnew2.png')}
                                style={styles.ImageIconStyleEdit}
                              />


                            </TouchableOpacity>
                          </View>
                          {/* </View> */}
                          {/* <View style={{ flexDirection: "row-reverse" }} > */}
                          <View style={{ flex: 0.5 }}>

                            {/* <Button
                            title='Delete'

                            onPress={() => this.openTwoButtonAlert(index, num, deletelist)}
                            color="#bc8f8f"
                          /> */}
                            <TouchableOpacity activeOpacity={0.5} onPress={() => this.openTwoButtonAlert(index, num, deletelist)}
                            >
                              <Image
                                source={require('./assets/dustbin.png')}
                                style={styles.ImageIconStyle}
                              />


                            </TouchableOpacity>
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
                            color="#bc8f8f"
                          />
                        </View>

                      </CollapseBody>
                    </Collapse>
                  </View>
                );
              } else {
                console.log("appear2");

                return (

                  <View >

                    <Collapse>
                      <CollapseHeader style={styles.collapseHeader}>
                        <View style={{ flexDirection: "row", flex: 6 }} >
                          <View style={{ marginRight: 20 }, { flex: 1 }}>
                            <CheckBox
                              // check={this.state.checked[index]}
                              // onPress={() => this.onChangeCheck(index)} />
                              tintColors={{ true: '#bc8f8f', false: '#bc8f8f' }}
                              value={this.state.checked}
                              onValueChange={() => this.onChangeCheck(num, index, deletelist)} />
                          </View>
                          <View style={{ marginLeft: 20 }, { marginRight: 20 }, { flex: 4 }}>
                            {/* <Text style={styles.headercollapse}  >{index + 1 + ": "}{info.name}{'  ▼'}</Text> */}
                            <Text style={this.getTextStyle(info.check)}  >{index + 1 + ": "}{info.name}{'  ▼'}</Text>
                            
                          </View>
                          {/* </View> */}
                          {/* <View style={{ flexDirection: "row-reverse" }} > */}

                          <View style={{ flex: 0.5 }}>

                            {/* <Button
title='Edit'

onPress={() => this.onButtonPress(index)}
color="#bc8f8f"
/> */}
                            <TouchableOpacity activeOpacity={0.5} onPress={() => this.onButtonPress(index)}
                            >
                              <Image
                                source={require('./assets/editnew2.png')}
                                style={styles.ImageIconStyleEdit}
                              />


                            </TouchableOpacity>
                          </View>
                          <View style={{ flex: 0.5 }}>

                            {/* <Button
                            title='Delete'

                            onPress={() => this.openTwoButtonAlert(index, num, deletelist)}
                            color="#bc8f8f"
                          /> */}
                            <TouchableOpacity activeOpacity={0.5} onPress={() => this.openTwoButtonAlert(index, num, deletelist)}
                            >
                              <Image
                                source={require('./assets/dustbin.png')}
                                style={styles.ImageIconStyle}
                              />


                            </TouchableOpacity>
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
                color="#d2b48c"
              />
            </View>
          </View>

        );
      }


    });


  };




  render() {

    return (
      <ImageBackground source={require('./assets/background3.png')} style={styles.background} >

        <ScrollView>

          <View style={styles.container}>{this.listM()}</View></ScrollView>
      </ImageBackground>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 3,
    // backgroundColor: '#d9f9b1',
    // alignItems: 'center',
  }, 
  background: {
    flex: 1,
    resizeMode: "cover",
    position: 'relative',
    // opacity: .8,
    width: '100%', height: '100%',

  },
  collapseHeader: {
    width: '100%',
    padding: 5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    // backgroundColor: '#fff0f5',

  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 22,
    width: 22,
    resizeMode: 'stretch',


  },
  ImageIconStyleEdit: {
    padding: 10,
    margin: 5,
    height: 22,
    width: 20,
    resizeMode: 'stretch',


  },
  text: {
    color: '#8b4513',
    fontSize: 32,
    textAlign: 'center',
    // fontWeight: 'bold'
  },
  textdate: {
    color: '#bc8f8f',
    fontSize: 20,
    textAlign: 'center',

  },
  itemheader: {
    marginTop: 10,
    marginLeft: 10,
    color: '#8b4513',
    fontSize: 26,

  },
  additemstyle: {
    marginTop: 10,
    color: '#8b4513',
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
    borderColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 6,
    color: 'black',
    width: 90,
    alignSelf: 'center',
  },
  //THIS IS THE STYLING FOR THE ITEM NAME
  headercollapse: {
    fontSize: 22,
    color: 'black',
    //textDecorationLine: 'line-through',
  },
  addItemButtonText: {
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
    marginRight: 20,
    width: 80,
    alignSelf: 'center',
  },
})
