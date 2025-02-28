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
import ActivityIndicatorWrapper from '../components/ActivityIndicatorWrapper';
import theme from '../themes/lightColors'

const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) { 
    return (
                  <ActivityIndicatorWrapper text={"Loading your profile..."}/>
                );
  }
if (Platform.OS==='ios'){
  return (
    <SafeAreaView style={styles.safeArea}>
      
      {user ? <MainStack/> : 
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <AuthStack />
      </ScrollView>
      }
      
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
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default AppNavigator;
