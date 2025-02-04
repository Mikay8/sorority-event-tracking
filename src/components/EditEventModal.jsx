import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import TextInputWrapper from '../components/TextInputWrapper';
import { Card, TextInput, Text } from 'react-native-paper';
import ButtonWrapper from './ButtonWrapper';
import { useTheme } from 'react-native-paper';
const EditEventModal = ({
  visible,
  onClose,
  event,
  onChangeEvent,
  onSave,
  onDelete
}) => {
  const theme = useTheme();
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Card style={styles.modalCard}>
          <Card.Content>
            <Text style={styles.modalTitle}>Edit Event</Text>
            <TextInputWrapper
              label="Title"
              value={event?.title || ''}
              onChangeText={(text) => onChangeEvent({ ...event, title: text })}
              style={styles.input}
            />
            <TextInputWrapper
              label="Description"
              value={event?.description || ''}
              onChangeText={(text) =>
                onChangeEvent({ ...event, description: text })
              }
              style={styles.input}
            />
            <TextInputWrapper
              label="Location"
              value={event?.location || ''}
              onChangeText={(text) =>
                onChangeEvent({ ...event, location: text })
              }
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <ButtonWrapper title="Save" onPress={onSave} />
              <ButtonWrapper title="Delete" onPress={onDelete} buttonColor={theme.colors.error} />
              <ButtonWrapper title="Cancel" onPress={onClose} buttonColor={theme.colors.secondary} />
            </View>
          </Card.Content>
        </Card>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCard: {
    width: '90%',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
});

export default EditEventModal;
