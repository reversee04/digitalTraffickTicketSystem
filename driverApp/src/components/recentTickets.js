import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TicketCard from './ticketCard';
import colors from '../styles/colors';

const RecentTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [driverId, setDriverId] = useState(null);

  useEffect(() => {
    // Fetch the driverId from AsyncStorage
    const getDriverId = async () => {
      try {
        const id = await AsyncStorage.getItem('driverId');
        if (id !== null) {
          setDriverId(id); // It's already a string
        } else {
          console.error('No driverId found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching driverId from AsyncStorage:', error);
      }
    };

    getDriverId();
  }, []);

  useEffect(() => {
    if (driverId) {
      const fetchTickets = async () => {
        try {
          const response = await fetch(`http://192.168.120.227:3000/api/driverTickets/${driverId}`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch tickets');
          }

          setTickets(data);
        } catch (error) {
          console.error('Error fetching tickets:', error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchTickets();
    }
  }, [driverId]); // Fetch tickets whenever driverId changes

  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Tickets</Text>
      {tickets.length === 0 ? (
        <Text>No tickets found.</Text>
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TicketCard
              icon="ticket"
              iconColor={item.paymentStatus === 'Paid' ? colors.green : colors.red}
              title={item.violation.name}
              amount={item.payment.amount}
              status={item.paymentStatus}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.darkBlue,
  },
});

export default RecentTickets;
