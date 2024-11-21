import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const DetectObject = () => {
  const [imageUri, setImageUri] = useState(null);
  const [labels, setLabels] = useState([]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Corrected property
        allowEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
      console.log(result);
    } catch (error) {
      console.error('Error picking Image:', error);
    }
  };

  const analyzeImage = async () => {
    try {
      if (!imageUri) {
        alert('Please select an image first.');
        return;
      }

      const apiKey = "b2543c632522ec9f0717ea11341c5c449f738a2a";
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      const base64ImageData = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });

      const requestData = {
        requests: [{
          image: {
            content: base64ImageData,
          },
          features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
        }],
      };

      const apiResponse = await axios.post(apiUrl, requestData);
      setLabels(apiResponse.data.responses[0].labelAnnotations);
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('Error analyzing image. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Image Scanner for OCR</Text>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 300 }} />
      )}

      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Choose an Image</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={analyzeImage} style={styles.button}>
        <Text style={styles.buttonText}>Analyze Image</Text>
      </TouchableOpacity>

      {labels.length > 0 && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelHeader}>Labels:</Text>
          {labels.map((label) => (
            <Text key={label.mid} style={styles.labelText}>
              {label.description}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  labelContainer: {
    marginTop: 20,
  },
  labelHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DetectObject;
