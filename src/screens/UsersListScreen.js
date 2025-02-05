import React, { useEffect, useState,useCallback } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Modal, Portal, Text, DataTable,IconButton } from 'react-native-paper';
import { getAllUsers,saveUserProfile, deleteUser } from '../services/firestore/users';
import TextInputWrapper from '../components/TextInputWrapper';
import ButtonWrapper from '../components/ButtonWrapper';

const UsersListScreen = () => {
    const [users, setUsers] = useState([]);
    const [accountId, setAccountId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addUserModal, setAddUserModal] = useState(false);
    const showModal = () => setVisible(true);

    
    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const fetchedUsers = await getAllUsers();
            setUsers(fetchedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        };
    
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
          await deleteUser(id);
          setUsers((users) => users.filter((user) => user.id !== id));
        } catch (error) {
          console.error('Error logging out:', error.message);
        }
      };
      const addUser = async () => {
        try {
            const newUser = {
                accountId: accountId,
                firstName: firstName,
                lastName: lastName,
            };
          await saveUserProfile(accountId,{newUser});
          setAddUserModal(false);
          setAccountId('');
          setFirstName('');
          setLastName('');

          setUsers((users) => [...users, newUser]);
        } catch (error) {
          console.error('Error logging out:', error.message);
        }
      };
    
    return (
        <View style={styles.container}>
            <Portal>
                <Modal visible={addUserModal} onDismiss={() => setAddUserModal(false)}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add User</Text>
                        <TextInputWrapper
                            label="Account ID"
                            value={accountId}
                            onChangeText={setAccountId}
                        />
                        <TextInputWrapper
                            label="First Name"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <TextInputWrapper
                            label="Last Name"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                        <ButtonWrapper title={'Add User'} mode="contained" onPress={addUser}/>
                           
                    </View>
                </Modal>
            </Portal>
            <View style={styles.header}>
                <IconButton
                  icon="plus"
                  onPress={() => setAddUserModal(true)}
                />
            </View>
        <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={styles.userContainer}>
                <Text style={styles.userName}>ID: {item.accountId}</Text>
                <Text style={styles.userEmail}>{item.firstName} {item.lastName}</Text>
                <IconButton
                          icon="delete"
                          onPress={()=>deleteUser(item.id)}
                        />
            </View>
            )}
        />
        </View>
    );
    }   
    const styles = StyleSheet.create({
        header:{

        },
        container: {
        flex: 1,
        padding: 20,
        },
        userContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        },
        userName: {
        fontSize: 18,
        fontWeight: 'bold',
        },
        userEmail: {
        fontSize: 16,
        },
        modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        },
        modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        },

    });
    export default UsersListScreen;