import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import FullLoadingActivityIndicator from '@/components/shared/FullLoadingActivityIndicator';
import useCirculationStore from '@/store/circulation.store';
import styles from '@/styles/circulation.styles';
import Header from '@/components/header/Header';
import Colors from '@/data/Colors';
import AppText from '@/components/appText/AppText';
import { HoldItemType } from './overdues';
import ModalOverdue from '@/components/circulation/ModalOverdue';

const HoldScreen: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<HoldItemType | null>(
    null
  );
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
    <View style={styles.holdsContainer}>
      <View style={{ alignItems: 'center', paddingBottom: 20 }}>
        <Header
          style={{ color: Colors.PRIMARY, fontFamily: 'singleDay' }}
          title="Patrons with Overdue Books"
        />
        <Header type={3} title={`Total: ${holds.length}`} />
      </View>
      <FlatList
        data={holds}
        keyExtractor={(item: any) => item.patronBarcode + item.itemBarcode}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.holdsCard}
            onPress={() => setSelectedStudent(item)}
          >
            <Header title={item.patronName} type={3} />
            <AppText
              title={`${item.title} ${item.subtitle && `- ${item.subtitle}`}`}
              type={3}
            />
          </TouchableOpacity>
        )}
      />
      {selectedStudent && (
        <ModalOverdue
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
        />
      )}
    </View>
  );
};

export default HoldScreen;
