import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity ,Alert} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { logOut } from '../Redux/Actions/Actions';
import { useDispatch } from 'react-redux';
const CustomDrawer = props => {
  const dispatch = useDispatch()
    const navigation = useNavigation()
    const handleLogout = () => {
      // dispatch(logOut())
        Alert.alert('Hey', 'Do you want to log out?', [
          {
            text: 'Yes',
            onPress: () => {
              auth()
                .signOut()
                .then(() => {
                  console.log('User signed out!');
                  navigation.dispatch(StackActions.replace('Login'));
                });
            },
          },
          {
            text: 'cancel',
            onPress: () => {
              console.log('logout cancelled');
            },
          },
        ]);
      };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={require('../../assets/ocean.png')}
            style={{ padding: 20 }}
          >
            <Image
              source={require('../../assets/logo.png')}
              style={{ height: 40, width: 40 }}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontFamily: 'Roboto-Medium',
                backgroundColor:'#005477',
                width:90,
                borderRadius:5,
                textAlign:'center'
              }}
            >
              Docuwave
            </Text>
          </ImageBackground>
          <View style={{ flex: 1, paddingTop: 10, backgroundColor: 'white' }}>
            <DrawerItemList {...props} />
          </View>
        </View>
        <TouchableOpacity
          style={{ alignSelf: 'center', marginBottom: 10 }}
          onPress={() => {
            handleLogout();
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Icon name="log-out" size={20} color="black" />
            <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
