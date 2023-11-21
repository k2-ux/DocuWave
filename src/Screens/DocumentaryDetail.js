import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addItemToList,removeItemFromList} from '../Redux/WatchListSlice';
import {useSelector} from 'react-redux';
const DocumentaryDetail = ({route}) => {
  // Get the movie details from the route params
  const watchlist = useSelector(state => state.watchlist.data);
  console.log('wwwwwww', watchlist);
  const movie = route.params;
  const dispatch = useDispatch();
  const handleAddList = () => {
    Alert.alert(
      'Hey',
      'Do you want to add this documentary to your watchlist?',
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(addItemToList(movie));
            console.log('oka....aaaay');
          },
        },
        {
          text: 'No',
          onPress: () => {
            console.log('not interested');
          },
        },
      ],
    );
  };
  const handleRemoveList = () => {
    Alert.alert(
      'Hey',
      'Do you want to remove this documentary from your watchlist?',
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(removeItemFromList(movie.id));
            console.log('ugggggggg...h');
          },
        },
        {
          text: 'No',
          onPress: () => {
            console.log('not interested');
          },
        },
      ],
    );
  };

  const Listexist = watchlist.some(item => item.id === movie.id);

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.poster}
        source={{uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <Text style={styles.releaseDate}>
        Release year: {movie.release_date.split('-')[0]}
      </Text>
      <Text style={styles.language}>Language: {movie.original_language}</Text>
      {/* <Text style={styles.genres}>
        Genres: {movie.genre_ids.join(', ')}
      </Text> */}
      <Text style={styles.averageVote}>Average Vote: {movie.vote_average}</Text>
      <Text style={styles.voteCount}>Vote Count: {movie.vote_count}</Text>
      {!Listexist && (
        <TouchableOpacity
          onPress={handleAddList}
          style={{
            backgroundColor: '#FF8080',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.icon}
              source={require('../../assets/watching-a-movie.png')}
            />
            <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
              Add this to your Watchlist
            </Text>
          </View>
        </TouchableOpacity>
      )}
       {Listexist && (
        <TouchableOpacity
          onPress={handleRemoveList}
          style={{
            backgroundColor: '#FF8080',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            marginBottom:5
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.icon}
              source={require('../../assets/watching-a-movie.png')}
            />
            <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
              Remove this from your Watchlist
            </Text>
          </View>
        </TouchableOpacity>
      )}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  poster: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  overview: {
    fontSize: 16,
    marginTop: 8,
  },
  releaseDate: {
    fontSize: 16,
    marginTop: 8,
  },
  language: {
    fontSize: 16,
    marginTop: 8,
  },
  genres: {
    fontSize: 16,
    marginTop: 8,
  },
  averageVote: {
    fontSize: 16,
    marginTop: 8,
  },
  voteCount: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  icon: {
    height: 80,
    width: 80,
  },
});

export default DocumentaryDetail;
