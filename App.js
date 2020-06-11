/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './src/screens/Home';

// we will use these two screens later in our AppNavigator
import AddItem from './src/screens/AddItem';
import List from './src/screens/List';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
//import Loading from './src/sreens/Loading';

const App = () => {
  const AppNavigator = createStackNavigator({
    Home,
    AddItem,
    List,
    Login,
    Signup,
  },
  {
    initialRouteName: 'Signup',
  }
  );

  const AppContainer = createAppContainer(AppNavigator);
  return (
    [<AppContainer />]
  );
};

export default App;

// const AppNavigator = createStackNavigator(
//   {
//     Home,
//     AddItem,
//     List,
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );

// const AppContainer = createAppContainer(AppNavigator);

// export default class App extends Component {
//   render() {
//     return <AppContainer />;
//   }
// }


