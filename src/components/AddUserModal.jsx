import React, { useState } from 'react';
import { View, StyleSheet, FlatList,ScrollView } from 'react-native';
import { Modal, Text, TextInput, Button, Card, Checkbox } from 'react-native-paper';
import { addUserToEvent } from '../services/firestore/events'; // Function to add user to event

const AddUserModal = ({ visible, onClose, eventId, allUsers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filter users based on the search query
  const filteredUsers = allUsers.filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding a user
  const handleAddUser = async () => {
    if (!selectedUser) {
      alert('Please select a user to add');
      return;
    }
    setLoading(true);
    try {
      await addUserToEvent(eventId.id, selectedUser.id); // Use the addUserToEvent function
      setSelectedUser(null); // Reset selection
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error adding user:', error.message);
      alert('Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modal}>
      <Text style={styles.title}>Add User to Event</Text>
      <TextInput
        label="Search Users"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        mode="outlined"
      />
      <ScrollView style={styles.scroll}>
      <FlatList
        data={filteredUsers}
        
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            style={[
              styles.userCard,
              selectedUser?.id === item.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedUser(item)}
          >
            <Card.Content>
              <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </Card.Content>
            <Checkbox
              status={selectedUser?.id === item.id ? 'checked' : 'unchecked'}
              onPress={() => setSelectedUser(item)}
            />
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No users found</Text>}
      />
      </ScrollView>
      
      <View style={styles.actions}>
        <Button onPress={onClose} mode="outlined" style={styles.cancelButton}>
          Cancel
        </Button>
        <Button
          onPress={handleAddUser}
          mode="contained"
          loading={loading}
          disabled={!selectedUser || loading}
        >
          Add User
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  scroll:{
         padding: 10,
    height: '300px'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchInput: {
    marginBottom: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  selectedCard: {
    borderColor: '#6200ee',
    backgroundColor: '#f0f0ff',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 16,
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    marginRight: 8,
  },
});

export default AddUserModal;
