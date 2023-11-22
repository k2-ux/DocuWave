import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect,useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Login from './src/Screens/Login';
import LoginNavigator from './src/Navigators/LoginNavigator';
import createTables from './src/components/createTables';
import auth from '@react-native-firebase/auth';
import DrawerNavigator from './src/Navigators/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import { store } from './src/Redux/Store/store';
 
const App = () => {
  
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

 
 
  useEffect(() => {
    createTables();
  }, []);
  return (
  <Provider store={store}>
   <LoginNavigator/>
 </Provider>  
);
};

export default App;

const styles = StyleSheet.create({});
