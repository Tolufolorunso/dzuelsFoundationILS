import useAuthStore from '@/store/auth.store';
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <Redirect href={'/landing'} />
    </View>
  );
}
