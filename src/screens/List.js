/* eslint-disable prettier/prettier */
// import React, { Component } from 'react'
// import { Text, View, TouchableOpacity, StyleSheet, CheckBox } from 'react-native'
//    import { db } from '../config';

// let itemsRef = db.ref('/items');

// class List extends Component {
//    state = {
//       names: [
//          {
//             id: 0,
//             name: 'bread',
//             checked:false,
//          },
//          {
//             id: 1,
//             name: 'lala',
//             checked:false,
//          },
//          {
//             id: 2,
//             name: 'apple',
//             checked:false,
//          },
//          {
//             id: 3,
//             name: 'rice',
//             checked:false,
//          }
//       ]
//    }
//    alertItemName = (item) => {
//       alert(item.name)
//    }

//    componentDidMount() {
//           itemsRef.on('value', snapshot => {
//             let data = snapshot.val();
//             let items = Object.values(data);
//             this.setState({ items });
//           });
//         }

//    onChangeCheck() {
//     this.setState({ checked: !this.state.checked})
//   }
//    render() {
//       return (
//          <View>
//             {
//                this.state.names.map((item, index) => (
//                   <TouchableOpacity
//                      key = {item.id}
//                      style = {styles.container}
//                      onPress = {() => this.alertItemName(item)}>
//                      <Text style = {styles.text}>
//                      <CheckBox
//                             style={styles.checkBox}
//                             value={item.checked}
//                             onChange={() => this.onChangeCheck()} />
//                         {item.name}
//                      </Text>

//                   </TouchableOpacity>

//                ))
//             }
//          </View>
//       )
//    }
// }
// export default List

// const styles = StyleSheet.create ({
//    container: {
//       padding: 10,
//       marginTop: 3,
//       backgroundColor: '#d9f9b1',
//       alignItems: 'center',
//    },
//    text: {
//       color: '#4f603c'
//    }
// })


// import React, { Component } from 'react';
// import { View, Text, StyleSheet,CheckBox, TouchableOpacity } from 'react-native';
// import ItemComponent from '../components/ItemComponent';

// import { db } from '../config';

// let itemsRef = db.ref('/items');

// export default class List extends Component {
//   state = {
//     items: [],
//     checked:false
//   };

//   componentDidMount() {
//     itemsRef.on('value', snapshot => {
//       let data = snapshot.val();
//       let items = Object.values(data);
//       this.setState({ items });
//     });
//   }

//   render() {
//     return (
//       <View style={styles.container}>


//           {/* <ItemComponent items={this.state.items} />
//           <CheckBox
//           style={styles.checkBox}
//           value={this.state.checked}
//           onChange={() => this.onChangeCheck()} /> */}
//         {
//                this.state.items.map((item, index) => (
//                   <TouchableOpacity
//                      key = {index}
//                      style = {styles.container}
//                      >
//                      <Text>
//                         {item}
//                      </Text>
//                      <CheckBox
//           style={styles.checkBox}
//           value={this.state.checked}
//           onChange={() => this.onChangeCheck()} />
//                   </TouchableOpacity>
//                ))
//             }
//       </View>

//     );
//   }

//   onChangeCheck() {
//     this.setState({ checked: !this.state.checked})
//   }
// }



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ebebeb'
//   }
// });

import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, CheckBox, TextInput } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

import { db } from '../config';
import firebase from 'firebase';

//let itemsRef = db.ref('/items');

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
    this.setState({ checked: !this.state.checked })
  }


  listM = () => {
    this.state.num = 0;
    const array = this.state.items.map((item, index) => {
      console.log(index);
      console.log(item);
      return (item
      );
    });


    return array.map((element, index) => {
      console.log(element);
      console.log(element.items[0].name);
      console.log(index);
      return (
        <View style={{ margin: 10 }}>
          <Text style={styles.text}>{element.name}{"  "}{element.date}</Text>


          {element.items.map((info, index) => {
            console.log("items");
            console.log(element);
            console.log(info.name);
            console.log(index);
            return (
              <View>
                <Collapse>
                  <CollapseHeader>
                    <Text style={styles.headercollapse}  >{"Item: "}{info.name}</Text>
                  </CollapseHeader>

                  <CollapseBody>
                    <Text style={styles.detailInput}  >{"Quantity: "}{info.quantity}</Text>
                    <Text style={styles.detailInput}  >{"Price: "}{info.price}</Text>
                    <Text style={styles.detailInput}  >{"Notes: "}{info.notes}</Text>

                  </CollapseBody>
                </Collapse>
              </View>
            );
          })
          }

          {/* <CheckBox

            checked={this.state.checked}
            onPress={() => this.onChangeCheck()}
          /> */}
        </View>
      );
    });
  };
  // listitem = () => {
  //    const itemarray = this.state.items.map((arrayitem, index) => {
  //     console.log("itemsarray");
  //     console.log(arrayitem.items[index]);
  //     return (arrayitem.items[index]);
  //   });


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