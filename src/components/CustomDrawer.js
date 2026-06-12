import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {theme} from './theme';

const CustomDrawer = props => {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () =>
          auth()
            .signOut()
            .then(() => navigation.dispatch(StackActions.replace('Login'))),
      },
      {text: 'Cancel'},
    ]);
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}>
        <ImageBackground
          source={require('../../assets/ocean.png')}
          style={styles.drawerHeader}>
          <View style={styles.headerOverlay} />
          <Image
            source={require('../../assets/logo.png')}
            style={styles.drawerLogo}
            resizeMode="contain"
          />
          <Text style={styles.drawerAppName}>DocuWave</Text>
          <Text style={styles.drawerTagline}>Your documentary companion</Text>
        </ImageBackground>

        <View style={styles.navSection}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={handleLogout}
        activeOpacity={0.8}>
        <Icon name="log-out-outline" size={20} color={theme.primary} />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.surface,
  },
  scrollContent: {
    paddingTop: 0,
  },
  drawerHeader: {
    paddingTop: 52,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,10,20,0.6)',
  },
  drawerLogo: {
    height: 48,
    width: 48,
    marginBottom: 12,
  },
  drawerAppName: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'PoetsenOne-Regular',
    letterSpacing: 1,
  },
  drawerTagline: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 12,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  navSection: {
    flex: 1,
    paddingVertical: 8,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  logoutText: {
    color: theme.primary,
    fontSize: 15,
    fontWeight: '600',
  },
});
