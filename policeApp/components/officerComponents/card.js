import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AppText from '../appText/appText';
import colors from '../../assets/colors';

function PoliceAppCard({ title, subtitle, icon, onPress }) {
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
          <AppText styleProp={styles.smallText}>{title}</AppText>
          <AppText styleProp={styles.largeText}>{subtitle}</AppText>
          {icon && (
            <Icon name={icon} size={30} color="white" style={styles.icon} />
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default PoliceAppCard;

const styles = StyleSheet.create({
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    borderRadius: 10,
    marginVertical: 10,
  },
  card: {
    backgroundColor: colors.darkBlue,
    padding: 20,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  smallText: {
    color: 'white',
    fontSize: 12,
  },
  largeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
});
