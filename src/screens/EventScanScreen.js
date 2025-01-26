import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, Button } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

const EventScanScreen = ({ route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const { event } = route.params; // Get the event ID passed via navigation

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    Alert.alert('QR Code Scanned', `Type: ${type}\nData: ${data}`);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Details</Text>
      <Text style={styles.eventId}>Event ID: {event.title}</Text>

      <Camera
        style={styles.camera}
        type={CameraType.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ['qr'], // Only scan QR codes
        }}
      />

      {scanned && (
        <Button
          title="Scan Again"
          onPress={() => setScanned(false)}
          color="#007bff"
        />
      )}

      {scannedData && (
        <Text style={styles.scannedData}>Scanned Data: {scannedData}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  eventId: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  camera: {
    width: '100%',
    height: 400, // Set a fixed height to prevent layout issues
    marginBottom: 16,
  },
  scannedData: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
  },
});

export default EventScanScreen;
