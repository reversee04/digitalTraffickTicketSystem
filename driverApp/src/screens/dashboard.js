// screens/dashboard/IndexDriver.js
import React from 'react';
import { SafeAreaView, View, Text, ScrollView, Platform, StyleSheet, StatusBar } from 'react-native';

import DashboardHeader from '../components/dashboardHeader';
import ActionButton from '../components/actionButton';
import StatItem from '../components/stat';
import RecentTickets from '../components/recentTickets';
import colors from '../styles/colors';
import { useNavigation } from '@react-navigation/native';

const IndexDriver = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: colors.lightGray }, styles.safe]}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={{ backgroundColor: colors.darkBlue, borderRadius: 20, padding: 20 }}>
          <DashboardHeader />
          <Text style={{ color: colors.white, fontSize: 24, fontWeight: 'bold' }}>Traffic Tickets</Text>
          <Text style={{ color: colors.white, fontSize: 12 }}>Total: 15</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <StatItem label="Paid" value="10" />
            <StatItem label="UnPaid" value="5" />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
            <ActionButton icon="plus" label="Pay Ticket" onPress={() => {navigation.navigate('TicketDetails')}} />
            <ActionButton icon="refresh" label="Refresh" onPress={() => {}} />
          </View>
        </View>
        <RecentTickets />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default IndexDriver;