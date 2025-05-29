import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '@/data/Colors';
import useCirculationStore from '@/store/circulation.store';
import FullLoadingActivityIndicator from '@/components/shared/FullLoadingActivityIndicator';
import Header from '@/components/header/Header';
import AppText from '@/components/appText/AppText';

import styles from '@/styles/circulation.styles';

type Option = {
  title: string;
  route: string;
};

const options: Option[] = [
  { title: 'Check In', route: '/(screens)/checkin' },
  { title: 'Check Out', route: '/(screens)/checkout' },
  { title: 'Holds', route: '/(screens)/holds' },
  { title: 'Overdues', route: '/(screens)/overdues' },
  { title: 'Renew', route: '/(screens)/renew' },
];

export default function CirculationScreen(): JSX.Element {
  const router = useRouter();
  const { holds, fetchHolds, isLoading } = useCirculationStore(
    (state) => state
  );

  useEffect(() => {
    if (holds.length > 0) return;
    fetchHolds();
  }, []);

  if (isLoading) {
    return <FullLoadingActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <Header style={styles.header} title="Circulation" />
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
              <AppText title={option.title} style={styles.buttonText} />
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
