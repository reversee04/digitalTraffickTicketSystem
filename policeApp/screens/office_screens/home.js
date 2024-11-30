import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

import PoliceAppCard from '../../components/officerComponents/card';
import CircularCard from '../../components/officerComponents/circularCard';
import colors from '../../assets/colors';
import AppText from '../../components/appText/appText';

function IndexPoliceScreen({ navigation }) {
  const [ticketHistories, setTicketHistories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicketHistories = async () => {
      try {
        const response = await axios.get('http://192.168.120.227:3000/api/tickets');
        const fetchedData = response.data;

        console.log('Fetched Ticket Histories:', fetchedData);

        // Check if data is already in the state, preventing duplication
        if (Array.isArray(fetchedData)) {
          // Process data to only add unique tickets
          const processedData = fetchedData.map((item, index) => ({
            id: item.id || `temp-id-${index}`,
            driverName: item.driver?.name || 'Unknown Driver',
            violation: item.violation?.description || 'Unknown Violation',
          }));

          // Set the processed data only if it's new
          setTicketHistories((prevData) => {
            // Only add unique ticket data (if not already in state)
            const newData = processedData.filter((newItem) =>
              !prevData.some((existingItem) => existingItem.id === newItem.id)
            );
            return [...prevData, ...newData].slice(0, 6); // Only show the latest 6 tickets
          });
        } else {
          console.error('Unexpected response format:', fetchedData);
        }
      } catch (error) {
        console.error('Error fetching ticket histories:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketHistories();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const renderTicket = ({ item }) => (
    <CircularCard
      icon="alert-circle"
      id={item.id}
      driverName={item.driverName}
      violation={item.violation}
      onPress={() => navigation.navigate('HistoryDetails', { ticketId :item.id })}
    />
  );

  return (
    <View style={styles.indexContainer}>
      <PoliceAppCard
        title="Issue Tickets Here"
        subtitle="Create Ticket"
        icon="receipt"
        onPress={() => navigation.navigate('AddOffence')}
      />

      <AppText styleProp={styles.ticketHistoryHeading}>Tickets History</AppText>

      {loading ? (
        <AppText>Loading...</AppText>
      ) : (
        <FlatList
          data={ticketHistories}
          keyExtractor={(item) => item.id.toString()} // Use the id for key
          renderItem={renderTicket}
        />
      )}
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
  },
});

export default IndexPoliceScreen;
