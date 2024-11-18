import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import IndexDriver from '../screens/dashboard';
import DetailedTicket from '../screens/ticketDetails';
import Notifications from '../screens/notifications';
import DriverProfile from '../screens/profile';
import EditDriverProfile from '../screens/profileEdit';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={IndexDriver} />
    <Stack.Screen name="TicketDetails" component={DetailedTicket} />
    <Stack.Screen name="Notifications" component={Notifications} />
  </Stack.Navigator>
);

// Updated DriverProfiler to properly render DriverProfile and EditDriverProfile
const DriverProfiler = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfilePage" component={DriverProfile} />
    <Stack.Screen name="ProfileEdit" component={EditDriverProfile} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Drawer.Navigator screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="Home" component={DashboardStack} />
    <Drawer.Screen name="Profile" component={DriverProfiler} />
  </Drawer.Navigator>
);

export default AppNavigator;
