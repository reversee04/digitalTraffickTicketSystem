// components/TicketCard.js
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const TicketCard = ({ icon, iconColor, title, amount, status }) => {
  const navigation = useNavigation()
  
  return (
    <TouchableOpacity onPress={() => {navigation.navigate('TicketDetails')}}>
      <View
        style={{
          backgroundColor: colors.white,
          borderRadius: 10,
          padding: 15,
          marginBottom: 10,
          shadowColor: colors.darkBlue,
          shadowOpacity: 0.1,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 2 },
        }}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name={icon} size={20} color={iconColor} />
          <Text style={{ marginLeft: 5 }}>{title}</Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5 }}>K{amount}</Text>
        <Text style={{ color: status === 'Paid' ? colors.green : colors.red, fontSize: 14, marginTop: 5 }}>
          {status}
        </Text>
      </View>
    </TouchableOpacity>
    
  );
};

export default TicketCard;
