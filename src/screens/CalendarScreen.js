import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState({
    '2025-01-25': [{ id: 1, name: 'Sorority Meeting', time: '3:00 PM' }],
    '2025-01-26': [{ id: 2, name: 'Volunteer Event', time: '10:00 AM' }],
  });

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>

      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          ...Object.keys(events).reduce((acc, date) => {
            acc[date] = { marked: true };
            return acc;
          }, {}),
          [selectedDate]: { selected: true, marked: true, selectedColor: '#007bff' },
        }}
        theme={{
          selectedDayBackgroundColor: '#007bff',
          todayTextColor: '#007bff',
          arrowColor: '#007bff',
        }}
      />

      <View style={styles.eventsContainer}>
        <Text style={styles.selectedDateText}>
          {selectedDate ? `Events on ${selectedDate}` : 'Select a date to view events'}
        </Text>
        {selectedDate && events[selectedDate] ? (
          <FlatList
            data={events[selectedDate]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderEventItem}
          />
        ) : (
          selectedDate && (
            <Text style={styles.noEventsText}>No events scheduled for this day.</Text>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  eventsContainer: {
    flex: 1,
    marginTop: 20,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  noEventsText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 10,
  },
  eventItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventTime: {
    fontSize: 14,
    color: '#6c757d',
  },
});

export default CalendarScreen;
