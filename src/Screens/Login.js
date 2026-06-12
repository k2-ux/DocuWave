import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {theme} from '../components/theme';

const {width} = Dimensions.get('window');

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.dispatch(StackActions.replace('Home'));
    } catch (error) {
      Alert.alert('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor={theme.bg} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.appName}>DocuWave</Text>
        <Text style={styles.tagline}>Your documentary companion</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor={theme.textDim}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={theme.textDim}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={[styles.button, loading && {opacity: 0.6}]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}>
            <Text style={styles.buttonText}>
              {loading ? 'Signing in…' : 'Sign In'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Registration')}
          style={styles.linkContainer}>
          <Text style={styles.link}>
            Don't have an account?{' '}
            <Text style={styles.linkAccent}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.07,
    paddingVertical: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 36,
    color: theme.primary,
    fontFamily: 'PoetsenOne-Regular',
    letterSpacing: 1.5,
  },
  tagline: {
    fontSize: 13,
    color: theme.textMuted,
    marginBottom: 44,
    marginTop: 6,
    letterSpacing: 0.8,
  },
  form: {
    width: '100%',
    marginBottom: 28,
  },
  label: {
    color: theme.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: theme.text,
    fontSize: 15,
  },
  button: {
    width: '100%',
    height: 54,
    backgroundColor: theme.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  linkContainer: {
    paddingVertical: 8,
  },
  link: {
    color: theme.textMuted,
    fontSize: 14,
  },
  linkAccent: {
    color: theme.primary,
    fontWeight: '700',
  },
});
