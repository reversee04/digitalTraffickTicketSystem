import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Platform, StatusBar, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import BackButton from '../components/backButton';

const EditDriverProfile = () => {
  const [name, setName] = useState('John Doe');
  const [license, setLicense] = useState('B123456789');
  const [phone, setPhone] = useState('+1234567890');
  const [email, setEmail] = useState('johndoe@example.com');

  const handleSave = () => {
    // Handle save functionality
    alert('Profile updated successfully!');
  };

  return (

    <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          
          <View style={styles.header}>
            <BackButton/>
            <Text style={styles.headerText}>Edit Profile</Text>
          </View>

          {/* Input Fields */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter full name"
              placeholderTextColor={colors.lightGray}
            />

            <Text style={styles.label}>License Number</Text>
            <TextInput
              style={styles.input}
              value={license}
              onChangeText={setLicense}
              placeholder="Enter license number"
              placeholderTextColor={colors.lightGray}
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Enter phone number"
              placeholderTextColor={colors.lightGray}
            />

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Enter email address"
              placeholderTextColor={colors.lightGray}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safe: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
  container: {
    flexGrow: 1,
    backgroundColor: colors.lightGray,
    padding: 20,
    height: "100%",
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: colors.darkBlue,
    borderRadius: 15,
    marginBottom: 20,
    flexDirection: 'row',
  },
  headerText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.deepBlue,
    marginBottom: 5,
  },
  input: {
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.darkBlue,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  saveButtonText: {
    color: colors.darkBlue,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditDriverProfile;
