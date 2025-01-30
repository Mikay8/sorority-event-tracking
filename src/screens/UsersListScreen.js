import React, { useEffect, useState,useCallback } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Text } from 'react-native';
import { getAllUsers } from '../services/firestore/users';

const UsersListScreen = () => {
    const [users, setUsers] = useState([]);
    
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
    
    return (
        <View style={styles.container}>
        <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={styles.userContainer}>
                <Text style={styles.userName}>ID: {item.accountId}</Text>
                <Text style={styles.userEmail}>{item.firstName} {item.lastName}</Text>
            </View>
            )}
        />
        </View>
    );
    }   
    const styles = StyleSheet.create({
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
    });
    export default UsersListScreen;