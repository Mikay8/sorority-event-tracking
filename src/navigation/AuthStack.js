import React, { useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import LoginScreen from '../screens/LoginScreen'; 
import SignupScreen from '../screens/SignupScreen'; 
import { ToggleButton,SegmentedButtons } from 'react-native-paper';

import { Fragment } from 'react';

//const Stack = createStackNavigator();

const AuthStack = () => {
  const [selected, setSelected] = useState('signIn');
  return (
    <View style={{justifyContent: 'center'}}>
      {/* SegmentedButtons to switch between screens */}
      <View style={{justifyContent: 'center',alignItems: 'center'}}>
        <SegmentedButtons
        value={selected}
        style={{width:'300px', margin:'16px'}}
        onValueChange={setSelected}
        buttons={[
          { label: 'Sign Up', value: 'signIn' }, // Sign Up button
          { label: 'Login', value: 'login' },    // Login button
        ]}
      />
      </View>
      
      
      {/* Display the selected screen */}
      {selected === 'signIn' ? <SignupScreen /> : <LoginScreen />}
    </View>
  );
};

export default AuthStack;
