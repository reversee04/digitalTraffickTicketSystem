// screens/RoadRulesManagement.js
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

const RoadRulesManagement = () => {
  const [roadRules, setRoadRules] = useState([]);
  const [description, setDescription] = useState('');
  const [penalty, setPenalty] = useState('');

  useEffect(() => {
    // Mock data (Replace with API call)
    const mockRoadRules = [
      { ruleID: 1, description: 'No speeding', penalty: 'Fine K100' },
      { ruleID: 2, description: 'No parking', penalty: 'Fine K50' },
    ];
    setRoadRules(mockRoadRules);
  }, []);

  const addRoadRule = () => {
    const newRule = {
      ruleID: roadRules.length + 1,
      description,
      penalty,
    };
    setRoadRules([newRule, ...roadRules]);
    setDescription('');
    setPenalty('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Road Rules Management</Text>
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Add New Road Rule</Text>
        <TextInput
          style={styles.input}
          placeholder="Rule Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Penalty (e.g., Fine K100)"
          value={penalty}
          onChangeText={setPenalty}
        />
        <Button
          title="Add Rule"
          onPress={addRoadRule}
          buttonStyle={styles.addButton}
        />
      </Card>
      <FlatList
        data={roadRules}
        keyExtractor={(item) => item.ruleID.toString()}
        renderItem={({ item }) => (
          <Card containerStyle={styles.ruleCard}>
            <View style={styles.ruleHeader}>
              <Icon
                name="gavel"
                type="font-awesome-5"
                color="#007bff"
                size={20}
              />
              <Text style={styles.ruleDescription}>{item.description}</Text>
            </View>
            <Text style={styles.rulePenalty}>{item.penalty}</Text>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#343a40',
    marginBottom: 20,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f8f9fa',
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
  },
  ruleCard: {
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
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ruleDescription: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
  },
  rulePenalty: {
    fontSize: 16,
    color: '#6c757d',
  },
});

export default RoadRulesManagement;