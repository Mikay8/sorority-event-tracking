import React, { useContext, useEffect } from 'react';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack'; 
import { AuthContext } from '../context/AuthContext';


const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    // Show a loading screen while checking authentication
    return null; // Replace with a loading spinner if desired
  }

  return (
    <ThemeProvider>
      {user ? <MainStack/> : <AuthStack />}
    </ThemeProvider>
  );
};

export default AppNavigator;
