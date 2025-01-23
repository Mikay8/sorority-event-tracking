import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';


const HomeScreen = () => {
  const { user } = useContext(AuthContext); // Get the user from the context
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome, {user?.displayName || 'User'}!
      </Text>
      <Text style={styles.info}>You are logged in as {user?.email}</Text>
      <Button mode="contained" onPress={handleLogout} style={styles.button}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  welcome: { fontSize: 24, marginBottom: 10 },
  info: { fontSize: 16, color: 'gray', marginBottom: 20 },
  button: { marginTop: 20 },
});

export default HomeScreen;
