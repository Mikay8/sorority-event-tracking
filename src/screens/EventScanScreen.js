import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Platform } from 'react-native';
import ActivityIndicatorWrapper from '../components/ActivityIndicatorWrapper';
import {Alert, Button} from 'react-native-paper';
import { Camera } from 'expo-camera';
import { Html5QrcodeScanner } from 'html5-qrcode';
import {getUserProfile} from '../services/firestore/users';
import {addUserToEvent} from '../services/firestore/events';
import { zh } from 'react-native-paper-dates';

const EventScanScreen = ({ route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { event } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web' && hasPermission) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 300 }, // Increased QR box size
        false
      );

      scanner.render(
        (decodedText, decodedResult) => {
          setScanned(true);
          setScannedData(decodedText);
        },
        // (errorMessage) => {
        //   console.error(`Error scanning: ${errorMessage}`);
        //   Alert.alert('Error', `QR code parse error: ${errorMessage}`);
        // }
      );

      return () => {
        scanner.clear().catch(error => console.error('Error clearing scanner:', error));
      };
    }
  }, [hasPermission]);

  useEffect(() => {
    if (scannedData) {
      setLoading(true);
      getUserProfile(scannedData)
        .then((user) => {
          if (user) {
            addUserToEvent(event.id, scannedData).then(() => {
                alert(  ` ${user.displayName} Added to ` + event.title);
            }).catch((error) => {
                alert( error);
            
            });
          }
        })
        .catch((error) => {
          //console.error('Error getting user profile:', error);
          alert(error);
        })
        .finally(() => {
          setLoading(false);
          setScanned(false);
          setScannedData(null);
        });
    }
  }, [scannedData]);

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
      
      {Platform.OS === 'web' ? (
        <View >
          <div id="reader" style={styles.camera}></div>
          {loading && (
            <ActivityIndicatorWrapper text={"Loading scanner..."}/>
          )}
        </View>
      ) : (
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
          barCodeTypes={[Camera.Constants.BarCodeType.qr]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6c757d',
  },
});

export default EventScanScreen;