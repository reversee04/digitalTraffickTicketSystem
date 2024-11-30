import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/components/appNavigator';

const App = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

export default App;
