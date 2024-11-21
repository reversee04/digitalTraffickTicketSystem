import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReviewPage = ({ route }) => {
  const { selectedOffences, ocrResult } = route.params; // Access data passed from OCRScreen

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Review Your Ticket</Text>
      <Text style={styles.subHeader}>Selected Violations:</Text>
      {selectedOffences.map((offenceId, index) => (
        <Text key={index}>{offenceId}</Text>
      ))}
      <Text style={styles.subHeader}>OCR Result:</Text>
      <Text>{ocrResult}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ReviewPage;
