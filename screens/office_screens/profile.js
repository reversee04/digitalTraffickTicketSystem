import React from 'react';
import { StyleSheet, View } from 'react-native';
import UserProfileCard from '../../components/officerComponents/profile';
import CircularCard from '../../components/officerComponents/circularCard';
import colors from '../../assets/colors';

const ProfilePage = ({navigation, route}) => {
  const userInfo = [
    { label: "ID Number", value: "0320140009" },
    { label: "Name", value: "James Kayuni" },
    { label: "Group", value: "Traffick Police" },
    { label: "Organisation", value: "Malawi Police" },
    { label: "Region", value: "Lilongwe" },
  ];

  const handleRequestChange = () => {
    // Handle the "Request Ubah Data" button press here
    alert("Data Change Request");
  };

  return (
    <View style={styles.container}>
      <UserProfileCard 
        avatarIcon="account"  // Use any other icon name if needed
        userInfo={userInfo}
        onRequestChange={handleRequestChange}
      />
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})