import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import ButtonWrapper from '../components/ButtonWrapper';
import { auth } from '../firebase';
import {getUserProfile} from '../services/firestore/users';
import { AuthContext } from '../context/AuthContext';


const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext); // Get the user from the context
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
      
      <ButtonWrapper title="Go to Calendar" onPress={() => navigation.navigate('CalendarScreen')}></ButtonWrapper>
      
      <ButtonWrapper title="Scan For Events Screen" onPress={() => navigation.navigate('ScanForEventsScreen')}></ButtonWrapper>
      
      <ButtonWrapper title="User QR Screen" onPress={() => navigation.navigate('UserQRScreen')}></ButtonWrapper>
      
      <ButtonWrapper title="Users List Screen" onPress={() => navigation.navigate('UsersListScreen')}></ButtonWrapper>
      <Text style={styles.info}>You are logged in as {user?.accountId}</Text>
      
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
