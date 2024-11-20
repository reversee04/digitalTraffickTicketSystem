// PaymentMethodButton.js
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PaymentMethodButton = ({ icon, label, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                backgroundColor: 'white',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                elevation: 2,
                marginBottom: 10
            }}
            onPress={onPress}
        >
            <FontAwesome name={icon} size={24} color="#1e3a8a" />
            <Text style={{ marginLeft: 10, fontSize: 18, color: '#1e3a8a' }}>{label}</Text>
        </TouchableOpacity>
    );
};

export default PaymentMethodButton;
