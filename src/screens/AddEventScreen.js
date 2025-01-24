import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import { DatePickerModal } from 'react-native-paper-dates';
import { useNavigation } from '@react-navigation/native';
import { addEvent } from '../services/firestore/events'; // Import addEvent function
import { format } from 'date-fns'; // For date formatting
import { AuthContext } from '../context/AuthContext';

const AddEventScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);
  // State to store form data and date picker visibility
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to handle date change from DateTimePicker
  const handleDateChange = (newDate) => {
    setDate(newDate.date);
    setShowDatePicker(false); // Close the date picker
  };
  // Function to handle adding event
  const handleAddEvent = async () => {
    try {
      if (!title || !description || !location) {
        Alert.alert('Error', 'Please fill in all fields.');
        return;
      }

      await addEvent(title, description, location, date, user.uid);

      Alert.alert('Success', 'Event added successfully.');
      navigation.goBack(); // Navigate back to the previous screen (e.g., Calendar screen)
    } catch (error) {
      //console.error('Error adding event:', error);
      Alert.alert('Error', 'There was an error saving the event.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Event</Text>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      
      />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Event Date</Text>
      <TextInput
        style={styles.input}
        value={format(date, 'yyyy-MM-dd')}
        onFocus={() => setShowDatePicker(true)} // Show date picker on focus
        editable={false} // Make it read-only
      />
      <DatePickerModal
        mode="single"
        visible={showDatePicker}
        date={date}
        onDismiss={() => setShowDatePicker(false)}
        onConfirm={handleDateChange}
      />

      <Button title="Add Event" onPress={handleAddEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddEventScreen;
