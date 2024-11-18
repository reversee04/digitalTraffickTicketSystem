// components/ActionButton.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';

const ActionButton = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.deepBlue,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
      }}
      onPress={onPress}
    >
      <Icon name={icon} size={16} color={colors.white} style={{ marginRight: 5 }} />
      <Text style={{ color: colors.white }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
