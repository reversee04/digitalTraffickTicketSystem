import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box'; // Use this import
import colors from '../../assets/colors';

function OffenceButton({ offence, isSelected, onSelect }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardContent} onPress={onSelect}>
        <View style={styles.checkbox}>
          <CheckBox 
            isChecked={isSelected}  // Use isChecked instead of value
            onClick={onSelect}       // onClick is the event handler
            checkBoxColor={colors.mediumBlue} // You can customize the checkbox color
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.description}>{offence.description}</Text>
          <Text style={styles.fineAmount}>Fine: ${offence.fineAmount}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fineAmount: {
    fontSize: 14,
    color: colors.mediumBlue,
  },
});

export default OffenceButton;
