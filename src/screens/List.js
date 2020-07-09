
import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, Image, ImageBackground, Button, DatePicker, TouchableOpacity } from 'react-native';
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
                {element.items.map((info, index) => {
                  return (

                    <View>
                      <Text style={styles.headercollapse}  >{index + 1 + ": "}{info.name}</Text>
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
    return <ScrollView>

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
        <View style={styles.container}>
          {/* <ImageBackground source={require('./assets/logo.png')} style={styles.image}>
          {this.listM()}
        </ImageBackground> */}
          {this.listM()}
        </View>
      </View>
    </ScrollView>;
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
    fontSize: 28,
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
    color: '#d2b48c',
    fontSize: 20,
    // textAlign: 'center',

  },
  itemheader: {
    marginTop: 10,
    marginLeft: 10,
    color: '#8b4513',
    fontSize: 26,
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
  headercollapse: {
    fontSize: 22,
    color: 'black',
    // textAlign: 'center',
    marginLeft: 15,

  }, addItemButtonText: {
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