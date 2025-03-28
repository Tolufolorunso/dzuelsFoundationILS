import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Picker } from '@react-native-picker/picker';
import Button from '@/components/shared/Button';
import { useRouter } from 'expo-router';

export default function SearchScreen() {
  const [surname, setSurname] = useState('');
  const [barcode, setBarcode] = useState('');
  const [type, setType] = useState('Any');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://dzuelsfoundation.vercel.app/api/patrons'
        );
        const result = await response.json();
        if (result.status) {
          setData(result.data);
        } else {
          console.error('Failed to fetch patrons:', result.errorMessage);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(
      (item: any) =>
        (surname === '' ||
          item?.surname.toLowerCase().includes(surname.toLowerCase())) &&
        (barcode === '' || item.barcode.includes(barcode)) &&
        (type === 'Any' || item.patronType.toLowerCase() === type.toLowerCase())
    );
  }, [data, surname, barcode, type]);

  const clearFilters = () => {
    setSurname('');
    setBarcode('');
    setType('Any');
  };

  const handlePatronDetail = (patronBarcode: string) => {
    router.push({
      pathname: '/(screens)/patron',
      params: { barcode: patronBarcode },
    });
  };

  return (
    <View style={styles.container}>
      {/* FILTERS */}
      <View style={styles.filters}>
        <Text style={styles.heading}>Search</Text>
        <TextInput
          style={styles.input}
          placeholder="Surname"
          value={surname}
          onChangeText={setSurname}
        />
        <TextInput
          style={styles.input}
          placeholder="Barcode"
          value={barcode}
          onChangeText={setBarcode}
          keyboardType="numeric"
        />
        <View style={{ borderWidth: 1, borderColor: '#ddd' }}>
          <Picker
            selectedValue={type}
            onValueChange={setType}
            style={styles.picker}
          >
            <Picker.Item label="Any" value="Any" style={styles.pickerText} />
            <Picker.Item
              label="Staff"
              value="staff"
              style={styles.pickerText}
            />
            <Picker.Item
              label="Student"
              value="student"
              style={styles.pickerText}
            />
          </Picker>
        </View>
        <Button text="CLEAR SEARCH" onPress={clearFilters} size="small" />
      </View>

      {/* LOADING STATE */}
      {loading ? (
        <ActivityIndicator size="large" color="#d9534f" />
      ) : (
        <FlashList
          data={filteredData}
          keyExtractor={({ barcode }) => barcode}
          estimatedItemSize={100}
          renderItem={({ item: { barcode, surname, patronType, points } }) => (
            <TouchableOpacity onPress={() => handlePatronDetail(barcode)}>
              <View style={styles.row}>
                <Text style={styles.cell}>{barcode}</Text>
                <Text style={styles.cell}>{surname}</Text>
                <Text style={styles.cell}>{patronType}</Text>
                <Text style={styles.cell}>{points}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  filters: {
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d9534f',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 7,
    borderRadius: 6,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  picker: {
    marginBottom: 7,
    padding: 0,
  },
  pickerText: {
    fontSize: 10,
    padding: 0,
  },
  row: {
    flexDirection: 'row',
    gap: 5,
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    fontSize: 11,
    color: '#333',
  },
});
