import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Icon } from 'react-native-elements';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Icon name="users" type="font-awesome-5" color="#007bff" size={40} />
        <Text style={styles.title}>Total Users</Text>
        <Text style={styles.metric}>1,000</Text>
      </Card>
      <Card containerStyle={styles.card}>
        <Icon name="file-alt" type="font-awesome-5" color="#28a745" size={40} />
        <Text style={styles.title}>Reports Generated</Text>
        <Text style={styles.metric}>200</Text>
      </Card>
      <Card containerStyle={styles.card}>
        <Icon name="bullhorn" type="font-awesome-5" color="#ffc107" size={40} />
        <Text style={styles.title}>Announcements Made</Text>
        <Text style={styles.metric}>50</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f8f9fa',
  },
  card: {
    width: '45%',
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
    marginTop: 10,
    marginBottom: 5,
  },
  metric: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
  },
});

export default Dashboard;