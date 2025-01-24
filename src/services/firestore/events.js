import { doc, setDoc, collection, getDocs, addDoc} from 'firebase/firestore';
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
  export const updateAttendance = async (eventId, userId) => {
    try {
      const eventRef = doc(db, 'events', eventId);
      await updateDoc(eventRef, {
        attendees: arrayUnion(userId),
      });
      console.log('Attendance updated successfully!');
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };