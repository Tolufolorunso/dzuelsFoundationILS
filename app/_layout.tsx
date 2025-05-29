import useAuthStore from '@/store/auth.store';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ActivityIndicator, View } from 'react-native';
import FullLoadingActivityIndicator from '@/components/shared/FullLoadingActivityIndicator';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'roboto-700': require('@/assets/fonts/Roboto-Bold.ttf'),
    'roboto-500': require('@/assets/fonts/Roboto-Medium.ttf'),
    'roboto-400': require('@/assets/fonts/Roboto-SemiBold.ttf'),
    poppins: require('@/assets/fonts/Poppins-Regular.ttf'),
    singleDay: require('@/assets/fonts/SingleDay-Regular.ttf'),
  });

  const { user, token, isCheckingAuth, checkAuth } = useAuthStore(
    (state) => state
  );

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    if (!loaded) return; // Fonts must load first
  }, [loaded]);

  if (isCheckingAuth && !loaded && !error) {
    return <FullLoadingActivityIndicator />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
