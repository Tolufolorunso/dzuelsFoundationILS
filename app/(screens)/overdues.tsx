import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';

import styles from '@/styles/overdue.styles';
import ModalOverdue from '@/components/circulation/ModalOverdue';
import FullLoadingActivityIndicator from '@/components/shared/FullLoadingActivityIndicator';
import useCirculationStore from '@/store/circulation.store';
import Header from '@/components/header/Header';
import Colors from '@/data/Colors';

export type HoldItemType = {
  patronBarcode: string;
  patronName: string;
  title: string;
  borrowingDate: string | Date;
  dueDate: string | Date;
};

export default function OverduesScreen() {
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

  const renderItem: ListRenderItem<HoldItemType> = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedStudent(item)}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 0.1 }}>
          <Text style={styles.text}>{index + 1}.</Text>
        </View>
        <View style={{ flex: 0.9 }}>
          <Text style={styles.text}>{item.patronName}</Text>
          <Text style={styles.text}>{item.patronBarcode}</Text>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.text}>
            {new Date(item.borrowingDate).toLocaleString()}
          </Text>
          <Text style={styles.text}>
            {new Date(item.dueDate).toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', paddingBottom: 20 }}>
        <Header
          style={{ color: Colors.PRIMARY, fontFamily: 'singleDay' }}
          title="Overdue Books"
        />
        <Header type={3} title={`Total: ${getOverdueBooks(holds).length}`} />
      </View>

      <FlatList
        data={getOverdueBooks(holds)}
        keyExtractor={(item, index) => `${item.patronBarcode}-${index}`}
        renderItem={renderItem}
      />

      {/* Modal for Student Details */}
      {selectedStudent && (
        <ModalOverdue
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
        />
      )}
    </View>
  );
}

function getOverdueBooks(holds: any) {
  const currentDate = new Date(); // Get current date and time

  return holds.filter((hold: any) => {
    const dueDate = new Date(hold.dueDate);
    return dueDate < currentDate; // Book is overdue if due date is in the past
  });
}
