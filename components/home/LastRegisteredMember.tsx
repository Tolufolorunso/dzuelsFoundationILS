import React from 'react';
import { Text, View } from 'react-native';
import styles from '@/styles/home.styles';
import Button from '../shared/Button';
import { router } from 'expo-router';
import Header from '../header/Header';

export function LastRegisteredMember({
  fullname,
  barcode,
}: {
  fullname: string;
  barcode: string;
}) {
  return (
    <View style={styles.card}>
      <Header title="Last Registered Patron" type={2} />
      <Text style={styles.statLabel}>
        Name: <Text style={styles.statValue}>{fullname}</Text>
      </Text>
      <Text style={styles.statLabel}>
        Barcode: <Text style={styles.statValue}>{barcode}</Text>
      </Text>
      <Button
        text="Create New Patron"
        onPress={() => router.push('/(screens)/createPatron')}
      />
    </View>
  );
}
