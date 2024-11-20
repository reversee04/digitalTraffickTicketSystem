import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // Import this
import AppRouter from './Router'; // Ensure Router.js is correctly configured

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <AppRouter />
      </View>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center', // Aligns content in the center of the screen
  },
});
