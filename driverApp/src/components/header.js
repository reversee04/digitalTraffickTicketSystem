// components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Header = ({ title, onBackPress }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => onBackPress && onBackPress()}>
      <Icon name="arrow-left" size={20} color="#fff" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#041941',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Header;
