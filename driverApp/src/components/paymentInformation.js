// PaymentInformation.js
import React from 'react';
import { TextInput, View } from 'react-native';

const PaymentInformation = ({ paymentMethod, paymentDetails, onDetailChange }) => {
    return (
        <View style={{ marginBottom: 16 }}>
            {paymentMethod === 'Credit Card' && (
                <>
                    <TextInput
                        placeholder="Card Number"
                        style={styles.input}
                        value={paymentDetails.cardNumber}
                        onChangeText={(text) => onDetailChange('cardNumber', text)}
                    />
                    <TextInput
                        placeholder="Expiry Date (MM/YY)"
                        style={styles.input}
                        value={paymentDetails.expiryDate}
                        onChangeText={(text) => onDetailChange('expiryDate', text)}
                    />
                    <TextInput
                        placeholder="CVV"
                        style={styles.input}
                        secureTextEntry
                        value={paymentDetails.cvv}
                        onChangeText={(text) => onDetailChange('cvv', text)}
                    />
                </>
            )}
            {paymentMethod === 'PayPal' && (
                <TextInput
                    placeholder="PayPal Email"
                    style={styles.input}
                    value={paymentDetails.paypalEmail}
                    onChangeText={(text) => onDetailChange('paypalEmail', text)}
                />
            )}
            {paymentMethod === 'PayChangu' && (
                <TextInput
                    placeholder="PayChangu Account"
                    style={styles.input}
                    value={paymentDetails.paychanguAccount}
                    onChangeText={(text) => onDetailChange('paychanguAccount', text)}
                />
            )}
        </View>
    );
};

const styles = {
    input: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        marginBottom: 10
    }
};

export default PaymentInformation;
