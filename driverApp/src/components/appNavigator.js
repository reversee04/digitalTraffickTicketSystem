import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import IndexDriver from '../screens/dashboard';
import DetailedTicket from '../screens/ticketDetails';
import Notifications from '../screens/notifications';
import DriverProfile from '../screens/profile';
import EditDriverProfile from '../screens/profileEdit';
import PayTicket from '../screens/payTicket';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator for Dashboard
const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={IndexDriver} />
    <Stack.Screen name="TicketDetails" component={DetailedTicket} />
    <Stack.Screen name="Notifications" component={Notifications} />
    <Stack.Screen name="PayTicket" component={PayTicket} />
  </Stack.Navigator>
);

// Stack Navigator for Profile
const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfilePage" component={DriverProfile} />
    <Stack.Screen name="EditProfile" component={EditDriverProfile} />
  </Stack.Navigator>
);

// Drawer Navigator for Main Application
const MainApp = () => (
  <Drawer.Navigator screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="Home" component={DashboardStack} />
    <Drawer.Screen name="Profile" component={ProfileStack} />
  </Drawer.Navigator>
);

// Root Navigator with Login and MainApp
const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Main" component={MainApp} />
  </Stack.Navigator>
);

export default AppNavigator;
