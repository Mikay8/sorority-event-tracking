import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, FlatList,Dimensions } from 'react-native';
import { Card, Text } from 'react-native-paper';
import ButtonWrapper from '../components/ButtonWrapper';
import ActivityIndicatorWrapper from '../components/ActivityIndicatorWrapper';
import { getEvents } from '../services/firestore/events'; // Ensure this points to the correct file
import { format, isAfter,isEqual } from 'date-fns'; // Install with `npm install date-fns`

const { height: screenHeight } = Dimensions.get('window');
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
          <ButtonWrapper title="Scan" onPress={() => navigation.navigate('EventScanScreen', { event: item })}/>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicatorWrapper text ={ "Loading events..."}/>
      ) : events.length > 0 ? (
       <ScrollView style={{height: screenHeight - 100}}>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id} // Ensure each event has a unique `id`
          renderItem={renderEventCard}
          contentContainerStyle={styles.list}
        />
       </ScrollView>
      ) : (
        <Text style={styles.noEvents}>No upcoming events found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
   
  },
  detailsContainer: {

    padding: 10,
    flexGrow: 1,
  },
  list: {
    paddingBottom: 16,
  },
  eventCard: {
    marginBottom: 10,
    
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
    
  },
  date: {
    fontSize: 14,
    
    marginTop: 6,
  },
  noEvents: {
    fontSize: 16,
    
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ScanForEventsScreen;
