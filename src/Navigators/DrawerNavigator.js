import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Feed from '../Screens/Feed';
import Article from '../Screens/Article';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    // <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="HomeDrawer" component={HomeScreen}  options={{ title: 'Home' }}/>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
    // </NavigationContainer>/
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
