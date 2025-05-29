import React, { useEffect } from 'react';
import { router, Stack } from 'expo-router';
import useAuthStore from '@/store/auth.store';

const ScreensLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="checkin"
        options={{
          title: 'Checkin',
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          title: 'Checkout',
        }}
      />
      <Stack.Screen
        name="holds"
        options={{
          title: 'Book Outside',
        }}
      />
      <Stack.Screen
        name="overdues"
        options={{
          title: 'Books Not Returned',
        }}
      />
      <Stack.Screen
        name="renew"
        options={{
          title: 'Renew Book',
        }}
      />
      <Stack.Screen
        name="patron"
        options={{
          title: 'Patron Profile',
          headerBackVisible: true,
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="camera"
        options={{
          title: 'Patron Profile',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register-techday"
        options={{
          title: 'Techday Registration',
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ScreensLayout;
