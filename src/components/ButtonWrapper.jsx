import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const ButtonWrapper = ({ onPress, title, style }) => {
    return (
        <View style={[styles.buttonContainer, style]}>
            <Button title={title} mode="contained" onPress={onPress}>
                {title}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 16,
        borderRadius: 5,
    },
});

export default ButtonWrapper;