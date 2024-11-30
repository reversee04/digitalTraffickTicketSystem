import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import IndexPoliceScreen from './screens/office_screens/home';
import AppBar from './components/appBar/appBar';
import BottomNavigationBar from './components/bottomNavigation/bottomNavigation';
import PoliceHistoryScreen from './screens/office_screens/history';
import ProfilePage from './screens/office_screens/profile';
import ChooseMethod from './screens/office_screens/chooseMethod';
import DetailsScreen from './screens/office_screens/historyDetails';
import FilterScreen from './screens/office_screens/filterHistory';
import OffenderReview from './screens/office_screens/offenderReview';
import AddOffences from './screens/office_screens/addOffences';
import OCRScreen from './screens/office_screens/Lscan';
import ReviewPage from './screens/office_screens/offenderReview';
import DetectObject from './screens/office_screens/Lscan';
import LoginScreen from './screens/office_screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for session on app load
  useEffect(() => {
    const checkSession = async () => {
      const sessionId = await AsyncStorage.getItem('sessionId'); // Assuming session ID is saved
      if (sessionId) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        
        <AppBar 
          onMenuPress={() => console.log("Menu pressed")} 
          onNotificationPress={() => console.log("Notification pressed")} 
        />

        <Stack.Navigator initialRouteName={isLoggedIn ? 'PoliceHome' : 'Login'} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="PoliceHome" component={IndexPoliceScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HistoryPage" component={PoliceHistoryScreen} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
          <Stack.Screen name="ToID" component={ChooseMethod} />
          <Stack.Screen name="HistoryDetails" component={DetailsScreen} />
          <Stack.Screen name="HistoryFilter" component={FilterScreen} />
          <Stack.Screen name="ReviewPage" component={ReviewPage} />
          <Stack.Screen name="AddOffence" component={AddOffences} />
          <Stack.Screen name="OCR" component={OCRScreen} />
        </Stack.Navigator>

        
        {isLoggedIn && (
          <BottomNavigationBar
            activeTab={activeTab}
            onHomePress={() => {
              setActiveTab('home');
            }}
            onHistoryPress={() => {
              setActiveTab('history');
            }}
            onAccountPress={() => {
              setActiveTab('account');
            }}
          />
        )}
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, // Allows IndexPoliceScreen to take up available space above the BottomNavigationBar
    paddingBottom: 2, // Prevents overlap with BottomNavigationBar
  },
});
