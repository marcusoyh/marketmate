import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, CheckBox, TextInput, Button} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

import { db } from '../config';
import firebase from 'firebase';


export default class List extends Component {
  state = {
    items: [],
    checked: false,
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

  onChangeCheck() {
         this.setState({ checked: !this.state.checked})
       }
  
  listM = () => {

console.log("PROPS " + this.props.navigation.state.params.number);
     return this.state.items.map((item, index) => {
        if (index == this.props.navigation.state.params.number) {
            console.log("COMPRE INDEX" + item.name);
            return ( 
        
            <View style={{ margin: 10 }}>
            
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.date}</Text>
        
       
          {item.items.map((info, index) => {
              console.log("items" + info.name);
            return (
              <View>
                <Collapse>
                  <CollapseHeader>
            <Text style={styles.headercollapse}  >{"Item "}{index+1 + ": "}{info.name}</Text> 
            <CheckBox
            checked={this.state.checked}
            onPress={() => this.onChangeCheck()}/>
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
            )}
        
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
  },
})