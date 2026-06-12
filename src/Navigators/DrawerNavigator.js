import {StyleSheet} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../Screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';
import Icon from 'react-native-vector-icons/Ionicons';
import ExploreMovies from '../Screens/ExploreMovies';
import WatchList from '../Screens/WatchList';
import {theme} from '../components/theme';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      drawerStyle: {
        backgroundColor: theme.surface,
        width: 280,
      },
      drawerActiveBackgroundColor: theme.primary + '22',
      drawerActiveTintColor: theme.primary,
      drawerInactiveTintColor: theme.textMuted,
      drawerLabelStyle: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: -8,
      },
    }}>
    <Drawer.Screen
      name="HomeDrawer"
      component={HomeScreen}
      options={{
        title: 'Home',
        drawerIcon: ({color}) => (
          <Icon name="home-outline" size={20} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Watch List"
      component={WatchList}
      options={{
        title: 'Watchlist',
        drawerIcon: ({color}) => (
          <Icon name="bookmark-outline" size={20} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Article"
      component={ExploreMovies}
      options={{
        title: 'Explore',
        drawerIcon: ({color}) => (
          <Icon name="search-outline" size={20} color={color} />
        ),
      }}
    />
  </Drawer.Navigator>
);

export default DrawerNavigator;

const styles = StyleSheet.create({});
