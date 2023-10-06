import {StyleSheet, Text, View} from 'react-native';
import React,{useEffect} from 'react';
import axios from 'axios';
const Utelly = () => {
    const TMDB_API_KEY = '7af9e3c62ef8764a03d10775e4901bbc'; // Replace with your actual API key

    const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    
    // Example function to fetch popular movies
     const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
        );
        console.log(response.data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
      }
    };
    useEffect(() => {
      fetchPopularMovies()
    
      
      
    }, [])
    

  return (
    <View>
      <Text>Utelly</Text>
    </View>
  );
};

export default Utelly;

const styles = StyleSheet.create({});
