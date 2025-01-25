import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, HelperText, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

// Validation functions
const validateInput = (type, value) => {
    
  switch (type) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? '' : 'Invalid email address';
    case 'password':
      if (value.length < 6) {
        return 'Password must be at least 6 characters long';
      }
      if (!/[A-Z]/.test(value)) {
        return 'Password must contain at least one uppercase letter';
      }
      if (!/[0-9]/.test(value)) {
        return 'Password must contain at least one number';
      }
      return ''; // No errors
    case 'required':
      return value ? '' : 'This field is required';
    default:
      return ''; // No validation for other types
  }
};

const TextInputWrapper = ({
  label,
  value,
  onChangeText,
  type = 'text', // Validation type: email, password, required, etc.
  errorMessage: customErrorMessage, // Allow overriding error messages
  ...props // Additional props for TextInput
}) => {
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);

  const handleChangeText = (text) => {
    onChangeText(text);

    // Validate input and update error state
    const validationError = validateInput(type, text);
    setError(validationError || customErrorMessage || '');
  };
  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };
  const theme = useTheme();
  return (
    <View style={styles.container}>
        <Text style={{color:focused?theme.colors.primary:theme.colors.secondary}}variant="bodyLarge">{label}</Text>
      <TextInput
        //label={label}
        value={value}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        outlineColor={theme.colors.secondary}
        textColor={focused?theme.colors.primary:theme.colors.secondary}
        activeOutlineColor={theme.colors.primary}
        mode="outlined"
        error={!!error}
        style={[styles.input,focused && styles.focusedInput]} 
        {...props}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16, // Spacing between inputsh
  },
  input: {
    backgroundColor: 'transparent', 
    borderRadius:'1rem',
  }
  
});

export default TextInputWrapper;
