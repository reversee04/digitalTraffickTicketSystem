import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../assets/colors';

export default function CircularCard({ icon, driverName, violation, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} size={24} color="white" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{driverName}</Text>
        <Text style={styles.subtitleText}>{violation}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.mediumBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    color: colors.darkText,
    fontSize: 16,
  },
  subtitleText: {
    color: 'darkgray',
    fontSize: 12,
  },
});
