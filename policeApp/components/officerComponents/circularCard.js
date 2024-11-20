import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; // Adjust to the icon library you need
import colors from '../../assets/colors'; // Assuming you're using a color palette

export default function CircularCard({ icon, id, name, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} size={24} color="white" /> 
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.idText}>{id}</Text>
        <Text style={styles.nameText}>{name}</Text>
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
  idText: {
    color: colors.darkText,
    fontSize: 14,
    fontWeight: 'bold',
  },
  nameText: {
    color: colors.darkText,
    fontSize: 16,
  },
});
