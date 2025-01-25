import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';


const HomeScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext); // Get the user from the context
  return (
    <View style={styles.container}>
      <Text variant="displayMedium">
        Welcome, {user?.displayName || 'User'}!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CalendarScreen')}
      >
     
      </TouchableOpacity>
      <Button mode="contained" onPress={() => navigation.navigate('CalendarScreen')}>
        Go to Calendar
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('ScanForEventsScreen')}>
         Scan For Events Screen
      </Button>
      <Text style={styles.info}>You are logged in as {user?.email}</Text>
      
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
