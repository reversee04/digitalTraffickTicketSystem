import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
  const [badgeNumber, setBadgeNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to manage loading indicator

  const handleLogin = async () => {
    const trimmedBadgeNumber = badgeNumber.trim();
    const trimmedPassword = password.trim();
  
    if (!trimmedBadgeNumber || !trimmedPassword) {
      return Alert.alert('Error', 'Both fields are required.');
    }
  
    setIsLoading(true); // Start loading indicator
    try {
      const response = await fetch('http://192.168.120.227:3000/api/officers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ badgeNumber: trimmedBadgeNumber, password: trimmedPassword }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error('Login error:', data); // Log error for debugging
        throw new Error(data.message || 'Invalid badge number or password');
      }
  
      Alert.alert('Login Successful', `Welcome back, ${data.officer.name}!`);
      navigation.navigate('PoliceHome', { officer: data.officer });
    } catch (error) {
      console.error('Error during login:', error.message); // Log error for debugging
      Alert.alert('Login Failed', error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/img.jpg')} style={styles.logo} />
      <View style={styles.header}>
        <Icon name="user" size={30} color="#000" />
        <Text style={styles.title}>Login</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Badge Number"
        value={badgeNumber}
        onChangeText={setBadgeNumber}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Don't have an account? Register here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 16,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  link: {
    color: 'blue',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
