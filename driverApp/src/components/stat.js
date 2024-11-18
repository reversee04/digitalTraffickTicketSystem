// components/StatItem.js
import React from 'react';
import { View, Text } from 'react-native';
import colors from '../styles/colors';

const StatItem = ({ label, value }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ color: colors.primary }}>{label}</Text>
      <Text style={{ color: colors.white, fontSize: 20, fontWeight: 'bold' }}>{value}</Text>
    </View>
  );
};

export default StatItem;
