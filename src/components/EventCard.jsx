import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const EventCard = ({ title, description, location, onEdit, attendance }) => {
  const theme = useTheme();
  return (
    <Card style={[styles.card,{backgroundColor:theme.colors.background}]}>
      <Card.Content style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.location}>{location}</Text>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button mode="contained" onPress={onEdit} style={styles.button}>
          Edit
        </Button>
        <Button mode="contained" onPress={attendance} style={styles.button}>
           Attendance
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  content: {
    alignItems: 'center', // Centers text horizontally
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
  
    textAlign: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    fontStyle: 'italic',
   
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Spreads buttons evenly
    paddingVertical: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default EventCard;
