import React, { useState, useEffect } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera'; // Expo camera API
// import * as Permissions from 'expo-permissions'; // Permissions API

const askPermission=async()=>{
    const {granted}=await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(!granted){
        Alert.alert('You need this permissions to use the Image Picker of this app')
    }
}

const OCRScreen = () => {

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
    };

    requestCameraPermission();
    askPermission();
  }, []);

  const handleCaptureAndScan = async () => {
    try {
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!image.cancelled) {
        console.log('Captured image:', image.uri);
        // Pass image.uri to your OCR processing logic here
      }
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  };



  return (
    <View style={styles.container}>
        <Button title="Capture & Scan" onPress={handleCaptureAndScan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default OCRScreen;
