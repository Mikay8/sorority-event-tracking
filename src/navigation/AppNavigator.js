import React, { useContext, useEffect } from 'react';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform
} from 'react-native';
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
if (Platform.OS==='ios'){
  return (
    <SafeAreaView style={styles.safeArea}>
      
      {user ? <MainStack/> : <AuthStack />}
      
    </SafeAreaView>
  );
}
  return (
    <PaperProvider theme={theme} >
      {user ? <MainStack/> : <AuthStack />}
    </PaperProvider>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  
});

export default AppNavigator;
