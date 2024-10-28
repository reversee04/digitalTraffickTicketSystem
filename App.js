import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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

const Stack = createNativeStackNavigator();

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* AppBar Component */}
        <AppBar 
          onMenuPress={() => console.log("Menu pressed")} 
          onNotificationPress={() => console.log("Notification pressed")} 
        />

        {/* Stack Navigator for Screens */}
        <Stack.Navigator initialRouteName="PoliceHome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="PoliceHome" component={IndexPoliceScreen} />
          <Stack.Screen name="HistoryPage" component={PoliceHistoryScreen} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
          <Stack.Screen name="ToID" component={ChooseMethod} />
          <Stack.Screen name="HistoryDetails" component={DetailsScreen} />
          <Stack.Screen name="HistoryFilter" component={FilterScreen} />
          <Stack.Screen name="OffenderReview" component={OffenderReview} />
          <Stack.Screen name="AddOffence" component={AddOffences} />
        </Stack.Navigator>

        {/* BottomNavigationBar Component */}
        <BottomNavigationBar
          activeTab={activeTab}
          onHomePress={() => {
            setActiveTab('home');
            navigation.navigate('PoliceHome');
          }}
          onHistoryPress={() => {
            setActiveTab('history');
            navigation.navigate('HistoryPage');
          }}
          onAccountPress={() => {
            setActiveTab('account');
            navigation.navigate('ProfilePage');
          }}
        />
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
