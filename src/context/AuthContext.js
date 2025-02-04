// src/context/AuthContext.js (updated)
import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import ErrorModal from '../components/ErrorModal';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMes, setErrorMes] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);


  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
        setErrorMes(err.message);
        setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async ( email, password, displayName) => {
    const currentError = '';
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setLoading(true);
      try {
        await updateProfile(userCredential.user, {displayName: displayName });
        setUser({...userCredential.user, displayName: displayName });
      } catch (err) {
        currentError+=err.message+'\n';
      }finally{
        setLoading(false);
        return userCredential.user;
      }
    } catch (err) {
        setErrorMes(currentError + err);
        setModalVisible(true);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, setUser }}>
      <ErrorModal modalVisible={modalVisible} setModalVisible={setModalVisible} errorMes={errorMes} />
      {children}
    </AuthContext.Provider>
  );
};
