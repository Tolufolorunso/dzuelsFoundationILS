import { ProfileImage } from '@/components/search/ProfileImage';
import { PatronCustomInput } from '@/components/search/PatronCustomInput';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/patron.styles';
import { View, Text, ScrollView, Alert } from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import usePatronStore from '@/store/patron.store';
import Button from '@/components/shared/Button';
import { patronLabelArr } from '@/data/patronLabelArr';
import useAuthStore from '@/store/auth.store';
import FullLoadingActivityIndicator from '@/components/shared/FullLoadingActivityIndicator';

export default function PatronProfileScreen() {
  let [formData, setFormData] = useState<any>({});
  const [originalData, setOriginalData] = useState<any>({});

  const [isEditing, setIsEditing] = useState(false);

  const { editPatron, isLoading, fetchPatron, imgUrl } = usePatronStore(
    (state) => state
  );
  const { token } = useAuthStore((state) => state);
  const { barcode } = useLocalSearchParams();

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchPatron(barcode);
        setFormData(data?.patron);
        setOriginalData(data?.patron);
      } catch (error) {
        Alert.alert('Error', 'Failed to load patron data');
      }
    };

    if (barcode) {
      fetchData();
    }
  }, [barcode]);

  // Handle text input changes
  const handleChange = (field: string, value: string) => {
    console.log(field, value);
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  // Handle image change

  // Save changes to patron data
  const handleSubmit = async () => {
    try {
      delete formData.imgUrl;
      const res = await editPatron(formData, token);
      if (!res.status) {
        throw new Error(res.message);
      }
      Alert.alert('Success', 'Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  // Toggle Edit Mode
  const toggleEdit = () => {
    if (isEditing) {
      setFormData(originalData);
    }
    setIsEditing((prev) => !prev);
  };

  if (isLoading) {
    return (
      <FullLoadingActivityIndicator>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </FullLoadingActivityIndicator>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Section */}
      <ProfileImage barcode={barcode} imageUrl={imgUrl} />
      {/* Title */}
      <Text style={styles.title}>
        {formData.firstname} {formData.surname}
      </Text>
      <Text style={styles.subTitle}>
        {formData.gender} | Barcode: {formData.barcode}
      </Text>

      {/* Form Section */}
      {patronLabelArr.map(({ label, key }) => (
        <PatronCustomInput
          key={key}
          field={key}
          label={label}
          isEditing={isEditing}
          value={formData[key] || ''}
          handleChange={handleChange}
        />
      ))}

      {/* Edit/Cancel Button */}
      {isEditing ? (
        <Button text="Save Changesss" onPress={handleSubmit} />
      ) : (
        <Button text="Edit" onPress={toggleEdit} />
      )}

      {isEditing && <Button text="Cancel" onPress={toggleEdit} />}
    </ScrollView>
  );
}
