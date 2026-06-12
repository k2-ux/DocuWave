import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import LoginNavigator from './src/Navigators/LoginNavigator';
import createTables from './src/components/createTables';
import {Provider} from 'react-redux';
import {store} from './src/Redux/Store/store';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  useEffect(() => {
    createTables();
  }, []);

  return (
    <Provider store={store}>
      <LoginNavigator />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
