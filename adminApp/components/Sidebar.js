import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MaterialIcons, AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';

const Sidebar = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <DrawerItem
          label="Dashboard"
          icon={() => <MaterialIcons name="home" size={24} color="black" />}
          onPress={() => props.navigation.navigate('Dashboard')}
        />
        <DrawerItem
          label="User Management"
          icon={() => <AntDesign name="user" size={24} color="black" />}
          onPress={() => props.navigation.navigate('UserManagement')}
        />
        <DrawerItem
          label="Reports"
          icon={() => <FontAwesome5 name="chart-bar" size={24} color="black" />}
          onPress={() => props.navigation.navigate('Reports')}
        />
        <DrawerItem
          label="Announcements"
          icon={() => <MaterialIcons name="announcement" size={24} color="black" />}
          onPress={() => props.navigation.navigate('Announcements')}
        />
        <DrawerItem
          label="Road Rules"
          icon={() => <FontAwesome5 name="road" size={24} color="black" />}
          onPress={() => props.navigation.navigate('RoadRules')}
        />
       
        <DrawerItem
          label="Logout"
          icon={() => <AntDesign name="logout" size={24} color="black" />}
          onPress={() => console.log('Logout')}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
});

export default Sidebar;