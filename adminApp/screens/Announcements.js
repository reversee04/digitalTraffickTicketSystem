// screens/AnnouncementManagement.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

const AnnouncementManagement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Mock announcements data (Replace with API call)
    const mockAnnouncements = [
      {
        announcementID: 1,
        title: 'System Update',
        content: 'We are updating our system tonight.',
        date_posted: '2024-11-10',
      },
      {
        announcementID: 2,
        title: 'New Features',
        content: 'New features have been added.',
        date_posted: '2024-11-12',
      },
    ];
    setAnnouncements(mockAnnouncements);
  }, []);

  const addAnnouncement = () => {
    const newAnnouncement = {
      announcementID: announcements.length + 1,
      title,
      content,
      date_posted: new Date().toISOString().split('T')[0],
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setTitle('');
    setContent('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Announcement Management</Text>
      <Card containerStyle={styles.card}>
        <Text style={styles.sectionTitle}>Create New Announcement</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
        />
        <Button
          title="Add Announcement"
          onPress={addAnnouncement}
          buttonStyle={styles.addButton}
        />
      </Card>
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.announcementID.toString()}
        renderItem={({ item }) => (
          <Card containerStyle={styles.announcementCard}>
            <View style={styles.announcementHeader}>
              <Icon
                name="bullhorn"
                type="font-awesome-5"
                color="#007bff"
                size={20}
              />
              <Text style={styles.announcementTitle}>{item.title}</Text>
            </View>
            <Text style={styles.announcementContent}>{item.content}</Text>
            <Text style={styles.announcementDate}>
              Posted on: {item.date_posted}
            </Text>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#343a40',
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f8f9fa',
  },
  textArea: {
    height: 80,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 10,
  },
  announcementCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  announcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  announcementTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
  },
  announcementContent: {
    fontSize: 16,
    color: '#343a40',
    marginBottom: 10,
  },
  announcementDate: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'right',
  },
});

export default AnnouncementManagement;