import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const UserQRScreen = ({ route }) => {
    
    const { user } = useContext(AuthContext);
    return (
        <View style={styles.container}>
        
            <QRCode
                value={user.uid}
                size={400}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default UserQRScreen;