// screens/UserManagement.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  const deleteUser = (id) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            fetch(`http://localhost:3000/users/${id}`, {
              method: 'DELETE',
            })
              .then(() => {
                setUsers(users.filter((user) => user.BadgeID !== id));
              })
              .catch((error) => console.error(error));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Management</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.BadgeID.toString()}
        renderItem={({ item }) => (
          <Card containerStyle={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.userInfo}>
                <Icon
                  name="user-circle"
                  type="font-awesome"
                  color="#007bff"
                  size={30}
                  style={styles.userIcon}
                />
                <Text style={styles.username}>{item.Username}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteUser(item.BadgeID)}
              >
                <Icon name="trash" type="font-awesome" color="#fff" size={18} />
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />
      <Button
        title="Add New User"
        buttonStyle={styles.addButton}
        onPress={() => {
          /* Navigate to Add User Screen */
        }}
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
  },
  card: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: '#ffffff',
    marginVertical: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: '500',
    color: '#495057',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 15,
  },
});

export default UserManagement;
