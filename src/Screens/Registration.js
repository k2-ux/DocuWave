import React, {useState} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
// import PoetsenOne-Regular from '../../assets/font'
import auth from '@react-native-firebase/auth';

const {height, width} = Dimensions.get('screen');
export default function Registration({navigation}) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const handleRegistration = async () => {
    try {
      if (email.length>0 && password.length>0){
      const isUserCreated = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log('Oiiiiiiiiiiii', isUserCreated);
      navigation.navigate('Login')}
      else {
        Alert.alert('please enter some data')
      }
    } catch (error) {
      console.log(error);
      Alert.alert('enter valid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>Registration</Text>
      <TextInput
        onChangeText={text => setemail(text)}
        placeholder="Email"
        style={styles.input}
        value={email}
      />
      <TextInput
        placeholder="Password"
        onChangeText={text => setpassword(text)}
        secureTextEntry
        style={styles.input}
        value={password}
      />

      <View style={styles.button}>
        <TouchableOpacity onPress={() => handleRegistration()}>
          <Text style={{color: 'white', fontSize: 18}}>Submit</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signUp}>Already a user? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9E995',
  },
  button: {
    width: width * 0.45,
    height: height * 0.05,
    backgroundColor: '#7861AA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'PoetsenOne-Regular',
    color: '#7861AA',
  },
  input: {
    width: width * 0.9,
    height: height * 0.05,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  forgotPassword: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  signUp: {
    color: '#7861AA',
    // textDecorationLine: 'underline',
  },
});
