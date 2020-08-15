/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './src/screens/Home';

import AddItem from './src/screens/AddItem';
import List from './src/screens/List';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import LoadingScreen from './src/screens/LoadingScreen';
//import CreateList from './src/sreens/CreateList';
import AddList from './src/screens/AddList';
import ViewListDetails from './src/screens/ViewListDetails';
import Reset from './src/screens/Reset';
import ViewCategories from './src/screens/ViewCategories';

const App = () => {
  const AppNavigator = createStackNavigator({
    Home,
    AddItem,
    List,
    Login,
    Signup,
    LoadingScreen,
    AddList,
    Reset,
    ViewListDetails,
    ViewCategories,
  },
  {
    initialRouteName: 'Login',
  }
  );

  const AppContainer = createAppContainer(AppNavigator);
  return (
    [<AppContainer />]
  );
};

export default App;




