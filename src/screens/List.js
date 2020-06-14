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
import { View, Text, StyleSheet, CheckBox} from 'react-native';


import { db } from '../config';
import firebase from 'firebase';

//let itemsRef = db.ref('/items');

export default class List extends Component {
  state = {
    items: [],
    checked:false,
  };

  componentDidMount() {
    const uid = firebase.auth().currentUser.uid;
    let itemsRef = db.ref('/' + uid + '/items');
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
const array= this.state.items.map((item,index) =>{
   console.log(index);
   console.log(item);
   return (item
   );
});
return array.map((element,index)=> {
   console.log(element);
   console.log(index);
   return (
     <View style={{ margin: 10 }}>
      <Text style = {styles.text}>{element.name}</Text>
       <CheckBox 
       
            checked={this.state.checked}
            onPress={() => this.onChangeCheck()}
          />
     </View>
  );
});
};
 render() {
   return <View style = {styles.container}>{this.listM()}</View>;
 }
}

const styles = StyleSheet.create ({
   container: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   text: {
      color: '#4f603c',
      fontSize: 20,
   }
})