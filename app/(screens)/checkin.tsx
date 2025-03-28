import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Colors from '@/data/Colors';
import CustomInput from '@/components/shared/CustomInput';
import Button from '@/components/shared/Button';
import Ionicons from '@expo/vector-icons/Ionicons';

import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import useCirculationStore from '@/store/circulation.store';

export default function CheckinScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [itemBarcode, setItemBarcode] = useState('');
  const [patronBarcode, setPatronBarcode] = useState('');
  const [point, setPoint] = useState('');

  const [scanningFor, setScanningFor] = useState<'item' | 'patron' | null>(
    null
  ); // ✅ Added state to track which field is being scanned

  const { loading, checkIn } = useCirculationStore((state) => state);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} text="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  // Handle barcode scanning
  const handleBarcodeScanned = (scanningResult: any) => {
    const { data } = scanningResult;
    if (scanningFor === 'item') {
      setItemBarcode(data);
    } else if (scanningFor === 'patron') {
      setPatronBarcode(data);
    }
    setIsCameraOpen(false);
    setScanningFor(null);
  };

  const handleCheckin = async () => {
    if (!patronBarcode || !itemBarcode || !point) {
      return Alert.alert('Incomplete', 'Enter all fields');
    }

    const res = await checkIn(patronBarcode, itemBarcode, Number(point));
    console.log(res);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check-in Screen</Text>
      <ScrollView style={styles.formContainer}>
        <View style={styles.form}>
          <CustomInput
            label="Patron Barcode"
            placeholder="Enter Patron Barcode"
            onChangeText={setPatronBarcode}
            value={patronBarcode}
            onFocus={() => {
              setIsCameraOpen(true);
              setScanningFor('patron'); // ✅ Track that patron barcode is being scanned
            }}
          />
          <CustomInput
            label="Item Barcode"
            placeholder="Enter Item Barcode"
            onChangeText={setItemBarcode}
            value={itemBarcode}
            onFocus={() => {
              setIsCameraOpen(true);
              setScanningFor('item'); // ✅ Track that item barcode is being scanned
            }}
          />
          <CustomInput
            label="Point"
            placeholder="Enter Student's point"
            onChangeText={setPoint}
            value={point}
          />
        </View>

        <Button text="Checkin" onPress={handleCheckin} loading={loading} />
      </ScrollView>
      {/* Camera Modal */}
      {isCameraOpen && (
        <Modal visible={isCameraOpen} animationType="slide" transparent>
          <View style={styles.cameraContainer}>
            <CameraView
              style={styles.camera}
              facing={facing}
              onBarcodeScanned={handleBarcodeScanned}
            >
              <Text style={styles.cameraText}>
                {scanningFor === 'item'
                  ? 'Scanning Item Barcode...'
                  : 'Scanning Patron Barcode...'}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <Ionicons
                  name="camera-reverse"
                  size={40}
                  color={Colors.PRIMARY}
                  style={styles.flipCamera}
                />
              </TouchableOpacity>
            </CameraView>
            <Button text="Close" onPress={() => setIsCameraOpen(false)} />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.PRIMARY,
  },

  formContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },

  form: {
    flex: 1,
    gap: 16,
    // flexGrow: 1,
  },

  //   buttonContainer: {
  //     marginTop: 'auto',
  //   },

  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: 300,
    alignItems: 'center',
  },
  cameraText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  flipCamera: {
    padding: 20,
  },
});
