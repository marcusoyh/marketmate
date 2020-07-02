
import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, TextInput, Button, TouchableHighlight } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

import { db } from '../config';
import firebase from 'firebase';


export default class List extends Component {
  state = {
    items: [],
    checked: false,
    additems: [],

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
           <View style={{flexDirection:"row"}} >
             <View>
            <Text style={styles.text}>{element.name}</Text>
            <Text style={styles.textdate}>{element.date}</Text>
            </View>
            <View style={styles.detailsButton}>
            <Button
              title="Details"
              color="#bc8f8f"
              onPress={() => navigate('ViewListDetails', { number: index })}
            />
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
              <View style={{flexDirection:"row"}} >
                <View>
                <Text style={styles.text}>{element.name}</Text>
                <Text style={styles.textdate}>{element.date}</Text>
                </View>
                <View style={styles.detailsButton}>
                <Button
                  title="Details"
                  color="#bc8f8f"
                  onPress={() => navigate('ViewListDetails', { number: index })}
                />
                </View>
             
                </View>
              </CollapseHeader>
              <CollapseBody>
              <Text style={styles.itemheader}  >{"Items :"}</Text>
                {element.items.map((info, index) => {
                  return (
                    
                    <View>
                      <Text style={styles.headercollapse}  >{index+1 +": "}{info.name}</Text>
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
    return <ScrollView><View style={styles.container}>{this.listM()}</View></ScrollView>;
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
  section: {
    padding: 10,
    marginTop: 3,
    borderBottomColor: '#bc8f8f',
    borderBottomWidth: 1,
  },
  text: {
    color: '#bc8f8f',
    fontSize: 32,
    // textAlign: 'center',
    fontWeight: 'bold'
  }, 
  textdate: {
    color: '#bc8f8f',
    fontSize: 20,
    // textAlign: 'center',
  
  },
  itemheader: {
    marginTop: 10,
    marginLeft: 10,
    color: '#bc8f8f',
    fontSize: 26,
    textAlign:'center',
  
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
    color: '#cd5c5c',
    textAlign:'center',
    
  
  }, addItemButtonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
    backgroundColor: '#fff0f5',
  },
  detailsButton: {
   marginTop:20,
   marginLeft:20,
    width:80,
    alignSelf:'center',
  },

})