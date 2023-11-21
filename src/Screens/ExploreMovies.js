import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
const itemsPerPage = 10;
const ExploreMovies = ({ navigation }) => {
  const [pgNum, setPgNum] = useState(1);
  const [MoviesList, setMoviesList] = useState([]);
  const TMDB_API_KEY = '7af9e3c62ef8764a03d10775e4901bbc'; // Replace with your actual API key
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const [paginationData, setPaginationData] = useState([])
const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(MoviesList.length / itemsPerPage);
  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&page=${pgNum}`,
      );
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  };

  const fetchData = async () => {
    const movies = await fetchPopularMovies();
    setMoviesList(prevMovies => [...prevMovies, ...movies]);
  };

  console.log('no. of pages', totalPages)

  useEffect(() => {
    fetchData();
  }, [pgNum]);

  let documentaryList = MoviesList.filter(item =>
    item['genre_ids'].includes(99),
  );
  // useEffect(() => {
  //   if (documentaryList.length < 10) {
  //     setPgNum(prevPgNum => prevPgNum + 1);
  //   } else {
  //     console.log('Nice job', pgNum);
  //   }
    
  // }, [MoviesList]);


  const handlePageChange = (arg) => {
    // const groupSize = 5;
    // const startIndex = (arg - 1) * groupSize;
    // const endIndex = arg * groupSize;
  
    // if (startIndex < 0 || startIndex >= originalArray.length) {
    //   setPaginationData ([]);
    // }
  
    //  setPaginationData(originalArray.slice(startIndex, endIndex));
    setCurrentPage(arg)
  };
  // useEffect(() => {
  //   // Initialize paginationData with the content of the first page (assuming you want the first 5 items)
  //   if (documentaryList.length >= 5) {
  //     setPaginationData(documentaryList.slice(0, 5));
  //   }
  // }, [documentaryList]);
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DocumentaryDetail', item)}>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
          }}
          style={styles.backdropImage}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.language}>Language: {item.original_language}</Text>
        <Text style={styles.overview}>{item.overview}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, margin: 15 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Header title={'Discover Documentaries'} onClickLeftIcon={() => navigation.toggleDrawer()} />
      </View>

      <FlatList
        data={MoviesList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />

      <View style={styles.pagination}>
        {Array.from({ length: totalPages}, (_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.pageButton}
            onPress={() =>
             handlePageChange(index+1)
             }>
            <Text>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: 'black',
    padding: 0,
    borderRadius: 10,
  },
  backdropImage: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  language: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  overview: {
    fontSize: 14,
    margin: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  pageButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
  },
});

export default ExploreMovies;
