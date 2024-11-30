import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import CircularCard from '../../components/officerComponents/circularCard';
import colors from '../../assets/colors';
import AppText from '../../components/appText/appText';

function PoliceHistoryScreen({ navigation }) {
  const [ticketHistories, setTicketHistories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicketHistories = async () => {
      try {
        const response = await axios.get('http://192.168.118.227:3000/api/tickets');
        const fetchedData = response.data;

        console.log('Fetched Ticket Histories:', fetchedData);

        if (Array.isArray(fetchedData)) {
          const processedData = fetchedData.map((item, index) => ({
            id: item.id || `temp-id-${index}`,
            driverName: item.driver?.name || 'Unknown Driver',
            violation: item.violation?.description || 'Unknown Violation',
          }));

          setTicketHistories((prevData) => {
            const newData = processedData.filter((newItem) =>
              !prevData.some((existingItem) => existingItem.id === newItem.id)
            );
            return [...prevData, ...newData];
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
  }, []);

  const renderTicket = ({ item }) => (
    <CircularCard
      icon="alert-circle"
      id={item.id}
      driverName={item.driverName}
      violation={item.violation}
      onPress={() => navigation.navigate('HistoryDetails', { ticketId: item.id })}
    />
  );

  return (
    <View style={styles.indexContainer}>
      <View style={styles.header}>
        <AppText styleProp={styles.ticketHistoryHeading}>Tickets History</AppText>
        <TouchableOpacity onPress={() => navigation.navigate('HistoryFilter')}>
          <MaterialIcons name="filter-list" size={24} color={colors.darkBlue} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <AppText>Loading...</AppText>
      ) : (
        <FlatList
          data={ticketHistories}
          keyExtractor={(item) => item.id ? item.id.toString() : item.id}
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
    paddingTop: 50,
    backgroundColor: colors.lightGray,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ticketHistoryHeading: {
    fontWeight: '600',
    fontSize: 20,
    color: colors.darkBlue,
  },
  filterIcon: {
    marginLeft: 10,
  },
});

export default PoliceHistoryScreen;
