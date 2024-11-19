import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import Sidebar from './components/Sidebar'; 

// The Police Officer Screens 
import IndexPoliceScreen from './screens/office_screens/home';
import PoliceHistoryScreen from './screens/office_screens/history';
import ProfilePage from './screens/office_screens/profile';
import ChooseMethod from './screens/office_screens/chooseMethod';
import DetailsScreen from './screens/office_screens/historyDetails';
import FilterScreen from './screens/office_screens/filterHistory';
import OffenderReview from './screens/office_screens/offenderReview';
import AddOffences from './screens/office_screens/addOffences';

// The Admin Dashboard Components
import AppRouter from './Router'; 

const Drawer = createDrawerNavigator(); 

export default function App() {
  const [isAdmin, setIsAdmin] = useState(true); // Assuming a state to determine if the user is an admin

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
        {isAdmin ? (
          <>
            <Drawer.Screen name="AdminDashboard" component={AppRouter} />
          </>
        ) : (
          <>
            <Drawer.Screen name="PoliceHome" component={IndexPoliceScreen} />
            <Drawer.Screen name="HistoryPage" component={PoliceHistoryScreen} />
            <Drawer.Screen name="ProfilePage" component={ProfilePage} />
            <Drawer.Screen name="ToID" component={ChooseMethod} />
            <Drawer.Screen name="HistoryDetails" component={DetailsScreen} />
            <Drawer.Screen name="HistoryFilter" component={FilterScreen} />
            <Drawer.Screen name="OffenderReview" component={OffenderReview} />
            <Drawer.Screen name="AddOffence" component={AddOffences} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
