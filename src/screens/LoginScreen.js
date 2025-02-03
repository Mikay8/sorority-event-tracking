import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import ButtonWrapper from '../components/ButtonWrapper';
import { AuthContext } from '../context/AuthContext';
import TextInputWrapper from '../components/TextInputWrapper';

const LoginScreen = () => {
  const { setUser,signIn } = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  //const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      signIn(`${userId}@sss.com`, password)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      
      <TextInputWrapper
        label={"ID"}
        value={userId}
        onChangeText={setUserId}
        type="required" // Triggers password validation
      />
      {/* <TextInputWrapper
        label={email}
        value={email}
        onChangeText={setEmail}
        type="email" // Triggers email validation
      /> */}
      
      <TextInputWrapper
        label={"Password"}
        value={password}
        onChangeText={setPassword}
        type="password" // Triggers password validation
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <ButtonWrapper title="Log In" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { marginBottom: 10 },
  error: { color: 'red', marginBottom: 10 },
});

export default LoginScreen;
