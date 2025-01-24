import React, { useEffect, useState,useCallback } from 'react';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {  Button, Text } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { getEvents } from '../services/firestore/events';
import { format } from 'date-fns'; // A helper library for date formatting (install with `npm install date-fns`)

const CalendarScreen = ({navigation}) => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);

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
              formattedEvents[dateKey] = { marked: true, dotColor: 'blue', events: [] };
            }
            formattedEvents[dateKey].events.push(event);
          });
  
          setEvents(formattedEvents);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
  
      fetchEvents();
    
    }, [])
  );
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);

    // Display events for the selected day
    const dayEvents = events[day.dateString]?.events || [];
    setSelectedEvents(dayEvents);
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('AddEventScreen')}>
                Add Calendar
            </Button>
      <Calendar
        markedDates={Object.keys(events).reduce((acc, date) => {
          acc[date] = { marked: true, dotColor: events[date].dotColor };
          return acc;
        }, {})}
        onDayPress={handleDayPress}
        theme={{
          selectedDayBackgroundColor: 'blue',
          todayTextColor: 'purple',
          arrowColor: 'blue',
        }}
      />
      {selectedDate && (
        <View style={styles.detailsContainer}>
          <Text style={styles.selectedDate}>Events on {selectedDate}:</Text>
          {selectedEvents.length > 0 ? (
            <FlatList
              data={selectedEvents}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.eventItem}>
                  <Text style={styles.eventTitle}>{item.title}</Text>
                  <Text>Description: {item.description}</Text>
                  <Text>Location: {item.location}</Text>
                  <Text>Created By: {item.createdBy.id}</Text>
                </View>
              )}
            />
          ) : (
            <Text>No events for this day.</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  detailsContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  eventItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CalendarScreen;
