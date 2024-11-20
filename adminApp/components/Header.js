import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const Header = () => {
  return (
    <View style={styles.header}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
      />
      <MaterialIcons name="notifications" size={24} color="black" />
      <FontAwesome name="user-circle" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchBar: {
    flex: 1,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default Header;