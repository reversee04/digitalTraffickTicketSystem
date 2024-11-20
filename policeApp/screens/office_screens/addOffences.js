import React from "react";
import { View, StyleSheet } from "react-native";
import OffenceButton from "../../components/officerComponents/offenceCard";
import AppText from "../../components/appText/appText";
import colors from "../../assets/colors";

function AddOffences({navigation}){
    return(
        <View style={styles.container}>
            <OffenceButton/>
            <OffenceButton/>
            <OffenceButton/>
            <OffenceButton/>

            <View style={styles.donButton}>
                <AppText>Done</AppText>
            </View>
        </View>
    )
}

export default AddOffences;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    donButton: {
        backgroundColor: colors.lightGray,
        width: '100%',
        height: 70,
        position: 'absolute',
        bottom: 10,
        left: 15,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, // For Android shadow
        borderRadius: 10,
    }
})