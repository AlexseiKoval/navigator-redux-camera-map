import React from "react";
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import StartActivity from "./component/start"

import HomeScreen from './component/home'
import DetailsScreen from './component/detail'
import PhotoCamera from "./component/camera"

import AppMap from "./component/map"
 

const
  FlatListItems = [

  ];


let rootReducer = combineReducers({
  name: (state = ' MY name ', action) => {
    switch (action.type) {
      case 'newname':
        return action.name
      default:
        return state
    }
  },
  FlatListItems: (state = FlatListItems, action) => {
    switch (action.type) {
      case 'getNewList':
        return  action.FlatListItems
      default:
        return state
    }
  },
});

let store = createStore(rootReducer);


store.subscribe(() => { 
  //alert('ok');
})

const AppNavigator = createStackNavigator(
  {
    title: 'DetailsScreen',
    Home: HomeScreen,
    Details: DetailsScreen,
    PhotoCamera: {
      screen: PhotoCamera,
    },
    Start :StartActivity,
    Map: AppMap,
 
  },

  {
    initialRouteName: "Start"
  }
);

const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'

  },
  
});


