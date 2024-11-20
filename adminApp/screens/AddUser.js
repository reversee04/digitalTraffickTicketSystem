// screens/AddUser.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddUser = ({ navigation }) => {
  const [BadgeID, setBadgeID] = useState('');
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Role, setRole] = useState('');

  const addUser = () => {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ BadgeID, Username, Email, Role }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        navigation.goBack();
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add New User</Text>
      <TextInput
        placeholder="BadgeID"
        value={BadgeID}
        onChangeText={setBadgeID}
        style={styles.input}
      />
      <TextInput
        placeholder="Username"
        value={Username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={Email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Role"
        value={Role}
        onChangeText={setRole}
        style={styles.input}
      />
      <Button title="Add User" onPress={addUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
  },
});

export default AddUser;