import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const DetectObject = () => {
  const [imageUri, setImageUri] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const takePicture = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera permission is required to use this feature.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      } else {
        console.log('Camera action canceled by the user.');
      }
    } catch (error) {
      console.error('Error taking picture:', error.message);
      Alert.alert('Error', 'An error occurred while accessing the camera.');
    }
  };

  const analyzeImage = async () => {
    if (!imageUri) {
      Alert.alert('No Image', 'Please capture an image before analyzing.');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    try {
      console.log('Sending image to backend for processing...');
      const response = await axios.post('http://192.168.120.227:3000/process-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.text) {
        console.log('Image analysis complete:', response.data.text);
        setExtractedText(response.data.text);
      } else {
        console.warn('No text extracted from the image.');
        Alert.alert('No Result', 'Could not extract text from the image.');
      }
    } catch (error) {
      console.error('Error analyzing image:', error.response?.data || error.message);
      Alert.alert('Error', 'An error occurred while analyzing the image. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Image Scanner for Number Plates</Text>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 300 }} />
      )}

      <TouchableOpacity onPress={takePicture} style={styles.button}>
        <Text style={styles.buttonText}>Take a Picture</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={analyzeImage} style={styles.button}>
        <Text style={styles.buttonText}>Analyze Image</Text>
      </TouchableOpacity>

      {extractedText ? (
        <Text style={styles.resultText}>Extracted Text: {extractedText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  button: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginVertical: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16 },
  resultText: { fontSize: 16, color: '#333', marginTop: 20 },
});

export default DetectObject;
