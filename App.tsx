import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect,useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Login from './src/Screens/Login';
import LoginNavigator from './src/Navigators/LoginNavigator';
import createTables from './src/components/createTables';
import auth from '@react-native-firebase/auth';



 
const App = () => {
  const [isUserLoggedin, setIsUserLoggedIn] = useState(false);
  const [initialscreen, setinitialscreen] = useState('');
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  const unsubscribe =  () => {
    auth().onAuthStateChanged(user => {
       console.log(user);
       if (user) {
         setIsUserLoggedIn(true);
         setinitialscreen("Home");
       } else {
         setIsUserLoggedIn(false);
         setinitialscreen("Login");
       }
     });
   };
 
   useEffect(() => {
     unsubscribe();
   }, []);
 
  useEffect(() => {
    createTables();
  }, []);
  return (
   <LoginNavigator logged={initialscreen}/>
  );
};

export default App;

const styles = StyleSheet.create({});
