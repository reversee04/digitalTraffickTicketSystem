import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import OffenceButton from "../../components/officerComponents/offenceCard";
import AppText from "../../components/appText/appText";
import colors from "../../assets/colors";
import axios from 'axios'; 

function AddOffences({ navigation }) {
  const [offences, setOffences] = useState([]);  // Store fetched violations
  const [selectedOffences, setSelectedOffences] = useState([]);  // Store selected offences
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch violations from the API when the component mounts
  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const response = await axios.get('http://192.168.120.227:3000/api/violations'); // Replace with your API endpoint
        setOffences(response.data); // Assume the response contains the violation list
      } catch (err) {
        setError('Failed to load violations');
        console.error('Error fetching violations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchViolations();
  }, []);

  // Function to toggle selected offences
  const toggleOffenceSelection = (offenceId) => {
    setSelectedOffences((prevSelected) =>
      prevSelected.includes(offenceId)
        ? prevSelected.filter((id) => id !== offenceId)
        : [...prevSelected, offenceId]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {loading ? (
          <AppText>Loading...</AppText>
        ) : error ? (
          <AppText>{error}</AppText>
        ) : (
          // Render offences as cards with checkboxes
          offences.map((offence) => (
            <OffenceButton
              key={offence.id}
              offence={offence}
              isSelected={selectedOffences.includes(offence.id)} // Check if the offence is selected
              onSelect={() => toggleOffenceSelection(offence.id)} // Toggle selection
            />
          ))
        )}
      </ScrollView>

      {/* Done Button */}
      <TouchableOpacity 
        style={styles.donButton} 
        onPress={() => navigation.navigate('OCR', { selectedOffences })} // Pass selected offences to OCR screen
      >
        <AppText>Done</AppText>
      </TouchableOpacity>
    </View>
  );
}

export default AddOffences;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    justifyContent: "flex-end", // Keeps Done button at the bottom
  },
  scrollView: {
    paddingBottom: 80, // Add space at the bottom for the floating button
  },
  donButton: {
    backgroundColor: colors.lightGray,
    width: "100%", // Now the Done button will take up 100% width
    height: 70,
    position: "absolute",
    bottom: 10,
    left: 0,  // Align to the left
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    borderRadius: 10,
  },
});
