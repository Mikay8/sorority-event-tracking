import React, { useState, useContext , useEffect} from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import ButtonWrapper from '../components/ButtonWrapper';
import { AuthContext } from '../context/AuthContext';
import TextInputWrapper from '../components/TextInputWrapper';

const LoginScreen = () => {
  const { signIn } = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMes, setErrorMes] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    try {
      await signIn(`${userId}@sss.com`, password);
    } catch (err) {
      setError(err.message);
      setModalVisible(true);
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
      <TextInputWrapper
        label={"Password"}
        value={password}
        onChangeText={setPassword}
        type="password" // Triggers password validation
        secureTextEntry
      />
      
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
