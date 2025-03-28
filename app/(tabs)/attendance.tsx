import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import Button from '@/components/shared/Button';
import DateTimePicker from '@react-native-community/datetimepicker';

interface BarcodeScannedEvent {
  data: string;
}

export default function AttendanceScreen() {
  const [eventTitle, setEventTitle] = useState<string>('');
  const [eventDate, setEventDate] = useState<Date | string>(''); // Can be a string or Date
  const [eventPoints, setEventPoints] = useState<string>('');
  const [barcode, setBarcode] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Ask for camera permission
  const requestCameraPermission = async (): Promise<void> => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Camera permission is needed to scan barcodes'
      );
    }
  };

  const handleBarCodeScanned = ({ data }: BarcodeScannedEvent): void => {
    setBarcode(data);
    setScanning(false);
  };

  const handleAttendance = (): void => {
    Alert.alert('Attendance Marked', `Student Barcode: ${barcode}`);
  };

  const handleDateChange = (
    event: any,
    selectedDate: Date | undefined
  ): void => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEventDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mark Attendance</Text>

      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={eventTitle}
        onChangeText={setEventTitle}
      />

      {/* Date Picker */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        <Text style={styles.dateText}>
          {eventDate instanceof Date
            ? eventDate.toLocaleDateString()
            : eventDate}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={eventDate instanceof Date ? eventDate : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Points for the Event"
        value={eventPoints}
        keyboardType="numeric"
        onChangeText={setEventPoints}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Student Barcode"
        value={barcode}
        onChangeText={setBarcode}
      />
      <Button text="Mark Attendance" onPress={handleAttendance} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  scanButton: {
    backgroundColor: '#6A5ACD',
  },
  attendanceButton: {
    backgroundColor: '#DC143C',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  camera: {
    height: 250,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});
