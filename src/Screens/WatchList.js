import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Header from '../components/Header';
const screenWidth = Dimensions.get('screen').width;

const WatchList = ({navigation}) => {
  const data = useSelector(state => state.watchlist.data);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('DocumentaryDetail', item)}>
      <View style={styles.item}>
        <Image
          style={styles.poster}
          source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      </TouchableOpacity>
    );
  };
  console.log('watchlist', data);
  return (
    <View
      style={{
        flex: 1,

        margin: 15,
      }}>
      
      <Header title={'Watch List'} onClickLeftIcon={() => navigation.toggleDrawer()}/>
      <FlatList
        data={data}
        numColumns={3} // Set the number of columns to 3
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default WatchList;

const styles = StyleSheet.create({
  item: {
    // flex: 1,
    margin: 5,
    width: screenWidth/3.5
  },
  poster: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
});
