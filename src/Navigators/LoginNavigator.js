import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Registration from '../Screens/Registration';
import HomeScreen from '../Screens/HomeScreen';
import auth from '@react-native-firebase/auth';
import Utelly from '../Screens/Utelly';

const Stack = createNativeStackNavigator();

const LoginNavigator = ({logged}) => {
  const [isUserLoggedin, setIsUserLoggedIn] = useState(false);
  const [initialscreen, setinitialscreen] = useState("Loading");
  console.log('sdsdsdsdsds', logged);
  const unsubscribe = () => {
    auth().onAuthStateChanged(user => {
      console.log(user);
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
          component={HomeScreen}
          options={{
            // headerShown:false,
            headerTitle: 'DocuWave',
            headerBackVisible: false,
            headerTitleAlign: 'center',
          }}
        />
         <Stack.Screen
          name="Utelly"
          component={Utelly}
          options={{
            // headerShown:false,
            // headerTitle: 'DocuWave',
            headerBackVisible: false,
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigator;

const styles = StyleSheet.create({});
