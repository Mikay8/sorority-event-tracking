import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeScreen from '../screens/HomeScreen'; // Replace with your actual home screen
import { AuthContext } from '../context/AuthContext';

const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Show a loading screen while checking authentication
    return null; // Replace with a loading spinner if desired
  }

  return (
    <NavigationContainer>
      {user ? <HomeScreen /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
