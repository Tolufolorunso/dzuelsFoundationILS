import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import usePatronStore from '@/store/patron.store';
import Button from '@/components/shared/Button';
import Colors from '@/data/Colors';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function PatronProfileScreen() {
  const [formData, setFormData] = useState<any>({});
  const [originalData, setOriginalData] = useState<any>({});
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const { editPatron, fetchPatron } = usePatronStore((state) => state);

  const { barcode } = useLocalSearchParams();

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dzuelsfoundation.vercel.app/api/patrons/short-profile/${barcode}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const { patron } = await response.json();
        setFormData(patron);
        setOriginalData(patron); // Save original data for canceling edits
        if (patron.imgUrl) {
          setImageUrl(patron.imgUrl);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to load patron data');
      } finally {
        setLoading(false);
      }
    };

    if (barcode) {
      fetchData();
    }
  }, [barcode]);

  // Handle text input changes
  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  // Handle image change
  const handleImageChange = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ['images', 'videos'],
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // console.log(result);

    // if (!result.canceled) {
    //   setImageUrl(result.assets[0].uri);
    // }
    try {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission denied, "We need permissions');
          return;
        }
      }
      //launch image library
      const result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
        base64: true,
      });
      if (!result.cancelled) {
        // setImageUrl('data:image/jpeg;base64,' + result.base64);
        setImageUrl(result.assets[0].uri);

        if (result.assets[0].base64) {
          setImage(result.assets[0].base64);
        } else {
          // try {
          //   const base64 = await FileSystem.readAsStringAsync(
          //     result.assets[0].uri,
          //     { encoding: FileSystem.EncodingType.base64 }
          //   );
          //   setImage(base64);
          // } catch (error) {
          //   console.log(error);
          // }
        }
      }
      const uriParts = image?.split('.') as string[];
      const filetype = uriParts[uriParts.length - 1];
      const imagetype = filetype
        ? `image/${filetype.toLowerCase()}`
        : 'image/jpeg';

      console.log(125, imagetype);
    } catch (error) {
      console.log('Error', error);
    }
  };

  // Save changes to patron data
  const handleSubmit = async () => {
    try {
      const res = await editPatron(formData);
      Alert.alert('Success', 'Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating data:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  // Toggle Edit Mode
  const toggleEdit = () => {
    if (isEditing) {
      setFormData(originalData);
      setImageUrl(originalData.imgUrl);
    }
    setIsEditing((prev) => !prev);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Section */}
      <TouchableOpacity onPress={handleImageChange}>
        <Image
          source={
            imageUrl
              ? { uri: imageUrl }
              : require('../../assets/images/login-image.jpg')
          }
          style={styles.image}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <Text style={styles.changeImageText}>Change Photo</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>
        {formData.firstname} {formData.surname}
      </Text>
      <Text style={styles.subTitle}>
        {formData.gender} | Barcode: {formData.barcode}
      </Text>

      {/* Form Section */}
      {[
        { label: 'First Name', key: 'firstname' },
        { label: 'Middle Name', key: 'middlename' },
        { label: 'Surname', key: 'surname' },
        { label: 'Gender', key: 'gender' },
        { label: 'Current Class', key: 'currentClass' },
        { label: 'School Name', key: 'schoolName' },
        { label: 'Parent Phone Number', key: 'parentPhoneNumber' },
        { label: 'Address', key: 'address' },
        { label: 'Library', key: 'library' },
      ].map(({ label, key }) => (
        <View key={key} style={styles.section}>
          <Text style={styles.label}>{label}:</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={formData[key] || ''}
            onChangeText={(value) => handleChange(key, value)}
            editable={isEditing}
          />
        </View>
      ))}

      {/* Edit/Cancel Button */}
      {isEditing ? (
        <Button text="Save Changes" onPress={handleSubmit} />
      ) : (
        <Button text="Edit" onPress={toggleEdit} />
      )}

      {isEditing && <Button text="Cancel" onPress={toggleEdit} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  statBox: {
    alignItems: 'center',
    width: '30%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
  },
  saveButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  changeImageText: {
    color: Colors.PRIMARY,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: '#eee',
    color: '#aaa',
  },

  cancelButton: {
    backgroundColor: '#e74c3c',
  },
});
