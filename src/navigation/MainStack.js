import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from '../firebase';
import HomeScreen from '../screens/HomeScreen'; 
import CalendarScreen from '../screens/CalendarScreen';
import AddEventScreen from '../screens/AddEventScreen'
import { AuthContext } from '../context/AuthContext';
import RightToolBar from '../components/RightToolBar';
const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState('');

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  useEffect(() => {
    const fetchDisplayName = async () => {
      try {
        if (auth.currentUser) {
          // Reload user data from Firebase to ensure displayName is up to date
          await auth.currentUser.reload();
          setDisplayName(auth.currentUser.displayName || 'User'); // Default to 'User' if no displayName exists
        }
      } catch (error) {
        console.error('Error fetching displayName:', error);
      } finally {
        setLoading(false); // Stop the loading spinner once displayName is fetched
      }
    };

    fetchDisplayName();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loaderText}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={
          { title: 'Home', 
            headerRight: () => (
            <RightToolBar displayName={displayName || 'User'} logout={handleLogout} />
          ), }
          } />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{ title: 'Calendar' }} />
        <Stack.Screen name="AddEventScreen" component={AddEventScreen} options={{ title: 'Add Event' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const HeaderRight = ({ displayName, logout }) => (
  <div style={{ marginRight: 10 }}>
    <Text style={{ fontWeight: 'bold' }}>{displayName}</Text>
    <Button mode="contained" onPress={logout}>
        Log Out
    </Button>
  </div>
);
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  welcome: { fontSize: 24, marginBottom: 10 },
  info: { fontSize: 16, color: 'gray', marginBottom: 20 },
  button: { marginTop: 20 },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6c757d',
  },
});
export default AppNavigator;
