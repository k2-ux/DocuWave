import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from './theme';

const Header = ({title, onClickLeftIcon}) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.iconBtn} onPress={onClickLeftIcon}>
      <Icon name="menu" size={22} color={theme.text} />
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.text,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});
