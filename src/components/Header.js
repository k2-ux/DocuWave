import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React from 'react';
  import Icon from 'react-native-vector-icons/Ionicons';

//   import {useSelector} from 'react-redux';
  import {useNavigation} from '@react-navigation/native';
  const {height, width} = Dimensions.get('screen');
  
  const Header = ({
    title,
    rightIcon,
    leftIcon,
    onCLickRightIcon,
    onClickLeftIcon,
  }) => {
    const navigation = useNavigation();
   
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.btn} onPress={onClickLeftIcon}>
          <Icon name="menu" size={20} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.btn} onPress={onCLickRightIcon}>
          <Icon name="notifications-outline" size={20} />
          </TouchableOpacity>
      
      </View>
    );
  };
  
  export default Header;
  
  const styles = StyleSheet.create({
    header: {
      width: width*0.9,
      // height: 60,
    //   backgroundColor: '#1F6357',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center'
      // paddingHorizontal: 15,
      // paddingTop: 10,
    },
    btn: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: 30,
      height: 30,
      tintColor: 'white',
    },
    title: {
      color: 'black',
      fontSize: 20,
      padding: 5,
    },
  });
  