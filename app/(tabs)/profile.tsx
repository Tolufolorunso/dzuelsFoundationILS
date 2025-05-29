import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import useAuthStore from '@/store/auth.store';
import Button from '@/components/shared/Button';
import styles from '@/styles/profile.styles';
import { router } from 'expo-router';

const ProfileScreen = () => {
  let { user, logout, token, updateUser, isLoading } = useAuthStore(
    (state) => state
  );

  // State for editing
  const [profile, setProfile] = useState<any>(user);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempProfile, setTempProfile] = useState<any>(user);

  // Handle input change
  const handleChange = (key: any, value: any) => {
    setTempProfile({ ...tempProfile, [key]: value });
  };

  // Toggle edit state
  const toggleEdit = () => {
    if (isEditing) {
      setTempProfile(profile);
    }
    setIsEditing(!isEditing);
  };

  // Save changes
  const handleSave = async () => {
    setProfile(tempProfile);
    setIsEditing(false);
    try {
      const res = await updateUser(
        tempProfile.name,
        tempProfile.username,
        tempProfile.phone,
        token
      );
      Alert.alert('Profile Updated', 'Changes saved successfully', [
        { text: 'OK', style: 'default' },
      ]);
    } catch (error) {
      console.log(63, error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert('Logout', 'Do you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          {/* Profile Image */}
          <Image
            source={{
              uri:
                profile?.image_url ||
                'https://via.placeholder.com/100.png?text=Profile',
            }}
            style={styles.profileImage}
          />
          {/* Barcode */}
          <Text style={styles.infoText}>Barcode: {profile.barcode}</Text>

          {/* Role */}
          <Text style={styles.infoText}>Role: {profile.role}</Text>

          {/* Status */}
          <Text style={styles.infoText}>Status: Active</Text>
        </View>

        {/* Surname */}
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={tempProfile.name}
          onChangeText={(text) => handleChange('name', text)}
          editable={isEditing}
        />

        {/* Username */}
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={tempProfile.username}
          onChangeText={(text) => handleChange('username', text)}
          editable={isEditing}
        />

        {/* Phone */}
        <Text style={styles.label}>Phone:</Text>
        <TextInput
          style={styles.input}
          value={tempProfile.phone}
          onChangeText={(text) => handleChange('phone', text)}
          editable={isEditing}
          keyboardType="phone-pad"
        />

        {/* Edit/Save/Cancel Button */}
        <TouchableOpacity
          style={isEditing ? styles.buttonCancel : styles.buttonEdit}
          onPress={toggleEdit}
        >
          <Text style={styles.buttonText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
        </TouchableOpacity>

        {/* Save Button */}
        {isEditing && (
          <Button
            text="Save Changes"
            onPress={handleSave}
            loading={isLoading}
          />
        )}

        {/* Logout Button */}
        <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;
