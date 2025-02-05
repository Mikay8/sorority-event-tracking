import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';

const ActivityIndicatorWrapper = ({text}) => {
    return (
        <View style={styles.loadingOverlay}>
                      <ActivityIndicator size="large" color="#007bff" />
                      <Text style={styles.loaderText}>{text}</Text>
                    </View>
    );
};
const styles = StyleSheet.create({
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
      },
      loaderText: {
        marginTop: 10,
        fontSize: 16,
        color: '#6c757d',
      },
    spinner: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 4,
        borderStyle: 'solid',
        animation: 'spin 1s linear infinite',
    },
    
    });

export default ActivityIndicatorWrapper;