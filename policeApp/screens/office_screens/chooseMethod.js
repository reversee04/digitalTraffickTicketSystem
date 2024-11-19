import React from "react";
import { View, StyleSheet } from "react-native";
import ToIdCard from "../../components/officerComponents/toID";

function ChooseMethod({navigation}){
    return (
        <View style={styles.container}>
            <ToIdCard title={'Scan Number Plate'} onPress={() => navigation.navigate('OffenderReview')}/>
        </View>
    )
}

export default ChooseMethod;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    }
})