import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import CircularCard from '../../components/officerComponents/circularCard';
import colors from '../../assets/colors';
import AppText from '../../components/appText/appText';

function PoliceHistoryScreen({ navigation, route }) {
  return (
    <View style={styles.indexContainer}>

      {/* Header with Tickets History Title and Filter Icon */}
      <View style={styles.header}>
        <AppText styleProp={styles.ticketHistoryHeading}>Tickets History</AppText>
        <TouchableOpacity onPress={() => navigation.navigate('HistoryFilter')}>
          <MaterialIcons name="filter-list" size={24} color={colors.darkBlue} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      {/* Ticket History Items */}
      <CircularCard 
        IconComponent={MaterialCommunityIcons}
        icon="local-drink"    
        id="BN 0987"
        name="Drink and Drive"
        onPress={() => navigation.navigate('HistoryDetails')}
      />
      <CircularCard 
        IconComponent={MaterialCommunityIcons}
        icon="local-drink"    
        id="BN 0987"
        name="Drink and Drive"
        onPress={() => navigation.navigate('HistoryDetails')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  indexContainer: {
    height: '100%',
    width: '100%',
    padding: 20,
    paddingTop: 50,
    backgroundColor: colors.lightGray,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align title to the left and icon to the right
    marginBottom: 20,
  },
  ticketHistoryHeading: {
    fontWeight: '600',
    fontSize: 20,
    color: colors.darkBlue,
  },
  filterIcon: {
    marginLeft: 10, // Spacing between title and icon
  },
});

export default PoliceHistoryScreen;
