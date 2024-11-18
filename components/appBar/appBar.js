import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../assets/colors';

function AppBar({ onMenuPress, onNotificationPress }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={onMenuPress}>
          <Icon name="menu" size={25} color="white" />
        </TouchableOpacity>

        <Text style={styles.title}>DTTS</Text>

        <TouchableOpacity onPress={onNotificationPress}>
          <Icon name="notifications" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default AppBar;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Add padding on Android for the status bar
  },
  appBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
