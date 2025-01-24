import React, { useEffect, useState,useCallback } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {  Button, Text, Card } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { getEvents } from '../services/firestore/events';
import { format } from 'date-fns'; // A helper library for date formatting (install with `npm install date-fns`)
import { useTheme } from 'react-native-paper';
import EventCard from '../components/EventCard';

const CalendarScreen = ({navigation}) => {
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);
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
              formattedEvents[dateKey] = { marked: true, dotColor: theme.colors.secondary, events: [] };
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
  const renderEvent = ({ item }) => (
    <EventCard
    title={item.title}
    description={item.description}
    location={item.location}
    onEdit={() => {}}
    onDelete={() => {}}
    addUsers={() => {}}
  />
  );
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
        
      />
      {selectedDate && (
        <ScrollView style={styles.detailsContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  
    padding: 10,
  },
  detailsContainer: {

    padding: 10,
    height: '300px'
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
