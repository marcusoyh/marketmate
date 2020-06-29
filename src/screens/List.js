
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


  
  listM = () => {
    const { navigate } = this.props.navigation;
    const array = this.state.items.map((item, index) => {

      return (item);
    });


    return array.map((element, index) => {
      console.log(element);
      console.log(index);
      if(!element.items){
        return(
        <View>
               <Text style={styles.text}>{element.name}</Text>
           <Text style={styles.text}>{element.date}</Text>
          </View>
        )
      }else{
      return (
        <View style={{ margin: 10 }}>
          <Collapse>
          <CollapseHeader>
         
           <Text style={styles.text}>{element.name}</Text>
           <Text style={styles.text}>{element.date}</Text>
       
          <Button
        title="Details"
        color="green"
        onPress={() => navigate('ViewListDetails',{number: index})}
      />
          </CollapseHeader>
          <CollapseBody>
          {element.items.map((info, index) => {
            console.log("items");
            console.log(element);
            console.log(info.name);
            console.log(index);
           
            return (
              
              <View>
                    <Text style={styles.headercollapse}  >{"Item "}{index+1 + ": "}{info.name}</Text>
              </View>
            );
            
          })
          }
          </CollapseBody>
          </Collapse> 

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