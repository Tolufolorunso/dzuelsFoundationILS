import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '@/components/shared/Button';
import Colors from '@/data/Colors';

const HomeScreen: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>('students');

  const handleSendMessage = () => {
    alert('Message sent!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Overview Section */}
      <View style={styles.overviewSection}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>36</Text>
          <Text style={styles.statLabel}>Total Borrowed</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>36</Text>
          <Text style={styles.statLabel}>Total Overdues</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>28</Text>
          <Text style={styles.statLabel}>Overdue Over a Month</Text>
        </View>
      </View>

      {/* User Stats Section */}
      <View style={styles.userStatsSection}>
        <View style={styles.userStat}>
          <Text style={styles.statLabel}>Students:</Text>
          <Text style={styles.statValue}>364</Text>
        </View>
        <View style={styles.userStat}>
          <Text style={styles.statLabel}>Staff:</Text>
          <Text style={styles.statValue}>9</Text>
        </View>
        <View style={styles.userStat}>
          <Text style={styles.statLabel}>Guests:</Text>
          <Text style={styles.statValue}>4</Text>
        </View>
        <View style={styles.userStat}>
          <Text style={styles.statLabel}>Teachers:</Text>
          <Text style={styles.statValue}>29</Text>
        </View>
      </View>

      {/* Gender Stats Section */}
      <View style={styles.genderSection}>
        <View style={styles.genderBox}>
          <Text style={styles.statLabel}>Female:</Text>
          <Text style={styles.statValue}>221</Text>
        </View>
        <View style={styles.genderBox}>
          <Text style={styles.statLabel}>Male:</Text>
          <Text style={styles.statValue}>143</Text>
        </View>
        <View style={styles.genderBox}>
          <Text style={styles.statLabel}>Difference:</Text>
          <Text style={styles.statValue}>78</Text>
        </View>
      </View>

      {/* Last Registered */}
      <View style={styles.lastRegistered}>
        <Text style={styles.sectionTitle}>Last Registered</Text>
        <Text style={styles.statLabel}>
          Name: <Text style={styles.statValue}>Lucy Emmanuel</Text>
        </Text>
        <Text style={styles.statLabel}>
          Barcode: <Text style={styles.statValue}>20250406</Text>
        </Text>
      </View>

      {/* Bulk SMS Section */}
      <View style={styles.smsSection}>
        <Text style={styles.sectionTitle}>Send Bulk SMS</Text>
        <Text style={styles.label}>Message Body</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Type your message..."
          value={message}
          onChangeText={(text) => {
            setMessage(text);
            setCharCount(text.length);
          }}
          multiline
        />
        <Text style={styles.charCount}>Characters: {charCount}</Text>

        <Text style={styles.label}>Recipient</Text>
        <Picker
          selectedValue={recipient}
          onValueChange={(itemValue: any) => setRecipient(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Students" value="students" />
          <Picker.Item label="Staff" value="staff" />
          <Picker.Item label="Guests" value="guests" />
        </Picker>

        <Text style={styles.label}>From</Text>
        <TextInput style={styles.input} value="Dzuels" editable={false} />
        <Button text="Send Message" onPress={handleSendMessage} />
      </View>

      {/* Report Section */}
      <View style={styles.reportSection}>
        <Text style={styles.sectionTitle}>Message Report</Text>
        <Text>No report available</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },

  /* Overview Section */
  overviewSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  statLabel: {
    fontSize: 12,
    color: '#555',
  },

  /* User Stats Section */
  userStatsSection: {
    marginBottom: 20,
  },
  userStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
  },

  /* Gender Section */
  genderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genderBox: {
    flex: 1,
    padding: 13,
    backgroundColor: '#ffebee',
    borderRadius: 6,
    marginHorizontal: 5,
    alignItems: 'center',
  },

  /* Last Registered */
  lastRegistered: {
    backgroundColor: '#fff3e0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  /* SMS Section */
  smsSection: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },

  /* Report Section */
  reportSection: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 8,
  },
});

export default HomeScreen;
