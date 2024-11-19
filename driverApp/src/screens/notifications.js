import React from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import colors from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/backButton';

const notifications = [
    { id: '1', title: 'Speeding Ticket Issued', description: 'You received a ticket for speeding.', time: '2 hours ago', icon: 'car' },
    { id: '2', title: 'Ticket Payment Due', description: 'Your ticket payment is due soon.', time: '1 day ago', icon: 'exclamation-circle' },
    { id: '3', title: 'Ticket Paid', description: 'Your recent ticket has been paid successfully.', time: '3 days ago', icon: 'check-circle' },
    { id: '4', title: 'Court Appearance Required', description: 'A court appearance is scheduled.', time: '5 days ago', icon: 'gavel' },
];

const NotificationItem = ({ title, description, time, icon }) => (
    <View style={styles.notificationItem}>
        <FontAwesome name={icon} size={24} color={colors.darkBlue} style={styles.icon} />
        <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.time}>{time}</Text>
        </View>
    </View>
);

const Notifications = () => {
    // const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <BackButton/>
                    <Text style={styles.headerTitle}>Notifications</Text>
                </View>
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <NotificationItem
                            title={item.title}
                            description={item.description}
                            time={item.time}
                            icon={item.icon}
                        />
                    )}
                />
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
        backgroundColor: colors.lightGray,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.darkBlue,
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
    },
    backIcon: {
        marginRight: 16,
    },
    headerTitle: {
        color: colors.white,
        fontSize: 24,
        fontWeight: 'bold',
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 1,
    },
    icon: {
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        color: colors.darkBlue,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: colors.deepBlue,
        marginTop: 4,
    },
    time: {
        fontSize: 12,
        color: colors.orange,
        marginTop: 4,
    },
});

export default Notifications;
