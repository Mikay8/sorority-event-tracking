import { doc,collection, setDoc, getDoc,getDocs,deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

// Save or update user profile
export const saveUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { ...userData, createdAt: serverTimestamp() }, { merge: true });
    console.log('User profile saved successfully!');
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error('No user profile found for userId:', userId);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);

    // Map through the documents and return an array of user objects
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include the document ID
      ...doc.data(), // Spread the rest of the user data
    }));

    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw new Error('There was an error fetching the users');
  }
};

  // Search users by a specific field
  export const searchUsersByField = async (field, value) => {
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      const users = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user[field] === value);

      return users;
    } catch (error) {
      console.error(`Error searching users by ${field}:`, error);
      throw new Error(`There was an error searching users by ${field}`);
    }
  };
  export const deleteUser = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      console.log('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('There was an error deleting the user');
    }
  };
