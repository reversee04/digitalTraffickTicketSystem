import React from "react";
import { View, StyleSheet } from "react-native";
import DriverInfoReview from "../../components/officerComponents/driverInfoReview";


function OffenderReview({navigation}){
    const userInfo = [
        { label: "Licence Number", value: "0320140009" },
        { label: "Name", value: "James Kayuni" },
        { label: "Vehicle", value: "Toyota" },
        { label: "Licence Plate", value: "NB 1298" },
        { label: "Chasis Number", value: "B324DC" },
      ];

      const handleRequestChange = () => {
            navigation.navigate('AddOffence')
      };

    return(
        <View style={styles.container}>
            <DriverInfoReview 
                avatarIcon="account" 
                userInfo={userInfo}
                onRequestChange={handleRequestChange}
            />
        </View>
    )
}

export default OffenderReview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})