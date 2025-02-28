import React, { useEffect, useState,useCallback } from 'react';
import { View, StyleSheet, ScrollView, FlatList,Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Text, Card } from 'react-native-paper';
import ButtonWrapper from '../components/ButtonWrapper';
import { Calendar } from 'react-native-calendars';
import { getAllUsers } from '../services/firestore/users';
import { getEvents,updateEvent,deleteEvent,getEventAttendees, removeUserFromEvent } from '../services/firestore/events';
import { format } from 'date-fns'; // A helper library for date formatting (install with `npm install date-fns`)
import { useTheme } from 'react-native-paper';
import EventCard from '../components/EventCard';
import EditEventModal from '../components/EditEventModal';
import AttendanceGrid from '../components/AttendanceGrid';
import AddUserModal from '../components/AddUserModal';
const { height: screenHeight } = Dimensions.get('window');
const CalendarScreen = ({navigation}) => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null); // Event being edited
  const [isModalVisible, setModalVisible] = useState(false); 
  const [attendees, setAttendees] = useState(null); // Currently selected event
  const [attendanceModalVisible, setAttendanceModalVisible] = useState(false); // Modal visibility state    
  const [isAddUserModalVisible, setAddUserModalVisible] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const theme = useTheme();
  
  useFocusEffect(
    useCallback(() => {
      const fetchEvents = async () => {
        try {
          const fetchedEvents = await getEvents();
  
          // Transform events into a format suitable for react-native-calendars
          const formattedEvents = {};
          fetchedEvents.forEach((event) => {
            // Convert Firestore timestamp to 'YYYY-MM-DD' format
            const dateKey = event.date;
  
            // Add event to the corresponding date in `formattedEvents`
            if (!formattedEvents[dateKey]) {
              formattedEvents[dateKey] = { marked: true, dotColor: theme.colors.tertiary, events: [] };
            }
            formattedEvents[dateKey].events.push(event);
          });
  
          setEvents(formattedEvents);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
  
      fetchEvents();
    
    }, [editingEvent==null || navigation])
  );
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);

    // Display events for the selected day
    const dayEvents = events[day.dateString]?.events || [];
    setSelectedEvents(dayEvents);
  };
  const handleEdit = (event) => {
    setEditingEvent(event);
    setModalVisible(true);
  };
  const handleDelete = async () => {
    
    try {
      await deleteEvent(editingEvent.id);
      setModalVisible(false);
      setEditingEvent(null);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };
  const handleAttendance = async (event) => {
    
    try {
      const attendees= await getEventAttendees(event.id);
      setAttendees(attendees);
      setEditingEvent(event);
      
    } catch (error) {
      console.error('Error updating event:', error);
    }finally{
      setAttendanceModalVisible(true);
    }
    
  };
  const removeUser = async (event) => {
    
    try {
      await removeUserFromEvent(editingEvent.id, event);
      const attendees= await getEventAttendees(editingEvent.id);
      setAttendees(attendees);
      
    } catch (error) {
      console.error('Error updating event:', error);
    }finally{
      setAttendanceModalVisible(true);
    }
    
  };
  const addUser =  async()=>{
    
    try {
      
      const users= await getAllUsers(editingEvent.id);
      setAllUsers(users);
      
    } catch (error) {
      console.error('Error updating event:', error);
    }finally{
      setAttendanceModalVisible(false);
      setAddUserModalVisible(true);
    }
  }
  const handleUserAdded =  async()=>{
    
    try {
      const attendees= await getEventAttendees(editingEvent.id);
      setAttendees(attendees);
      
    } catch (error) {
      console.error('Error updating event:', error);
    }finally{
      setAttendanceModalVisible(true);
      setAddUserModalVisible(false);
    }
  }
  const handleSave =async () => {
    try {
      await updateEvent(editingEvent.id, editingEvent);
      setModalVisible(false);
      setEditingEvent(null);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };
  const renderEvent = ({ item }) => (
    <EventCard
    title={item.title}
    description={item.description}
    location={item.location}
    onEdit={()=>handleEdit(item)}
    attendance={() => handleAttendance(item)}
  />
  );
  const markedDates = {
    ...Object.keys(events).reduce((acc, date) => {
      acc[date] = { marked: true, dotColor: events[date].dotColor };
      return acc;
    }, {}),
    ...(selectedDate && {
      [selectedDate]: {
        selected: true,
        selectedColor: theme.colors.primary,
        marked: events[selectedDate]?.marked,
        dotColor: events[selectedDate]?.dotColor,
      },
    }),
  };
  return (
    <View style={styles.container}>
            <ButtonWrapper title="Add Event" onPress={() => navigation.navigate('AddEventScreen')}></ButtonWrapper>
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        style={{height: (screenHeight/2)-50}}
      />
      {selectedDate && (
        <ScrollView style={[styles.detailsContainer, { height: (screenHeight/2)-50 }]}>
          <Text style={styles.selectedDate}>Events on {selectedDate}:</Text>
          {selectedEvents.length > 0 ? (
            <FlatList
            data={selectedEvents}
            keyExtractor={(item) => item.id} // Ensure each event has a unique `id`
            renderItem={renderEvent}
            contentContainerStyle={styles.list}
            ListEmptyComponent={<Text style={styles.noEvents}>No events for this day</Text>}
          />
          ) : (
            <Text>No events for this day.</Text>
          )}
        </ScrollView>
      )}
      <EditEventModal
        visible={isModalVisible}
        event={editingEvent}
        onChangeEvent={setEditingEvent}
        onSave={handleSave}
        onDelete={handleDelete}
        onClose={() => setModalVisible(false)}
      />
       <AttendanceGrid
        visible={attendanceModalVisible}
        onDismiss={() => setAttendanceModalVisible(false)}
        attendees={attendees} 
        removeUser={removeUser}
        addUser={addUser}
      />
      <AddUserModal
      visible={isAddUserModalVisible}
      onClose={handleUserAdded}
      eventId={editingEvent}
      allUsers={allUsers}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  
    paddingRight: 30,
    paddingLeft: 30,
  },
  detailsContainer: {
    padding: 10,
  },
  selectedDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  list: {
    padding: 16,
  },
  noEvents: {
    textAlign: 'center',
  
    fontSize: 16,
    marginTop: 20,
  },
});

export default CalendarScreen;
