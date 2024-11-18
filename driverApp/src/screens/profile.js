import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/backButton';

const DriverProfile = () => {
    const navigation = useNavigation();
  
    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <BackButton />
                    </View>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image; replace with a real driver image source
                        style={styles.profileImage}
                    />
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.license}>License No: B123456789</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('ProfileEdit')}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Profile Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Icon name="car" size={20} color={colors.green} />
                        <Text style={styles.statValue}>15</Text>
                        <Text style={styles.statLabel}>Tickets</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Icon name="check" size={20} color={colors.green} />
                        <Text style={styles.statValue}>10</Text>
                        <Text style={styles.statLabel}>Paid</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Icon name="times" size={20} color={colors.red} />
                        <Text style={styles.statValue}>5</Text>
                        <Text style={styles.statLabel}>Unpaid</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
        flexGrow: 1,
        backgroundColor: colors.lightGray,
        padding: 20,
        height: "100%",
    },
    header: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: colors.darkBlue,
        borderRadius: 20,
        marginBottom: 20,
        position: 'relative',
    },
    headerTop: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.white,
        marginBottom: 10,
    },
    name: {
        color: colors.white,
        fontSize: 24,
        fontWeight: 'bold',
    },
    license: {
        color: colors.white,
        fontSize: 14,
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginTop: 10,
    },
    editButtonText: {
        color: colors.darkBlue,
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.white,
        paddingVertical: 15,
        borderRadius: 15,
        marginBottom: 20,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.darkBlue,
        marginTop: 5,
    },
    statLabel: {
        color: colors.mediumBlue,
        fontSize: 12,
    },
});

export default DriverProfile;
