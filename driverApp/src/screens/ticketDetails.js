// DetailedTicket.js
import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import colors from '../styles/colors';
import BackButton from '../components/backButton';

const DetailedTicket = () => {
    const ticketDetails = {
        type: 'Speeding',
        amount: 'K150',
        status: 'Unpaid',
        dateIssued: '2024-10-29',
        timeIssued: '14:30',
        location: {
            latitude: -13.9626,
            longitude: 33.7741,
        },
        issuedBy: 'Officer John Doe',
        description: 'Ticket issued for exceeding the speed limit in a residential area.',
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <BackButton/>
                    <Text style={styles.title}>Ticket Details</Text>
                </View>

                <View style={styles.ticketInfo}>
                    <Text style={styles.ticketTitle}>{ticketDetails.type}</Text>
                    <Text style={styles.ticketAmount}>Amount: {ticketDetails.amount}</Text>
                    <Text style={[styles.ticketStatus, ticketDetails.status === 'Unpaid' && styles.unpaid]}>
                        Status: {ticketDetails.status}
                    </Text>
                    <Text style={styles.ticketDetail}>Date Issued: {ticketDetails.dateIssued}</Text>
                    <Text style={styles.ticketDetail}>Time Issued: {ticketDetails.timeIssued}</Text>
                    <Text style={styles.ticketDetail}>Issued By: {ticketDetails.issuedBy}</Text>
                    <Text style={styles.ticketDescription}>{ticketDetails.description}</Text>
                </View>

                <Text style={styles.sectionTitle}>Location of Violation</Text>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: ticketDetails.location.latitude,
                            longitude: ticketDetails.location.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker
                            coordinate={ticketDetails.location}
                            title="Ticket Issued Here"
                            description="Violation Location"
                        />
                    </MapView>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.lightGray,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.darkBlue,
        padding: 16,
        borderRadius: 10,
        marginBottom: 16
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 16
    },
    ticketInfo: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2
    },
    ticketTitle: {
        fontSize: 22,
        color: colors.darkBlue,
        fontWeight: 'bold'
    },
    ticketAmount: {
        fontSize: 18,
        color: colors.darkBlue
    },
    ticketStatus: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    unpaid: {
        color: '#dc2626'
    },
    ticketDetail: {
        fontSize: 16,
        color: colors.darkBlue,
        marginVertical: 4
    },
    ticketDescription: {
        fontSize: 16,
        color: '#4b5563',
        marginTop: 8
    },
    sectionTitle: {
        fontSize: 20,
        color: colors.darkBlue,
        fontWeight: 'bold',
        marginVertical: 8
    },
    mapContainer: {
        flex: 1,
        height: 300,
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 8,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default DetailedTicket;
