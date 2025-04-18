import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import Colors from '@/data/Colors';
import { useHolds } from '@/hooks/useHolds';
import { Image } from 'expo-image';

import styles from '@/styles/overdue.styles';
import ModalOverdue from '@/components/circulation/ModalOverdue';

export interface HoldItem {
  patronBarcode: string;
  patronName: string;
  title: string;
  borrowingDate: string | Date;
  dueDate: string | Date;
  // Add other properties as needed
}

export default function OverduesScreen() {
  const { holds, loading } = useHolds();
  const [selectedStudent, setSelectedStudent] = useState<HoldItem | null>(null);
  const [patronImage, setPatronImage] = useState<{ uri: string } | null>(null);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  const fetchPatronImage = async () => {
    if (!selectedStudent) return;

    try {
      const imageResponse = await fetch(
        `https://dzuelsfoundation.vercel.app/api/patron/image/${selectedStudent.patronBarcode}`
      );

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        setPatronImage(imageData);
      }
    } catch (error) {
      console.error('Error fetching student image:', error);
    }
  };

  // useEffect(() => {
  //   fetchPatronImage();
  // }, []);

  const renderItem: ListRenderItem<HoldItem> = ({ item, index }) => (
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
      <Text style={styles.header}>Overdue Books</Text>
      <Text style={styles.header}>Total: {getOverdueBooks(holds).length}</Text>
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
          patronImage={patronImage}
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
