import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import TextInputWrapper from '../components/TextInputWrapper';

const LoginScreen = () => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Store user in contex
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      
      <TextInputWrapper
        label={"Email"}
        value={email}
        onChangeText={setEmail}
        type="email" // Triggers password validation
      />
      
      <TextInputWrapper
        label={"Password"}
        value={password}
        onChangeText={setPassword}
        type="password" // Triggers password validation
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleLogin}>
        Log In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { marginBottom: 10 },
  error: { color: 'red', marginBottom: 10 },
});

export default LoginScreen;
