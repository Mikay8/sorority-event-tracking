// src/context/AuthContext.js (updated)
import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  const updateUserProfile = async (user, profileUpdates) => {
    if (user) {
      //setLoading(true);
      try {
    
        await updateProfile(user, profileUpdates);
        setUser({ ...user, ...profileUpdates });
      } catch (err) {
        console.error(err.message);
      }finally{
        setLoading(false);
      }
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ( email, password, displayName) => {
    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setLoading(true);
      try {
        await updateProfile(userCredential.user, {displayName: displayName });
        setUser({...userCredential.user, displayName: displayName });
      } catch (err) {
        console.error(err.message);
      }finally{
        setLoading(false);
        return userCredential.user;
      }
      
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp,updateUserProfile, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
