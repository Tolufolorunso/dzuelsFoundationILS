import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/data/Colors';

interface Option {
  title: string;
  route: string;
}

const options: Option[] = [
  { title: 'Check In', route: '/(screens)/checkin' },
  { title: 'Check Out', route: '/(screens)/checkout' },
  { title: 'Holds', route: '/(screens)/holds' },
  { title: 'Overdues', route: '/(screens)/overdues' },
  { title: 'Renew', route: '/(screens)/renew' },
];

export default function CirculationScreen(): JSX.Element {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Circulation</Text>
      <View style={styles.grid}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              router.push(
                option.route as
                  | '/(screens)/checkin'
                  | '/(screens)/checkout'
                  | '/(screens)/holds'
                  | '/(screens)/overdues'
                  | '/(screens)/renew'
              )
            }
            style={styles.buttonContainer}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[Colors.PRIMARY, Colors.PRIMARY]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{option.title}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.PRIMARY,
    marginBottom: 30,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  buttonContainer: {
    width: '46%', // Two buttons per row with some space in between
  },
  button: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // For Android shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
});
