import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import AppText from '../appText/appText';
import colors from '../../assets/colors';

function ToIdCard({ title, onPress }) {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95, // Slightly shrink
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress} // Function to handle card press
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.cardContainer, { transform: [{ scale: scaleValue }] }]}>
        <View style={styles.card}>
          <AppText styleProp={styles.titleText}>{title}</AppText>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default ToIdCard;

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    borderRadius: 10,
    marginVertical: 10,
    padding: 20
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
});
