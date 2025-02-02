import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from '../firebase';
import HomeScreen from '../screens/HomeScreen'; 
import CalendarScreen from '../screens/CalendarScreen';
import ScanForEventsScreen from '../screens/ScanForEventsScreen';
import EventScanScreen from '../screens/EventScanScreen'
import AddEventScreen from '../screens/AddEventScreen'
import UserQRScreen from '../screens/UserQRScreen'
import { AuthContext } from '../context/AuthContext';
import RightToolBar from '../components/RightToolBar';
import { getUserProfile } from '../services/firestore/users';
import UsersListScreen from '../screens/UsersListScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  //const [displayName, setDisplayName] = useState('');

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      //setUser(null);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (auth.currentUser) {
          // Reload user data from Firebase to ensure displayName is up to date
          await auth.currentUser.reload();
          const profile = await getUserProfile(auth.currentUser.uid);
          //setDisplayName(profile.displayName || 'User'); // Default to 'User' if no displayName exists
          //setUserData(profile)
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false); // Stop the loading spinner once displayName is fetched
      }
    };

    fetchUser();
  }, []);

  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={
          { title: 'Home', 
            headerRight: () => (
            <RightToolBar displayName={user.displayName} logout={handleLogout} />
          ), }
          } />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} options={{ title: 'Calendar',   
        }} />
        <Stack.Screen name="AddEventScreen" component={AddEventScreen} options={{ title: 'Add Event' }} />
        <Stack.Screen name="ScanForEventsScreen" component={ScanForEventsScreen} options={{ title: 'Scan For Events Screen' }} />
        <Stack.Screen name="EventScanScreen" component={EventScanScreen} options={{title:'Scan Event'}}/>
        <Stack.Screen name="UserQRScreen" component={UserQRScreen} options={{title:'User QR Screen'}}/>
        <Stack.Screen name="UsersListScreen" component={UsersListScreen} options={{title:'Users'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const HeaderRight = ({ displayName, logout }) => (
  <div style={{ marginRight: 10 }}>
    <Button mode="contained" onPress={logout}>
        {displayName}
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
