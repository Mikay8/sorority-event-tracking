import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import ButtonWrapper from '../components/ButtonWrapper';
import { AuthContext } from '../context/AuthContext';
import TextInputWrapper from '../components/TextInputWrapper';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { saveUserProfile,searchUsersByField,deleteUser } from '../services/firestore/users';

const SignupScreen = () => {
  const { setUser, signUp} = useContext(AuthContext);
  //const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');

  const handleSignUp = async () => {
    try {
      const user= await signUp(`${userId}@sss.com`, password, fName+' '+lName);
       // Save user profile to Firestore
      const userExists = await searchUsersByField('accountId', userId);
       if (userExists.length > 0) {
        deleteUser(userExists[0].id);
        delete userExists[0].id;
        await saveUserProfile(user.uid, {
          ...userExists[0],
          displayName: fName+' '+lName,
          firstName:fName,
          lastName:lName,
          email: `${userId}@sss.com`,
          accountId: userId,
          role: 'user', // Default role
          photoURL: '', // Placeholder for profile photo
          createdAt: serverTimestamp(),
        });
        
      }else{

        await saveUserProfile(user.uid, {
          displayName: fName+' '+lName,
          firstName:fName,
          lastName:lName,
          email: `${userId}@sss.com`,
          accountId: userId,
          role: 'user', // Default role
          photoURL: '', // Placeholder for profile photo
          createdAt: serverTimestamp(),
        });
      }
       
      //setUser(userCredential.user); 

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      
      <TextInputWrapper
        label={"First Name"}
        value={fName}
        onChangeText={setFName}
        type="required" // Triggers password validation
      />
      
      <TextInputWrapper
        label={"Last Name"}
        value={lName}
        onChangeText={setLName}
        type="required" // Triggers password validation
      />
      
      <TextInputWrapper
        label={"ID"}
        value={userId}
        onChangeText={setUserId}
        type="required" // Triggers password validation
      />
              {/* label={"Email"}
        value={email}
        onChangeText={setEmail}
        type="email" // Triggers password validation */}

      <TextInputWrapper
        label={"Password"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        type="password" // Triggers password validation
      />
      
      
      <ButtonWrapper title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { marginBottom: 10 },
  error: { color: 'red', marginBottom: 10 },
});

export default SignupScreen;
