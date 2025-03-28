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
                profile.image_url ||
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    marginVertical: 2,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fafafa',
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  buttonEdit: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#f44336',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonSave: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonLogout: {
    backgroundColor: '#FF5722',
    padding: 14,
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
