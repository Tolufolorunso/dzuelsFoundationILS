import React, { useEffect } from 'react';
import { Slot, Stack, useRouter } from 'expo-router';
import useAuthStore from '@/store/auth.store';

const AuthLayout = () => {
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
