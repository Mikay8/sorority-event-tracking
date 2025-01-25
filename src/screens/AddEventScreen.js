import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {  Button, } from 'react-native-paper';
import TextInputWrapper from '../components/TextInputWrapper';
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
      navigation.goBack(); // Navigate back to the previous screen (e.g., Calendar screen)
    } catch (error) {
      //console.error('Error adding event:', error);
      Alert.alert('Error', 'There was an error saving the event.');
    }
  };

  return (
    <View >
      
      <TextInputWrapper
        label={"Title"}
        value={title}
        onChangeText={setTitle}
        type="required" // Triggers password validation
      />
      <TextInputWrapper
        label={"Description"}
        value={description}
        onChangeText={setDescription}
        type="required" // Triggers password validation
      />
      
      <TextInputWrapper
        label={"Location"}
        value={location}
        onChangeText={setLocation}
        type="required" // Triggers password validation
      />
      <TextInputWrapper
        label={"Date"}
        value={format(date, 'yyyy-MM-dd')}
        onFocus={() => setShowDatePicker(true)} 
      />
      <DatePickerModal
        mode="single"
        visible={showDatePicker}
        date={date}
        onDismiss={() => setShowDatePicker(false)}
        onConfirm={handleDateChange}
      />
      <div style={{ padding:'16px'}}>
        <Button title="Add Event" mode="contained" onPress={handleAddEvent}>Add Event</Button>
    
      </div>
    </View>
  );
};


export default AddEventScreen;
