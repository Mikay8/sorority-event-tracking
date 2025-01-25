import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, DataTable,IconButton, MD3Colors } from 'react-native-paper';
const AttendanceGrid = ({ visible, onDismiss, attendees,removeUser,addUser }) => {
  return (

      <Modal transparent={true} visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
        <Text style={styles.title}>Attendance</Text>
        <IconButton
          icon="plus"
          onPress={addUser}
        />
        {attendees && attendees.length > 0 ? (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Email</DataTable.Title>
              <DataTable.Title></DataTable.Title>
            </DataTable.Header>
            {attendees.map((attendee) => (
              <DataTable.Row key={attendee.id}>
                <DataTable.Cell>{attendee.lastName +' ' +attendee.firstName}</DataTable.Cell>
                <DataTable.Cell>{attendee.email}</DataTable.Cell>
                <DataTable.Cell>
                      
                </DataTable.Cell>
                <DataTable.Cell>
                      <IconButton
                      icon="delete"
                      onPress={() => removeUser(attendee.id)}
                    />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        ) : (
          <Text style={styles.noAttendeesText}>No attendees for this event.</Text>
        )}
        <Button mode="contained" onPress={onDismiss} style={styles.closeButton}>
          Close
        </Button>
      </Modal>
 
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noAttendeesText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  closeButton: {
    marginTop: 20,
  },
});

export default AttendanceGrid;
