import {StyleSheet, Text, View} from 'react-native';
import React,{useEffect} from 'react';

const Utelly = () => {
  const url =
    'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=bojack&country=uk';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
      'X-RapidAPI-Host':
        'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
    },
  };
  const fetchData = async () => {
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Text>Utelly</Text>
    </View>
  );
};

export default Utelly;

const styles = StyleSheet.create({});
