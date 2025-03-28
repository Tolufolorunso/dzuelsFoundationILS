import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '@/data/Colors';
import Button from '@/components/shared/Button';
import { useRouter } from 'expo-router';

export default function LandingScreen() {
  const router = useRouter();
  return (
    <View>
      <Image
        source={require('../assets/images/library-photo.jpg')}
        style={styles.image}
      />
      <View style={{ padding: 20 }}>
        <Text style={styles.welcomeText}>
          Welcome to Dzuels Library Management
        </Text>
        <Text style={[styles.welcomeTextSub, { marginVertical: 40 }]}>
          Efficiently catalog books, track borrowing, and manage library
          resources
        </Text>
        <Text style={styles.welcomeTextSub}>Staff login</Text>
        <Button
          text="Get Started"
          onPress={() => router.push('/(auth)/login')}
        />
        <Text style={styles.haveAnAccount}>
          Already have an account? Sign In Here
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  welcomeTextSub: {
    fontSize: 17,
    fontWeight: 600,
    textAlign: 'center',
    color: Colors.GRAY,
    marginTop: 10,
  },

  btn: {
    padding: 15,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.WHITE,
  },
  haveAnAccount: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 7,
    color: Colors.GRAY,
  },
});
