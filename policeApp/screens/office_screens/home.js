import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import PoliceAppCard from '../../components/officerComponents/card';
import CircularCard from '../../components/officerComponents/circularCard';
import colors from '../../assets/colors';
import AppText from '../../components/appText/appText';

function IndexPoliceScreen({navigation, route}) {
  return (
    <View style={styles.indexContainer}>
      <PoliceAppCard
        title="Issue Tickets Here"
        subtitle="Create Ticket"
        icon={"receipt"}
        onPress={() => navigation.navigate('ToID')}
      />

      <AppText styleProp={styles.ticketHistoryHeading}>Tickets History</AppText>
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
        paddingTop: 100,
        backgroundColor: colors.lightGray,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    ticketHistoryHeading: {
        marginTop: 30,
        fontWeight: '600',
        color: colors.darkBlue,
    }
})

export default IndexPoliceScreen;
