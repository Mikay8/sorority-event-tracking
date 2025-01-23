import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen'; 
import SignupScreen from '../screens/SignupScreen'; 

import { Fragment } from 'react';

//const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Fragment>
      <LoginScreen />
      <SignupScreen />
    </Fragment>
  );
};

export default AuthStack;
