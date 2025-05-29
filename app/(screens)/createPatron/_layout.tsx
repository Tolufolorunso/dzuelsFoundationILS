import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const CreatePatronLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="patronDetail" />
      <Stack.Screen name="patronAddress" />
      <Stack.Screen name="patronSchoolInfo" />
      <Stack.Screen name="parentInformation" />
    </Stack>
  );
};

export default CreatePatronLayout;
