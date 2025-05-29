import { View, Text } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

import Button from '../shared/Button';
import styles from '@/styles/home.styles';

type TechDayEventProps = {};

const TechDayEvent: React.FC<TechDayEventProps> = () => {
  const router = useRouter();
  return (
    <View style={styles.card}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tech Day 2025</Text>
      <Text style={{ marginTop: 10 }}>📍 Ijero Ekiti</Text>
      <Text>📅 April 2025</Text>
      <Text style={{ marginTop: 10 }}>Theme: Raising Future Tech Leaders</Text>

      <Button
        text="Register Student"
        onPress={() => router.push('/(screens)/register-techday')}
      />
    </View>
  );
};

export default TechDayEvent;
