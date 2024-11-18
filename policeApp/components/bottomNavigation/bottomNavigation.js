import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import AppText from '../appText/appText';
import colors from '../../assets/colors';
import MyStack from '../officerComponents/navigating';

function BottomNavigationBar({ onHomePress, onHistoryPress, onAccountPress, activeTab, }) {
  const navigation = useNavigation();

  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity 
        onPress={
          () => navigation.navigate('PoliceHome')
          } 
        style={[styles.tab, activeTab === 'home' && styles.activeTab]}>
        <Icon name="home" size={24} color={activeTab === 'home' ? colors.mediumBlue : 'white'} />
        <AppText styleProp={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>Home</AppText>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={
          () => navigation.navigate('HistoryPage')
        } 
        style={[styles.tab, activeTab === 'history' && styles.activeTab]}>
        <Icon name="time" size={24} color={activeTab === 'history' ? colors.mediumBlue : 'white'} />
        <AppText styleProp={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>History</AppText>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={
          () => navigation.navigate('ProfilePage')
        } 
        style={[styles.tab, activeTab === 'account' && styles.activeTab]}>
        <Icon name="person" size={24} color={activeTab === 'account' ? colors.mediumBlue : 'white'} />
        <AppText styleProp={[styles.tabText, activeTab === 'account' && styles.activeTabText]}>Account</AppText>
      </TouchableOpacity>
    </View>
  );
}

export default BottomNavigationBar;

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.darkBlue, // Use the dark blue from your palette
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10, // For Android shadow
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: colors.mediumBlue,
  },
  tabText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  activeTabText: {
    color: colors.mediumBlue,
  },
});
