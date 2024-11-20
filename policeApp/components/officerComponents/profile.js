import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';

import CircularCard from './circularCard';
import AppText from '../appText/appText';


const UserProfileCard = ({ avatarIcon, userInfo, onRequestChange }) => {
  return (
    <View style={styles.container}>
      {/* Avatar Component */}
      <Avatar.Icon 
        size={150} 
        icon={avatarIcon || "account"} 
        color="#777" 
        style={styles.avatar} 
      />

      {/* Information Card Component */}
      <View style={styles.card}>
        {userInfo.map((info, index) => (
          <View key={index} style={styles.infoRow}>
            <AppText style={styles.label}>{info.label}</AppText>
            <AppText style={styles.value}>{info.value}</AppText>
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={onRequestChange}>
          <AppText style={styles.buttonAppText}>Data Change Request</AppText>
        </TouchableOpacity>
      </View>
      
      <CircularCard 
        IconComponent={MaterialCommunityIcons}
        icon="key"    
        id=""
        name="Change Password"
        onPress={() => console.log("Card pressed")}
      />
      <CircularCard 
        IconComponent={MaterialCommunityIcons}
        icon="exit-to-app"    
        id=""
        name="Log Out"
        onPress={() => console.log("Card pressed")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20
  },
  avatar: {
    backgroundColor: '#ddd',
    marginBottom: 20,
  },
  card: {
    width: 350,
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    color: '#999',
    fontWeight: 'bold',
  },
  value: {
    color: '#333',
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
  },
  buttonAppText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default UserProfileCard;
