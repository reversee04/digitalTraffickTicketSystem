import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sidebar from './components/Sidebar';
import Dashboard from './screens/Dashboard';
import UserManagement from './screens/UserManagement';
import AddUser from './screens/AddUser';
import Reports from './screens/Reports';
import Announcements from './screens/Announcements';
import RoadRules from './screens/RoadRules';

const Drawer = createDrawerNavigator();

const AppRouter = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard" drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="UserManagement" component={UserManagement} />
      <Drawer.Screen name="AddUser" component={AddUser} />
      <Drawer.Screen name="Reports" component={Reports} />
      <Drawer.Screen name="Announcements" component={Announcements} />
      <Drawer.Screen name="RoadRules" component={RoadRules} />
    </Drawer.Navigator>
  );
};

export default AppRouter;
