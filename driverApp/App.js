// App.js
import React from 'react';
import  AppNavigator from './src/components/appNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      < AppNavigator/>
    </NavigationContainer>
  );
}
