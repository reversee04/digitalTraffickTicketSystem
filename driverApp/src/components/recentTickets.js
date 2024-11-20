// components/RecentTickets.js
import React from 'react';
import { View, Text } from 'react-native';
import TicketCard from './ticketCard';
import colors from '../styles/colors';

const RecentTickets = () => {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.darkBlue, marginBottom: 10 }}>
        Recent Tickets
      </Text>
      <TicketCard icon="car" iconColor={colors.orange} title="Speeding" amount="150" status="Paid" />
      <TicketCard icon="parking" iconColor={colors.purple} title="Illegal Parking" amount="75" status="Unpaid" />
      <TicketCard icon="traffic-light" iconColor={colors.mediumBlue} title="Red Light Violation" amount="200" status="Paid" />
      <TicketCard icon="car-crash" iconColor={colors.primary} title="Reckless Driving" amount="300" status="Unpaid" />
    </View>
  );
};

export default RecentTickets;
