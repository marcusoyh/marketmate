
import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, Image, ImageBackground, Button, DatePicker, TouchableOpacity, CheckBox } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

import { db } from '../config';
import firebase from 'firebase';


export default class List extends Component {
  state = {
    items: [],
    checked: false,
    deletelist: [],
    listname: '',
    date: '',
  };

  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;
    let itemsRef = db.ref('/' + uid + '/lists');
    itemsRef.on('value', snapshot => {
      // snapshot.forEach((child) => {
      //   console.log(child.key);
      // })
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });

  }

  openTwoButtonAlert = (list) => {
    Alert.alert(
      'Delete List',
      'Are you sure?',
      [
        { text: 'Yes', onPress: () => this.deleteList(list) },
        { text: 'No', onPress: () => console.log('No list was removed'), style: 'cancel' },
      ],
      {
        cancelable: true
      }
    );
  }

  deleteList(list) {
    const uid = firebase.auth().currentUser.uid;

    let itemsRef = db.ref('/' + uid + '/lists');
    const childkey = [];
    itemsRef.on('value', snapshot => {
      snapshot.forEach((child) => {
        childkey.push(child.key);
      })
    });


    // console.log('/' + uid + '/lists' + '/' + childkey[list] + '/items/' + item);
    db.ref('/' + uid + '/lists' + '/' + childkey[list]).remove();


    console.log("List is removed");


  }

  onChangeCheck(itemInfo, itemIndex, listIndex) {
    console.log("ITEM INDEX: " + itemIndex); //num is the index of the ITEM
    console.log("ITEM DETAILS: "); //itemslist is the details of that ONE ITEM
    console.log(itemInfo);
    console.log("LIST INDEX NUMBER:" + listIndex); //index should be the index of the LIST

    console.log("BEFORE CHECKING: " + itemInfo['check']);
    itemInfo['check'] = !(itemInfo['check']);
    console.log("AFTER CHECKING: " + itemInfo['check']);

    const uid = firebase.auth().currentUser.uid;
    let itemsRef = db.ref('/' + uid + '/lists');
    const childkey = [];
    itemsRef.on('value', snapshot => {
      snapshot.forEach((child) => {
        childkey.push(child.key);
      })
    });

    db.ref('/' + uid + '/lists' + '/' + childkey[listIndex] + '/items' + '/' +itemIndex ).set(itemInfo);

    // console.log("before" + this.state.checked);
    // if (this.state.checked == true) {
    //   this.state.checked = false;
    //   this.setState({ checked: false });
    //   console.log("after 1" + this.state.checked);
    // } else {
    //   this.state.checked = true;
    //   this.setState({ checked: true });
    //   console.log("after 2" + this.state.checked);
    // }


    // itemslist[index]['check'] = this.state.checked;
    // const uid = firebase.auth().currentUser.uid;
    // let itemsRef = db.ref('/' + uid + '/lists');
    // const childkey = [];
    // itemsRef.on('value', snapshot => {
    //   snapshot.forEach((child) => {
    //     childkey.push(child.key);
    //   })
    // });
    // console.log('listname' + this.state.listname);
    // db.ref('/' + uid + '/lists' + '/' + childkey[num]).set({
    //   items: itemslist,
    //   name: this.state.listname,
    //   date: this.state.date

    // });
    // this.setState({ checked: false });
  }

  getTextStyle(checked) {
    if (checked) {
      return {
        fontSize: 22,
        color: 'black',
        // textAlign: 'center',
        marginLeft: 15,
        textDecorationLine: 'line-through',
      }
    } else {
      return {
        fontSize: 22,
        color: 'black',
        // textAlign: 'center',
        marginLeft: 15,
      }

    }
  }

  listM = () => {
    const { navigate } = this.props.navigation;
    const array = this.state.items.map((item, index) => {

      return (item);
    });


    return array.map((element, index) => {



      if (!element.items) {

        return (


          <View style={styles.section}>
            <Collapse>
              <CollapseHeader>
                <View style={{ flexDirection: "row", flex: 6 }} >
                  <View style={{ flex: 5 }}>
                    <Text style={styles.text}>{'🌿' + element.name}{' ▼'}</Text>
                    <Text style={styles.textdate}>{element.date}</Text>
                  </View>
                  {/* <View style={styles.detailsButton}>
            <Button
              title="Details"
              color="#bc8f8f"
              onPress={() => navigate('ViewListDetails', { number: index })}
            />
            </View> */}
                  <View style={{ flex: 0.5 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigate('ViewListDetails', { number: index })}

                    >
                      <Image
                        source={require('./assets/details.png')}
                        style={styles.detailsIconStyle}
                      />


                    </TouchableOpacity>
                  </View>
                  {/* <View style={styles.deleteButton}>
              <Button
                title='Delete'

                onPress={() => this.openTwoButtonAlert(index)}
                color="#bc8f8f"
              />
              </View> */}
                  <View style={{ flex: 0.5 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => this.openTwoButtonAlert(index)}
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
                <Text style={styles.itemheader}  >{"No items in the list"}</Text>
              </CollapseBody>
            </Collapse>
          </View>


        )
      } else {

        return (

          <View style={styles.section}>
            <Collapse>
              <CollapseHeader>
                <View style={{ flexDirection: "row", flex: 6 }} >
                  <View style={{ flex: 5 }}>
                    <Text style={styles.text}>{'🌿' + element.name}{' ▼'}</Text>
                    <Text style={styles.textdate}>{element.date}</Text>
                  </View>
                  {/* <View style={styles.detailsButton}>
            <Button
              title="Details"
              color="#bc8f8f"
              onPress={() => navigate('ViewListDetails', { number: index })}
            />
            </View> */}
                  <View style={{ flex: 0.5 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigate('ViewListDetails', { number: index })}

                    >
                      <Image
                        source={require('./assets/details.png')}
                        style={styles.detailsIconStyle}
                      />


                    </TouchableOpacity>
                  </View>
                  {/* <View style={styles.deleteButton}>
              <Button
                title='Delete'

                onPress={() => this.openTwoButtonAlert(index)}
                color="#bc8f8f"
              />
              </View> */}
                  <View style={{ flex: 0.5 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => this.openTwoButtonAlert(index)}
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
                <Text style={styles.itemheader}  >{"Items :"}</Text>
                {element.items.map((info, num) => {
                  return (

                    <View>
                      {/* <Text style={styles.headercollapse}  >{index + 1 + ": "}{info.name}</Text> */}
                      {/* <Text style={this.getTextStyle(info.check)}  >{index + 1 + ": "}{info.name}</Text> */}
                      <CheckBox
                        // check={this.state.checked[index]}
                        // onPress={() => this.onChangeCheck(index)} />
                        tintColors={{ true: '#bc8f8f', false: '#bc8f8f' }}
                        value={this.state.checked}
                        onValueChange={() => this.onChangeCheck(info, num, index)} />
                      <Text style={this.getTextStyle(info.check)}>{info.name}</Text>
                    </View>
                  );

                })
                }
              </CollapseBody>
            </Collapse>

          </View>



        )
      }
    });
  };



  render() {
    const { navigate } = this.props.navigation;
    return (



      <ImageBackground source={require('./assets/background3.png')} style={styles.background} >
        <ScrollView>
          <View style={styles.container}>

            <View style={{ flexDirection: "row", flex: 6 }} >
              <View style={{ flex: 5.5 }}>
                <Text style={styles.textHeading}>{'My Lists'}</Text>
              </View>
              <View style={styles.addButton, { flex: 0.5 }}>
                <Button
                  onPress={() => navigate('AddList')}
                  title="✚"
                  color="#d2b48c"


                />
              </View>
            </View>
            <View>
              {this.listM()}

            </View>
          </View>
        </ScrollView>
      </ImageBackground>





    )
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 3,
    flex: 1,
    flexDirection: "column"
    // backgroundColor: '#d9f9b1',
    // alignItems: 'center',
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    position: 'relative',
    // opacity: .8,
    width: '100%', height: '100%',

  }, collapseHeader: {
    width: '100%',
    padding: 5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#fff0f5',

  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: .5,
  },
  section: {
    padding: 10,
    marginTop: 3,
    borderBottomColor: '#a0522d',
    borderBottomWidth: 1,
  },
  sectionadd: {
    padding: 10,
    marginTop: 3,
    // borderBottomColor: '#bc8f8f',
    // borderBottomWidth: 1,
    backgroundColor: '#ffe4c4'
  },
  text: {
    color: '#8b4513',
    fontSize: 24,
    // textAlign: 'center',
    // fontWeight: 'bold'
  }, textHeading: {
    color: '#8b4513',
    fontSize: 33,
    marginLeft: 15,

    // textAlign: 'center',
    // fontWeight: 'bold'
  },
  textdate: {
    color: '#bc8f8f',
    fontSize: 20,
    // textAlign: 'center',

  },
  itemheader: {
    marginTop: 10,
    marginLeft: 10,
    color: '#8b4513',
    fontSize: 24,
    // textAlign: 'center',

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
    width: 250,

  },
  //ORIGINAL STYLING FOR THE ITEM NAME
  headercollapse: {
    fontSize: 22,
    color: 'black',
    // textAlign: 'center',
    marginLeft: 15,
    textDecorationLine: 'line-through',
  },
  addItemButtonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
    backgroundColor: '#fff0f5',
  },
  detailsButton: {
    marginTop: 20,
    marginLeft: 20,
    width: 80,
    alignSelf: 'center',
  },
  deleteButton: {
    marginTop: 20,
    marginLeft: 20,
    width: 80,
    alignSelf: 'center',
  },
  additemstyle: {
    marginTop: 10,
    color: '#bc8f8f',
    fontSize: 26,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 10,
    width: 150,
    alignSelf: 'center',
  },
  addButton: {
    marginTop: 10,
    marginRight: 10,
    width: 25,

    alignSelf: 'center',

  },
  ImageIconStyle: {
    padding: 10,
    marginTop: 15,
    height: 25,
    width: 25,
    resizeMode: 'stretch',


  },
  detailsIconStyle: {
    padding: 10,
    marginTop: 15,
    height: 26,
    width: 30,
    resizeMode: 'stretch',


  },

})