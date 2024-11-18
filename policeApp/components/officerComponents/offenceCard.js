import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import AppText from '../appText/appText';
import colors from '../../assets/colors';

const offences = [
  "Speeding",
  "Drink and Drive",
  "No Helmet",
  "Signal Violation",
  "Reckless Driving",
]; // Sample list of offences

function OffenceButton({ onPress }) {
  const [scaleValue] = useState(new Animated.Value(1));
  const [selectedOffence, setSelectedOffence] = useState("Add Offence");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleOffenceSelect = (offence) => {
    setSelectedOffence(offence);
    setIsModalVisible(false);
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={toggleModal}
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.cardContainer, { transform: [{ scale: scaleValue }] }]}>
        <View style={styles.card}>
          <AppText styleProp={styles.titleText}>{selectedOffence}</AppText>
        </View>
      </Animated.View>

      {/* Modal for selecting offence */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <FlatList
            data={offences}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.modalItem} onPress={() => handleOffenceSelect(item)}>
                <AppText styleProp={styles.modalText}>{item}</AppText>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

export default OffenceButton;

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
    marginVertical: 10,
    padding: 20,
  },
  card: {
    backgroundColor: colors.darkBlue,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    maxHeight: '50%',
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 16,
    color: colors.darkBlue,
  },
});
