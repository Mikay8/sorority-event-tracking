import React, { useContext, useEffect } from 'react';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import AuthStack from './AuthStack';
import MainStack from './MainStack'; 
import { AuthContext } from '../context/AuthContext';
import theme from '../themes/lightColors'

const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    // Show a loading screen while checking authentication
    return null; // Replace with a loading spinner if desired
  }

  return (
    <PaperProvider theme={theme} >
      {user ? <MainStack/> : <AuthStack />}
    </PaperProvider>
  );
};

export default AppNavigator;
