import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Registration from '../Screens/Registration';
import HomeScreen from '../Screens/HomeScreen';
import auth from '@react-native-firebase/auth';
import Utelly from '../Screens/ExploreMovies';
import DrawerNavigator from './DrawerNavigator';
import DocumentaryDetail from '../Screens/DocumentaryDetail';
import ExploreMovies from '../Screens/ExploreMovies';

const Stack = createNativeStackNavigator();

const LoginNavigator = () => {
  const [isUserLoggedin, setIsUserLoggedIn] = useState(false);
  const [initialscreen, setinitialscreen] = useState("Loading");
  const unsubscribe = () => {
    auth().onAuthStateChanged(user => {
      console.log('user DETAIL',user);
      if (user) {
        setIsUserLoggedIn(true);
        setinitialscreen('Home');
      } else {
        setIsUserLoggedIn(false);
        setinitialscreen('Login');
      }
    });
  };

  useEffect(() => {
    unsubscribe();
  }, []);

  // Don't forget to unsubscribe when the component unmounts

  console.log('issssssssss', isUserLoggedin, initialscreen);
  if (initialscreen === 'Loading') {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isUserLoggedin ? "Home" : "Login"}>
       
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Home"
          component={DrawerNavigator}
          options={{
            headerShown:false,
            headerTitle: 'DocuWave',
            headerBackVisible: false,
            headerTitleAlign: 'center',
          }}
        />
         <Stack.Screen
          name="ExploreMovies"
          component={ExploreMovies}
          options={{
            // headerShown:false,
            // headerTitle: 'DocuWave',
            // headerBackVisible: false,
            headerTitleAlign: 'center',
          }}
        />
         <Stack.Screen
          name="DocumentaryDetail"
          component={DocumentaryDetail}
          options={{
            // headerShown:false,
            headerTitle: 'Details',
            // headerBackVisible: false,
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigator;

const styles = StyleSheet.create({});
