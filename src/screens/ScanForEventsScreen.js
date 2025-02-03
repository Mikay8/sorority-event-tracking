import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import ActivityIndicatorWrapper from '../components/ActivityIndicatorWrapper';
import { getEvents } from '../services/firestore/events'; // Ensure this points to the correct file
import { format, isAfter,isEqual } from 'date-fns'; // Install with `npm install date-fns`
import { utcToZonedTime } from 'date-fns-tz';

const ScanForEventsScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  function stringToDate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  // Fetch events on screen load
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setLoading(true);

        // Fetch all events
        const fetchedEvents = await getEvents();

        // Filter upcoming events based on current date
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        const upcomingEvents = fetchedEvents.filter((event) => {
          const eventDate = new Date(...event.date.split('-')
          .map((val, index) => 
            index === 1 ? Number(val) - 1 : Number(val)
          ));
          return isAfter(eventDate, currentDate); 
        })
        .sort((a, b) => 
          stringToDate(a.date) - stringToDate(b.date

          )); 

        setEvents(upcomingEvents);
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  // Render each event card
  const renderEventCard = ({ item }) => {
    return (
      <Card style={styles.eventCard}>
        <Card.Content>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>Description: {item.description}</Text>
          <Text style={styles.location}>Location: {item.location}</Text>
          <Text style={styles.date}>Date: {format(stringToDate(item.date), 'dd-MM-yyyy')}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate('EventScanScreen', { event: item })}>
            Scan
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicatorWrapper text ={ "Loading events..."}/>
      ) : events.length > 0 ? (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id} // Ensure each event has a unique `id`
          renderItem={renderEventCard}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noEvents}>No upcoming events found.</Text>
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
  list: {
    paddingBottom: 16,
  },
  eventCard: {
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginVertical: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginTop: 6,
  },
  noEvents: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ScanForEventsScreen;
