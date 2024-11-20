// PayTicket.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PaymentMethodButton from '../components/paymentMethod';
import PaymentInformation from '../components/paymentInformation';
import colors from '../styles/colors';
import BackButton from '../components/backButton';

const PayTicket = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        paypalEmail: '',
        paychanguAccount: ''
    });

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleDetailChange = (field, value) => {
        setPaymentDetails({ ...paymentDetails, [field]: value });
    };

    const handleConfirmPayment = () => {
        Alert.alert('Payment Confirmed!');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <BackButton/>
                    <Text style={styles.title}>Pay Ticket</Text>
                </View>

                <View style={styles.ticketInfo}>
                    <Text style={styles.ticketTitle}>Speeding</Text>
                    <Text style={styles.ticketAmount}>Amount: K150</Text>
                    <Text style={styles.ticketStatus}>Status: Unpaid</Text>
                </View>

                <Text style={styles.sectionTitle}>Choose Payment Method</Text>
                <PaymentMethodButton icon="credit-card" label="Credit Card" onPress={() => handlePaymentMethodChange('Credit Card')} />
                <PaymentMethodButton icon="mobile" label="Mobile Payment" onPress={() => handlePaymentMethodChange('Mobile Payment')} />
                <PaymentMethodButton icon="university" label="Bank Transfer" onPress={() => handlePaymentMethodChange('Bank Transfer')} />
                <PaymentMethodButton icon="paypal" label="PayPal" onPress={() => handlePaymentMethodChange('PayPal')} />
                <PaymentMethodButton icon="wallet" label="PayChangu" onPress={() => handlePaymentMethodChange('PayChangu')} />

                <Text style={styles.sectionTitle}>Enter Payment Information</Text>
                <PaymentInformation paymentMethod={paymentMethod} paymentDetails={paymentDetails} onDetailChange={handleDetailChange} />

                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
                    <Text style={styles.confirmButtonText}>Confirm Payment</Text>
                </TouchableOpacity>
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
        color: '#dc2626'
    },
    sectionTitle: {
        fontSize: 20,
        color: colors.darkBlue,
        fontWeight: 'bold',
        marginVertical: 8
    },
    confirmButton: {
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 16
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default PayTicket;
