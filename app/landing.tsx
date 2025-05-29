import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '@/data/Colors';
import Button from '@/components/shared/Button';
import { useRouter } from 'expo-router';
import Header from '@/components/header/Header';
import AppText from '@/components/appText/AppText';
import { RedirectIfAuthenticated } from '@/components/auth/RedirectIfAuthenticated';

const LandingScreen: React.FC = () => {
  const router = useRouter();
  return (
    <RedirectIfAuthenticated>
      <Image
        source={require('../assets/images/library-photo.jpg')}
        style={styles.image}
      />
      <View style={{ padding: 20 }}>
        <Header title="Dzuels Library Management" type={2} />
        <AppText
          title="Efficiently catalog books, track borrowing, and manage library
          resources."
          type={2}
          style={styles.welcomeTextSub}
        />
        <Header title="Staff Login" type={2} style={styles.welcomeTextSub} />
        <Button text="Get Started" onPress={() => router.push('/login')} />
        <AppText
          type={2}
          style={styles.haveAnAccount}
          title="Already have an account? Sign In Here"
        />
      </View>
    </RedirectIfAuthenticated>
  );
};

export default LandingScreen;

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
    textAlign: 'center',
    color: Colors.GRAY,
    marginTop: 10,
    marginVertical: 40,
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
    textAlign: 'center',
    marginTop: 7,
    color: Colors.GRAY,
  },
});
