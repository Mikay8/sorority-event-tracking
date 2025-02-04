import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {  Text } from 'react-native-paper';
import ButtonWrapper from './ButtonWrapper';
const RightToolBar = ({ displayName, logout }) => {
  return (
    <View style={styles.headerRightContainer}>
      {/* Display Name */}
      <Text style={styles.displayName}>{displayName}</Text>

      <ButtonWrapper title={'Log Out'}  onPress={logout}/>
        
    </View>
  );
};

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10, // Adds spacing between the header content and the edge
  },
  displayName: {
    marginRight: 10, // Adds spacing between the name and the logout button
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000', // Adjust as needed for contrast
  },
  logoutText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RightToolBar;
