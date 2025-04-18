import { ProfileImage } from './../../components/search/ProfileImage';
import { PatronCustomInput } from './../../components/search/PatronCustomInput';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/patron.styles';
import { View, Text, ScrollView, Alert, ActivityIndicator } from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import usePatronStore from '@/store/patron.store';
import Button from '@/components/shared/Button';
import Colors from '@/data/Colors';
import { patronLabelArr } from '@/data/patronLabelArr';
import useAuthStore from '@/store/auth.store';

export default function PatronProfileScreen() {
  let [formData, setFormData] = useState<any>({});
  const [originalData, setOriginalData] = useState<any>({});
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const { editPatron, fetchPatron } = usePatronStore((state) => state);
  const { token } = useAuthStore((state) => state);

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

  // Save changes to patron data
  const handleSubmit = async () => {
    try {
      delete formData.imgUrl;
      const res = await editPatron(formData, token);
      if (!res.status) {
        throw new Error(res.errorMessage);
      }
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
      <ProfileImage
        barcode={barcode}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />

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
