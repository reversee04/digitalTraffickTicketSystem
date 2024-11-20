// components/DashboardHeader.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import { useNavigation } from '@react-navigation/native';

const DashboardHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon name="ellipsis-h" size={20} color={colors.white} />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ position: 'relative' }}>
          <Icon name="bell" size={20} color={colors.white} onPress={() => {navigation.navigate('notifications')}}/>
          <View
            style={{
              position: 'absolute',
              top: -5,
              right: -5,
              backgroundColor: colors.red,
              borderRadius: 8,
              width: 16,
              height: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: colors.white, fontSize: 10 }}>4</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardHeader;