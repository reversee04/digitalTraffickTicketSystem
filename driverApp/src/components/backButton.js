import React from 'react';
import { TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AppNavigator from './appNavigator';

const BackButton = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // Optionally, navigate to a default screen if there's no navigation history
      navigation.navigate('');
    }
  };

  return (
    <TouchableOpacity onPress={handleBackPress}>
      <Icon name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default BackButton;
