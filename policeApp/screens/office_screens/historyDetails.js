import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AppText = ({ children, style }) => <Text style={style}>{children}</Text>;

const DetailsScreen = ({ route, navigation }) => {
  const { ticketId } = route.params; // Retrieve ticketId passed from the previous screen
  const [ticketDetails, setTicketDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.238.227:3000/api/tickets/${ticketId}`);
        setTicketDetails(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          Alert.alert('Ticket Not Found', `Ticket with ID ${ticketId} not found.`);
        } else {
          Alert.alert('Error', 'Could not fetch ticket details');
        }
        console.error('Error fetching ticket details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      fetchTicketDetails();
    } else {
      Alert.alert('Invalid Ticket ID', 'No ticket ID provided');
      setLoading(false);
    }
  }, [ticketId]);

  if (loading) {
    return <AppText style={styles.loadingText}>Loading...</AppText>;
  }

  if (!ticketDetails) {
    return <AppText style={styles.loadingText}>Ticket not found</AppText>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Ticket Header */}
      <AppText style={styles.ticketHeader}>Ticket No: {ticketDetails?.id}</AppText>

      {/* Offender & Vehicle Details */}
      <DetailsSection
        title="Offender & Vehicle Details"
        icon="user"
        details={[
          { label: 'Name', value: ticketDetails?.driver?.name || 'N/A' },
          { label: 'ID/Phone', value: `${ticketDetails?.driver?.id || 'N/A'} | ${ticketDetails?.driver?.phone || 'N/A'}` },
          { label: 'Email', value: ticketDetails?.driver?.email || 'N/A' },
          { label: 'Violations', value: ticketDetails?.violation?.description || 'No Violations Recorded' },
          { label: 'Vehicle', value: `${ticketDetails?.driver?.vehicle || 'N/A'}` },
        ]}
      />

      {/* Payment & Status */}
      <DetailsSection
        title="Payment & Status"
        icon="credit-card"
        details={[
          { label: 'Fine Amount', value: ticketDetails?.payment?.amount || 'N/A' },
          { label: 'Status', value: ticketDetails?.status || 'N/A' },
        ]}
      />

      {/* Officer Details */}
      <DetailsSection
        title="Officer Details"
        icon="shield"
        details={[
          { label: 'Name', value: ticketDetails?.officer?.name || 'N/A' },
          { label: 'Contact', value: ticketDetails?.officer?.contact || 'N/A' },
        ]}
      />
    </ScrollView>
  );
};

const DetailsSection = ({ title, icon, details }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <FontAwesome name={icon} size={24} style={styles.icon} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {details.map((detail, index) => (
      <DetailsRow key={index} label={detail.label} value={detail.value} />
    ))}
  </View>
);

const DetailsRow = ({ label, value }) => (
  <View style={styles.row}>
    <AppText style={styles.label}>{label}</AppText>
    <AppText style={styles.value}>{value}</AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7fafc',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888',
  },
  ticketHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    color: '#3182ce',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
    color: '#666',
  },
  backIcon: {
    marginBottom: 12,
    color: '#3182ce',
  },
});

export default DetailsScreen;
