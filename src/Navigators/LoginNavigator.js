import {Text, View, ActivityIndicator, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import {theme} from '../components/theme';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Registration from '../Screens/Registration';
import auth from '@react-native-firebase/auth';
import DrawerNavigator from './DrawerNavigator';
import DocumentaryDetail from '../Screens/DocumentaryDetail';
import ExploreMovies from '../Screens/ExploreMovies';

const Stack = createNativeStackNavigator();

const LoginNavigator = () => {
  const [isUserLoggedin, setIsUserLoggedIn] = useState(false);
  const [initialscreen, setinitialscreen] = useState('Loading');

  useEffect(() => {
    return auth().onAuthStateChanged(user => {
      setIsUserLoggedIn(!!user);
      setinitialscreen(user ? 'Home' : 'Login');
    });
  }, []);

  if (initialscreen === 'Loading') {
    return (
      <View style={{flex: 1, backgroundColor: theme.bg, justifyContent: 'center', alignItems: 'center'}}>
        <StatusBar barStyle="light-content" backgroundColor={theme.bg} />
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{color: theme.textMuted, marginTop: 12, fontSize: 14}}>
          Loading…
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isUserLoggedin ? 'Home' : 'Login'}>
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
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ExploreMovies"
          component={ExploreMovies}
          options={{
            headerStyle: {backgroundColor: theme.bg},
            headerTintColor: theme.text,
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="DocumentaryDetail"
          component={DocumentaryDetail}
          options={{
            headerStyle: {backgroundColor: theme.bg},
            headerTintColor: theme.text,
            headerTitle: 'Details',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigator;
