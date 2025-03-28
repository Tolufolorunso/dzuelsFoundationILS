import useAuthStore from '@/store/auth.store';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const { user, token, checkAuth } = useAuthStore((state) => state);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const isSignedIn = user && token;
    const inLandingScreen = segments[0] === 'landing';
    const inAuthScreen = segments[0] === '(auth)';

    if (!isSignedIn && !inLandingScreen && !inAuthScreen) {
      router.replace('/(auth)/login');
    }

    if (isSignedIn && inAuthScreen) {
      router.replace('/(tabs)');
    }

    if (isSignedIn && inLandingScreen) {
      router.replace('/(tabs)');
    }
  }, [user, token, segments]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="landing"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)/login"
        options={{
          title: 'Login',
          headerTransparent: true,
          headerTitle: '',
        }}
      />
    </Stack>
  );
}
