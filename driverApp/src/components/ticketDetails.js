// components/TicketDetails.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TicketDetails = ({ amount, status }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Speeding</Text>
    <Text style={styles.amount}>Amount: {amount}</Text>
    <Text style={styles.status}>Status: {status}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 20,
    color: '#041941',
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
    color: '#7295CA',
    marginVertical: 5,
  },
  status: {
    fontSize: 16,
    color: '#FACAA1',
  },
});

export default TicketDetails;
