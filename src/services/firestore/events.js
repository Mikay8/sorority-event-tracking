import { doc, updateDoc, collection, getDocs,getDoc, addDoc, deleteDoc} from 'firebase/firestore';
import { getUserProfile } from './users';
import firestore from '@react-native-firebase/firestore';
import { db } from '../../firebase';
import { format } from 'date-fns'

  export const addEvent = async (title, description, location, date, userId) => {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd'); // Format the date to 'YYYY-MM-DD'

      // Add event to Firestore collection
      await addDoc(collection(db, 'events'), {
        title,
        description,
        location,
        date: formattedDate,
        createdBy: userId, // User ID should be passed from the logged-in user
      });

      console.log('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      throw new Error('There was an error adding the event');
    }
  };
  export const getEvents = async () => {
      try {
        const eventsRef = collection(db, 'events');
        const querySnapshot = await getDocs(eventsRef);
        const events = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return events;
      } catch (error) {
        console.error('Error fetching events:', error);
        return [];
      }
  };
  export const updateEvent = async (eventId, updatedFields) => {
    try {
      const eventRef = doc(db, 'events', eventId);
      await updateDoc(eventRef, updatedFields);
      console.log('Event updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
      throw new Error('There was an error updating the event');
    }
  };
  export const updateEventAttendance = async (eventId, userId) => {
    try {
      const eventRef = firestore().collection('events').doc(eventId);
  
      await firestore().runTransaction(async (transaction) => {
        const eventDoc = await transaction.get(eventRef);
  
        if (!eventDoc.exists) {
          throw new Error('Event does not exist!');
        }
  
        const eventData = eventDoc.data();
        const currentAttendance = eventData.attendance || [];
  
        if (!currentAttendance.includes(userId)) {
          transaction.update(eventRef, {
            attendance: firestore.FieldValue.arrayUnion(userId),
          });
          console.log(`User ${userId} added to attendance for event ${eventId}`);
        } else {
          console.log(`User ${userId} is already in attendance for event ${eventId}`);
        }
      });
    } catch (error) {
      console.error('Error updating event attendance:', error);
      throw error;
    }
  };
  export const deleteEvent = async (eventId) => {
    try {
      const eventRef = doc(db, 'events', eventId);
      await deleteDoc(eventRef);
      console.log('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      throw new Error('There was an error deleting the event');
    }
  };
  export const getEventAttendees = async (eventId) => {
    try {
      // Step 1: Fetch the event document from Firestore
      const eventRef = doc(db, 'events', eventId);
      const eventDocSnap = await getDoc(eventRef);
      
      if (!eventDocSnap.exists()) {
        console.error('Event not found');
        return [];
      }
      
      // Step 2: Get the list of user IDs who attended the event (assuming it's stored in an array field `attendees`)
      const eventData = eventDocSnap.data();
      const attendeesIds = eventData.attendees || [];
  
      // Step 3: Fetch the profile of each attendee using getUserProfile function
      const attendees = await Promise.all(attendeesIds.map(async (userId) => {
        const userProfile = await getUserProfile(userId);
        return userProfile ? { id:userId,lastName: userProfile.lastName,firstName: userProfile.firstName, email: userProfile.email } : null;
      }));
  
      // Step 4: Filter out any null values (if any user profile wasn't found)
      return attendees.filter(attendee => attendee !== null);
    } catch (error) {
      console.error('Error getting event attendees:', error);
      throw error;
    }
  };