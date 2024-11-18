// screens/ReportManagement.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

const ReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Mock data to simulate reports (replace with API call in production)
    const mockReports = [
      { reportID: 1, type: 'Incident', created_at: '2024-11-10' },
      { reportID: 2, type: 'Maintenance', created_at: '2024-11-12' },
      { reportID: 3, type: 'Incident', created_at: '2024-11-14' },
    ];
    setReports(mockReports);
    setFilteredReports(mockReports);
  }, []);

  const applyFilter = () => {
    const filtered = reports.filter((report) =>
      report.type.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredReports(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Report Management</Text>
      <Card containerStyle={styles.filterCard}>
        <View style={styles.filterContainer}>
          <TextInput
            style={styles.input}
            placeholder="Filter by type"
            value={filter}
            onChangeText={setFilter}
          />
          <TouchableOpacity style={styles.filterButton} onPress={applyFilter}>
            <Text style={styles.filterButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Card>
      <FlatList
        data={filteredReports}
        keyExtractor={(item) => item.reportID.toString()}
        renderItem={({ item }) => (
          <Card containerStyle={styles.reportCard}>
            <View style={styles.reportItem}>
              <Icon name="file-alt" type="font-awesome-5" color="#007bff" size={20} />
              <View style={styles.reportDetails}>
                <Text style={styles.reportType}>Type: {item.type}</Text>
                <Text style={styles.reportDate}>Created At: {item.created_at}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#343a40',
  },
  filterCard: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f8f9fa',
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  filterButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  reportCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportDetails: {
    marginLeft: 15,
  },
  reportType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
  },
  reportDate: {
    fontSize: 16,
    color: '#6c757d',
  },
});

export default ReportManagement;
