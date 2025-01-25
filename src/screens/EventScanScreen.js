import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-camera'; // For scanning barcodes

const EventScanScreen = ({ route }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [cameraRef, setCameraRef] = useState(null);
    const { event } = route.params; 
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      Alert.alert('Scanned Data', `Type: ${type}\nData: ${data}`);
    };
  
    if (hasPermission === null) {
      return <Text>Requesting camera permission...</Text>;
    }
  
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Details</Text>
      <Text style={styles.eventId}>Event ID: {event.title}</Text>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr], // Scans only QR codes
        }}
        ref={(ref) => setCameraRef(ref)}
      />
      {scanned && (
        <Button
          title="Scan Again"
          onPress={() => setScanned(false)}
        />
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
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default EventScanScreen;
