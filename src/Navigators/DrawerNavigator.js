import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import Article from '../Screens/Article';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';
import Icon from 'react-native-vector-icons/Ionicons'
import Utelly from '../Screens/ExploreMovies';
import WatchList from '../Screens/WatchList';
import { theme } from '../components/theme';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    // <NavigationContainer>
    <Drawer.Navigator drawerContent={props=><CustomDrawer{...props}/>} 
    screenOptions={{
      headerShown:false,
      drawerActiveBackgroundColor:theme.main,
      drawerActiveTintColor:'white',
      drawerInactiveTintColor:'#333'

    }}
    >
      <Drawer.Screen name="HomeDrawer" component={HomeScreen}  options={{ title: 'Home' ,drawerIcon:()=>(<Icon name='home' size={20}/>)}} />
      <Drawer.Screen name="Watch List" component={WatchList}  options={{ title: 'Watch List' ,drawerIcon:()=>(<Icon name='logo-bitbucket' size={20}/>)}}/>
      <Drawer.Screen name="Article" component={Utelly}  options={{ title: 'Explore' ,drawerIcon:()=>(<Icon name='search' size={20}/>)}}/>
    </Drawer.Navigator>
    // </NavigationContainer>/
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
