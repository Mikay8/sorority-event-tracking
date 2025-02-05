import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const ButtonWrapper = ({ onPress, title, style,buttonColor, ...props }) => {
    return (
        <View style={[styles.buttonContainer, style]} {...props}>
            <Button title={title} mode="contained" onPress={onPress} buttonColor={buttonColor}>
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