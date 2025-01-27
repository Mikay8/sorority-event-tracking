import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, Button, Platform,ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { Html5QrcodeScanner } from 'html5-qrcode';
import getUserProfile from '../services/firestore/users';
import { set } from 'date-fns';

const EventScanScreen = ({ route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { event } = route.params; // Get the event ID passed via navigation

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
        { fps: 10, qrbox: 250 },
        false
      );

      scanner.render(
        (decodedText, decodedResult) => {
          setScanned(true);
          setScannedData(decodedText);
          //Alert.alert('QR Code Scanned', `Data: ${decodedText}`);
        },
        (errorMessage) => {
         // console.log(`Error scanning = ${errorMessage}`);
        }
      );

      return () => {
        scanner.clear();
      };
    }
  }, [hasPermission]);
  
  useEffect(() => {
      (async () => {
        setLoading(true);
      if (scannedData) {
        // Get the user profile from Firestore
        getUserProfile(scannedData)
          .then((user) => {
            consle.debug(user);
            if (user) {
              Alert.alert('User Found', `Name: ${user.name}`);
            } else {
              Alert.alert('User Not Found', 'No user found with this ID');
            }
          })
          .catch((error) => {
            console.error('Error getting user profile:', error);
            Alert.alert('Error', 'There was an error getting the user profile');
          }).finally(() => {
            setLoading(false);
          });
      }
    });

  }, []);
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
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Details</Text>
      <Text style={styles.eventId}>Event ID: {event.title}</Text>
      {scannedData && (
        <Text style={styles.scannedData}>Scanned Data: {scannedData}</Text>
      )}

      {Platform.OS === 'web' ? (
        <div id="reader" style={styles.camera}></div>
      ) : (
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
          barCodeTypes={[Camera.Constants.BarCodeType.qr]} // Only scan QR codes
        />
      )}

      {/* {scanned && (
        <Button
          title="Scan Again"
          onPress={() => setScanned(false)}
          color="#007bff"
        />
      )} */}

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
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
    width: '50%',
    height: 200, // Set a fixed height to prevent layout issues
    marginBottom: 20,
  },
  scannedData: {
    marginTop: 16,
    fontSize: 16,
    color: 'green',
  },
});

export default EventScanScreen;