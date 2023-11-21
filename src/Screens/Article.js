import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const Article = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,

        margin: 15,
      }}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" size={20} />
      </TouchableOpacity>
      </View>
  )
}

export default Article

const styles = StyleSheet.create({})