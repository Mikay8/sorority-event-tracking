import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import TextInputWrapper from '../components/TextInputWrapper';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { saveUserProfile } from '../services/firestore/users';
import { auth, db } from '../firebase';

const SignupScreen = () => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Update display name
      await updateProfile(user, { displayName: fName +" "+lName});
       // Save user profile to Firestore
       await saveUserProfile(user.uid, {
        displayName: fName+' '+lName,
        firstName:fName,
        lastName:lName,
        email: email,
        role: 'user', // Default role
        photoURL: '', // Placeholder for profile photo
      });
      setUser(userCredential.user); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      
      <TextInputWrapper
        label={"First Name"}
        value={fName}
        onChangeText={setFName}
        type="required" // Triggers password validation
      />
      
      <TextInputWrapper
        label={"Last Name"}
        value={lName}
        onChangeText={setLName}
        type="required" // Triggers password validation
      />
      
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
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleSignUp}>
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { marginBottom: 10 },
  error: { color: 'red', marginBottom: 10 },
});

export default SignupScreen;
